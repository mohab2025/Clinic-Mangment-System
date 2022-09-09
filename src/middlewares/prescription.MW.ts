import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";

export let post = [
  (request: Request, response: Response, next: NextFunction) => {
    console.log("validationMW");
    next();
  },
  check("doctor")
    .notEmpty()
    .withMessage("prescription doctor is required")
    .isMongoId()
    .withMessage("prescription doctor should be objectId"),
  check("patient")
    .notEmpty()
    .withMessage("prescription patient is required")
    .isMongoId()
    .withMessage("prescription patient should be objectId"),
  check("medicines")
    .notEmpty()
    .withMessage("prescription medicines is required")
    .isArray({ min: 1 })
    .withMessage("prescription medicines should be array"),
  check("notes")
    .optional()
    .isString()
    .withMessage("prescription notes should be array"),
];

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
  check("doctor")
    .isMongoId()
    .optional()
    .withMessage("prescription doctor should be objectId"),
  check("patient")
    .isMongoId()
    .optional()
    .withMessage("prescription patient should be objectId"),
  check("medicines")
    .isArray()
    .optional()
    .withMessage("prescription medicines should be array"),
  check("notes")
    .optional()
    .isString()
    .withMessage("prescription notes should be array"),
];

export let idValidator = [
  check("id")
    .notEmpty()
    .withMessage("prescription id is required")
    .isMongoId()
    .withMessage("prescription id should be objectId"),
];
