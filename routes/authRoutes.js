import express from "express";
import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import JWT from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  // check username and password
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "Username belum terdaftar",
    });
  }

  // check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).json({
      status: "error",
      message: "Password salah! Silakan ulangi lagi",
    });

  // create new token for user
  const token = JWT.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  await User.findByIdAndUpdate(
    { _id: user._id },
    {
      rememberToken: token,
    }
  );
  res.header("auth-token", token).send(token);
});

export default router;
