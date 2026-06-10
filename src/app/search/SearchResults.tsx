"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  keywords: string[];
}

const ICONS: Record<string, string> = {
  Vegetables: "🥕",
  "Indoor Plants": "🪴",
  Flowers: "🌸",
  Landscaping: "🏡",
  Herbs: "🌿",
  Fruits: "🍎",
  Succulents: "🌵",
  Composting: "♻️",
  General: "🌱",
};

function Results({ articles }: { articles: Article[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Article[]>([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.keywords.some((k) => k.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query, articles]);

  if (!query) {
    return (
      <div className="text-center py-20">
        <span className="text-6xl block mb-4">🔍</span>
        <p className="text-green-300/70 text-lg font-serif">
          Search hundreds of gardening and plant care guides.
        </p>
        <Link
          href="/articles"
          className="inline-block mt-4 text-green-400 hover:underline font-medium"
        >
          Browse all guides →
        </Link>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="text-6xl block mb-4">😕</span>
        <p className="text-green-100 text-lg font-serif">
          No results for &ldquo;{query}&rdquo;
        </p>
        <Link
          href="/articles"
          className="inline-block mt-2 text-green-400 hover:underline"
        >
          Browse all guides →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-green-400/60 mb-6 text-sm">
        {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;
        {query}&rdquo;
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((a) => (
          <Link
            key={a.slug}
            href={`/articles/${a.slug}`}
            className="block p-5 rounded-xl bg-[#0D2012] border border-green-800/30 hover:border-green-500/50 hover:bg-[#0F2615] transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span>{ICONS[a.category] || "🌱"}</span>
              <span className="text-xs font-medium text-green-400/70 bg-green-900/20 px-2 py-0.5 rounded">
                {a.category}
              </span>
            </div>
            <h3 className="text-lg font-bold text-green-100 font-serif group-hover:text-green-300 mb-1.5">
              {a.title}
            </h3>
            <p className="text-green-700 text-sm line-clamp-2">{a.excerpt}</p>
            <div className="flex gap-3 mt-3 text-xs text-green-700/60">
              <span>{a.date}</span>
              <span>{a.readTime} min read</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SearchResults({ articles }: { articles: Article[] }) {
  return (
    <div className="min-h-screen bg-[#0A1A0F]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-green-100 font-serif mb-2">
          Search Guides
        </h1>
        <p className="text-green-700 mb-8">
          Find the best gardening tips and plant care advice.
        </p>
        <Suspense
          fallback={
            <div className="text-center py-12 text-green-400 animate-pulse">
              Loading...
            </div>
          }
        >
          <Results articles={articles} />
        </Suspense>
      </div>
    </div>
  );
}
