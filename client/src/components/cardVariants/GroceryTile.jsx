import { LuPlus, LuMinus } from "react-icons/lu";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const GroceryTile = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  if (!product) return null;

  const qty = cartItems[product._id] || 0;
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
      className="group bg-white rounded-2xl p-3 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-gray-300 transition duration-300 cursor-pointer"
    >
      <div className="relative bg-gray-50 rounded-xl aspect-square overflow-hidden">
        {discountPct > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-primary text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
            -{discountPct}%
          </span>
        )}
        {!product.inStock && (
          <span className="absolute top-3 right-3 z-10 bg-gray-900/80 text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
            Sold out
          </span>
        )}
        <img
          src={product.image[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-105 transition duration-300"
        />
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-3 right-3 z-10"
        >
          {qty === 0 ? (
            <button
              onClick={() => addToCart(product._id)}
              disabled={!product.inStock}
              aria-label="Add to cart"
              className="w-11 h-11 rounded-full bg-primary hover:bg-primary-dull text-white shadow-md hover:shadow-lg flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <LuPlus className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center bg-primary text-white rounded-full shadow-md overflow-hidden">
              <button
                onClick={() => removeFromCart(product._id)}
                aria-label="Decrease"
                className="w-9 h-9 flex items-center justify-center hover:bg-primary-dull transition cursor-pointer"
              >
                <LuMinus className="w-4 h-4" />
              </button>
              <span className="w-7 text-center font-medium text-sm tabular-nums">
                {qty}
              </span>
              <button
                onClick={() => addToCart(product._id)}
                aria-label="Increase"
                className="w-9 h-9 flex items-center justify-center hover:bg-primary-dull transition cursor-pointer"
              >
                <LuPlus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-1 pt-3 pb-1">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {product.category}
        </p>
        <h3 className="mt-1 text-sm md:text-base font-medium text-gray-900 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mt-1">
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
          <span className="text-xs text-gray-400">(4)</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg md:text-xl font-semibold text-gray-900">
            {currency}
            {product.offerPrice}
            {product.unit && product.unit !== "piece" && (
              <span className="text-xs text-gray-500 font-normal">
                {" "}
                / {product.unit}
              </span>
            )}
          </span>
          {discountPct > 0 && (
            <span className="text-xs text-gray-400 line-through">
              {currency}
              {product.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroceryTile;
