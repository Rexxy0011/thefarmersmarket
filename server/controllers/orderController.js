import crypto from "crypto";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

import User from "../models/User.js";
import axios from "axios";

// ✅ Place Order (Cash on Delivery)
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({
          success: false,
          message: `Product ${item.product} not found`,
        });
      }
      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
      status: "Order Placed",
      isPaid: false,
    });

    await User.findByIdAndUpdate(userId, { cartItems: {} });

    return res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ✅ Get Orders for Logged-In User
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get All Orders (Admin/Seller)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Place Order (Paystack) : /api/order/paystack
export const placeOrderPaystack = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({
          success: false,
          message: `Product ${item.product} not found`,
        });
      }
      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "online",
      isPaid: false,
    });

    const reference = `tfm_${crypto.randomUUID()}`;
    const callbackUrl = `${process.env.FRONTEND_URL}/payment-success`;

    // TEMP: using NGN until merchant account is enabled for GHS.
    // Paystack expects the amount in the currency's minor unit (kobo for NGN).
    const payload = {
      email: user.email,
      amount: Math.round(amount * 100),
      currency: "NGN",
      reference,
      callback_url: callbackUrl,
      metadata: {
        orderId: order._id.toString(),
        userId: String(userId),
      },
    };

    const paystackRes = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json({
      success: true,
      authorization_url: paystackRes.data.data.authorization_url,
    });
  } catch (error) {
    console.error(
      "Paystack init failed:",
      error.response?.data || error.message
    );
    return res.json({
      success: false,
      message: error.response?.data?.message || error.message,
    });
  }
};

// Paystack Webhook : /api/order/paystack-webhook
export const paystackWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-paystack-signature"];
    const secret = process.env.PAYSTACK_SECRET_KEY;

    if (!signature || !secret) {
      return res.status(401).json({ success: false, message: "Missing signature" });
    }

    const expected = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (expected !== signature) {
      return res.status(401).json({ success: false, message: "Invalid signature" });
    }

    const { event, data } = req.body || {};

    if (event === "charge.success" && data?.status === "success") {
      const orderId = data.metadata?.orderId;
      if (orderId) {
        const order = await Order.findById(orderId);
        if (order && !order.isPaid) {
          order.isPaid = true;
          await order.save();
          if (order.userId) {
            await User.findByIdAndUpdate(order.userId, { cartItems: {} });
          }
        }
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Paystack Payment : /api/order/verify-paystack
export const verifyPaystackPayment = async (req, res) => {
  try {
    const { reference } = req.body;
    const authUserId = req.userId;

    if (!reference) {
      return res.json({ success: false, message: "Missing reference" });
    }

    const verifyRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = verifyRes.data.data;

    if (data.status !== "success") {
      return res.json({
        success: false,
        message: `Payment ${data.status}`,
      });
    }

    const { orderId, userId } = data.metadata || {};

    if (String(userId) !== String(authUserId)) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    if (String(order.userId) !== String(authUserId)) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    if (order.isPaid) {
      return res.json({ success: true, message: "Payment already verified" });
    }

    order.isPaid = true;
    await order.save();

    await User.findByIdAndUpdate(authUserId, { cartItems: {} });

    return res.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
