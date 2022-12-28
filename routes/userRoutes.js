import express from "express";
import { createNewUser, getUserById } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createNewUser);
router.get("/:id", getUserById);

export default router;
