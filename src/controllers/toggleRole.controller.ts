import { RequestHandler } from "express";
import mongoose from "mongoose";

import "../models/doctor.model";
const Doctor = mongoose.model("doctors");

import "../models/employee.model";
const Employee = mongoose.model("employees");

export default class ToggleRoleController {
  toggleRole: RequestHandler = (request: any, response, next) => {
    console.log("toggleRole controller");
    let User = null;
    if (request.params.userType == "doctor") {
      User = Doctor;
    } else if (request.params.userType == "employee") {
      User = Employee;
    } else {
      next(new Error("invalid user type!"));
    }
    User!
      .findOne({ _id: request.body.id })
      .then((user: any) => {
        if (!user) throw Error("user not found");
        if (user.role != "admin") user.role = "admin";
        else user.role = request.params.userType;

        return user.save().then((user: any) => {
          response
            .status(200)
            .json({ msg: `user role changed to ${user.role}` });
        });
      })
      .catch((error) => next(error));
  };
}
