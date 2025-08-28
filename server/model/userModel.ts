import mongoose, { Document, Schema, Model } from "mongoose";

export interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema<Iuser> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const userModel: Model<Iuser> = mongoose.model<Iuser>("User", userSchema);

export default userModel;
