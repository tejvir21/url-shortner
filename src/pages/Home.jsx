import HeroSection from "../components/HeroSection";
import ShortenUrl from "../components/ShortenUrl";
import UrlHistory from "../components/UrlHistory";

export default function Home() {
  return (
    <div className="text-center">
      <HeroSection />
      <ShortenUrl />
      <UrlHistory />
    </div>
  );
}
