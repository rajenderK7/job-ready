import express, { Request, Response } from "express";
import OTP from "../../models/OTP";
import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

const router = express.Router();
router.use(express.json());
configDotenv();

router.post("/set-otp", async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const doc = await OTP.findOneAndUpdate(
      { email },
      { otp },
      {
        upsert: true,
        new: true,
      }
    );
    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: process.env.OTP_EMAIL,
        pass: process.env.OTP_PASS,
      },
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: process.env.OTP_EMAIL,
      to: email,
      subject: "Your OTP for signing into Job Ready",
      html: `<div>
        <h1>OTP: <strong>${otp}</strong></h1>
        <p>This OTP will expire in 10 minutes.</p>
      </div>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({ message: "otp sent" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

router.post("/verify-otp", async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const doc = await OTP.findOne({ email });
    if (!doc || doc.otp.toString() !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    await OTP.deleteMany({ email });
    res.status(200).json({ message: "success" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

export default router;
