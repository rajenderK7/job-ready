import express, { Request, Response } from "express";
import User, { UserI } from "../../models/User";

const router = express.Router();
router.use(express.json());

// POST api/user
// Create a new user in DB
router.post("/", async (req: Request, res: Response) => {
  const data: UserI = req.body;
  const user = new User(data);
  try {
    await user.save();
    res.status(200).json({ message: "user saved" });
  } catch (e: any) {
    res.status(400).json({ message: "something went wrong" });
  }
});

export default router;
