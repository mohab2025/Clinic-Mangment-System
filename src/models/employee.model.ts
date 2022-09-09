import mongoose, { Schema } from "mongoose";

import IEmployee from "../interfaces/employee.interface"; 
import { locationSchema } from "./location.model";

import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateFullName,
} from "./../helpers/functions";
import { EDepartment } from "../interfaces/doctor.interface";

const employeeSchema: Schema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
  },
  fullName: {
    //unique
    type: String,
    required: true,
    validate: [validateFullName, "Please fill a valid fullName"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: true,
    validate: [validatePassword, "Please fill a strong password"],
  },
  phoneNumber: {
    type: String,
    // validate: [validatePhoneNumber, "Please fill a valid phone number"],
  },
  role: {
    type: String,
    default: "employee",
  },
  //1:1 embedded relationships
  address: {
    type: locationSchema,
  },
  department: {
    type: String,
    enum: EDepartment,
    required: true,
  },
  resetLink: { type: String, default: "" },
});

//mapping
export default mongoose.model <IEmployee> ("employees",employeeSchema);