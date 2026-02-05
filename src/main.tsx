import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import "./index.css";

const startApp = () => {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("Could not find the root element. Please check that index.html has a #root element.");
  }

  const root = createRoot(rootElement);
  root.render(<App />);
};

startApp();
