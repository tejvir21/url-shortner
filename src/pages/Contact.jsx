import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="max-w-md mx-auto my-10 p-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle as="h1" size="xl" className="text-center">
            Contact Us
          </CardTitle>
        </CardHeader>
        <CardDescription>
          <CardContent className="text-center mb-4">
            We are here to help you with any questions or support you may need.
            Feel free to reach out to us via email.
          </CardContent>
          <CardContent className="text-center font-bold mb-4">
            Email:
            <Link
              to="https://tejvir.netlify.app/#contact"
              target="_blank"
              className="font-bold rounded-4xl"
            >
              {" "}
              portfoliocontactform
            </Link>
          </CardContent>
          <CardContent className="text-center mb-4">
            For more information about our services and to see our portfolio,
            visit our website.
          </CardContent>
        </CardDescription>
        <CardFooter className="text-center">
          <Link
            to="https://tejvir.netlify.app/"
            target="_blank"
            className="font-bold rounded-4xl"
          >
            Visit Our Portfolio
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
