import mongoose, { Document } from 'mongoose';

export default interface IAppointment extends Document {
  _id: mongoose.Types.ObjectId;
  date: Date;
  doctor: mongoose.Types.ObjectId;
  employee: mongoose.Types.ObjectId;
  description?: String;
}