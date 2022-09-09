import { check, body, param, query } from "express-validator";

export const bodyValidator = [
  body("id").isMongoId().withMessage("id should be Mongoose"),
];

export const postValidator = [
  body("patients").isMongoId().withMessage("patients should be Mongoose"),
  body("service").isMongoId().withMessage("services should be Mongoose id"),
  body("paymentMethod")
    .isIn(["cash", "credit card", "insurance card"])
    .withMessage(" paymentMethod should be 'cash, credit card, insurance car'"),
];

export const ParamValidator = [
  param("id").isMongoId().withMessage("param should be mongoId"),
];

export const putValidator = [
  body("name")
    .optional()
    .isAlpha()
    .withMessage("invoice Name should be string"),
  body(" services")
    .optional()
    .isMongoId()
    .withMessage(" services should be Mongoose"),
  body(" paymentMethod")
    .optional()
    .isIn(["cash", "credit card", "insurance card"])
    .withMessage(" paymentMethod should be 'cash, credit card, insurance car'"),
];
