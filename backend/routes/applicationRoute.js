import express from "express"
import { createApllication, getAllApplication, getApplication, getApplicationPost, updateApllication } from "../controllers/applicationController.js";
import isAuthorized from "../middleware/isAuthorized.js";

const router = express.Router();

router.post("/create", createApllication);
router.put("/update", updateApllication);
router.get("/get/:id", getApplication);
router.post("/get/", getApplicationPost);
router.get("/getall", isAuthorized, getAllApplication);

export default router