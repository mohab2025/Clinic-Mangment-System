import mongoose from "mongoose";
import { Schema } from "mongoose";

import IDoctor, { EDepartment, EGender } from "../interfaces/doctor.interface";
import { locationSchema } from "./location.model";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateFullName,
} from "./../helpers/functions";

const doctorSchema = new Schema<IDoctor>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    validate: [validateFullName, "Please fill a valid full name"],
  },
  department: {
    type: String,
    enum: EDepartment,
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
    validate: [validatePassword, "Please fill a valid email address"],
  },
  phoneNumber: {
    type: String,
    validate: [validatePhoneNumber, "Please fill a valid phone number"],
  },
  address: locationSchema,
  gender: {
    type: String,
    enum: EGender,
  },
  appointments: { type: [Schema.Types.ObjectId] },
  role: { type: String, default: "doctor" },
  resetLink: { type: String, default: "" },
});

export default mongoose.model<IDoctor>("doctors", doctorSchema);
