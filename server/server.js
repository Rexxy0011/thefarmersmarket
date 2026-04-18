import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import contactRouter from "./routes/contactRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// =============================
// CORS CONFIG (EXPRESS v5 SAFE)
// =============================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Seller-Token"],
  })
);

// Handle OPTIONS for ALL routes (Express v5)
app.options(/.*/, cors());

// =============================
// JSON + Cookies
// =============================
app.use(express.json());
app.use(cookieParser());

// =============================
// Connect DB & Cloudinary
// =============================
await connectDB();
await connectCloudinary();

// =============================
// Test Route
// =============================
app.get("/", (req, res) => res.send("API is working!"));

// =============================
// Main Routes
// =============================
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/contact", contactRouter);

// =============================
// Start Server
// =============================
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(
    `Paystack key loaded: ${process.env.PAYSTACK_SECRET_KEY?.slice(0, 12) || "MISSING"}`
  );
});
