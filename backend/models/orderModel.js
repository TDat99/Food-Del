import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },               // đổi products -> items
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now },              // dùng Date.now, không ngoặc
  payment: { type: Boolean, default: false, required: true } // có default
});

const orderModel = mongoose.models.orders || mongoose.model("orders", orderSchema);

export default orderModel;
