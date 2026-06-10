import type { ArticleMeta } from '@/lib/articles';

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <a href={'/articles/' + article.slug} className="card-game block group">
      {/* Image placeholder with gradient */}
      <div className="h-40 bg-gradient-to-br from-green-900/50 via-green-800/30 to-emerald-900/20 flex items-center justify-center relative overflow-hidden">
        <span className="text-5xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500">🌿</span>
        <div className="absolute top-3 left-3">
          <span className="tag">{article.category}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-100 mb-2 group-hover:text-green-300 transition-colors line-clamp-2 m-0">
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>📅 {article.date}</span>
          <span>⏱ {article.readTime} min</span>
        </div>
      </div>
    </a>
  );
}

