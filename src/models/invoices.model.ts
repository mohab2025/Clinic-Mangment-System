import mongoose from "mongoose";

import { Schema, Types } from "mongoose";

let invoicesSchema = new Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
    },

    patients: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "patients",
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "credit card", "insurance card"],
      required: true,
    },

    services: [
      {
        type: mongoose.Types.ObjectId,
        ref: "services",
      },
    ],

    totalCost: {
      type: Number,
      required: true,
    },

    isReady: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

export default mongoose.model("invoices", invoicesSchema);
