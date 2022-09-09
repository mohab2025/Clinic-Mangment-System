import { RequestHandler } from "express";
import mongoose from "mongoose";

import "../models/doctor.model";
const Doctor = mongoose.model("doctors");

export default class DoctorController {
  updateDoctor: RequestHandler = (request: any, response, next) => {
    console.log("updateDoctor controller");
    Doctor.findOne({ _id: request.params.id })
      .then((data: any) => {
        if (!data) next(new Error("doctor not found"));
        if (request.role == "doctor") {
          if (data.id != request.id)
            next(new Error("you're not authorized to update this profile"));
        }
        for (let prop in request.body) {
          if (
            prop == "name" ||
            prop == "email" ||
            prop == "password" ||
            prop == "role" ||
            prop == "resetLink" ||
            prop == "appointments"
          )
            continue;
          else if (prop == "address" || prop == "city") {
            data.location[prop] = request.body[prop] || data.location[prop];
          } else data[prop] = request.body[prop];
        }
        return data.save().then((data: any) => {
          response.status(200).json({ msg: "doctor updated", data });
        });
      })
      .catch((error) => next(error));
  };

  getDoctor: RequestHandler = (request, response, next) => {
    console.log("getDoctor controller");
    Doctor.findOne({ _id: request.params.id }, { password: 0, resetLink: 0 })
      .then((data: any) => {
        if (!data) throw Error("doctor not found");
        response.status(200).json({ msg: "doctor get", data });
      })
      .catch((error) => next(error));
  };

  deleteDoctor: RequestHandler = (request, response, next) => {
    console.log("deleteDoctor controller");
    Doctor.deleteOne({ _id: request.params.id })
      .then((data: any) => {
        if (!data) throw Error("doctor not found");
        response.status(200).json({ msg: "doctor deleted" });
      })
      .catch((error) => next(error));
  };

  getAllDoctors: RequestHandler = (request, response, next) => {
    console.log("getAllDoctors controller");

    let sortingObj: any = {};
    if (request.body.sortKey) {
      for (let key of request.body.sortKey) {
        sortingObj[key] = 1;
      }
    }
    console.log("sortingObj = ", sortingObj);
    Doctor.find({}, { password: 0 })
      .sort(sortingObj)
      .then((data: any) => {
        response.status(200).json({ msg: "doctor getAll", data });
      })
      .catch((error) => next(error));
  };
}
