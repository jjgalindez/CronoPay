import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/heroSection";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar variant="landing" fixed={true} />
      <HeroSection />
    </div>
  );
}
