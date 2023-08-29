import { Schema, model } from "mongoose";
import { UserI } from "./User";

export interface InterviewerI extends UserI {
  image: string;
  company: string;
  role: string;
  experience: number;
  duration?: string;
  availFromDate: Date;
  availUntilDate: Date;
}

const InterviewerSchema = new Schema<InterviewerI>({
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
  role: {
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
    default: Date.now,
  },
  availUntilDate: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setDate(date.getDate() + 40);
      return date;
    },
  },
});

export default model("Interviewer", InterviewerSchema);
