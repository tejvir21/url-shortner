import React, {useState} from "react";
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
      // Make request to backend for logout
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}api/auth/user/logout`, 
        {}, // Empty object for POST body
        { withCredentials: true } // ✅ This ensures cookies are sent
      );
      
        // Clear user session or token
      localStorage.removeItem("user");

      if (response.data.success)
      {toast.success("You have been logged out successfully.");
      setloading(false);}
    else
    toast.info("You are not logged In!")
    setloading(false);
      setTimeout(() => window.location.href = "/login",500)
      
    } catch (error) {
      // Show error toast message
      toast.error("Failed to logout. Please try again.\n"+error);
      setloading(false);

      if(error.message=='Request failed with status code 401')
        navigate("/login")
      
    }
  };

  handleLogout();

    if (loading) return <Loader />;
  

  return (
    <Toaster />
  );
};

export default Logout;
