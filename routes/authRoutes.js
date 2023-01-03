import express from "express";
import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import JWT from "jsonwebtoken";
import e from "express";

const router = express.Router();

// Login
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
  user.rememberToken = token;
  await user.save();

  res.header("auth-token", token).json({
    status: "success",
    message: "Login berhasil",
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    token: user.rememberToken,
  });
});

// Logout
router.put("/logout", async (req, res) => {
  const authHeader = req.headers.authorization;

  JWT.sign(authHeader, "", { expiresIn: 1 }, async (logout, err) => {
    if (logout) {
      const user = await User.findOneAndUpdate({ rememberToken: authHeader });
      if (user) {
        user.rememberToken = "";
        await user.save();
        res.status(201).send({ status: "success", message: "Logout berhasil" });
        // res.send(user);
      } else {
        // res.send("tidak ada user");
        res.status(404).send({ status: "error", message: "Logout gagal" });
      }
    }

    // else {
    //   res.send({ status: "success", message: err });
    // }
  });
});

export default router;
