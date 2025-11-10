import express from "express";
import {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  getSavedPins,
  savePinForUser,
  followUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/:username", getUser);
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/:id/saved", getSavedPins);
router.post("/:id/save/:pinId", verifyToken, savePinForUser);
router.post("/auth/logout", logoutUser);
router.post("/follow/:username", verifyToken, followUser);

export default router;
