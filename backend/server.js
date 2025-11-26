import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config"; // ✅ đúng cú pháp dotenv ES module

// App config
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // khi dev frontend
      "https://<ten-frontend-cua-ban>.vercel.app" // TODO: thay bằng domain FE thật trên Vercel
    ],
    credentials: true,
  })
);

// db connection
connectDB();

// Static folder cho ảnh upload (demo/đồ án ok)
app.use("/images", express.static("uploads"));

// API endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// ✅ DÙNG PORT DO RENDER CẤP
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
