import mongoose from "mongoose";
import { Schema } from "mongoose";

import { locationSchema } from "./location.model";
import IPatient, { EGender } from "../interfaces/patient.interface";
import { validatePhoneNumber, validateFullName } from "./../helpers/functions";

const patientSchema = new Schema<IPatient>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    validate: [validateFullName, "Please fill a valid fullName"],
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: EGender,
  },
  address: locationSchema,
  phoneNumber: {
    type: String,
    validate: [validatePhoneNumber, "Please fill a valid phone number"],
  },
  services: { type: [Schema.Types.ObjectId], ref: "services" },
  appointments: { type: [Schema.Types.ObjectId], ref: "appointments" },
  notes: { type: String },
  remainingAmount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model<IPatient>("patients", patientSchema);
