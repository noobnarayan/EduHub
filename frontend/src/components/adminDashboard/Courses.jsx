import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Button, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import _ from "lodash";

const COURSES_QUERY = gql`
  query getCourses($searchTerm: String) {
    courses(searchTerm: $searchTerm) {
      id
      name
      description
      prerequisites
    }
  }
`;
function Courses() {
  const [courses, setCourses] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const { loading, error, data, refetch } = useQuery(COURSES_QUERY, {
    variables: { searchTerm },
  });

  const debouncedRefetch = _.debounce(() => {
    refetch();
  }, 1000);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedRefetch();
  };
  useEffect(() => {
    if (data) {
      setCourses(data.courses);
    }
  }, [data]);

  return (
    <div className="bg-white h-full rounded-lg p-10 my-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">All Courses</h1>
        <Button type="primary" className="bg-black" icon={<PlusOutlined />}>
          Create new course
        </Button>
      </div>
      <div>
        <div>
          <Input
            size="large"
            placeholder="Search courses..."
            prefix={<SearchOutlined style={{ marginRight: "0.4rem" }} />}
            className="w-1/2 my-3"
            onChange={(e) => handleSearchTermChange(e)}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 my-5">
        {courses?.map((course, index) => (
          <div
            key={index}
            className="flex flex-col rounded-3xl overflow-hidden shadow p-6 bg-white h-full border"
          >
            <div>
              <h2 className="font-bold text-xl mb-2">{course.name}</h2>
              <p className="text-gray-700 text-xs line-clamp-4">
                {course.description}
              </p>
              <h3 className="font-bold mt-2">Prerequisites:</h3>
              <ul className="list-disc list-inside my-1">
                {course.prerequisites.map((prerequisite, i) => (
                  <li key={i} className="text-sm">
                    {prerequisite}
                  </li>
                ))}
              </ul>
            </div>
            <div className=" flex gap-3 justify-end mt-auto">
              <Button>Edit</Button>
              <Button type="primary" className="bg-black ">
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
