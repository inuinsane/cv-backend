import express from "express";
import {
  createSocialMedia,
  getSocialMediaData,
} from "../controllers/socialMediaController.js";
import verifyToken from "../VerifyToken.js";
const router = express.Router();

router.patch("/create/:userId", verifyToken, createSocialMedia);
router.get("/:userId", getSocialMediaData);
router.patch("/update/:userId", verifyToken, createSocialMedia);

export default router;
