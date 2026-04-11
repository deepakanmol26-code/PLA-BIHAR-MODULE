"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { meetings, cycleNames } from "@/data/bookContent";
import { useReadProgress } from "@/hooks/useReadProgress";
import { BookOpen, Search, Bookmark, StickyNote, PlayCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Player } from "@remotion/player";
import { PLABiharComposition } from "@/remotion/PLABiharComposition";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
} as const;

const cycleGradients: Record<number, string> = {
  1: "from-primary/20 to-primary/5",
  2: "from-accent/20 to-accent/5",
  3: "from-blue-500/20 to-blue-500/5",
  4: "from-purple-500/20 to-purple-500/5",
};

const cycleBorders: Record<number, string> = {
  1: "border-l-primary",
  2: "border-l-accent",
  3: "border-l-blue-500",
  4: "border-l-purple-500",
};

export default function Index() {
  const { readSections } = useReadProgress();
  const totalSections = meetings.length + 4; // 4 intro + 8 meetings
  const progressPercent = (readSections.length / totalSections) * 100;

  const quickLinks = [
    { title: "खोजें", desc: "सभी विषयों में खोजें", icon: Search, to: "/search", color: "bg-primary/10 text-primary" },
    { title: "परिचय", desc: "मार्गदर्शिका का परिचय", icon: BookOpen, to: "/intro", color: "bg-accent/10 text-accent" },
    { title: "बुकमार्क", desc: "सहेजे गए अनुभाग", icon: Bookmark, to: "/bookmarks", color: "bg-blue-500/10 text-blue-500" },
    { title: "नोट्स", desc: "मेरे नोट्स देखें", icon: StickyNote, to: "/notes", color: "bg-purple-500/10 text-purple-500" },
  ];

  return (
    <Layout>
      <motion.div 
        className="max-w-5xl mx-auto p-4 md:p-8 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Hero */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary/15 via-primary/5 to-transparent rounded-2xl p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
            सहभागी सीख एवं क्रियान्वयन
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-2">
            आशा फ़ैसिलिटेटर के लिए मार्गदर्शिका — बिहार
          </p>
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>पढ़ने की प्रगति</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </motion.div>

        {/* Video Player */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl overflow-hidden border shadow-sm">
          <div className="px-6 py-4 border-b flex items-center gap-2">
             <PlayCircle className="w-5 h-5 text-primary" />
             <h2 className="font-semibold text-lg">PLA Masterclass Video (The Best Ever)</h2>
          </div>
          <div className="w-full aspect-video bg-black">
            <Player
              component={PLABiharComposition}
              durationInFrames={1500}
              fps={30}
              compositionWidth={1920}
              compositionHeight={1080}
              style={{ width: "100%", height: "100%" }}
              controls
              autoPlay={false}
            />
          </div>
        </motion.div>

        {/* Quick links */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickLinks.map(l => (
            <Link key={l.to} href={l.to}>
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                  <div className={`p-3 rounded-xl ${l.color}`}>
                    <l.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-sm">{l.title}</span>
                  <span className="text-xs text-muted-foreground">{l.desc}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </motion.div>

        {/* Meeting cycles */}
        {/* Using a separate motion container per cycle to keep staggering elegant */}
        {[1, 2, 3, 4].map(cycle => {
          const cycleMeetings = meetings.filter(m => m.cycle === cycle);
          if (cycleMeetings.length === 0) return null;
          return (
            <motion.div key={cycle} variants={itemVariants} className="space-y-3">
              <h2 className="text-lg font-semibold">{cycleNames[cycle]}</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {cycleMeetings.map(m => (
                  <Link key={m.id} href={`/meeting/${m.id}`}>
                    <Card className={`hover:shadow-lg transition-all border-l-4 ${cycleBorders[cycle]} bg-gradient-to-r ${cycleGradients[cycle]} h-full`}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{m.icon}</span>
                          <div>
                            <CardTitle className="text-base">बैठक {m.meetingNumber}</CardTitle>
                            <CardDescription className="text-sm mt-0.5">{m.title}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-xs text-muted-foreground line-clamp-2">{m.subtitle} • {m.duration}</p>
                        {readSections.includes(m.id) && (
                          <span className="inline-block mt-2 text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">✓ पढ़ा गया</span>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Layout>
  );
}
