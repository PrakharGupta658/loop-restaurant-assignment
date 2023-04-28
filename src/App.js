import React from "react";
import LogIn from "./Component/LogIn";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import "./App.css";
import { CartProvider } from "react-use-cart";
function App() {
  return (
    <CartProvider>
      <Routes>
        <Route exact path="/" element={<LogIn />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
