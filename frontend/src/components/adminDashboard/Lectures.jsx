import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";
import _ from "lodash";

const LECTURE_QUERY = gql`
  query getCourses($searchTerm: String) {
    lectures(searchTerm: $searchTerm) {
      id
      title
      description
      startTime
      endTime
      link
      course {
        id
        name
      }
    }
  }
`;

function Lectures() {
  const [lectures, setLectures] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const { loading, error, data, refetch } = useQuery(LECTURE_QUERY, {
    variables: { searchTerm },
  });

  const debouncedRefetch = _.debounce(() => {
    refetch();
  }, 500);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedRefetch();
  };

  useEffect(() => {
    if (data) {
      setLectures(data.lectures);
    }
  }, [data]);

  return (
    <div className="bg-white h-full rounded-lg p-10 my-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">All Lectures</h1>
        <Button type="primary" className="bg-black" icon={<PlusOutlined />}>
          Add new lecture
        </Button>
      </div>
      <div>
        <div>
          <Input
            size="large"
            placeholder="Search lectures..."
            prefix={<SearchOutlined style={{ marginRight: "0.4rem" }} />}
            className="w-1/2 my-3"
            onChange={(e) => handleSearchTermChange(e)}
          />
        </div>
        <div className="grid grid-cols-3 gap-3 my-5">
          {lectures?.map((lecture, index) => (
            <div key={index} className="p-4 border rounded-3xl shadow">
              <h2 className="text-lg font-semibold">{lecture.title}</h2>
              <span className="inline-block bg-blue-300 rounded-3xl text-xs text-blue-800 px-2 py-1  font-medium my-2">
                {lecture.course.name}
              </span>
              <p>
                {new Date(parseInt(lecture.startTime)).toLocaleString()} -{" "}
                {new Date(parseInt(lecture.endTime)).toLocaleString()}
              </p>
              <div className="flex gap-3 justify-end mt-4">
                <Button>Edit</Button>
                <Button type="primary" className="bg-black ">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Lectures;
