import { validateDate } from "./../helpers/functions";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import Appointment from "../models/appointment.model";

export default class AppointmentController {
  getAllAppointments(request: Request, response: Response, next: NextFunction) {
    Appointment.find({}, { date: 1, doctor: 1 })
      .then((data) => {
        if (!data) next(new Error("appointments not found"));
        else response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  }

  getAppointmentById(request: Request, response: Response, next: NextFunction) {
    Appointment.findOne({ _id: request.params.id }, { employee: 0 })
      .populate({ path: "doctor", select: "fullName" })
      .then((data) => {
        if (!data) next(new Error("appointments not found"));
        else response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  }

  /** for admin validation */
  getAppointmentByEmployee(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    Appointment.find({ employee: request.params.id })
      .populate({ path: "doctor", select: "fullName" })
      .populate({ path: "employee", select: "fullName -_id" })
      .then((data) => {
        if (!data) next(new Error("appointment not found"));
        else response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  }

  /** for daily schedule */
  getAppointmentByDoctor(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const today: Date = new Date(Date.now());
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    Appointment.find(
      { doctor: request.params.id, date: date },
      { employee: 0, createdAt: 0, updatedAt: 0 }
    )
      .populate({ path: "doctor", select: "fullName" })
      .then((data) => {
        if (!data) next(new Error("appointment not found"));
        else response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  }

  createAppointment(request: any, response: Response, next: NextFunction) {
    Appointment.find({
      date: request.body.date,
      doctor: request.body.doctor,
    })
      .then((data) => {
        if (data.length) {
          next(new Error("appointment already reserved"));
        } else {
          if (!validateDate(request.body.date))
            //false
            next(
              new Error(
                "An appointment must not be in the past and not more than 60 days from now."
              )
            );
          let appointment = new Appointment({
            _id: new mongoose.Types.ObjectId(),
            date: request.body.date,
            doctor: request.body.doctor,
            description: request.body.description,
            employee: request.id,
          });
          request.appointment = appointment._id;
          return appointment.save();
        }
      })
      .then((data) => {
        next();
      })
      .catch((error) => next(error));
  }

  updateAppointment(request: Request, response: Response, next: NextFunction) {
    Appointment.findById(request.body.id)
      .then((data: any) => {
        if (!data) next(new Error("appointment not found"));
        else {
          if (request.body.date && !validateDate(request.body.date))
            next(
              new Error(
                "An appointment must not be in the past and not more than 60 days from now."
              )
            );
          for (let key in request.body) {
            if (key != "employee") data[key] = request.body[key];
          }
          return data.save();
        }
      })
      .then((data) => {
        response.status(201).json({ data: "updated" });
      })
      .catch((error) => next(error));
  }

  deleteAppointment(request: Request, response: Response, next: NextFunction) {
    Appointment.deleteOne({ _id: request.params.id })
      .then((data) => {
        if (!data) next(new Error("appointment not found"));
        response.status(200).json({ data: "delete " + request.params.id });
      })
      .catch((error) => next(error));
  }
}
