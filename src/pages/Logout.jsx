import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../components/Loader";

const Logout = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const handleLogout = async () => {
    try {
      setloading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}api/auth/user/logout`,
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("user");

      if (response.data.success) {
        toast.success("You have been logged out successfully.");
        setloading(false);
      } else {
        toast.info("You are not logged In!");
      }

      setTimeout(() => {
        setloading(false);
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      toast.error("Failed to logout. Please try again.\n" + error);
      setloading(false);

      if (error.message === "Request failed with status code 401") {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    handleLogout();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) return <Loader />;

  return <Toaster />;
};

export default Logout;
