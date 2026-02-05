 import { Navbar } from "@/components/Navbar";
 import { Hero } from "@/components/Hero";
 import { PlatformStats } from "@/components/PlatformStats";
 import { Heatmap } from "@/components/Heatmap";
 import { TopicBreakdown } from "@/components/TopicBreakdown";
 import { RatingChart } from "@/components/RatingChart";
 import { ContestTracker } from "@/components/ContestTracker";
 import { CTASection } from "@/components/CTASection";
 import { Footer } from "@/components/Footer";
 
 const Index = () => {
   return (
     <div className="min-h-screen bg-background">
       <Navbar />
       <Hero />
       <PlatformStats />
       <Heatmap />
       <TopicBreakdown />
       <RatingChart />
       <ContestTracker />
       <CTASection />
       <Footer />
     </div>
   );
 };
 
 export default Index;
