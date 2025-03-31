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
import { ClipboardCopy, Trash } from "lucide-react";

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

  const handleDelete = async (shortId) => {
    setloading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}api/url/delete`,
        { shortId },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) toast.success("Short URL Deleted!");
    } catch (error) {
      toast.error(error.message)
    } finally {
      setloading(false);
      setTimeout(() => {
              window.location.href = "/dashboard"

      }, 700)
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="w-full mx-auto mt-8 bg-white p-4 shadow-md rounded-md lg:px-20">
      <Card className="mb-10 lg:w-md mx-auto shadow-lg border border-gray-200 py-0">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-md">
          <CardTitle as="h2" size="md" className="text-lg font-bold">
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <CardDescription className="text-lg font-semibold">
                {user?.name}
              </CardDescription>
              <CardDescription className="text-sm text-gray-500">
                @{user?.username}
              </CardDescription>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 border-t border-gray-200 text-center">
          <Button
            variant="link"
            href="/profile"
            className="text-blue-600 hover:underline"
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
                      <ClipboardCopy />
                    </Button>
                  </CopyToClipboard>
                  <Button
                    className="ml-1 bg-red-600 hover:bg-red-800"
                    size="sm"
                    onClick={() => handleDelete(element.shortId)}
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Toaster position="bottom-center" />
    </div>
  );
}
