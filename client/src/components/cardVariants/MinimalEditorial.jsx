import { useAppContext } from "../../context/AppContext";

const MinimalEditorial = ({ product }) => {
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
      className="group relative cursor-pointer"
    >
      {/* Image — no bg panel, just whitespace */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-500"
        />

        {/* Reveal-on-hover add bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition duration-300"
        >
          <button
            onClick={() => addToCart(product._id)}
            disabled={!product.inStock}
            className="w-full py-3 bg-gray-900 hover:bg-primary text-white text-xs uppercase tracking-widest font-medium transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {product.inStock ? "Add to cart" : "Sold out"}
          </button>
        </div>
      </div>

      {/* Info — tight, serif-ish weight */}
      <div className="mt-3 text-center">
        <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em]">
          {product.category}
        </p>
        <h3 className="mt-1 text-sm text-gray-900 line-clamp-1">
          {product.name}
        </h3>
        <div className="mt-1 flex items-baseline justify-center gap-2">
          <span className="text-sm text-gray-900">
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
      </div>
    </div>
  );
};

export default MinimalEditorial;
