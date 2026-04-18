import { FaWhatsapp } from "react-icons/fa";
import { business } from "../constants/business";

const WhatsAppButton = () => {
  if (!business.whatsapp?.number) return null;

  const digits = business.whatsapp.number.replace(/\D/g, "");
  const text = encodeURIComponent(business.whatsapp.prefillMessage || "");
  const href = `https://wa.me/${digits}${text ? `?text=${text}` : ""}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50"
    >
      {/* Pulsing ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />

      {/* Button */}
      <span className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-105 transition">
        <FaWhatsapp className="w-7 h-7 md:w-8 md:h-8" />
      </span>

      {/* Tooltip */}
      <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition pointer-events-none hidden md:block">
        Chat with us on WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
