import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";

export default function RedirectPage() {
  const { shortId } = useParams();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    toast.info("Redirecting you to your destination 😀")
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}${shortId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setloading(false);
        window.location.href = res.data.redirectURL;
      })
      .catch(() => {
        toast.info("URL not found!");
        window.location.href = "/home/404"
        setloading(false);
      });
  }, [shortId]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-900 fixed top-0 left-0">
        {/* Loader Rings */}
        <div className="relative">
          <div className="loader w-32 h-32 border-pink-500"></div>
          <div className="loader w-36 h-36 border-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-rotate2"></div>
          <div className="loader w-40 h-40 border-pink-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="loader w-44 h-44 border-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-rotate2"></div>
        </div>

        {/* Loading Text */}
        <span className="absolute text-white text-lg md:text-2xl font-semibold top-1/2 -translate-y-1/2">
          LOADING...
        </span>
        <Toaster position="bottom-center"/>
      </div>
    );

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-900 fixed top-0 left-0">
      {/* Loader Rings */}
      <div className="relative">
        <div className="loader w-32 h-32 border-pink-500"></div>
        <div className="loader w-36 h-36 border-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-rotate2"></div>
        <div className="loader w-40 h-40 border-pink-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="loader w-44 h-44 border-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-rotate2"></div>
      </div>

      {/* Loading Text */}
      <span className="absolute text-white text-lg md:text-2xl font-semibold top-1/2 -translate-y-1/2">
        LOADING...
      </span>
      <Toaster position="bottom-center" />
    </div>
  );
}
