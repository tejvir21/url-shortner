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
        `${import.meta.env.VITE_SERVER_URL}api/url/analytics/${shortId}`,
        {
          withCredentials: true,
        }
      );
      setloading(false);
      setAnalytics(response.data.queryset);
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        setloading(false);
        navigate("/login");
        return;
      }
      toast.warning("Invalid Short URL!");

      setloading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-md mx-auto text-center p-6">
      <CardTitle as="h1" size="xl" className="mb-4">
        URL Analytics
      </CardTitle>
      <Input
        placeholder="Enter short ID (e.g., abc123)"
        value={shortId}
        onChange={(e) => setShortId(e.target.value)}
        className="mt-4"
      />
      <Button onClick={fetchAnalytics} className="mt-2">
        Get Analytics
      </Button>
      {analytics && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle as="h2" size="md">
              Analytics Details
            </CardTitle>
          </CardHeader>
          <CardDescription>
            <CardContent>
              Original URL:{" "}
              <a
                href={analytics.redirectURL}
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {analytics.redirectURL}
              </a>
            </CardContent>
            <CardContent>
              Short URL:{" "}
              <a
                href={`${import.meta.env.VITE_CLIENT_URL}${shortId}`}
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${import.meta.env.VITE_CLIENT_URL}${shortId}`}
              </a>
            </CardContent>
            <CardContent>
              Total Clicks: <strong>{analytics.visitHistory.length}</strong>
            </CardContent>
          </CardDescription>
        </Card>
      )}
      <Toaster position="bottom-center" />
    </div>
  );
}
