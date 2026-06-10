import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllSlugs, getAllArticles } from '@/lib/articles';
import BackToTop from '@/components/BackToTop';
import ReadingProgress from '@/components/ReadingProgress';
import AdSlot from '@/components/AdSlot';
import { remark } from 'remark';
import html from 'remark-html';

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title, description: article.excerpt, keywords: article.keywords,
    openGraph: { title: article.title, description: article.excerpt, type: 'article', publishedTime: article.date },
    alternates: { canonical: '/articles/' + slug },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const processed = await remark().use(html).process(article.content);
  const contentHtml = processed.toString();

  const paragraphs = contentHtml.split('</p>');
  const mid = Math.floor(paragraphs.length / 2);
  const firstHalf = paragraphs.slice(0, mid).join('</p>') + '</p>';
  const secondHalf = paragraphs.slice(mid).join('</p>');

  const related = getAllArticles().filter(a => a.category === article.category && a.slug !== slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: article.title, description: article.excerpt,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'Gardening Tips' },
    publisher: { '@type': 'Organization', name: 'Gardening Tips' },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gardening-tips.vercel.app' },
      { '@type': 'ListItem', position: 2, name: article.category, item: 'https://gardening-tips.vercel.app/category/' + article.category.toLowerCase().replace(/\s+/g, '-') },
      { '@type': 'ListItem', position: 3, name: article.title },
    ],
  };

  return (<>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-3xl mx-auto px-6 py-8 bg-[#0A1A0F]">
        <nav className="text-sm text-green-700 mb-6 font-serif">
          <a href="/" className="hover:text-green-400 transition-colors">Home</a>
          <span className="mx-2">&middot;</span>
          <a href={'/category/' + article.category.toLowerCase().replace(/\s+/g, '-')} className="hover:text-green-400 transition-colors">
            {article.category}
          </a>
          <span className="mx-2">&middot;</span>
          <span className="text-green-300 italic">{article.title}</span>
        </nav>

        <header className="mb-10">
          <span className="text-xs text-green-400 font-medium italic bg-green-900/20 px-3 py-1 rounded-full border border-green-800/30">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-serif italic text-green-100 mt-4 mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-green-700">
            <time dateTime={article.date}>{article.date}</time>
            <span>&middot;</span>
            <span>{article.readTime} min read</span>
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:text-green-200 prose-headings:font-serif
          prose-p:text-green-100/80 prose-p:leading-relaxed
          prose-strong:text-green-200
          prose-a:text-green-400 prose-a:no-underline hover:prose-a:text-green-300
          prose-img:rounded-2xl prose-img:shadow-lg prose-img:border prose-img:border-green-800/20
          prose-li:text-green-100/80 prose-li:marker:text-green-600
          prose-blockquote:border-green-700 prose-blockquote:text-green-400/70 prose-blockquote:italic"
          dangerouslySetInnerHTML={{ __html: firstHalf }} />

        <AdSlot id={'article-mid-' + slug} />

        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:text-green-200 prose-headings:font-serif
          prose-p:text-green-100/80 prose-p:leading-relaxed
          prose-strong:text-green-200
          prose-a:text-green-400 prose-a:no-underline hover:prose-a:text-green-300
          prose-img:rounded-2xl prose-img:shadow-lg prose-img:border prose-img:border-green-800/20
          prose-li:text-green-100/80 prose-li:marker:text-green-600"
          dangerouslySetInnerHTML={{ __html: secondHalf }} />

        <AdSlot id={'article-bottom-' + slug} />

        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-green-900/30">
            <h2 className="text-xl font-serif italic text-green-200 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map(r => (
                <a key={r.slug} href={'/articles/' + r.slug}
                  className="bg-[#0D2012] border border-green-800/30 rounded-xl p-4 hover:border-green-500/40 hover:bg-[#0F2615] transition group">
                  <span className="text-xs text-green-400 italic">{r.category}</span>
                  <h3 className="font-serif text-base text-green-100 mt-2 line-clamp-2 group-hover:text-green-300 transition-colors">{r.title}</h3>
                  <p className="text-xs text-green-800 mt-2">{r.date} &middot; {r.readTime} min</p>
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
      <BackToTop />
    </>
  );
}
