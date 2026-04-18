import "dotenv/config";
import mongoose from "mongoose";
import Product from "../models/Product.js";

const KG_CATEGORIES = ["Vegetables", "Fruits", "Grains"];

const run = async () => {
  await mongoose.connect(`${process.env.MONGODB_URI}/molocart`);

  const result = await Product.updateMany(
    {
      category: { $in: KG_CATEGORIES },
      $or: [{ unit: { $exists: false } }, { unit: "piece" }],
    },
    { $set: { unit: "kg" } }
  );

  console.log(
    `Matched ${result.matchedCount} product(s), updated ${result.modifiedCount} to unit "kg".`
  );

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
