import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Button, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import _ from "lodash";
const STUDENTS_QUERY = gql`
  query students($searchTerm: String) {
    users(searchTerm: $searchTerm) {
      id
      email
      name
      role
      courses {
        id
        name
      }
    }
  }
`;

function Students() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, error, data, refetch } = useQuery(STUDENTS_QUERY, {
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
      const users = data.users;
      const students = users?.filter((user) => user.role === "Student");
      setStudents(students);
    }
  }, [data]);

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
            placeholder="Search students..."
            prefix={<SearchOutlined style={{ marginRight: "0.4rem" }} />}
            className="w-1/2 my-3"
            onChange={(e) => handleSearchTermChange(e)}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 my-5">
        {students?.map((student, index) => (
          <div
            key={index}
            className=" border-gray-200 py-4 border p-5 rounded-xl shadow"
          >
            <h2 className="text-xl font-semibold">{student.name}</h2>
            <p className="text-sm text-gray-500">{student.email}</p>
            <div className="mt-2">
              <h3 className="font-medium">Enrolled courses:</h3>
              {student.courses.length > 0 ? (
                <div className="flex gap-2 justify-start py-1 w-fit flex-wrap mt-2">
                  {student.courses.map((course, i) => (
                    <div key={i} className="bg-gray-700 rounded py-1 px-2">
                      <p className="text-sm text-white">{course.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No courses enrolled</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Students;
