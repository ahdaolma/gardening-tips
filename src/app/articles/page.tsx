import { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "All Guides | Gardening Tips",
  description: "Browse 100+ expert gardening guides. Plant care, landscaping, vegetables, and indoor gardening.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-serif italic text-green-100 mb-2">All Gardening Guides</h1>
      <p className="text-green-400/70 mb-8">{articles.length} guides to help your garden thrive.</p>
      <AdSlot id="articles-top" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
