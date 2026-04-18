import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart, updateCartItem, cartItems } =
    useAppContext();
  const { id } = useParams();

  const product = products.find((item) => item._id === id);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (product && products.length > 0) {
      const related = products
        .filter((p) => p.category === product.category && p._id !== product._id)
        .slice(0, 5);
      setRelatedProducts(related);
    }
  }, [products, product]);

  useEffect(() => {
    if (product?.image?.length > 0) {
      setThumbnail(product.image[0]);
    }
    setQuantity(1);
    setActiveTab("description");
  }, [product]);

  const discountPct = useMemo(() => {
    if (!product) return 0;
    return Math.round(((product.price - product.offerPrice) / product.price) * 100);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  const inCart = cartItems[product._id] || 0;

  return (
    <div className="mt-8 md:mt-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500">
        <Link to="/" className="hover:text-primary transition">Home</Link>
        <span>›</span>
        <Link to="/products" className="hover:text-primary transition">Products</Link>
        <span>›</span>
        <Link
          to={`/products/${product.category.toLowerCase()}`}
          className="hover:text-primary transition"
        >
          {product.category}
        </Link>
        <span>›</span>
        <span className="text-gray-800 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-6">
        {/* Gallery */}
        <div className="flex flex-col-reverse sm:flex-row gap-4 lg:sticky lg:top-24 lg:self-start">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible no-scrollbar">
            {product.image.map((image, index) => (
              <button
                key={index}
                onClick={() => setThumbnail(image)}
                className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                  thumbnail === image
                    ? "border-primary"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img
                  src={image}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div
            className="relative flex-1 rounded-2xl overflow-hidden bg-gray-50 aspect-square group cursor-zoom-in"
            onClick={() => setZoom((z) => !z)}
          >
            {discountPct > 0 && (
              <span className="absolute top-4 left-4 z-10 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                -{discountPct}%
              </span>
            )}
            <span
              className={`absolute top-4 right-4 z-10 text-xs font-medium px-3 py-1.5 rounded-full ${
                product.inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
            <img
              src={thumbnail}
              alt={product.name}
              className={`w-full h-full object-contain p-6 transition-transform duration-300 ${
                zoom ? "scale-150" : "group-hover:scale-105"
              }`}
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-primary font-semibold">
            {product.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold mt-2 text-gray-900">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-0.5">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt=""
                    className="w-4 h-4"
                  />
                ))}
            </div>
            <span className="text-sm text-gray-500">4.0 · 128 reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mt-6">
            <span className="text-4xl font-bold text-gray-900">
              {currency}
              {product.offerPrice}
              {product.unit && product.unit !== "piece" && (
                <span className="text-base text-gray-500 font-medium">
                  {" "}
                  / {product.unit}
                </span>
              )}
            </span>
            <span className="text-lg text-gray-400 line-through mb-1">
              {currency}
              {product.price}
            </span>
            {discountPct > 0 && (
              <span className="text-sm font-medium text-primary mb-1.5">
                Save {currency}
                {product.price - product.offerPrice}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>

          {/* Tabs */}
          <div className="mt-8 border-b border-gray-200">
            <div className="flex gap-6">
              {[
                { id: "description", label: "Description" },
                { id: "highlights", label: "Highlights" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-sm font-medium transition relative ${
                    activeTab === tab.id
                      ? "text-primary"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 text-sm text-gray-600 leading-relaxed min-h-[96px]">
            {activeTab === "description" ? (
              <p>
                {product.description[0]}. Sourced fresh and delivered to your
                doorstep, a staple from our local farmers' network, selected
                for quality and freshness.
              </p>
            ) : (
              <ul className="space-y-2">
                {product.description.map((desc, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quantity + Cart actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-3 text-lg font-medium text-gray-600 hover:bg-gray-50 transition cursor-pointer"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="px-5 py-3 font-medium min-w-[3rem] text-center">
                {quantity}
                {product.unit && product.unit !== "piece" && (
                  <span className="text-sm text-gray-500 ml-1">
                    {product.unit === "kg"
                      ? "kg"
                      : quantity > 1
                      ? `${product.unit}s`
                      : product.unit}
                  </span>
                )}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-3 text-lg font-medium text-gray-600 hover:bg-gray-50 transition cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                if (inCart) {
                  updateCartItem(product._id, inCart + quantity);
                } else {
                  for (let i = 0; i < quantity; i++) addToCart(product._id);
                }
              }}
              disabled={!product.inStock}
              className="flex-1 py-3.5 px-6 rounded-lg font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                if (inCart) {
                  updateCartItem(product._id, inCart + quantity);
                } else {
                  for (let i = 0; i < quantity; i++) addToCart(product._id);
                }
                navigate("/cart");
              }}
              disabled={!product.inStock}
              className="flex-1 py-3.5 px-6 rounded-lg font-medium bg-primary text-white hover:bg-primary-dull transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Buy Now
            </button>
          </div>

          {inCart > 0 && (
            <p className="text-xs text-gray-500 mt-3">
              {inCart} already in your cart
            </p>
          )}

          {/* Trust strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 pt-6 border-t border-gray-100">
            {[
              { icon: assets.delivery_truck_icon, label: "Fast delivery" },
              { icon: assets.leaf_icon, label: "Farm fresh" },
              { icon: assets.coin_icon, label: "Best prices" },
              { icon: assets.trust_icon, label: "Trusted brand" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2 text-xs text-gray-600"
              >
                <img src={f.icon} alt="" className="w-5 h-5" />
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">You might also like</h2>
              <div className="w-16 h-0.5 bg-primary rounded-full mt-2"></div>
            </div>
            <button
              onClick={() => {
                navigate("/products");
                scrollTo(0, 0);
              }}
              className="hidden md:block text-sm text-primary hover:underline cursor-pointer"
            >
              View all →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5">
            {relatedProducts.map((p, index) => (
              <ProductCard key={index} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
