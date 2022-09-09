
import mongoose, { Schema, model, Types } from "mongoose";

export interface IMedicines {
  _id: Types.ObjectId;
  tradeName: String;
  scientificName: String;
  type: String;
  cost: Number;
}
