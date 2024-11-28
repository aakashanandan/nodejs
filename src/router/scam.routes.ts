
import { Router } from "express";
import { reportScam, getScamList, checkScamStatus } from "../controllers/scamController";

const router = Router();

router.post("/report-scam", reportScam);
router.get("/scam-list", getScamList);
router.get("/scam-status", checkScamStatus);

export default router;