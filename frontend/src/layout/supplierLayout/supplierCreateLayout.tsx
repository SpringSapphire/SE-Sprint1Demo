import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductSideBar from "../../components/productsidebar";
import ZooHeader from "../../components/header";
import CreateSupplierPage from "../../pages/supplierPages/create/supplierCreatePage";

const { Header, Content, Footer, Sider } = Layout;

const SupplierCreateLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ZooHeader/>
      <Layout>
        <ProductSideBar />
        <Content>
          <CreateSupplierPage/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SupplierCreateLayout;
