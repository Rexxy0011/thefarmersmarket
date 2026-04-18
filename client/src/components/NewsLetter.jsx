import { useState } from "react";
import toast from "react-hot-toast";
import { business } from "../constants/business";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    if (!business.web3formsKey) {
      toast.error("Subscription is not configured yet. Try again soon.");
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
          from_name: "The Farmer's Market Newsletter",
          subject: "New newsletter subscription",
          email,
          message: `New newsletter subscriber: ${email}`,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        toast.success("Subscribed! Thanks for joining.");
        setEmail("");
      } else {
        toast.error(data.message || "Could not subscribe. Please try again.");
      }
    } catch (err) {
      toast.error(err.message || "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 mt-24 pb-14">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Deal!</h1>
      <p className="md:text-lg text-gray-500/70 pb-8">
        Subscribe to get the latest offers, new in stock, and exclusive
        discounts
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12"
      >
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email id"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};
export default NewsLetter;
