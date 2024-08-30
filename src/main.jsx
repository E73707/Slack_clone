import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import fbconfig from "./fbconfig.js";
import { initializeApp } from "firebase/app";
import store from "../app/index.js";

const app = initializeApp(fbconfig);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
