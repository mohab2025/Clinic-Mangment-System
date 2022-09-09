import { Types } from "mongoose";

export default interface IPrescription {
  _id: Types.ObjectId;
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
  medicines: Array<Types.ObjectId>;
  notes: string;
}
