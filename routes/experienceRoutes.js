import express from "express";
import {
  createNewExperience,
  deleteExperienceData,
  getExperienceData,
  updateExperienceData,
} from "../controllers/experienceController.js";
import verifyToken from "../VerifyToken.js";

const router = express.Router();

router.patch("/:id", verifyToken, createNewExperience);
router.get("/:id", getExperienceData);
router.patch("/update/:dataId", verifyToken, updateExperienceData);
router.delete("/delete/:dataId", verifyToken, deleteExperienceData);

export default router;
