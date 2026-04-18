import { useAppContext } from "../context/AppContext";
import GroceryTile from "../components/cardVariants/GroceryTile";
import MinimalEditorial from "../components/cardVariants/MinimalEditorial";
import ImageOverlay from "../components/cardVariants/ImageOverlay";
import WishlistCard from "../components/cardVariants/WishlistCard";

const VARIANTS = [
  {
    id: "grocery",
    name: "Grocery Tile",
    tag: "Instacart-style",
    blurb:
      "Soft image panel, floating + button, stepper replaces button when in cart. Familiar grocery UX.",
    Component: GroceryTile,
  },
  {
    id: "minimal",
    name: "Minimal Editorial",
    tag: "Aesop / Everlane",
    blurb:
      "No card borders, centered image, tiny centered type. Hover reveals a full-width dark \"Add to cart\" bar.",
    Component: MinimalEditorial,
  },
  {
    id: "overlay",
    name: "Image Overlay",
    tag: "Uniqlo / Glossier",
    blurb:
      "Image fills the card. Gradient + name/price in white at the bottom. Hover reveals a centered pill button.",
    Component: ImageOverlay,
  },
  {
    id: "wishlist",
    name: "Wishlist Card",
    tag: "Modern e-commerce default",
    blurb:
      "Rounded bordered card with wishlist heart, rating, full-width add-to-cart button below price.",
    Component: WishlistCard,
  },
];

const CardSamples = () => {
  const { products } = useAppContext();
  const sample = products.filter((p) => p.inStock).slice(0, 4);

  return (
    <div className="mt-8 md:mt-12">
      {/* Header */}
      <section className="rounded-3xl bg-primary/5 px-6 md:px-12 py-10 md:py-14">
        <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
          Preview
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900">
          Product card styles
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl">
          All four variants rendered against the same products. Hover each card
          to see its interaction. Tell me which direction you want and I&apos;ll
          make it the default.
        </p>
      </section>

      {/* Each variant in its own section */}
      <div className="mt-12 space-y-16">
        {VARIANTS.map((v) => (
          <section key={v.id}>
            <div className="flex items-end justify-between gap-6 mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold">
                  {v.tag}
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-gray-900">
                  {v.name}
                </h2>
                <p className="mt-2 text-sm text-gray-600 max-w-xl">
                  {v.blurb}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {sample.map((p) => {
                const Card = v.Component;
                return <Card key={p._id} product={p} />;
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mb-20" />
    </div>
  );
};

export default CardSamples;
