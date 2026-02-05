 import { Navbar } from "@/components/Navbar";
 import { Hero } from "@/components/Hero";
 import { PlatformStats } from "@/components/PlatformStats";
import { Awards } from "@/components/Awards";
 import { CTASection } from "@/components/CTASection";
 import { Footer } from "@/components/Footer";
 
 const Dashboard = () => {
   return (
     <div className="min-h-screen bg-background">
       <Navbar />
       <Hero />
       <PlatformStats />
      <Awards />
       <CTASection />
       <Footer />
     </div>
   );
 };
 
 export default Dashboard;