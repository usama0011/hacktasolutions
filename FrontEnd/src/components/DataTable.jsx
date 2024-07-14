import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal } from "antd";
import qs from "qs";

const columns = [
  {
    title: "Date Added",
    dataIndex: "name",
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: "20%",
  },
  {
    title: "Username",
    dataIndex: "name",
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Project Folder",
    dataIndex: "gender",
    filters: [
      {
        text: "folder1",
        value: "folder1",
      },
      {
        text: "folder2",
        value: "folder2",
      },
      {
        text: "folder3",
        value: "folder3",
      },
    ],
    width: "20%",
  },

  {
    title: "Actions",
    render: (text, record) => (
      <Space size="middle">
        <Button type="primary" onClick={() => handleView(record)}>
          View
        </Button>
        <Button type="default" onClick={() => handleEdit(record)}>
          Edit
        </Button>
        <Button type="danger" onClick={() => handleDelete(record)}>
          Delete
        </Button>
      </Space>
    ),
  },
];

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const DataTable = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://randomuser.me/api?${qs.stringify(
        getRandomuserParams(tableParams)
      )}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200, // Mock data, you should read it from server
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    // Clear data when pagination or filters change
    if (
      pagination.current !== tableParams.pagination?.current ||
      pagination.pageSize !== tableParams.pagination?.pageSize
    ) {
      setData([]);
    }
  };

  const handleView = (record) => {
    Modal.info({
      title: "View User",
      content: (
        <div>
          <p>Name: {`${record.name.first} ${record.name.last}`}</p>
          <p>Email: {record.email}</p>
          <p>Gender: {record.gender}</p>
        </div>
      ),
      onOk() {},
    });
  };

  const handleEdit = (record) => {
    Modal.info({
      title: "Edit User",
      content: (
        <div>
          <p>
            Edit form for user: {`${record.name.first} ${record.name.last}`}
          </p>
          {/* Add your edit form fields here */}
        </div>
      ),
      onOk() {},
    });
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Delete User",
      content: `Are you sure you want to delete user: ${record.name.first} ${record.name.last}?`,
      onOk() {
        // Implement delete logic here
        console.log("Deleting user:", record);
      },
      onCancel() {},
    });
  };

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.login.uuid}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default DataTable;
