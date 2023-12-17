import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import ProductSideBar from "../components/productsidebar";
import ZooHeader from "../components/header";
import CreateProductPage from "../pages/productPages/create/productCreatePage";

const { Header, Content, Footer, Sider } = Layout;

const ProductCreateLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ZooHeader/>
      <Layout >
        <ProductSideBar />
        <Content>
          <CreateProductPage/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductCreateLayout;
