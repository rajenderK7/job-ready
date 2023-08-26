import { Schema, model } from "mongoose";
import { UserI } from "./User";

export interface InterviewerI extends UserI {
  company: string;
  experience: number;
  duration?: string;
  availFromDate: Date;
  availUntilDate: Date;
}

const InterviewerSchema = new Schema({
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
  company: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    default: "1 hr",
  },
  availFromDate: {
    type: Date,
  },
  availUntilDate: {
    type: Date,
  },
});

export default model("Interviewer", InterviewerSchema);
