import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";

import { passwordRegex } from "./../helpers/regex";

export let signUp = [
  (request: Request, response: Response, next: NextFunction) => {
    console.log("validationMW");
    next();
  },
  check("fullName")
    .notEmpty()
    .withMessage("user fullName is required")
    .isString()
    .withMessage("user fullName should be string"),
  check("department")
    .notEmpty()
    .withMessage("user department is required")
    .isString()
    .withMessage("user department should be string")
    .isIn([
      "Dermatology",
      "Pathology",
      "Neorolgy",
      "Oncology",
      "ENT",
      "Radiology",
      "Dentistry",
      "Ophthalmology",
    ]).withMessage(`user department should be in ("Dermatology",
    "Pathology",
    "Neorolgy",
    "Oncology",
    "ENT",
    "Radiology",
    "Dentistry",
    "Ophthalmology")`),
  check("email")
    .notEmpty()
    .withMessage("user email is required")
    .isEmail()
    .withMessage("user email should be email"),
  check("password")
    .notEmpty()
    .withMessage("user password is required")
    .isString()
    .withMessage("user password should be string")
    .matches(passwordRegex)
    .withMessage(
      "user password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
];

export let forgotPassword = [
  (request: Request, response: Response, next: NextFunction) => {
    console.log("validationMW");
    next();
  },
  check("email")
    .notEmpty()
    .withMessage("user email is required")
    .isEmail()
    .withMessage("user email should be valid email"),
];

export let resetPassword = [
  (request: Request, response: Response, next: NextFunction) => {
    console.log("validationMW");
    next();
  },
  check("token")
    .notEmpty()
    .withMessage("user token is required")
    .isString()
    .withMessage("user token should be string"),

  check("newPassword")
    .notEmpty()
    .withMessage("user newPassword is required")
    .isString()
    .withMessage("user newPassword should be string")
    .matches(passwordRegex)
    .withMessage(
      "user newPassword should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
];

export let login = [
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email should be valid email"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .matches(passwordRegex)
    .withMessage(
      "password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
];

export const oldPassword = [
  check("oldPassword")
    .notEmpty()
    .withMessage("password is required")
    .matches(passwordRegex)
    .withMessage(
      "password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
];
