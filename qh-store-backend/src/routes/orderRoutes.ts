import { Router } from "express";
import * as orderController from "../controllers/orderController";

const router = Router();

router.post("/create", orderController.createOrder);
// router.get("/by-day", orderController.getOrdersByDay);

export default router;