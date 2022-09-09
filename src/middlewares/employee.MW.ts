import { EDepartment } from "./../interfaces/doctor.interface";
const { check } = require("express-validator");

import {
  validatePassword,
  validatePhoneNumber,
  validateFullName,
} from "./../helpers/functions";

export const postEmployeeValidator = [
  //id
  check("id").optional().isMongoId().withMessage("invalid employee id"),
  //fullName
  check("fullName")
    .notEmpty()
    .withMessage("employee fullName required")
    .custom(validateFullName)
    .withMessage("employee fullName must be characters only"),
  //email
  check("email")
    .notEmpty()
    .withMessage("employee email required")
    .isEmail()
    .withMessage("invalid employee email"),
  //password
  check("password")
    .notEmpty()
    .withMessage("employee password required")
    .isLength({ min: 8, max: 15 })
    .withMessage("employee password must be 8~15")
    .custom(validatePassword)
    .withMessage(
      "employee password must contain at least one digit, one uppercase letter, one lowercase letter, one special character"
    ),
  //department
  check("department")
    .notEmpty()
    .withMessage("employee department is required")
    .isString()
    .withMessage("employee department should be string")
    .isIn(EDepartment)
    .withMessage(`employee department should be in ("Dermatology",
    "Pathology",
    "Neorolgy",
    "Oncology",
    "ENT",
    "Radiology",
    "Dentistry",
    "Ophthalmology")`),
  //phoneNumber
  check("phoneNumber")
    .optional()
    .notEmpty()
    .withMessage("employee phoneNumber reqiured")
    .isLength({ min: 11, max: 11 })
    .withMessage("invalid employee phoneNumber"),
  // .custom(validatePhoneNumber)
  // .withMessage("invalid phoneNumber"),
  //address
  check("address")
    .optional()
    .isLength({ max: 25 })
    .withMessage("employee address can't exceed 25 characters"),
  //city
  check("city")
    .optional()
    .isLength({ max: 25 })
    .withMessage("employee city can't exceed 25 characters"),
];

export const putEmployeeValidator = [
  //id
  check("id").optional().isMongoId().withMessage("invalid employee id"),
  //fullName
  check("fullName")
    .optional()
    .custom(validateFullName)
    .withMessage("employee fullName must be characters only"),
  //email
  check("email")
    .optional()
    .notEmpty()
    .withMessage("employee email required")
    .isEmail()
    .withMessage("invalid employee email"),
  //phoneNumber
  check("phoneNumber")
    .optional()
    .notEmpty()
    .withMessage("employee phoneNumber reqiured")
    .isLength({ min: 11, max: 11 })
    .withMessage("invalid employee phoneNumber"),
  // .custom(validatePhoneNumber)
  // .withMessage("invalid phoneNumber"),
  //address
  check("address")
    .optional()
    .isLength({ max: 25 })
    .withMessage("employee address can't exceed 25 characters"),
  //city
  check("city")
    .optional()
    .isLength({ max: 25 })
    .withMessage("employee city can't exceed 25 characters"),
  //department
  check("department")
    .optional()
    .isString()
    .withMessage("doctor department should be string")
    .isIn(EDepartment)
    .withMessage(`doctor department should be in ("Dermatology",
    "Pathology",
    "Neorolgy",
    "Oncology",
    "ENT",
    "Radiology",
    "Dentistry",
    "Ophthalmology")`),
];

export const idEmployeeValidator = [
  check("id").isMongoId().withMessage("Employee id wrong"),
];
