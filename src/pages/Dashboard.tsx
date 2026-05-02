import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { PlatformStats } from "@/components/PlatformStats";
import { ContestTracker } from "@/components/ContestTracker";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { DashboardLoader } from "@/components/DashboardLoader";
import { SyncTerminal } from "@/components/SyncTerminal";
import "./CoverPage.css"; // Ensure cyber-theme applies here

const Dashboard = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(true);
  const handleFinish = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <DashboardLoader onFinish={handleFinish} />}
      <div className="cyber-theme relative overflow-hidden w-full">
        <Navbar />
        <div className="pt-8 relative z-10 w-full">
          <PlatformStats />
        </div>
        <div className="relative z-10 w-full mt-16">
          <ContestTracker />
          <CTASection />
          <Footer />
        </div>
        <SyncTerminal onSyncComplete={() => queryClient.invalidateQueries()} />
      </div>
    </>
  );
};

export default Dashboard;
