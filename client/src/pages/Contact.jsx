import { useState } from "react";
import toast from "react-hot-toast";
import {
  LuMapPin,
  LuPhone,
  LuMail,
  LuClock,
  LuStore,
  LuInstagram,
  LuFacebook,
} from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import { business } from "../constants/business";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    if (!business.web3formsKey) {
      toast.error("Form is not configured yet. Try again soon.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: business.web3formsKey,
          from_name: "The Farmer's Market Website",
          subject: form.subject || `New contact from ${form.name}`,
          ...form,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        toast.success("Message sent. We'll be in touch.");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "Could not send message.");
      }
    } catch (err) {
      toast.error(err.message || "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const addressLines = [
    business.headOffice.address.line1,
    business.headOffice.address.line2,
    `${business.headOffice.address.city}, ${business.headOffice.address.country}`,
  ];

  return (
    <div className="mt-8 md:mt-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-primary/5 px-6 md:px-16 py-14 md:py-20">
        <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
          Contact Us
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight max-w-3xl">
          Get in <span className="text-primary">touch</span>
        </h1>
        <p className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl">
          Whether it's a question about our stock, an order enquiry, or just a
          kind word, we're glad to hear from you.
        </p>
      </section>

      {/* Info cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        <a
          href={business.mapsLink}
          target="_blank"
          rel="noreferrer"
          className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <LuMapPin className="w-6 h-6" />
          </div>
          <h3 className="mt-4 font-semibold text-gray-900">
            {business.headOffice.label}
          </h3>
          <div className="text-sm text-gray-600 mt-2 leading-relaxed">
            {addressLines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </a>

        <a
          href={`tel:${business.retailManager.phone.replace(/\s+/g, "")}`}
          className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <LuPhone className="w-6 h-6" />
          </div>
          <h3 className="mt-4 font-semibold text-gray-900">Retail Manager</h3>
          <p className="text-sm text-gray-600 mt-2">
            {business.retailManager.phone}
          </p>
          <p className="text-xs text-gray-400 mt-1">Tap to call</p>
        </a>

        <a
          href={business.email ? `mailto:${business.email}` : undefined}
          className={`bg-white rounded-2xl p-6 border border-gray-100 transition ${
            business.email ? "hover:shadow-md" : "opacity-60 cursor-default"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <LuMail className="w-6 h-6" />
          </div>
          <h3 className="mt-4 font-semibold text-gray-900">Email</h3>
          <p className="text-sm text-gray-600 mt-2 break-all">
            {business.email || "Coming soon"}
          </p>
        </a>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <LuClock className="w-6 h-6" />
          </div>
          <h3 className="mt-4 font-semibold text-gray-900">Opening hours</h3>
          <ul className="text-sm text-gray-600 mt-2 space-y-1">
            {business.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-3">
                <span>{h.days}</span>
                <span className="text-gray-800">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Branches */}
      <section className="mt-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-primary font-semibold">
              Our Shops
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold mt-2 text-gray-900">
              Five locations across Accra & Tema
            </h2>
            <div className="w-16 h-0.5 bg-primary rounded-full mt-3" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {business.branches.map((b) => (
            <a
              key={b.name}
              href={`tel:${b.phone.replace(/\s+/g, "")}`}
              className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-primary hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <LuStore className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900">{b.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mt-3 group-hover:text-primary transition">
                {b.phone}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Map + Form */}
      <section className="mt-16 grid lg:grid-cols-5 gap-6">
        {/* Map */}
        <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-gray-100 min-h-[360px] lg:min-h-[560px] bg-gray-100">
          {business.mapEmbedUrl ? (
            <iframe
              title="Store location"
              src={business.mapEmbedUrl}
              className="w-full h-full min-h-[360px] lg:min-h-[560px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              Map coming soon
            </div>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 md:p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900">
            Send us a message
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            We typically respond within one business day.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-600">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2.5 border border-gray-500/30 rounded outline-none focus:border-primary transition"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2.5 border border-gray-500/30 rounded outline-none focus:border-primary transition"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">
                Phone <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2.5 border border-gray-500/30 rounded outline-none focus:border-primary transition"
                placeholder="+233 ..."
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">
                Subject <span className="text-gray-400">(optional)</span>
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2.5 border border-gray-500/30 rounded outline-none focus:border-primary transition"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="mt-1 w-full px-3 py-2.5 border border-gray-500/30 rounded outline-none focus:border-primary transition resize-y"
                placeholder="Tell us a little about it..."
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dull transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {submitting ? "Sending..." : "Send message"}
          </button>
        </form>
      </section>

      {/* Socials */}
      {(business.socials.instagram ||
        business.socials.facebook ||
        business.socials.whatsapp) && (
        <section className="mt-16 mb-16 text-center">
          <p className="text-sm text-gray-500">Follow us</p>
          <div className="mt-3 flex items-center justify-center gap-3">
            {business.socials.instagram && (
              <a
                href={business.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition"
              >
                <LuInstagram className="w-5 h-5" />
              </a>
            )}
            {business.socials.facebook && (
              <a
                href={business.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition"
              >
                <LuFacebook className="w-5 h-5" />
              </a>
            )}
            {business.socials.whatsapp && (
              <a
                href={business.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            )}
          </div>
        </section>
      )}

      <div className="mb-16" />
    </div>
  );
};

export default Contact;
