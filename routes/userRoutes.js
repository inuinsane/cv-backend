import express from "express";
import { createNewUser, getUserById, updateUserData } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createNewUser); // create
router.get("/:id", getUserById); // read
router.patch("/:id", updateUserData); // update

export default router;
