import express from "express";
import {
  createSocialMedia,
  deleteSocialMedia,
  getSocialMediaData,
} from "../controllers/socialMediaController.js";
import verifyToken from "../VerifyToken.js";
const router = express.Router();

router.patch("/create/:userId", verifyToken, createSocialMedia);
router.get("/:userId", getSocialMediaData);
router.patch("/update/:userId", verifyToken, createSocialMedia);
router.delete("/delete/:userId", verifyToken, deleteSocialMedia);

export default router;
