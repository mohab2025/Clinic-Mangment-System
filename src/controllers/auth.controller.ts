import { RequestHandler } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const mailgun = require("mailgun-js");
const DOMAIN = "sandbox9ef16654558246898368760ecc18807f.mailgun.org";
const API_KEY = "51a767a7ce0baf3de8394e657cf1b7ef-1b8ced53-b7fdf769";
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

import bcrypt from "bcrypt";
const saltRounds = 10;

import "../models/doctor.model";
const Doctor = mongoose.model("doctors");

import "../models/employee.model";
const Employee = mongoose.model("employees");

export default class AuthController {
  login: RequestHandler = (request, response, next) => {
    let User = null;
    if (request.params.userType == "admin") {
      if (
        request.body.email == "admin@gmail.com" &&
        request.body.password == "Admin*123"
      ) {
        let role = "admin";
        let token = jwt.sign(
          {
            role: role,
          },
          "mysecret",
          { expiresIn: "1h" }
        );
        response.status(200).json({ token: token, role: role });
      } else {
        let error: any = new Error("email or password incorrect");
        error.status = 401;
        next(error);
      }
    } else if (request.params.userType == "doctor") {
      User = Doctor;
    } else if (request.params.userType == "employee") {
      User = Employee;
    } else {
      next(new Error("invalid user type!"));
    }

    User!.findOne({ email: request.body.email }).then((data: any) => {
      if (data && bcrypt.compareSync(request.body.password, data.password)) {
        let token = jwt.sign(
          {
            id: data._id,
            role: data.role,
          },
          "mysecret",
          { expiresIn: "1h" }
        );
        response.status(200).json({ token: token, role: data.role });
      } else {
        let error: any = new Error("email or password incorrect");
        error.status = 401;
        next(error);
      }
    });
  };

  signUp: RequestHandler = (request, response, next) => {
    console.log("signUp controller");
    let User = null;
    if (request.params.userType == "doctor") {
      User = Doctor;
    } else if (request.params.userType == "employee") {
      User = Employee;
    } else {
      next(new Error("invalid user type!"));
    }
    let object = new User!({
      _id: new mongoose.Types.ObjectId(),
      fullName: request.body.fullName,
      department: request.body.department,
      email: request.body.email,
      password: bcrypt.hashSync(request.body.password, saltRounds),
    });
    User!
      .findOne({ fullName: request.body.fullName })
      .then((duplicateUsers) => {
        if (!duplicateUsers) {
          return object.save().then((data) => {
            response.status(201).json({ msg: "user created", data });
          });
        } else {
          next(new Error("user fullName already exist"));
        }
      })
      .catch((error) => next(error));
  };

  changePassword: RequestHandler = (request: any, response, next) => {
    console.log("changePassword controller");
    let User = null;
    if (request.params.userType == "doctor") {
      User = Doctor;
    } else if (request.params.userType == "employee") {
      User = Employee;
    } else {
      next(new Error("invalid user type!"));
    }
    User!
      .findOne({ _id: request.id }, { email: 1, password: 1 })
      .then((data: any) => {
        if (!data) next(new Error("user not found"));
        if (data.email == request.body.email) {
          if (bcrypt.compareSync(request.body.oldPassword, data.password)) {
            if (bcrypt.compareSync(request.body.password, data.password)) {
              next(new Error("old password can't be the same old password"));
            }
            data.password = bcrypt.hashSync(request.body.password, saltRounds);
            return data.save().then((data: any) => {
              response.status(200).json({ msg: "user changed password" });
            });
          } else next(new Error("old password incorrect!"));
        } else next(new Error("incorrect email"));
      })
      .catch((error) => next(error));
  };

  forgotPassword: RequestHandler = (request, response, next) => {
    let User = null;
    if (request.params.userType == "doctor") {
      User = Doctor;
    } else if (request.params.userType == "employee") {
      User = Employee;
    } else {
      next(new Error("invalid user type!"));
    }
    User!
      .findOne({ email: request.body.email })
      .then((user: any) => {
        if (!user) throw new Error("user is Not Exist!");
        let token = jwt.sign(
          { _id: user._id, email: request.body.email },
          "mySecret",
          {
            expiresIn: "10m",
          }
        );
        const data = {
          from: "samaahamdy719@gmail.com",
          to: request.body.email,
          subject: "Password Reseting Link",
          html: `
          <h2 style="color: red; font-size: 50px">Password Reseting</h2>
          <pre style="font-size: 30px;">
          Hello ${user.fullName},
          
          Please click on the given link to reset password..
        <a href="http://localhost:8080/resetPassword/${request.params.userType}/${token}">Reset Password</a>
          If you didn't try reset yor password, ignore this email.
          </pre>
        `,
        };

        mg.messages().send(data, function (error: any) {
          if (error) next(error);
          user.resetLink = token;
          user.save().then(() => {
            response.status(200).json({
              data: "Reset Password link has been sent to your Email, kindly check your mail and follow the instructions",
            });
          });
        });
      })
      .catch((error) => next(error));
  };

  resetPassword: RequestHandler = (request, response, next) => {
    let token = request.params.token;
    let User = null;
    if (request.params.userType == "doctor") {
      User = Doctor;
    } else if (request.params.userType == "employee") {
      User = Employee;
    } else {
      next(new Error("invalid user type!"));
    }
    User!
      .findOne({ resetLink: token })
      .then((user: any) => {
        if (!user) next(new Error("user with this token doesn't exist!"));

        if (bcrypt.compareSync(request.body.newPassword, user.password)) {
          next(new Error("you entered the same password"));
        } else {
          user.password = bcrypt.hashSync(request.body.newPassword, saltRounds);
          user.resetLink = "";
          return user.save().then(() => {
            response
              .status(200)
              .json({ msg: "Password Reseting done successfully" });
          });
        }
      })
      .catch((error: any) => next(error));
  };
}
