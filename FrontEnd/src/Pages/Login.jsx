import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Tabs } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useHistory hook

import LoginBackgroundImage from "../assets/loginbackground.jpg";
import CompanyLogo from "../assets/comapnylogo.svg"; // Assuming this is your logo URL

const { TabPane } = Tabs;

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("account");

  const handleTabChange = (key) => {
    setLoginType(key);
  };

  const onFinish = async (values) => {
    try {
      const res = await axios.post(
        "https://hacktasolutions-server.vercel.app/api/auth/login",
        values
      );
      const token = res.data.token;
      localStorage.setItem("token", token); // Store token in local storage
      message.success("Login successful!");
      console.log("Redirecting to dashboard...");
      navigate("/");
      // Redirect or set authenticated state
    } catch (error) {
      console.error("Login error:", error.response);
      message.error("Invalid username or password!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${LoginBackgroundImage})`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "24px",
          borderRadius: "8px",
          width: "400px",
        }}
      >
        <img
          src={CompanyLogo}
          alt="Company Logo"
          style={{ width: "100%", marginBottom: 24 }}
        />
        <Tabs activeKey={loginType} onChange={handleTabChange}>
          <TabPane tab="Username & Password" key="account">
            <LoginForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
          </TabPane>
        </Tabs>
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <span>Powered by Hackaton</span>
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ onFinish, onFinishFailed }) => {
  const [autoLogin, setAutoLogin] = useState(false);

  return (
    <Form
      name="loginForm"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="email" // Make sure this matches your backend's expected field name
        rules={[{ required: true, message: "Please enter your email!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={autoLogin}
          onChange={(e) => setAutoLogin(e.target.checked)}
        >
          Remember me
        </Checkbox>
        <a style={{ float: "right" }} href="#">
          Forgot password
        </a>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
