import mongoose, { Document } from 'mongoose';

import ILocation from './location.interface';
import { EDepartment } from "../interfaces/doctor.interface";

export default interface IEmployee extends Document {
  _id: mongoose.Types.ObjectId;
  fullName: String;
  email: String;
  password: String;
  department: EDepartment;
  phoneNumber: String;
  role: string;
  address: ILocation;
}