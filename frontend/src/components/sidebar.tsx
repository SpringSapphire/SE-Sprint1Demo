import React, { FC, useState, useEffect } from "react";
import type { MenuProps } from "antd";
import { UserOutlined, DashboardOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./mytheme.css"
const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("แดชบอร์ด", "1", <DashboardOutlined />),
  getItem("ข้อมูลสมาชิก", "2", <UserOutlined />),
];

const ProductSideBar: FC = () => {
  const page = localStorage.getItem("page");
  const [collapsed, setCollapsed] = useState(false);
  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };
  return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
        style={{ backgroundColor: "#424530" }}
      >
        <Menu
          theme="light"
          defaultSelectedKeys={[page ? page : "dashboard"]}
          mode="inline"
          // style={{ backgroundColor: "#424530", color: "black" }}
        >
          <Menu.Item
            key="dashboard"
            onClick={() => setCurrentPage("dashboard")}
          >
            <Link to="/">
              <DashboardOutlined />
              <span>แดชบอร์ด</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="customer" onClick={() => setCurrentPage("customer")}>
            <Link to="/customer">
              <UserOutlined />
              <span>ข้อมูลสมาชิก</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
  );
};
export default ProductSideBar;
