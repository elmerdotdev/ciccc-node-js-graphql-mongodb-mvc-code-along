import mongoose, { Schema } from "mongoose";

const TodoSchema = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // Foreign key
})

export const Todo = mongoose.model("Todo", TodoSchema)