import mongoose, { Document } from "mongoose";

export default interface ILocation extends Document {
  city: String;
  address: String;
}
