import express from "express";
import {
  createNewEducation,
  getEducationData,
  updateEducationData,
} from "../controllers/educationController.js";
import verifyToken from "../VerifyToken.js";

const router = express.Router();

router.patch("/:userId", verifyToken, createNewEducation);      // create new data
router.get("/:userId", getEducationData);                       // get data by user ID
router.patch("/update/:dataId", verifyToken, updateEducationData);     // update data
export default router;
