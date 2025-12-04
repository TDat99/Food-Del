// backend/routes/orderRoute.js
import express from "express";
import { placeOrder } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

// POST /api/order/place
orderRouter.post("/place", authMiddleware, placeOrder);

export default orderRouter;
