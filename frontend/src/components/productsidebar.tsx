import React, { FC, useState } from "react";
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
  getItem("สินค้า", "1", <DashboardOutlined />),
  getItem("เพิ่มสินค้า", "2", <UserOutlined />),
  getItem("ผู้ผลิต", "3", <UserOutlined />),
  getItem("เพิ่มผู้ผลิต", "", <UserOutlined />),
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
          defaultSelectedKeys={[page ? page : "product"]}
          mode="inline"
          // style={{ backgroundColor: "#424530", color: "black" }}
        >
          <Menu.Item
            key="product"
            onClick={() => setCurrentPage("product")}
          >
            <Link to="/product">
              <DashboardOutlined />
              <span>สินค้า</span>
            </Link>
          </Menu.Item>
          <Menu.Item 
            key="addProduct" 
            onClick={() => setCurrentPage("addProduct")}
          >
            <Link to="/product/add">
              <UserOutlined />
              <span>เพิ่มสินค้า</span>
            </Link>
          </Menu.Item>
          <Menu.Item 
            key="supplier" 
            onClick={() => setCurrentPage("supplier")}
          >
            <Link to="/supplier">
              <UserOutlined />
              <span>ผู้ผลิต</span>
            </Link>
          </Menu.Item>
          <Menu.Item 
            key="addSupplier" 
            onClick={() => setCurrentPage("addSupplier")}
          >
            <Link to="/supplier/add">
              <UserOutlined />
              <span>เพิ่มผู้ผลิต</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
  );
};
export default ProductSideBar;
