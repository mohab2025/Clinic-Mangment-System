import mongoose, { Schema, model, Types } from "mongoose";

import { IMedicines } from "../interfaces/medicines.interface";

const medicinesSchema = new Schema<IMedicines>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  tradeName: { type: String, required: true },
  scientificName: { type: String },
  type: { type: String },
});

const Medicines = model<IMedicines>("medicines", medicinesSchema);

export default Medicines;
