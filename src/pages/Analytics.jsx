import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { Toaster, toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Analytics() {
  const [shortId, setShortId] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const fetchAnalytics = async () => {
    try {
      setloading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}api/url/analytics/${shortId.trim()}`,
        {
          withCredentials: true,
        }
      );
      setloading(false);
      setAnalytics(response.data);
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        setloading(false);
        navigate("/login");
        return;
      }
      setAnalytics(null)
      toast.warning("Invalid Short URL!");
      setloading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto text-center p-6">
      {/* Page Title */}
      <CardTitle as="h1" size="xl" className="mb-6 text-3xl font-bold">
        URL Analytics
      </CardTitle>

      {/* Input Section */}
      <div className="mb-6 border-2 p-5 rounded-xl shadow-lg">
        <Input
          placeholder="Enter short ID (e.g., abc123)"
          value={shortId}
          onChange={(e) => setShortId(e.target.value)}
          className="mt-4"
        />
        <Button onClick={fetchAnalytics} className="mt-4 w-30">
          Get Analytics
        </Button>
      </div>

      {/* Analytics Details */}
      {analytics && (
        <Card className="mt-6 shadow-lg">
          <CardHeader>
            <CardTitle as="h2" size="lg" className="font-bold text-xl">
              Analytics Details
            </CardTitle>
          </CardHeader>
          <CardContent className="text-left text-md space-y-4">
            <div>
              <b>Original URL:</b>{" "}
              <a
                href={analytics.queryset.redirectURL}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {analytics.queryset.redirectURL}
              </a>
            </div>
            <div>
              <b>Short URL:</b>{" "}
              <a
                href={`${import.meta.env.VITE_CLIENT_URL}${shortId}`}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${import.meta.env.VITE_CLIENT_URL}${shortId}`}
              </a>
            </div>
            <div>
              <b>Unique Visitors:</b>{" "}
              <span className="font-bold text-lg text-green-600">
                {analytics.queryset.visitHistory.length}
              </span>
            </div>
            <div>
              <b>Total Clicks:</b>{" "}
              <span className="font-bold text-lg text-green-600">
                {analytics.totalClicks}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      <Toaster position="bottom-center" />
    </div>
  );
}
