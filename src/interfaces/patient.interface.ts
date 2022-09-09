import { Types, Schema } from "mongoose";

export enum EGender {
  Male = "Male",
  Female = "Female",
}

export default interface IPatient {
  _id: Types.ObjectId;
  fullName: string;
  age: number;
  gender: EGender;
  address: object;
  phoneNumber: string;
  notes: string;
  appointments: [Types.ObjectId];
  services: [Types.ObjectId];
  remainingAmount: number;
}
