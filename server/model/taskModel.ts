import mongoose, { Document, Model, Schema } from "mongoose";

export interface Itask extends Document {
  // we are describing the types for type safty
  name: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  user: mongoose.Types.ObjectId;
}
const taskSchema: Schema<Itask> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const userModel: Model<Itask> = mongoose.model("Task", taskSchema);
