import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { encryptData, decryptData } from "../components/helpers/secure";
import { Loader } from "../components/Loader";
import { Toaster, toast } from "sonner";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);

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
        `${import.meta.env.VITE_SERVER_URL}api/auth/user/login`,
        { ...formData },
        { withCredentials: true }
      );
      if (response.data.success) {
        const userData = encryptData(response.data.user);
        localStorage.setItem("user", userData);

        toast.success("Login successful!");

        setTimeout(() => {
          window.location.href = "/home";
        }, 1000);
        setloading(false);
      } else {
        setloading(false);
        toast.error("Invalid credentials");
      }
    } catch (error) {
      setloading(false);
      toast.error("Login failed");
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

  return (
    <div className="max-w-md mx-auto p-6 my-7 bg-white shadow-lg rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
      <h2 className="text-xl font-semibold mb-4">LogIn</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="username"
          type="text"
          placeholder="Username or Email"
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
          Login
        </Button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-600">
          Sign up
        </a>
      </p>
      <Toaster position="bottom-center" />
    </div>
  );
}
