import React, { useEffect, useState } from "react";
import { Input, Tooltip } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const COURSE_QUERY = gql`
  query {
    courses {
      name
      id
    }
  }
`;

const CREATE_USER = gql`
  mutation Signup(
    $name: String!
    $email: String!
    $password: String!
    $role: String!
    $courses: [ID]
  ) {
    createUser(
      name: $name
      email: $email
      password: $password
      role: $role
      courses: $courses
    ) {
      id
    }
  }
`;

function Signup() {
  const { data, loading, error } = useQuery(COURSE_QUERY);

  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [continued, setContinued] = useState(false);

  useEffect(() => {
    if (data) {
      setCourses(data.courses);
    }

    if (error) {
      setAlert(error.message);
    }
  }, [data, error]);

  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleClick = (course) => {
    setSelectedCourses((prevCourses) => {
      if (prevCourses.includes(course.id)) {
        // If the course is already selected, remove it from the selection
        return prevCourses.filter((c) => c.id !== course.id);
      } else if (prevCourses.length < 3) {
        // If the course is not selected and less than 3 courses are selected, add it to the selection
        return [...prevCourses, course];
      } else {
        // If the course is not selected and 3 courses are already selected, show alert
        setAlert("You can only select any three courses at a time");
        setTimeout(() => {
          setAlert("");
        }, 2000);
        return prevCourses;
      }
    });
  };

  const [
    createUser,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_USER, {
    variables: {
      name,
      email,
      password,
      role: "Student",
      courses: selectedCourses,
    },
    onCompleted: ({ createUser }) => {
      console.log(createUser);
    },
    onError: (error) => {
      setAlert(error.message);
      setTimeout(() => {
        setAlert("");
      }, 2000);
    },
  });

  const handleContinue = () => {
    if (!name) {
      setAlert("Name is required");
      setTimeout(() => {
        setAlert("");
      }, 2000);
      return;
    }
    if (!email) {
      setAlert("Email is required");
      setTimeout(() => {
        setAlert("");
      }, 2000);
      return;
    }
    if (!password) {
      setAlert("Password is required");
      setTimeout(() => {
        setAlert("");
      }, 2000);
      return;
    }
    if (!confirmPassword) {
      setAlert("Confirm password is required");
      setTimeout(() => {
        setAlert("");
      }, 2000);
      return;
    }
    if (password !== confirmPassword) {
      setAlert("Passwords do not match");
      setTimeout(() => {
        setAlert("");
      }, 2000);
      return;
    }
    setContinued(true);
  };

  const handleSubmit = () => {
    if (!name) {
      setAlert("Name is required");
      setTimeout(() => {
        setAlert("");
      }, 2000);
      return;
    }
    if (!email) {
      setAlert("Email is required");
      setTimeout(() => {
        setAlert("");
      }, 2000);
      return;
    }
    if (!password) {
      setAlert("Password is required");
      setTimeout(() => {
        setAlert("");
      }, 2000);
      return;
    }
    if (!confirmPassword) {
      setAlert("Confirm password is required");
      setTimeout(() => {
        setAlert("");
      }, 2000);
      return;
    }
    if (password !== confirmPassword) {
      setAlert("Passwords do not match");
      setTimeout(() => {
        setAlert("");
      }, 2000);
      return;
    }
    if (selectedCourses.length < 3) {
      setAlert("You must select at least three courses");
      setTimeout(() => {
        setAlert("");
      }, 2000);
      return;
    }

    createUser();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50  ">
      <div className="max-w-md w-full space-y-8 bg-white px-10 rounded-lg py-10">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {continued ? "Select Courses" : "Create an account"}
          </h2>
        </div>
        {!continued ? (
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-3">
              <div>
                <label
                  htmlFor="name"
                  className="block my-2 font-medium text-sm"
                >
                  Name
                </label>
                <Input
                  name="name"
                  size="large"
                  placeholder="Enter your name"
                  prefix={<UserOutlined style={{ marginRight: "0.4rem" }} />}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block my-2 font-medium text-sm"
                >
                  Email
                </label>
                <Input
                  name="email"
                  size="large"
                  placeholder="Enter your email"
                  prefix={<MailOutlined style={{ marginRight: "0.4rem" }} />}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block my-2 font-medium text-sm"
                >
                  Password
                </label>
                <Input.Password
                  name="password"
                  size="large"
                  placeholder="Input password"
                  prefix={<LockOutlined style={{ marginRight: "0.4rem" }} />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block my-2 font-medium text-sm"
                >
                  Confirm Password
                </label>
                <Input.Password
                  name="confirmPassword"
                  size="large"
                  placeholder="Confirm password"
                  prefix={<LockOutlined style={{ marginRight: "0.4rem" }} />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        ) : (
          <div className="flex gap-3 flex-wrap ">
            {courses?.map((course, index) => (
              <div
                key={index}
                className={`border border-gray-300 shadow text-xs py-2 px-2.5 w-fit rounded-lg font-medium text-center cursor-pointer ${
                  selectedCourses.includes(course.id)
                    ? "bg-gray-700 text-white"
                    : ""
                }`}
                onClick={() => handleClick(course.id)}
              >
                {course.name}
              </div>
            ))}
          </div>
        )}
        <div>
          <p className={`text-red-500 mb-2 ml-1 text-sm `}>{alert}</p>
          <button
            type={continued ? "submit" : "button"}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={(e) => {
              if (!continued) {
                handleContinue();
              } else {
                handleSubmit();
              }
            }}
          >
            Continue
          </button>
        </div>

        <p className="cursor-pointer text-center">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
