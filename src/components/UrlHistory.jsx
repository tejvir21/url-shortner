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
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { Loader } from "./Loader";
import { ClipboardCopy } from "lucide-react";

export default function UrlHistory() {
  const [response, setResponse] = useState([]);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

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
          navigate("/login");
          return;
        }
        toast.error("Error fetching data: " + error.message);
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) return <Loader />;

  return (
    <div className="mx-auto mt-8 bg-white p-4 lg:px-40 shadow-md rounded-md text-center">
      <h2 className="text-lg font-bold">Recent URLs</h2>
      <Table>
        <TableCaption>A list of your recent Urls.</TableCaption>
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
            response.slice(0, 3).map((element, index) => (
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
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Toaster position="bottom-center" />
    </div>
  );
}
