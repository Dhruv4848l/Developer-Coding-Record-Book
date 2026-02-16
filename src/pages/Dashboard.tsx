import { Navbar } from "@/components/Navbar";
import { PlatformStats } from "@/components/PlatformStats";
import { ContestTracker } from "@/components/ContestTracker";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { GlassBackground } from "@/components/GlassBackground";

const Dashboard = () => {
  return (
    <div className="min-h-screen relative">
      <GlassBackground />
      <Navbar />
      <div className="pt-20">
        <PlatformStats />
      </div>
      <ContestTracker />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Dashboard;
