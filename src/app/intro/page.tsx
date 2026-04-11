"use client";

import { Layout } from "@/components/Layout";
import { introSections } from "@/data/bookContent";
import { useReadProgress } from "@/hooks/useReadProgress";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useEffect } from "react";

export default function IntroPage() {
  const { markAsRead } = useReadProgress();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    introSections.forEach(s => markAsRead(s.id));
  }, [markAsRead]);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6">
        <div className="bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl p-6">
          <h1 className="text-xl md:text-2xl font-bold">📖 मार्गदर्शिका परिचय</h1>
          <p className="text-muted-foreground mt-1">सहभागी सीख एवं क्रियान्वयन (पी.एल.ए.) के बारे में</p>
        </div>

        {introSections.map(section => {
          const bookmarked = isBookmarked(section.id);
          return (
            <Card key={section.id}>
              <CardHeader className="pb-2 flex-row items-center justify-between">
                <CardTitle className="text-base">{section.title}</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleBookmark(section.id)}>
                  {bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary fill-primary" /> : <Bookmark className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {section.content.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed">{p}</p>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Layout>
  );
}
