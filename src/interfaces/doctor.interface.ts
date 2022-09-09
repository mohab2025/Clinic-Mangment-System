import { Types } from "mongoose";

export enum EGender {
  Male = "Male",
  Female = "Female",
}

export enum EDepartment {
  Dermatology = "Dermatology",
  Pathology = "Pathology",
  Neorolgy = "Neorolgy",
  Oncology = "Oncology",
  ENT = "ENT",
  Radiology = "Radiology",
  Dentistry = "Dentistry",
  Ophthalmology = "Ophthalmology",
}

export default interface IDoctor {
  _id: Types.ObjectId;
  fullName: string;
  department: EDepartment;
  clinics: [Types.ObjectId];
  email: string;
  password: string;
  address: object;
  phoneNumber?: string;
  image?: string;
  gender?: EGender;
  appointments: [Types.ObjectId];
  role: string;
  resetLink: string;
}
