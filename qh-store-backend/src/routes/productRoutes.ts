import { Router } from "express";
import * as productController from "../controllers/productController";

const router = Router();

router.patch("/:id/update-stock", productController.updateStock);
router.get('/:id', productController.getProductById);

export default router;