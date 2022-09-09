import { Request, Response, NextFunction } from "express";
import invoices from "../models/invoices.model";

import mongoose from "mongoose";

export default class InvoicesController {
  getAllInvoices = (req: Request, res: Response, next: NextFunction) => {
    invoices
      .find({})
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  };

  //function to update isready state
  getoneInvoices = (req: Request, res: Response, next: NextFunction) => {
    invoices
      .findOne({ _id: req.params.id }) //by patient
      .populate({ path: "doctors", select: "fullName" })
      .populate({ path: "patients", select: "fullName" })
      .populate({ path: "services", select: "name" })

      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  };

  createInvoices = (req: any, res: Response, next: NextFunction) => {
    let invoicesObject = new invoices({
      _id: new mongoose.Types.ObjectId(),
      patients: req.body.patients,
      paymentMethod: req.body.paymentMethod,
      totalCost: req.remainingAmount,
    });
    invoicesObject.services.push(req.body.service);

    invoicesObject
      .save()
      .then((data) => {
        res.status(201).json({ data: "added" });
      })
      .catch((error) => next(error));
  };

  updateInvoices(request: Request, response: Response, next: NextFunction) {
    invoices
      .findById(request.params.id)
      .then((data: any) => {
        if (!data) next(new Error("invoices not found"));
        else {
          for (let key in request.body) {
            data[key] = request.body[key];
          }
          return data.save();
        }
      })
      .then((data) => {
        response.status(201).json({ data: "updated" });
      })
      .catch((error) => next(error));
  }

  updateIsReady(request: Request, response: Response, next: NextFunction) {
    invoices
      .findOne({ _id: request.body.invoice, patients: request.body.patient })
      .then((data: any) => {
        if (!data) next(new Error("invoice not found"));
        else {
          data.isReady = true;
          return data.save();
        }
      })
      .then((data) => {
        response.status(201).json({ data: "updated" });
      })
      .catch((error) => next(error));
  }

  deleteInvoice(request: Request, response: Response, next: NextFunction) {
    invoices
      .deleteOne({ _id: request.params.id })
      .then((data) => {
        if (!data) next(new Error("invoices not found"));
        response.status(200).json({ data: "delete " + request.params.id });
      })
      .catch((error) => next(error));
  }
}
