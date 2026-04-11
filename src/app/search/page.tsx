"use client";

import { Layout } from "@/components/Layout";
import { useState, useMemo } from "react";
import { getAllSearchableContent } from "@/data/bookContent";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const allContent = useMemo(() => getAllSearchableContent(), []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return allContent
      .filter(item => item.title.toLowerCase().includes(q) || item.text.toLowerCase().includes(q))
      .map(item => {
        const idx = item.text.toLowerCase().indexOf(q);
        const start = Math.max(0, idx - 60);
        const end = Math.min(item.text.length, idx + q.length + 60);
        const snippet = (start > 0 ? '...' : '') + item.text.slice(start, end) + (end < item.text.length ? '...' : '');
        return { ...item, snippet };
      });
  }, [query, allContent]);

  const getLink = (item: { id: string; type: string }) => {
    return item.type === 'intro' ? '/intro' : `/meeting/${item.id}`;
  };

  const highlightMatch = (text: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.trim()})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.trim().toLowerCase()
        ? <mark key={i} className="bg-primary/30 text-foreground rounded px-0.5">{part}</mark>
        : part
    );
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6">
        <div className="bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl p-6">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <Search className="h-6 w-6" /> खोजें
          </h1>
          <p className="text-muted-foreground mt-1">सभी बैठकों और अनुभागों में खोजें</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="यहाँ खोजें... (उदा: एनीमिया, स्तनपान, रणनीति)"
            className="pl-10 text-base"
            autoFocus
          />
        </div>

        {query.trim() && (
          <p className="text-sm text-muted-foreground">{results.length} परिणाम मिले</p>
        )}

        <div className="space-y-3">
          {results.map(item => (
            <Link key={item.id} href={getLink(item)}>
              <Card className="hover:shadow-md transition-shadow mb-3">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {item.type === 'intro' ? 'परिचय' : 'बैठक'}
                    </Badge>
                    <h3 className="font-medium text-sm">{highlightMatch(item.title)}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    {highlightMatch(item.snippet)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {query.trim() && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">कोई परिणाम नहीं मिला</p>
            <p className="text-sm text-muted-foreground mt-1">कृपया अलग शब्दों से खोजें</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
