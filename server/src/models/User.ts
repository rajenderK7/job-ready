import { Schema, model } from "mongoose";

export interface UserI {
  firstName: String;
  lastName?: String;
  email: String;
}

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: { type: String },
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

export default model("User", UserSchema);
