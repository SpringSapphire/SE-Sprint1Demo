import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductSideBar from "./components/sidebar";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout className="Big" style={{ minHeight: "100vh", }}>
        <Header style={{ backgroundColor: "black" }} />
        <Layout className="Middle">
          <ProductSideBar/>
          <Layout className="Small">
            <Content>
              <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                  </p>
                </header>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
