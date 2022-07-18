import React from "react";

//import { decrement, increment } from "./redux/slices/counterSlice";
import { Header } from "./components";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import FullPizza from "./pages/FullPizza";

import Cart from "./pages/Cart";

import { Routes, Route } from "react-router-dom";




export const SearchContext = React.createContext();
function App() {
  const [_Search, _setSearch] = React.useState("");
  
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ _Search, _setSearch }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
