"use client";

import { Layout } from "@/components/Layout";
import { useNotes } from "@/hooks/useNotes";
import { meetings } from "@/data/bookContent";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StickyNote, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function NotesPage() {
  const { notes, deleteNote } = useNotes();

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6">
        <div className="bg-gradient-to-br from-purple-500/15 to-purple-500/5 rounded-2xl p-6">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <StickyNote className="h-6 w-6" /> मेरे नोट्स
          </h1>
          <p className="text-muted-foreground mt-1">{notes.length} नोट्स</p>
        </div>

        {notes.length === 0 ? (
          <div className="text-center py-12">
            <StickyNote className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">कोई नोट्स नहीं</p>
            <p className="text-sm text-muted-foreground mt-1">किसी भी बैठक पृष्ठ पर नोट जोड़ें</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map(note => {
              const meeting = meetings.find(m => m.id === note.sectionId);
              return (
                <Card key={note.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      {meeting ? (
                        <Link href={`/meeting/${meeting.id}`} className="text-xs text-primary font-medium hover:underline">
                          {meeting.icon} बैठक {meeting.meetingNumber}: {meeting.title}
                        </Link>
                      ) : (
                        <span className="text-xs text-muted-foreground">परिचय</span>
                      )}
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteNote(note.id)}>
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                    <p className="text-sm">{note.text}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(note.createdAt).toLocaleDateString('hi-IN')}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
