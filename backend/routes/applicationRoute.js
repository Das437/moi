import express from "express"
import { createApllication, deleteApplication, getAllApplication, getApplication, getApplicationPost, updateAdminPrint, updateApllication, updateApllicationStatus } from "../controllers/applicationController.js";
import isAuthorized from "../middleware/isAuthorized.js";

const router = express.Router();

router.post("/create", createApllication);
router.delete("/delete/:id", deleteApplication);
router.put("/update/status", updateApllicationStatus);
router.put("/update/:id", updateApllication);
router.put("/print", updateAdminPrint);
router.get("/get/:id", getApplication);
router.post("/get/", getApplicationPost);
router.get("/getall", isAuthorized, getAllApplication);

export default router