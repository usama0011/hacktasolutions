import React from "react";
import "./App.css";
import Navbar from "./components/NavBar";
import DataTable from "./components/DataTable";
import Title from "antd/es/skeleton/Title";
import { Typography } from "antd";
const App = () => {
  const { Title } = Typography;

  return (
    <div className="App">
      <Navbar />
      <div className="content">
        {/* Your main content here */}
        <br />
        <div
          style={{
            maxWidth: "80%",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Title style={{ color: "white" }} level={2}>
            User List
          </Title>
        </div>
        <div style={{ maxWidth: "80%", margin: "auto", minHeight: "100vh" }}>
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default App;
