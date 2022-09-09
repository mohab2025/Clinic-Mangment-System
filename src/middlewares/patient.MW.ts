import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { phoneRegex } from "../helpers/regex";

export let post = [
  (request: Request, response: Response, next: NextFunction) => {
    console.log("validationMW");
    next();
  },
  check("fullName")
    .optional()
    .isString()
    .withMessage("patient fullName should be string"),
  check("age")
    .optional()
    .isNumeric()
    .withMessage("patient age should be number"),
  check("gender")
    .optional()
    .isIn(["Male", "Female"])
    .withMessage("patient gender should be either 'Male' or 'Female' "),
  check("address")
    .optional()
    .isString()
    .withMessage("patient address should be string"),
  check("city")
    .optional()
    .isString()
    .withMessage("patient city should be string"),
  check("phoneNumber")
    .isString()
    .optional()
    .withMessage("patient phoneNumber should be string")
    .matches(phoneRegex)
    .withMessage("patient phone number should be valid"),
  check("notes")
    .optional()
    .isString()
    .withMessage("patient city should be string"),
];

export let put = [
  (request: Request, response: Response, next: NextFunction) => {
    console.log("validationMW");
    next();
  },
  check("fullName")
    .optional()
    .isString()
    .withMessage("patient fullName should be string"),
  check("age")
    .optional()
    .isNumeric()
    .withMessage("patient age should be number"),
  check("gender")
    .optional()
    .isIn(["Male", "Female"])
    .withMessage("patient gender should be either 'Male' or 'Female' "),
  check("address")
    .optional()
    .isString()
    .withMessage("patient address should be string"),
  check("city")
    .optional()
    .isString()
    .withMessage("patient city should be string"),
  check("phoneNumber")
    .isString()
    .optional()
    .withMessage("patient phoneNumber should be string")
    .matches(phoneRegex)
    .withMessage("patient phone number should be valid"),
  check("notes")
    .optional()
    .isString()
    .withMessage("patient city should be string"),
];
export let idValidator = [
  check("id")
    .notEmpty()
    .withMessage("patient id is required")
    .isMongoId()
    .withMessage("patient id should be objectId"),
];

export let addServices = [
  check("service")
    .notEmpty()
    .withMessage("patient services is required")
    .isMongoId()
    .withMessage("invalid service value"),
];

export let partPayment = [
  check("patient")
    .notEmpty()
    .withMessage("patient is required")
    .isMongoId()
    .withMessage("patient should be mongoId"),
  check("invoice")
    .notEmpty()
    .withMessage("invoice is required")
    .isMongoId()
    .withMessage("invoice should be mongoId"),
  check("amount")
    .notEmpty()
    .withMessage("patient amount is required")
    .isNumeric()
    .withMessage("patient amount should be numeric"),
];

export let removeServices = [
  check("service")
    .notEmpty()
    .withMessage("patient service is required")
    .isMongoId()
    .withMessage("invalid service value"),
];
