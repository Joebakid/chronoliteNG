import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async"; // Import HelmetProvider
import App from "./App";
import { Btn } from "./components/Btn"; // Reusable button component
import "./index.css"; // Global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* Pass Btn component to App as a prop for reusability */}
      <App Btn={Btn} />
    </HelmetProvider>
  </React.StrictMode>
);
