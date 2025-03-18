import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { decryptData } from "../components/helpers/secure";
import { Loader } from "../components/Loader";

export default function Dashboard() {
  const [response, setResponse] = useState([]);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  let user = null;
  if (localStorage.getItem("user") !== null) {
    user = decryptData(localStorage.getItem("user"));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const result = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}api/url/`,
          {
            withCredentials: true,
          }
        );
        setloading(false);
        setResponse(result.data);
      } catch (error) {
        if (error.message === "Request failed with status code 401") {
          setloading(false);
          navigate("/login");
          return;
        }
        toast.error("Error fetching data: " + error.response.data.msg);

        setloading(false);
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) return <Loader />;

  return (
    <div className="w-full mx-auto mt-8 bg-white p-4 shadow-md rounded-md lg:px-20">
      <Card className="mb-10 lg:w-md mx-auto">
        <CardHeader>
          <CardTitle as="h2" size="md">
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Full Name: {user?.name}</CardDescription>
          <CardDescription>Username: {user?.username}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button
            variant="link"
            href="/profile"
            onClick={() => toast.info("Edit feature coming soon!")}
          >
            Edit Profile
          </Button>
        </CardFooter>
      </Card>

      <h2 className="text-lg font-bold">Recent URLs</h2>
      <Table className="text-center">
        <TableCaption>List of your all Urls.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">#</TableHead>
            <TableHead className="text-center">Original Url</TableHead>
            <TableHead className="text-center">Short Url Id</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response &&
            response.map((element, index) => (
              <TableRow key={element.shortId}>
                <TableCell className="font-bold">{index + 1}</TableCell>
                <TableCell>
                  <a
                    href={element.redirectURL}
                    className="text-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {element.redirectURL}
                  </a>
                </TableCell>
                <TableCell>{element.shortId}</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                  <CopyToClipboard
                    text={`${import.meta.env.VITE_CLIENT_URL}${
                      element.shortId
                    }`}
                  >
                    <Button
                      size="sm"
                      onClick={() =>
                        toast.success("Short URL copied to clipboard")
                      }
                    >
                      Copy
                    </Button>
                  </CopyToClipboard>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Toaster position="bottom-center" />
    </div>
  );
}
