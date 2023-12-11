import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductLayout from "./layout/productLayout";
import ProductCreateLayout from "./layout/productCreateLayout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/product" element={<ProductLayout/>} />
        <Route path="/product/add" element={<ProductCreateLayout/>} />
      </Routes>
    </Router>
  );
};

export default App;
