import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookOutlined,
  ReadOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";
const DASHBOARD_DATA = gql`
  query {
    courses {
      id
      name
    }
    lectures {
      id
      title
    }
    users {
      id
      role
    }
  }
`;

function Dashboard() {
  const { data, loading, error } = useQuery(DASHBOARD_DATA);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [lectures, setlectures] = useState([]);

  useEffect(() => {
    if (data) {
      setCourses(data.courses);
      setUsers(data.users);
      setlectures(data.lectures);
    }
  }, [data]);

  const students = users?.filter((user) => user.role === "Student");

  return (
    <div className="bg-white h-full rounded-lg">
      <div className="flex flex-wrap justify-between px-5 gap-2 my-8 pt-5">
        <div className="h-16 w-56 rounded-xl border shadow flex gap-5 items-center justify-center hover:cursor-pointer">
          <div className="rounded-full h-10 w-10 p-2 bg-green-400 flex justify-center items-center text-white">
            <UserOutlined className="text-lg" />
          </div>
          <div className="flex flex-col justify-center ">
            <p className="font-semibold text-lg">{students.length}</p>
            <p className="text-xs text-gray-500">Students</p>
          </div>
        </div>

        <div className="h-16 w-56 rounded-xl border shadow flex gap-5 items-center justify-center hover:cursor-pointer">
          <div className="rounded-full h-10 w-10 p-2 bg-blue-400 flex justify-center items-center text-white">
            <BookOutlined className="text-lg" />
          </div>
          <div className="flex flex-col justify-center ">
            <p className="font-semibold text-lg">{courses.length}</p>
            <p className="text-xs text-gray-500">Courses</p>
          </div>
        </div>
        <div className="h-16 w-56 rounded-xl border shadow flex gap-5 items-center justify-center hover:cursor-pointer">
          <div className="rounded-full h-10 w-10 p-2 bg-yellow-400 flex justify-center items-center text-white">
            <ReadOutlined className="text-lg" />
          </div>
          <div className="flex flex-col justify-center ">
            <p className="font-semibold text-lg">{lectures.length}</p>
            <p className="text-xs text-gray-500">Lectures</p>
          </div>
        </div>

        <Link to="/ ">
          <div className="h-16 w-56 rounded-xl border shadow flex gap-5 items-center justify-center bg-[#080b0b] hover:cursor-pointer">
            <div className="rounded-full h-10 w-10 p-2 bg-white flex justify-center items-center text-black">
              <PlusCircleOutlined className="text-lg" />
            </div>
            <div className="flex flex-col justify-center ">
              <p className="font-medium text-[1rem] text-white">
                Create new Lecture
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div></div>
    </div>
  );
}

export default Dashboard;
