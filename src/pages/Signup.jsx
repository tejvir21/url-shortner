import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { decryptData } from "../components/helpers/secure";
import { Loader } from "../components/Loader";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  let user = null;
  if (
    localStorage.getItem("user") !== null &&
    localStorage.getItem("user") !== undefined
  ) {
    user = decryptData(localStorage.getItem("user"));
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}api/auth/user/signup`,
        { ...formData },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success("Signup successful! Please login.");
        setTimeout(() => {
          setloading(false);
          navigate("/login");
        }, 1000);
      } else {
        toast.info(
          "An account is already in use with that Email or Username. Please try again."
        );
        setloading(false);
      }
    } catch (e) {
      toast.error(e.message);
      setloading(false);
    }
  };

  if (loading) return <Loader />;

  if (user !== null && user !== undefined)
    return (
      <div className="flex flex-col items-center min-h-screen text-center pt-20">
        <h1 className="text-lg lg:text-2xl mb-4">
          You are Logged In as <b>{user.username}</b>
        </h1>
        <a href="/home">
          <Button type="button" className="w-32">
            Home
          </Button>
        </a>
      </div>
    );

    else {
      return (
    <div className="max-w-md mx-auto my-7 p-6 bg-white shadow-lg rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <div className="relative">
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600">
          Login
        </a>
      </p>
      <Toaster />
    </div>
  );
    }

  
}
