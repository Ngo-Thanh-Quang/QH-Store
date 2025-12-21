import { Router } from "express";
import { listFaq, matchFaq } from "../controllers/faq";

const router = Router();

router.get("/faq", listFaq);
router.post("/faq-match", matchFaq);

export default router;
