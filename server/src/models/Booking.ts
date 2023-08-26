import { Schema, model } from "mongoose";

export interface BookingI {
  userId: string;
  intvrId: string;
  date: Date;
  timeFrom: number;
  timeUntil: number;
}

const BookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  intvrId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeFrom: {
    type: Number,
    required: true,
  },
  timeUntil: {
    type: Number,
    required: true,
  },
});

export default model("Booking", BookingSchema);
