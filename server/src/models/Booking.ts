import { Schema, model } from "mongoose";

export interface BookingI {
  userId: Schema.Types.ObjectId;
  intvrId: Schema.Types.ObjectId;
  date: Date;
  timeFrom: string;
  timeUntil?: string;
  halfHour: boolean;
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
    type: String,
    required: true,
  },
  timeUntil: {
    type: String,
    required: true,
  },
  halfHour: {
    type: Boolean,
    default: false,
  },
});

export default model("Booking", BookingSchema);
