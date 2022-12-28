import express from "express";
import {
  createNewExperience,
  getExperienceData,
  updateExperienceData,
} from "../controllers/experienceController.js";
import verifyToken from "../VerifyToken.js";

const router = express.Router();

router.patch("/:id", verifyToken, createNewExperience);
router.get("/:id", getExperienceData);
router.patch("/update/:dataId", verifyToken, updateExperienceData);

export default router;
