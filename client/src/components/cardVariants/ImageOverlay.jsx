import { LuPlus } from "react-icons/lu";
import { useAppContext } from "../../context/AppContext";

const ImageOverlay = ({ product }) => {
  const { currency, addToCart, navigate } = useAppContext();

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
      className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer"
    >
      {/* Full-bleed image */}
      <img
        src={product.image[0]}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-110 transition duration-500"
      />

      {/* Top badges */}
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

      {/* Bottom gradient + info */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
        <p className="text-[11px] uppercase tracking-wider text-white/70">
          {product.category}
        </p>
        <h3 className="text-white font-medium text-sm md:text-base line-clamp-1">
          {product.name}
        </h3>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-white font-semibold text-lg">
            {currency}
            {product.offerPrice}
          </span>
          {discountPct > 0 && (
            <span className="text-white/60 text-xs line-through">
              {currency}
              {product.price}
            </span>
          )}
        </div>
      </div>

      {/* Center reveal button */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"
      >
        <button
          onClick={() => addToCart(product._id)}
          disabled={!product.inStock}
          className="pointer-events-auto inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full font-medium text-sm shadow-lg hover:bg-primary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <LuPlus className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ImageOverlay;
