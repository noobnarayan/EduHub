import React, { useContext, useState } from "react";
import { Input, Tooltip } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  InfoCircleOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { gql, useMutation } from "@apollo/client";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export default function Login() {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    variables: { email, password },
    onCompleted: async ({ login }) => {
      console.log(login);
      localStorage.setItem("accessToken", login.accessToken);
      if (login.accessToken) {
        await auth.login(login);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/");
        }, 1000);
      }
    },
    onError: (error) => {
      setAlert(error.message);
      setTimeout(() => {
        setAlert("");
      }, 2000);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      setAlert("Please enter your email address");
      setTimeout(() => {
        setAlert("");
      }, 2000);
      return;
    }
    if (!password) {
      setAlert("Please enter your password");
      setTimeout(() => {
        setAlert("");
      }, 2000);
      return;
    }
    setIsLoading(true);
    login();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50  ">
      <div className="max-w-md w-full space-y-8 bg-white px-10 rounded-lg py-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-3">
            <div>
              <label
                htmlFor="password"
                className="block my-2 font-medium text-sm"
              >
                Password
              </label>
              <Input
                name="email"
                size="large"
                placeholder="Enter your email"
                prefix={<MailOutlined style={{ marginRight: "0.4rem" }} />}
                suffix={
                  <Tooltip title="Enter your registered email address">
                    <InfoCircleOutlined
                      style={{
                        color: "rgba(0,0,0,.45)",
                      }}
                    />
                  </Tooltip>
                }
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
          </div>

          <div>
            <p className={`text-red-500 mb-2 ml-1 text-sm `}>{alert}</p>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <p className="cursor-pointer text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </p>
        </form>
        <div className="text-xs">
          <p className="text-red-500 font-medium">
            Student interface is not ready, please login with admin account
          </p>
          <p className="font-medium text-green-500">Admin credentials:</p>
          <p>Email: admin@example.com</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
}
