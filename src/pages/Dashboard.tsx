import { Navbar } from "@/components/Navbar";
import { PlatformStats } from "@/components/PlatformStats";
import { ContestTracker } from "@/components/ContestTracker";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
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
