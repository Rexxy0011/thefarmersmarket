import { createRoot } from "react-dom/client";
import "./index.css";
import "lenis/dist/lenis.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { AppContextProvider } from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <ReactLenis
        root
        options={{
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        }}
      >
        <App />
      </ReactLenis>
    </AppContextProvider>
  </BrowserRouter>
);
