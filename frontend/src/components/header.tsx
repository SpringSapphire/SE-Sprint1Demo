import React, { FC, useState, useEffect } from "react";
import type { MenuProps } from "antd";
import { UserOutlined, DashboardOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const { Header } = Layout;

const ZooHeader :FC = () => {
    return (
        <Header style={{ backgroundColor: "black" }} />
    );
}; 
export default ZooHeader;