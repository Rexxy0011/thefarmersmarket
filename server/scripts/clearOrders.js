import "dotenv/config";
import mongoose from "mongoose";
import Order from "../models/Order.js";

const run = async () => {
  await mongoose.connect(`${process.env.MONGODB_URI}/molocart`);
  const result = await Order.deleteMany({});
  console.log(`Deleted ${result.deletedCount} order(s).`);
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
