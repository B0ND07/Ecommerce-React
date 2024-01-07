import React from "react";
import ReactDOM from "react-dom";
import Ecommerce from "./Ecommerce.jsx";
import "../index.css";
import ShopContextProvider from "./Components/Context/ShopContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShopContextProvider>
    <Ecommerce />
    </ShopContextProvider>
  </React.StrictMode>
);
