import React, { useState } from "react";
import { Layout, Menu, Avatar } from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  ReadOutlined,
  TeamOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../components/adminDashboard/Dashboard";
import Courses from "../components/adminDashboard/Courses";
import Lectures from "../components/adminDashboard/Lectures";
import Students from "../components/adminDashboard/Students";

const { Header, Content, Footer, Sider } = Layout;

const menuItems = [
  {
    key: "1",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    path: "/",
  },
  { key: "2", icon: <BookOutlined />, label: "Courses", path: "courses" },
  { key: "3", icon: <ReadOutlined />, label: "Lectures", path: "lectures" },
  { key: "4", icon: <TeamOutlined />, label: "Students", path: "students" },
];

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };
  const navigate = useNavigate();
  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  return (
    <Layout className="min-h-screen font-Poppins ">
      <Sider
        collapsible
        theme="light"
        className="border-r"
        onCollapse={onCollapse}
      >
        {!collapsed && (
          <div className="font-bold text-gray-800 text-3xl flex items-center justify-center mt-4 ">
            EduHub
          </div>
        )}
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          className="mt-6"
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} className="font-medium ">
              <NavLink to={item.path}>{item.label}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background p-0 bg-white border-b h-14 flex items-center justify-end">
          <div className="flex gap-4 items-center mr-10">
            <BellOutlined className="text-xl" />
            <Avatar size={35} icon={<UserOutlined />} />
          </div>
        </Header>
        <Content className="ml-3 ">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="lectures" element={<Lectures />} />
            <Route path="students" element={<Students />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
