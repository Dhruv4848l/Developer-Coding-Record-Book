import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
 import CoverPage from "./pages/CoverPage";
 import Dashboard from "./pages/Dashboard";
  import LeetCodePage from "./pages/platforms/LeetCodePage";
  import CodeChefPage from "./pages/platforms/CodeChefPage";
  import CodeforcesPage from "./pages/platforms/CodeforcesPage";
  import GFGPage from "./pages/platforms/GFGPage";
  import HackerRankPage from "./pages/platforms/HackerRankPage";
  import AtCoderPage from "./pages/platforms/AtCoderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<CoverPage />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/platform/leetcode" element={<LeetCodePage />} />
           <Route path="/platform/codechef" element={<CodeChefPage />} />
           <Route path="/platform/codeforces" element={<CodeforcesPage />} />
           <Route path="/platform/gfg" element={<GFGPage />} />
           <Route path="/platform/hackerrank" element={<HackerRankPage />} />
           <Route path="/platform/atcoder" element={<AtCoderPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
