import express from "express";
import { createNewEducation } from "../controllers/educationController.js";
import verifyToken from "../VerifyToken.js";

const router = express.Router();

router.patch("/:userId", verifyToken, createNewEducation);
export default router;
