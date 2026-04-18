import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
      <div className="flex justify-center mt-10">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full border border-gray-300 text-gray-700 font-medium hover:border-gray-800 hover:text-gray-900 transition"
        >
          More products
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
};

export default BestSeller;
