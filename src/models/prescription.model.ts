import mongoose, { Schema } from "mongoose";

import IPrescription from "../interfaces/prescription.interface";

function itemsLimit(items: Array<Number>) {
  return items.length >= 1;
}

const prescriptionSchema = new Schema<IPrescription>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "doctors",
    },
    patient: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "patients",
    },
    medicines: {
      type: [Schema.Types.ObjectId],
      ref: "medicines",
      required: true,
      validate: [itemsLimit, "medicines should have at least 1 item"],
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPrescription>(
  "prescriptions",
  prescriptionSchema
);
