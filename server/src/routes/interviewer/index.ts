import express, { Request, Response } from "express";
import Interviewer, { InterviewerI } from "../../models/Interviewer";

const router = express.Router();
router.use(express.json());

// GET api/intvr
// Get all interviewers
router.get("/", async (req: Request, res: Response) => {
  try {
    const intrvs = await Interviewer.find();
    res.status(200).json({ intrvs });
  } catch (e) {
    res.status(400).json({ message: "something went wrong" });
  }
});

// GET api/intvr/date
// Get interviewers available on given date
// Expects date as as string formatted 'YYYY-MM-DD' E.g. '1987-10-26'
router.get("/:date", async (req: Request, res: Response) => {
  const { date } = req.params;
  try {
    const reqDate = new Date(date);
    const intrvs = await Interviewer.find({
      $and: [
        { availFromDate: { $lte: reqDate } },
        { availUntilDate: { $gte: reqDate } },
      ],
    });
    res.status(200).json({ intrvs });
  } catch (e) {
    res.status(400).json({ message: "something went wrong" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { engineers } = req.body;
    const intrvs = engineers.map((engineer: InterviewerI) => {
      return new Interviewer(engineer);
    });
    await Interviewer.bulkSave(intrvs);
    res.status(200).json({ message: "saved interviewer(s)" });
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
});

export default router;
