import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import DashboardInfoSection from "@/components/landing/DashboardInfoSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import AppDownloadSection from "@/components/landing/AppDownloadSection";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar variant="landing" fixed={true} />
      <HeroSection />
      <FeaturesSection />
      <DashboardInfoSection />
      <TestimonialsSection />
      <AppDownloadSection />
      <CTASection />
    </div>
  );
}
