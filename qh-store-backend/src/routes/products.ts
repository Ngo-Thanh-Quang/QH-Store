import { Router } from "express";
import { listProducts } from "../controllers/products";

const router = Router();

router.get("/products", listProducts);

export default router;
