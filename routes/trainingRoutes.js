import express from "express";
import {
  createTrainingData,
  deleteTrainingById,
  getTrainingById,
  updateTrainingById,
} from "../controllers/trainingController.js";
import verifyToken from "../VerifyToken.js";
const router = express.Router();

router.patch("/:userId", verifyToken, createTrainingData);
router.get("/:userId", getTrainingById);
router.patch("/update/:dataId", verifyToken, updateTrainingById);
router.delete("/delete/:dataId", verifyToken, deleteTrainingById);

export default router;
