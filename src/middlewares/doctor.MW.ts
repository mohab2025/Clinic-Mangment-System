import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { phoneRegex } from "./../helpers/regex";

export let put = [
  (request: Request, response: Response, next: NextFunction) => {
    console.log("validationMW");
    next();
  },
  check("id")
    .notEmpty()
    .withMessage("prescription id is required")
    .isMongoId()
    .withMessage("prescription id should be objectId"),
  check("fullName")
    .isString()
    .optional()
    .withMessage("doctor fullName should be string"),
  check("department")
    .isString()
    .optional()
    .withMessage("doctor department should be string")
    .isIn([
      "Dermatology",
      "Pathology",
      "Neorolgy",
      "Oncology",
      "ENT",
      "Radiology",
      "Dentistry",
      "Ophthalmology",
    ]).withMessage(`doctor department should be in ("Dermatology",
    "Pathology",
    "Neorolgy",
    "Oncology",
    "ENT",
    "Radiology",
    "Dentistry",
    "Ophthalmology",)`),
  check("phoneNumber")
    .isString()
    .optional()
    .withMessage("doctor phoneNumber should be number")
    .matches(phoneRegex)
    .withMessage("doctor phone number should be valid"),
  check("image")
    .isString()
    .optional()
    .withMessage("doctor image should be string"),
  check("gender")
    .isIn(["Male", "Female"])
    .optional()
    .withMessage(`doctor gender should be either "Male" or "Female"`),
];

export let idValidator = [
  (request: Request, response: Response, next: NextFunction) => {
    console.log("validationMW");
    next();
  },
  check("id")
    .notEmpty()
    .withMessage("doctor id is required")
    .isMongoId()
    .withMessage("doctor id should be mongoId"),
];
