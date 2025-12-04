// backend/controllers/orderController.js
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173"; // bỏ khoảng trắng thừa

  try {
    console.log("🔥 placeOrder body:", req.body);

    const { items, amount, address, userId } = req.body;

    // 1. Check dữ liệu đầu vào
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Missing userId in request (check authMiddleware).",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items is empty.",
      });
    }

    // 2. Tạo đơn hàng trong MongoDB
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();

    // 3. Clear giỏ hàng của user
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // 4. Tạo line_items cho Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80, // ₹ theo tutorial
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    // 5. Tạo session Stripe
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    return res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("❌ Error in placeOrder:", error);
    return res.status(500).json({ success: false, message: "Error" });
  }
};

export { placeOrder };
