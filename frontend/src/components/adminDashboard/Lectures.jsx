import { Button, Input } from "antd";
import React from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";

// const LECTURE_QUERY = gql``;

function Lectures() {
  return (
    <div className="bg-white h-full rounded-lg p-10 my-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">All Students</h1>
        <Button type="primary" className="bg-black" icon={<PlusOutlined />}>
          Add new student
        </Button>
      </div>
      <div>
        <div>
          <Input
            size="large"
            placeholder="Search lectures..."
            prefix={<SearchOutlined style={{ marginRight: "0.4rem" }} />}
            className="w-1/2 my-3"
          />
        </div>
      </div>
    </div>
  );
}

export default Lectures;
