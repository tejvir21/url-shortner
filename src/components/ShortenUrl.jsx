import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { QRCodeCanvas } from "qrcode.react";
import { Toaster, toast } from "sonner";
import { Loader } from "./Loader";

export default function ShortenUrl() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setloading] = useState(false);

  const handleShorten = async () => {
    try {
      if (url.indexOf("https://") === 0 || url.indexOf("http://") === 0) {
        setloading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}api/url/shorten`,
          { originalUrl: url.trim() },
          {
            withCredentials: true,
          }
        );
        if (response !== null) {
          toast.success("Short URL is successfully created");

          setloading(false);
          setShortUrl(`${import.meta.env.VITE_CLIENT_URL}${response.data.id}`);
        }
      } else {
        toast.warning("Enter a valid URL");
        setloading(false);
      }

      setCopied(false);
    } catch (error) {
      toast.error("Error:", error);
      setloading(false);
    }
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-code");
    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "qrcode.png";
    link.click();
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-md mx-auto my-7 p-4 py-7 bg-gray-100 rounded-lg shadow-md text-center">
      <Input
        type="url"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="mb-4"
        required
      />
      <Button onClick={handleShorten} className="w-full">
        Shorten
      </Button>

      {shortUrl && (
        <div className="mt-4">
          <p className="text-lg font-semibold">Shortened URL:</p>
          <div className="flex items-center justify-center space-x-2">
            <a
              href={shortUrl}
              className="text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl}
            </a>
            <CopyToClipboard text={shortUrl} onCopy={() => setCopied(true)}>
              <Button size="sm">{copied ? "Copied!" : "Copy"}</Button>
            </CopyToClipboard>
          </div>
          <QRCodeCanvas
            id="qr-code"
            className="mx-auto my-4"
            value={shortUrl}
            size={150}
          />
          <Button onClick={downloadQRCode} className="mt-2">
            Download QR Code
          </Button>
        </div>
      )}
      <Toaster position="bottom-center" />
    </div>
  );
}
