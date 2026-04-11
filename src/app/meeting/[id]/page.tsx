"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Layout } from "@/components/Layout";
import { meetings, cycleNames } from "@/data/bookContent";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useNotes } from "@/hooks/useNotes";
import { useReadProgress } from "@/hooks/useReadProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, Clock, Target, Wrench, Package, Trash2, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, type: "spring" as const, stiffness: 260, damping: 22 }
  })
};

export default function MeetingPage() {
  const { id } = useParams<{ id: string }>();
  const meeting = meetings.find(m => m.id === id);
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { addNote, getNotesForSection, deleteNote } = useNotes();
  const { markAsRead } = useReadProgress();
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    if (id) markAsRead(id);
  }, [id, markAsRead]);

  if (!meeting) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-muted-foreground">बैठक नहीं मिली</p>
        </div>
      </Layout>
    );
  }

  const currentIndex = meetings.findIndex(m => m.id === id);
  const prev = currentIndex > 0 ? meetings[currentIndex - 1] : null;
  const next = currentIndex < meetings.length - 1 ? meetings[currentIndex + 1] : null;
  const sectionNotes = getNotesForSection(meeting.id);
  const bookmarked = isBookmarked(meeting.id);

  const handleAddNote = () => {
    if (noteText.trim()) {
      addNote(meeting.id, noteText.trim());
      setNoteText("");
    }
  };

  const cycleBg: Record<number, string> = {
    1: "from-primary/15 to-primary/5",
    2: "from-accent/15 to-accent/5",
    3: "from-blue-500/15 to-blue-500/5",
    4: "from-purple-500/15 to-purple-500/5",
  };

  return (
    <Layout>
      <motion.div
        className="max-w-3xl mx-auto p-4 md:p-8 space-y-6"
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div variants={fadeUp} custom={0} className={`bg-gradient-to-br ${cycleBg[meeting.cycle]} rounded-2xl p-6`}>
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="secondary" className="mb-2">{cycleNames[meeting.cycle]}</Badge>
              <h1 className="text-xl md:text-2xl font-bold flex items-center gap-3">
                <span className="text-3xl">{meeting.icon}</span>
                बैठक {meeting.meetingNumber}
              </h1>
              <p className="text-lg text-muted-foreground mt-1">{meeting.title}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{meeting.subtitle}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => toggleBookmark(meeting.id)} className="shrink-0">
              {bookmarked ? <BookmarkCheck className="h-5 w-5 text-primary fill-primary" /> : <Bookmark className="h-5 w-5" />}
            </Button>
          </div>
        </motion.div>

        {/* Meta info */}
        <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Clock, label: "समय", value: meeting.duration },
            { icon: Target, label: "उद्देश्य", value: `${meeting.objectives.length} उद्देश्य` },
            { icon: Wrench, label: "पद्धति", value: meeting.method },
            { icon: Package, label: "सामग्री", value: meeting.materials },
          ].map((item, i) => (
            <Card key={i}>
              <CardContent className="p-3 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <item.icon className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
                <p className="text-xs leading-tight">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Objectives */}
        <motion.div variants={fadeUp} custom={2}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" /> उद्देश्य
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {meeting.objectives.map((obj, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="text-primary font-bold shrink-0">{i + 1}.</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content */}
        {meeting.content.length > 0 && (
          <motion.div variants={fadeUp} custom={3}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">विषय सामग्री</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {meeting.content.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed">{p}</p>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Activities */}
        <motion.div variants={fadeUp} custom={4} className="space-y-4">
          <h2 className="text-lg font-semibold">गतिविधियाँ</h2>
          {meeting.activities.map((activity, i) => (
            <Card key={i} className="border-l-4 border-l-primary/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">{activity.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {activity.description.map((d, j) => (
                  <p key={j} className="text-sm leading-relaxed text-muted-foreground">{d}</p>
                ))}
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Closing */}
        <motion.div variants={fadeUp} custom={5}>
          <Card className="bg-muted/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">बैठक का समापन</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5">
                {meeting.closingNotes.map((n, i) => (
                  <li key={i} className="text-sm flex gap-2">
                    <span className="text-muted-foreground">•</span> {n}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notes */}
        <motion.div variants={fadeUp} custom={6}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">📝 मेरे नोट्स</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Textarea
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  placeholder="यहाँ अपना नोट लिखें..."
                  className="text-sm min-h-[60px]"
                />
                <Button size="icon" onClick={handleAddNote} disabled={!noteText.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {sectionNotes.map(note => (
                <div key={note.id} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm flex-1">{note.text}</p>
                  <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => deleteNote(note.id)}>
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div variants={fadeUp} custom={7} className="flex justify-between pt-4">
          {prev ? (
            <Link href={`/meeting/${prev.id}`}>
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4 mr-1" /> बैठक {prev.meetingNumber}
              </Button>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/meeting/${next.id}`}>
              <Button variant="outline" size="sm">
                बैठक {next.meetingNumber} <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          ) : <div />}
        </motion.div>
      </motion.div>
    </Layout>
  );
}
