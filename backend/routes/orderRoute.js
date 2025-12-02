import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder } from "../controllers/orderController.js";

const orderRoute = express.Router();

orderRoute.post("/placeorder", authMiddleware, placeOrder);


export default orderRoute;
