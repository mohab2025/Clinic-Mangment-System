import mongoose, { Schema } from 'mongoose';

import ILocation from '../interfaces/location.interface';

export const locationSchema: Schema = new mongoose.Schema<ILocation>(
  {
    address: {
      type: String,
    },
    city: {
      type: String,
    }
  },
  { _id: false }
);
