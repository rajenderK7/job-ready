import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { exit } from "process";
import userAPI from "./routes/user";
import intvrAPI from "./routes/interviewer";
import authAPI from "./routes/auth";
import bookingAPI from "./routes/booking";

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
apiRouter.use("/booking", bookingAPI);

app.use("/api", apiRouter);
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello there!" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Listening at port:", PORT));
