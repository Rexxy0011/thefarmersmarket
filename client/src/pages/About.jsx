import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuLeaf, LuShieldCheck, LuTruck, LuBadgeDollarSign } from "react-icons/lu";
import { assets } from "../assets/assets";

const slides = [
  { src: assets.slide_1_citrus, caption: "Fresh citrus" },
  { src: assets.slide_2_fruits, caption: "100% hygienic and farm fresh" },
  { src: assets.slide_3_vegetables, caption: "Fresh vegetables" },
  { src: assets.slide_4_spices, caption: "Local spices and fresh eggs" },
  { src: assets.slide_5_roots, caption: "Kitchen staples" },
].filter((s) => s.src);

const offerings = [
  {
    title: "Fresh Produce",
    description:
      "The widest range of fruits and vegetables in Ghana, local and imported.",
    image: assets.offering_1_produce,
  },
  {
    title: "Juices, Smoothies & Salads",
    description:
      "Pure fresh juices, smoothies, salads, nuts and seeds.",
    image: assets.offering_2_juices,
  },
  {
    title: "Butchery & In-House Grill",
    description:
      "Chicken, guinea fowl, beef, pork, goat, lamb and rabbit. Grilled in-house.",
    image: assets.offering_3_butchery,
  },
  {
    title: "Locally Processed Goods",
    description:
      "Spices, coconut oils and snacks in world-class packaging.",
    image: assets.offering_4_processed,
  },
];

const values = [
  {
    Icon: LuLeaf,
    title: "Farm Fresh",
    description:
      "We work directly with Ghanaian farmers and trusted importers so produce reaches our shelves at peak freshness.",
  },
  {
    Icon: LuShieldCheck,
    title: "Clean & Hygienic",
    description:
      "Every item is stored, prepped and displayed in a controlled environment built to protect what you eat.",
  },
  {
    Icon: LuTruck,
    title: "Consistent Supply",
    description:
      "Our integrated supply chain keeps staples stocked week after week, so your kitchen never runs short.",
  },
  {
    Icon: LuBadgeDollarSign,
    title: "Widest Range",
    description:
      "From everyday vegetables to specialty fruits and meats, our aisles carry what few other stores in Ghana do.",
  },
];

const About = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <div className="mt-8 md:mt-12">
      {/* Hero with slideshow background */}
      <section className="relative overflow-hidden rounded-3xl min-h-[500px] md:min-h-[620px] flex items-center">
        {/* Slides */}
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.src}
              alt={s.caption}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Uniform dark overlay */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Left-weighted gradient for extra readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        {/* Content card with frosted glass */}
        <div className="relative z-10 px-6 md:px-12 py-12 md:py-16 m-4 md:m-10 max-w-2xl bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-white font-semibold mb-4 bg-primary px-3 py-1 rounded-full">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            100% Hygienic and <span className="text-primary bg-white/95 px-2 rounded">Farm Fresh</span> Produce
          </h1>
          <p className="mt-6 text-base md:text-lg text-white leading-relaxed">
            Welcome to The Farmer's Market Limited, your quality food store.
            Healthy food, clean and hygienic environment, world-class service.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="px-7 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dull transition"
            >
              Shop now
            </Link>
            <a
              href="#story"
              className="px-7 py-3 rounded-full bg-white/10 backdrop-blur border border-white/40 text-white font-medium hover:bg-white hover:text-gray-900 transition"
            >
              Our story
            </a>
          </div>
        </div>

        {/* Prev / Next */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/90 backdrop-blur text-white hover:text-gray-800 text-xl flex items-center justify-center transition cursor-pointer"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/90 backdrop-blur text-white hover:text-gray-800 text-xl flex items-center justify-center transition cursor-pointer"
            >
              ›
            </button>
          </>
        )}

        {/* Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === current ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Story */}
      <section id="story" className="mt-20 md:mt-28 grid lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-2">
          <span className="text-xs uppercase tracking-wider text-primary font-semibold">
            Our Story
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3 text-gray-900">
            Your quality food store in Ghana
          </h2>
          <div className="w-16 h-0.5 bg-primary rounded-full mt-4" />
        </div>
        <div className="lg:col-span-3 space-y-5 text-gray-600 leading-relaxed">
          <p>
            We stock the widest range of fruits and vegetables in Ghana,
            sourced from both local production and imported produce.
          </p>
          <p>
            Beyond fresh produce, we offer pure juices, smoothies, salads,
            nuts and seeds. Our butchery carries chicken, guinea fowl, beef,
            pork, goat, lamb and rabbit, with an in-house grill on site.
          </p>
          <p>
            These are complemented by locally made processed agricultural
            produce: spices, coconut oils, snacks and more, all in world-class
            packaging.
          </p>
        </div>
      </section>

      {/* Offerings */}
      <section className="mt-20 md:mt-28">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-wider text-primary font-semibold">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3 text-gray-900">
            What we offer
          </h2>
          <div className="w-16 h-0.5 bg-primary rounded-full mt-4 mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {offerings.map((o) => (
            <div
              key={o.title}
              className="group rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
                <img
                  src={o.image}
                  alt={o.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-900">
                  {o.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {o.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mt-20 md:mt-28 bg-primary/5 rounded-3xl px-6 md:px-12 py-14">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-wider text-primary font-semibold">
            Why Shop With Us
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3 text-gray-900">
            Why shop with us
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-2xl p-6 text-center border border-gray-100"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <v.Icon className="w-6 h-6" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{v.title}</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer promise */}
      <section className="mt-20 md:mt-28 grid lg:grid-cols-2 gap-10 items-center">
        <div className="rounded-3xl overflow-hidden bg-gray-50 aspect-[4/3]">
          <img
            src={assets.about_store}
            alt="Our store"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-primary font-semibold">
            Our Promise
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3 text-gray-900">
            The customer is at the heart of everything we do
          </h2>
          <div className="w-16 h-0.5 bg-primary rounded-full mt-4" />
          <p className="mt-6 text-gray-600 leading-relaxed">
            We take the time to serve you well: clean aisles, fresh stock, and
            staff who know the products they sell. Every detail is meant to
            earn your next visit, not just today's purchase.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dull transition"
          >
            Start shopping
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Closing */}
      <section className="mt-20 md:mt-28 mb-16 text-center max-w-2xl mx-auto">
        <p className="text-gray-500 italic">
          Thank you for visiting our site.
        </p>
        <p className="mt-2 font-semibold text-gray-800">
          The Farmer's Market Limited
        </p>
      </section>
    </div>
  );
};

export default About;
