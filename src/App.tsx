import React from "react";

//import { decrement, increment } from "./redux/slices/counterSlice";
import { Header } from "./components";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import FullPizza from "./pages/FullPizza";

import Cart from "./pages/Cart";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
