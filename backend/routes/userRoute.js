import express from "express"
import { getUserProfile, loginUser, registerUser } from "../controllers/authController.js";
import isAuthorized from "../middleware/isAuthorized.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/profile", isAuthorized, getUserProfile);
router.post("/register", registerUser);

export default router