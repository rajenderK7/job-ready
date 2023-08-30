import { Schema, model } from "mongoose";

export interface BookingI {
  userId: Schema.Types.ObjectId;
  intvrId: Schema.Types.ObjectId;
  date: Date;
  timeFrom: number;
  timeUntil?: number;
  oneHour: boolean;
}

const BookingSchema = new Schema<BookingI>({
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
  oneHour: {
    type: Boolean,
    default: true,
  },
});

export default model("Booking", BookingSchema);
