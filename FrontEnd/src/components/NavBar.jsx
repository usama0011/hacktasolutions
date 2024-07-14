import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";
import {
  UserOutlined,
  ReloadOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { Header, Sider } = Layout;
const { Option } = Select;

const Navbar = () => {
  const navigation = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const handleOpenSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  const handleLogout = () => {
    Modal.confirm({
      title: "Logout",
      content: "Are you sure you want to logout?",
      onOk() {
        console.log("Logout confirmed");
        localStorage.removeItem("token"); // Remove token from localStorage
        navigation("/login"); // Redirect to login page
        // Perform any additional cleanup actions here if needed
      },
    });
  };

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleCancelAddUser = () => {
    setShowAddUserModal(false);
  };

  const onFinishAddUser = async (values) => {
    console.log("values", values);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/create-user",
        values,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Add user response:", res.data);
      message.success("User created successfully");
      setShowAddUserModal(false);
    } catch (error) {
      console.error("Add user error:", error.response);
      message.error(error.response.data.msg || "Failed to create user");
    }
  };

  return (
    <Layout>
      {/* Sidebar for mobile */}
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        collapsible
        trigger={null}
        collapsed={!showSidebar}
        onCollapse={(collapsed) => setShowSidebar(!collapsed)}
        style={{ display: "none" }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            User Profile
          </Menu.Item>
          <Menu.Item key="2" icon={<ReloadOutlined />}>
            Refresh Page
          </Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main header */}
      <div className="mainheader">
        <Header className="header">
          <div className="logo">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5LTpOF419Wt1OH97yFEJMAVTjtwhg9pIeHg&s"
              alt=""
            />
          </div>
          <div className="header-right">
            <Button
              type="text"
              color="white"
              icon={<UserOutlined color="white" />}
              onClick={handleAddUser}
            >
              Add User
            </Button>
            <Button
              type="text"
              icon={<ReloadOutlined />}
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Button
              className="menu-icon"
              icon={<MenuOutlined />}
              onClick={handleOpenSidebar}
            />
          </div>
        </Header>
      </div>

      {/* Add User Modal */}
      <Modal
        title="Add User"
        visible={showAddUserModal}
        onCancel={handleCancelAddUser}
        footer={[
          <Button key="cancel" onClick={handleCancelAddUser}>
            Cancel
          </Button>,
          <Button
            form="addUserForm"
            key="submit"
            htmlType="submit"
            type="primary"
          >
            Add User
          </Button>,
        ]}
      >
        <Form id="addUserForm" layout="vertical" onFinish={onFinishAddUser}>
          <Form.Item
            name="projectname"
            label="Select Folder"
            rules={[{ required: true, message: "Please select a folder!" }]}
          >
            <Select placeholder="Please select a folder">
              <Option value="folderone">Folder One</Option>
              <Option value="foldertwo">Folder Two</Option>
              <Option value="folderthree">Folder Three</Option>
              <Option value="folderfour">Folder Four</Option>
              <Option value="folderfive">Folder Five</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter password!" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Navbar;
