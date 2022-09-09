const paypal = require("paypal-rest-sdk");
import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";

import Patient from "../models/patient.model";

export default class PaymentController {
  pay(request: Request, response: Response, next: NextFunction) {
    //create json for payment
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:8080/success",
        cancel_url: "http://localhost:8080/cancel",
      },
      transactions: [
        {
          item_list: {
            items: request.body.products,
          },
          amount: {
            currency: "USD",
            total: request.body.cost,
          },
          description: "payment description.",
        },
      ],
    };
    console.log("creating...");
    //approval_url
    paypal.payment.create(
      create_payment_json,
      function (error: any, payment: any) {
        if (error) {
          console.log(error.response);
          next(error);
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === "approval_url") {
                console.log(payment.links[i].href);
                response.status(200).json( payment.links[i].href );
            }
          }
        }
      }
    );
  }

  // //payment success
  paymentCompleted(request: Request, response: Response, next: NextFunction) {
    const payerId = request.query.PayerID;
    const paymentId = request.query.paymentId;

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: "5.00",
          },
        },
      ],
    };
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error: any, payment: any) {
        if (error) {
          console.log("error completed");
          console.log(error.response);
          next(error);
        } else {
          console.log(JSON.stringify(payment));
          response.status(200).json(payment.payer);
        }
      }
    );
  }

  paymentCancelled(request: Request, response: Response) {
    response.status(499).json("payment cancelled");
  }
}