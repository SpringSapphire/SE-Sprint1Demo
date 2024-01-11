import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductLayout from "./layout/productLayout/productLayout";
import ProductCreateLayout from "./layout/productLayout/productCreateLayout";
import ProductEditLayout from "./layout/productLayout/productEditLayout";
import SupplierLayout from "./layout/supplierLayout/supplierLayout";
import SupplierCreateLayout from "./layout/supplierLayout/supplierCreateLayout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/product" element={<ProductLayout/>} />
        <Route path="/product/edit/:id" element={<ProductEditLayout/>} />
        <Route path="/product/add" element={<ProductCreateLayout/>} />
        <Route path="/supplier" element={<SupplierLayout/>} />
        <Route path="/supplier/add" element={<SupplierCreateLayout/>} />
      </Routes>
    </Router>
  );
};

export default App;
