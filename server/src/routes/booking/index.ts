import express, { Request, Response } from "express";
import Booking, { BookingI } from "../../models/Booking";

const router = express.Router();

// POST api/booking/
// Creates a new booking
// Date is expected as YYYY-MM-DD from the client
router.post("/", async (req: Request, res: Response) => {
  try {
    const bookingData: BookingI = req.body;
    const booking = new Booking(bookingData);
    await booking.save();
    res.status(200).json({ message: "success" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

// GET api/booking/interviewer/interviewerId/dateOfInterview
// Returns all the bookings that involve the given interviewer
// on the given date
// Date is expected as YYYY-MM-DD from the client
router.get("/interviewer/:id/:date", async (req: Request, res: Response) => {
  try {
    const { id, date } = req.params;
    if (!id) {
      throw new Error("invalid interviewer ID");
    }
    const bookings = await Booking.find({ intvrId: id, date }).select(
      "timeFrom timeUntil"
    );
    res.status(200).json({ message: "success", bookings });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

// GET /api/user/id
// Returns bookings made by a user with userId (id)
router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("invalid interviewer ID");
    }
    const bookings = await Booking.find({ userId: id }).populate("intvrId");
    res.status(200).json({ message: "success", bookings });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

// DELTE /api/booking/id
// Deletes the booking record associcated with id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ message: "success" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

export default router;
