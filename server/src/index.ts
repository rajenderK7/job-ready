import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { exit } from "process";
import userAPI from "./routes/user";
import intvrAPI from "./routes/interviewer";
import authAPI from "./routes/auth";

configDotenv();
const DB_URL = process.env.DB_URL!;

(async function () {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB connection success");
  } catch (e) {
    console.log(e);
    exit();
  }
})();

const app = express();
app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use("/user", userAPI);
apiRouter.use("/intvr", intvrAPI);
apiRouter.use("/auth", authAPI);

app.use("/api", apiRouter);
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello there!" });
});

app.listen(4000, () => console.log("connected dude!"));
