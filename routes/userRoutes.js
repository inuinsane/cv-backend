import express from "express";
import {
  createNewUser,
  getUserById,
  updateUserData,
} from "../controllers/userController.js";
import verifyToken from "../VerifyToken.js";

const router = express.Router();

router.post("/", createNewUser); // create
router.get("/:id", getUserById); // read
router.patch("/:id", verifyToken, updateUserData); // update

export default router;
