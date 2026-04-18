import { useState } from "react";
import { LuHeart, LuPlus } from "react-icons/lu";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const WishlistCard = ({ product }) => {
  const { currency, addToCart, navigate } = useAppContext();
  const [liked, setLiked] = useState(false);

  if (!product) return null;

  const discountPct =
    product.price && product.offerPrice
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0;

  return (
    <div
      onClick={() => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        scrollTo(0, 0);
      }}
      className="group bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition duration-300 cursor-pointer overflow-hidden"
    >
      {/* Image */}
      <div className="relative bg-gray-50 aspect-square overflow-hidden">
        {discountPct > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-primary text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
            -{discountPct}%
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked((l) => !l);
          }}
          aria-label="Toggle wishlist"
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center transition hover:scale-110 cursor-pointer ${
            liked ? "text-red-500" : "text-gray-400"
          }`}
        >
          <LuHeart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
        </button>
        <img
          src={product.image[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-gray-400 uppercase tracking-wide">
            {product.category}
          </p>
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                  className="w-3 h-3"
                />
              ))}
          </div>
        </div>
        <h3 className="mt-1.5 text-sm md:text-base font-medium text-gray-900 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg font-semibold text-gray-900">
            {currency}
            {product.offerPrice}
          </span>
          {discountPct > 0 && (
            <span className="text-xs text-gray-400 line-through">
              {currency}
              {product.price}
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product._id);
          }}
          disabled={!product.inStock}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-900 hover:bg-primary text-white text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <LuPlus className="w-4 h-4" />
          {product.inStock ? "Add to cart" : "Sold out"}
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
