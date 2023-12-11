import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductSideBar from "../components/productsidebar";
import ZooHeader from "../components/header";
import ProductTable from "../pages/productPages/productPage";

const { Header, Content, Footer, Sider } = Layout;

const ProductLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ZooHeader/>
      <Layout>
        <ProductSideBar />
        <Content>
          <ProductTable/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductLayout;
