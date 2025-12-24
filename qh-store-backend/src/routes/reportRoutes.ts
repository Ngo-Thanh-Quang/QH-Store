import { Router } from "express";
import * as reportController from "../controllers/reportController";

const router = Router();

router.post("/by-week", reportController.getWeeklyRevenue);

export default router;