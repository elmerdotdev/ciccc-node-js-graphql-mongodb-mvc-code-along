import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true }
})

export const User = mongoose.model("User", UserSchema)