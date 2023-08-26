import express, { Request, Response } from "express";
import OTP from "../../models/OTP";
import nodemailer from "nodemailer";

const router = express.Router();
router.use(express.json());

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
      service: "gmail",
      auth: {
        user: "Kanthaladanush.rfc8@gmail.com",
        pass: "Kdvnr@2003",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "Kanthaladanush.rfc8@gmail.com",
      to: "20071a6625@vnrvjiet.in",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
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

export default router;
