import mongoose from "mongoose";

let schema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
    unique:true
  },
  cost: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("services", schema);
