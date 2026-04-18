import "dotenv/config";
import mongoose from "mongoose";
import Product from "../models/Product.js";

// Realistic GHS prices for a Tema/Accra grocery shop, ~early 2026.
// `price` is the slashed-out reference price; `offerPrice` is what the customer pays.
const PRICES = [
  { match: /potato/i, price: 22, offerPrice: 18 },
  { match: /banana/i, price: 15, offerPrice: 12 },
  { match: /apple/i, price: 35, offerPrice: 28 },
  { match: /bread/i, price: 15, offerPrice: 12 },
  { match: /tomato/i, price: 25, offerPrice: 20 },
  { match: /drink/i, price: 10, offerPrice: 7 },
];

const run = async () => {
  await mongoose.connect(`${process.env.MONGODB_URI}/molocart`);
  const products = await Product.find({});

  let updated = 0;
  for (const p of products) {
    const rule = PRICES.find((r) => r.match.test(p.name));
    if (!rule) continue;
    p.price = rule.price;
    p.offerPrice = rule.offerPrice;
    await p.save();
    updated += 1;
    console.log(`✓ ${p.name}: ₵${rule.price} (offer ₵${rule.offerPrice})`);
  }

  console.log(`\nUpdated ${updated} product(s).`);
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
