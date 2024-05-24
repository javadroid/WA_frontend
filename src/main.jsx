
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./utils/redux/store.js";
import { Provider } from "react-redux";
import { global } from 'global';

if (!window.global) {
  window.global = global;
}
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);
