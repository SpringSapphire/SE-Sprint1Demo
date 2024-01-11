import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import ProductSideBar from "../../components/productsidebar";
import ZooHeader from "../../components/header";
import EditProductPage from "../../pages/productPages/edit/productEditPage";

const { Header, Content, Footer, Sider } = Layout;

const ProductEditLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ZooHeader/>
      <Layout >
        <ProductSideBar />
        <Content>
          <EditProductPage/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductEditLayout;
