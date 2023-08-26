import { Schema, model } from "mongoose";

export interface OTPI {
  email: string;
  otp: number;
}

const OTPSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
});

export default model("OTP", OTPSchema);
