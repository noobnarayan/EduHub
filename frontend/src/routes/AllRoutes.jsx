import React, { useContext, useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AdminDashboard from "../pages/AdminDashboard";
import { AuthContext } from "../context/AuthContextProvider";

function AllRoutes() {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous authentication check
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="*"
        element={
          auth.isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default AllRoutes;
