import { Router } from "express";
import {
  checkSeverity,
  listSeverityKeywords,
} from "../controllers/severity";

const router = Router();

router.get("/severity-keywords", listSeverityKeywords);
router.post("/severity-check", checkSeverity);

export default router;
