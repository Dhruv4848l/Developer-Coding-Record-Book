 import { motion } from "framer-motion";
 import { Calendar, Clock, ExternalLink, Bell } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const upcomingContests = [
   {
     platform: "LeetCode",
     name: "Weekly Contest 385",
     date: "Feb 9, 2026",
     time: "8:00 AM IST",
     duration: "1h 30m",
     colorClass: "text-leetcode",
     bgClass: "bg-leetcode/10",
   },
   {
     platform: "Codeforces",
     name: "Codeforces Round #934 (Div. 2)",
     date: "Feb 10, 2026",
     time: "8:35 PM IST",
     duration: "2h",
     colorClass: "text-codeforces",
     bgClass: "bg-codeforces/10",
   },
   {
     platform: "CodeChef",
     name: "Starters 120",
     date: "Feb 12, 2026",
     time: "8:00 PM IST",
     duration: "2h",
     colorClass: "text-codechef",
     bgClass: "bg-codechef/10",
   },
   {
     platform: "LeetCode",
     name: "Biweekly Contest 125",
     date: "Feb 15, 2026",
     time: "8:00 PM IST",
     duration: "1h 30m",
     colorClass: "text-leetcode",
     bgClass: "bg-leetcode/10",
   },
 ];
 
 export const ContestTracker = () => {
   return (
     <section id="events" className="py-24 relative">
       <div className="container mx-auto px-6">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="text-center mb-16"
         >
           <h2 className="text-3xl md:text-4xl font-bold mb-4">
             Never Miss a <span className="text-gradient">Contest</span>
           </h2>
           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
             Track coding contests and set reminders with just one click
           </p>
         </motion.div>
 
         <div className="max-w-3xl mx-auto space-y-4">
           {upcomingContests.map((contest, index) => (
             <motion.div
               key={contest.name}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               whileHover={{ scale: 1.01 }}
               className="glass rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
             >
               <div className="flex-1">
                 <div className="flex items-center gap-3 mb-2">
                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${contest.bgClass} ${contest.colorClass}`}>
                     {contest.platform}
                   </span>
                   <h3 className="font-semibold">{contest.name}</h3>
                 </div>
                 <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                   <span className="flex items-center gap-1.5">
                     <Calendar className="w-4 h-4" />
                     {contest.date}
                   </span>
                   <span className="flex items-center gap-1.5">
                     <Clock className="w-4 h-4" />
                     {contest.time}
                   </span>
                   <span className="text-foreground font-medium">
                     {contest.duration}
                   </span>
                 </div>
               </div>
 
               <div className="flex items-center gap-2">
                 <Button variant="secondary" size="sm" className="gap-2">
                   <Bell className="w-4 h-4" />
                   Remind
                 </Button>
                 <Button variant="ghost" size="icon" className="h-9 w-9">
                   <ExternalLink className="w-4 h-4" />
                 </Button>
               </div>
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 };