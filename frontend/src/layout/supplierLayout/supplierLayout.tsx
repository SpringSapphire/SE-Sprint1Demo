import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductSideBar from "../../components/productsidebar";
import ZooHeader from "../../components/header";
import SupplierTable from "../../pages/supplierPages/supplierPages";

const { Header, Content, Footer, Sider } = Layout;

const SupplierLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ZooHeader/>
      <Layout>
        <ProductSideBar />
        <Content>
          <SupplierTable/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SupplierLayout;
