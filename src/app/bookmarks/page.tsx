"use client";

import { Layout } from "@/components/Layout";
import { useBookmarks } from "@/hooks/useBookmarks";
import { meetings, introSections } from "@/data/bookContent";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useBookmarks();

  const bookmarkedItems = bookmarks.map(id => {
    const meeting = meetings.find(m => m.id === id);
    if (meeting) return { id, title: `बैठक ${meeting.meetingNumber}: ${meeting.title}`, icon: meeting.icon, link: `/meeting/${meeting.id}`, type: 'meeting' as const };
    const intro = introSections.find(s => s.id === id);
    if (intro) return { id, title: intro.title, icon: '📖', link: '/intro', type: 'intro' as const };
    return null;
  }).filter(Boolean);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6">
        <div className="bg-gradient-to-br from-blue-500/15 to-blue-500/5 rounded-2xl p-6">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <Bookmark className="h-6 w-6" /> मेरे बुकमार्क
          </h1>
          <p className="text-muted-foreground mt-1">{bookmarkedItems.length} अनुभाग सहेजे गए</p>
        </div>

        {bookmarkedItems.length === 0 ? (
          <div className="text-center py-12">
            <BookmarkCheck className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">कोई बुकमार्क नहीं</p>
            <p className="text-sm text-muted-foreground mt-1">किसी भी अनुभाग में बुकमार्क बटन दबाएं</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookmarkedItems.map(item => item && (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <Link href={item.link} className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{item.title}</h3>
                  </Link>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => toggleBookmark(item.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
