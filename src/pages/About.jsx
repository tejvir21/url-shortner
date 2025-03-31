import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle as="h1" size="xl" className="text-center font-bold text-2xl">
              About TinyWrap
            </CardTitle>
          </CardHeader>
          <CardDescription>
            <CardContent className="text-lg text-gray-700 mb-4">
            TinyWrap is a modern and efficient URL shortener platform designed to simplify the way you manage and share links. Whether you're a business, a marketer, or an individual, ShortenIt provides you with the tools to create, track, and manage your URLs effortlessly.
            </CardContent>
            <CardContent className="text-lg text-gray-700 mb-4">
              Our platform is built with a focus on performance, security, and user experience. With TinyWrap, you can:
            </CardContent>
            <ul className="list-disc list-inside text-left text-gray-700 mb-4 pl-10 italic">
              <li>Generate short and memorable URLs for your long links.</li>
              <li>Track analytics such as clicks, unique visitors, and geographic data.</li>
              <li>Manage your URLs with an intuitive dashboard.</li>
              <li>Ensure your links are secure and reliable.</li>
            </ul>
            <CardContent className="text-lg text-gray-700 mb-4">
            TinyWrap is perfect for businesses looking to enhance their marketing campaigns, individuals who want to share links more effectively, and anyone who values simplicity and efficiency.
            </CardContent>
          </CardDescription>
          <CardFooter className="text-center">
            <motion.a
              href="/login"
              className="inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
