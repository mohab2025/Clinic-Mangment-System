import mongoose from 'mongoose';

import IAppointment from "../interfaces/appointments.interface";
import { validateDate } from "../helpers/functions";

//create schema object
const appointmentSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
    },
    date: {
      type: Date,
      required: true,
      validate: [
        validateDate,
        "An appointment must not be in the past and not more than 60 days from now.",
      ],
    },
    doctor: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "doctors",
    },
    employee: {
      type: mongoose.Types.ObjectId,
      ref: "employees",
      required: true,
    },
    description: {
      type: String,
      maxLength: 500,
    },
  },
  {
    timestamps: true,
  }
);

//mapping
export default mongoose.model <IAppointment> ("appointments",appointmentSchema);