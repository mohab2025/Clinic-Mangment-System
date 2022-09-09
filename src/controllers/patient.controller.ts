import { RequestHandler } from "express";
import mongoose from "mongoose";

import "../models/patient.model";
let Patient = mongoose.model("patients");

import "../models/services.model";
let Service = mongoose.model("services");

export default class PatientController {
  createPatient: RequestHandler = (request, response, next) => {
    console.log("createPatient controller");
    let object = new Patient({
      _id: new mongoose.Types.ObjectId(),
      fullName: request.body.fullName,
      age: request.body.age,
      gender: request.body.gender,
      address: {
        address: request.body.address,
        city: request.body.city,
      },
      phoneNumber: request.body.phoneNumber,
      appointments: request.body.appointments,
      services: request.body.services,
      notes: request.body.notes,
    });
    object
      .save()
      .then((data) => {
        response.status(201).json({ msg: "patient created", data });
      })
      .catch((error) => next(error));
  };

  updatePatient: RequestHandler = (request, response, next) => {
    console.log("updatePatient controller");
    Patient.findOne({ _id: request.params.id })
      .then((data: any) => {
        if (!data) next(new Error("patient not found"));
        for (let prop in request.body) {
          if (prop == "address" || prop == "city") {
            data.address[prop] = request.body[prop] || data.address[prop];
          } else if (prop == "appointments" || prop == "services") continue;
          else data[prop] = request.body[prop] || data[prop];
        }
        return data.save().then((data: any) => {
          response.status(200).json({ msg: "patient updated", data });
        });
      })
      .catch((error) => next(error));
  };

  addServicePatient: RequestHandler = (request: any, response, next) => {
    console.log("addServicePatient controller");
    Patient.findOne({ _id: request.params.id })
      .populate("services")
      .then((data: any) => {
        if (!data) next(new Error("patient not found"));
        data.services.push(request.body.service);
        Service.findOne({
          _id: request.body.service,
        }).then((matchedService: any) => {
          data.remainingAmount += matchedService.cost;
          request.remainingAmount = 0;
          request.remainingAmount += matchedService.cost;
          return data.save().then((data: any) => {
            next();
          });
        });
      })
      .catch((error) => next(error));
  };

  partPayment: RequestHandler = (request, response, next) => {
    console.log("removeServicePatient controller");
    Patient.findOne({ _id: request.body.patient })
      .then((data: any) => {
        if (!data) next(new Error("patient not found"));
        data.remainingAmount -= request.body.amount;
        return data.save().then((data: any) => {
          if (data.remainingAmount == 0) {
            next();
          }
          response.status(200).json({
            msg: `patient paid ${request.body.amount}. Remaining amount is ${data.remainingAmount}`,
          });
        });
      })
      .catch((error) => next(error));
  };

  removeServicePatient: RequestHandler = (request, response, next) => {
    console.log("removeServicePatient controller");
    Patient.findOne({ _id: request.params.id })
      .then((data: any) => {
        if (!data) next(new Error("patient not found"));
        data.services = data.services.filter(
          (service: any) => service != request.body.service
        );
        return data.save().then((data: any) => {
          response.status(200).json({ msg: "service added", data });
        });
      })
      .catch((error) => next(error));
  };

  addAppointmentPatient: RequestHandler = (request: any, response, next) => {
    console.log("addAppointmentPatient controller");
    Patient.findOne({ _id: request.body.patient })
      .then((data: any) => {
        if (!data) next(new Error("patient not found"));
        data.appointments.push(request.appointment);
        return data.save().then((data: any) => {
          response.status(200).json({ msg: "appointment added", data });
        });
      })
      .catch((error) => next(error));
  };

  getPatient: RequestHandler = (request, response, next) => {
    console.log("getPatient controller");
    Patient.findOne({ _id: request.params.id })
      .then((data: any) => {
        if (!data) throw Error("patient not found");
        response.status(200).json({ msg: "patient get", data });
      })
      .catch((error) => next(error));
  };

  deletePatient: RequestHandler = (request, response, next) => {
    console.log("deletePatient controller");
    Patient.deleteOne({ _id: request.params.id })
      .then((data: any) => {
        if (!data) throw Error("patient not found");
        response.status(200).json({ msg: "patient deleted" });
      })
      .catch((error) => next(error));
  };

  getAllPatients: RequestHandler = (request, response, next) => {
    console.log("getAllPatients controller");
    let sortingObj: any = {};
    if (request.body.sortKey) {
      for (let key of request.body.sortKey) {
        if (key == "fullName" || key == "age") {
          sortingObj[key] = 1;
        }
      }
    }
    console.log("sortingObj = ", sortingObj);
    Patient.find({})
      .sort(sortingObj)
      .then((data: any) => {
        response.status(200).json({ msg: "patient getAll", data });
      })
      .catch((error) => next(error));
  };
}
