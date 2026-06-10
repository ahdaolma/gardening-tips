import { getAllArticles, getCategories } from '@/lib/articles';
import AdSlot from '@/components/AdSlot';

const seasons = [
  { name: 'Spring', emoji: '🌸', months: 'Mar-May', color: 'season-spring', tasks: 'Planting, Pruning, Soil Prep' },
  { name: 'Summer', emoji: '☀️', months: 'Jun-Aug', color: 'season-summer', tasks: 'Watering, Harvesting, Pest Control' },
  { name: 'Fall', emoji: '🍂', months: 'Sep-Nov', color: 'season-fall', tasks: 'Cleanup, Mulching, Bulb Planting' },
  { name: 'Winter', emoji: '❄️', months: 'Dec-Feb', color: 'season-winter', tasks: 'Planning, Tool Care, Indoor Gardening' },
];

const quickPlants = [
  { emoji: '🪴', name: 'Snake Plant', slug: 'air-purifying-plants-guide' },
  { emoji: '🌿', name: 'Basil', slug: 'growing-basil-indoors-guide' },
  { emoji: '🍓', name: 'Strawberries', slug: 'growing-strawberries-guide' },
  { emoji: '🌻', name: 'Sunflowers', slug: 'growing-sunflowers-guide' },
  { emoji: '🍋', name: 'Citrus Trees', slug: 'citrus-tree-in-containers-guide' },
  { emoji: '🫐', name: 'Blueberries', slug: 'blueberry-bush-care-guide' },
];

export default async function HomePage() {
  const articles = getAllArticles();
  const categories = getCategories();

  return (
    <>
      {/* Hero - Organic Nature */}
      <section style={{background: 'linear-gradient(180deg, #071A0E 0%, #0D2B1A 30%, #132A1A 60%, #0A1A0F 100%)'}} className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {['🌿','🌱','🍃','🌺','🌻','🌾','🍀','🪴','🌵','🌸','🌼','💐'].map((e,i) => (
            <span key={i} className="absolute text-6xl" style={{left: `${(i*8 + 5)%95}%`, top: `${(i*12 + 3)%90}%`, transform: `rotate(${i*25}deg)`}}>{e}</span>
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-6 py-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-900/30 border border-green-700/20 rounded-full mb-8">
            <span className="text-green-400 text-xs font-semibold tracking-wide">🌱 100+ GARDENING GUIDES</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic font-bold mb-6" style={{color: '#D1E8D2'}}>
            Grow Something<br/><span style={{color: '#4ADE80'}}>Beautiful</span>
          </h1>
          <p className="text-green-300/70 text-lg max-w-xl mx-auto mb-10 font-serif">
            Expert plant care, landscape design, and sustainable gardening guides for every season and skill level.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/articles" className="px-8 py-3.5 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-2xl transition shadow-lg shadow-green-700/20">
              Browse All Guides →
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        {/* Seasonal Garden Wheel */}
        <section className="my-16">
          <h2 className="text-2xl font-serif italic text-green-200 mb-8 text-center">📅 Seasonal Garden Guide</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {seasons.map(s => (
              <div key={s.name} className="leaf-card p-6 text-center">
                <span className="text-4xl block mb-3">{s.emoji}</span>
                <h3 className={`text-sm font-bold mb-2 ${s.color} m-0`}>{s.name}</h3>
                <p className="text-xs text-green-600 mb-1">{s.months}</p>
                <p className="text-xs text-green-400/70">{s.tasks}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Plant Finder */}
        <section className="my-16 bg-[#0F1F14] border border-green-900/20 rounded-3xl p-8">
          <h2 className="text-2xl font-serif italic text-green-200 mb-6 text-center">🔍 Quick Plant Finder</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {quickPlants.map(p => (
              <a key={p.slug} href={`/articles/${p.slug}`} className="leaf-card p-4 text-center">
                <span className="text-3xl block mb-2">{p.emoji}</span>
                <span className="text-xs text-green-300">{p.name}</span>
              </a>
            ))}
          </div>
        </section>

        <AdSlot id='home-top' />

        {/* Categories - Scrolling Row */}
        <section id='categories' className='my-16'>
          <h2 className="text-2xl font-serif italic text-green-200 mb-8">📚 Explore by Topic</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map(cat => (
              <a key={cat.slug} href={'/category/' + cat.slug} className='leaf-card p-5 text-center'>
                <span className='text-3xl block mb-3'>{cat.icon}</span>
                <span className='font-semibold text-sm text-green-100'>{cat.name}</span>
                <span className='text-xs text-green-600 block mt-2'>{cat.count} guides</span>
              </a>
            ))}
          </div>
        </section>

        <AdSlot id='home-middle' />

        {/* Latest */}
        <section className='my-16'>
          <h2 className="text-2xl font-serif italic text-green-200 mb-8">🌿 Latest Guides</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {articles.slice(0, 9).map(article => (
              <a key={article.slug} href={'/articles/' + article.slug} className='leaf-card p-6'>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{article.category === 'Vegetables' ? '🥕' : article.category === 'Flowers' ? '🌸' : article.category === 'Indoor Plants' ? '🪴' : '🌿'}</span>
                  <span className="text-xs text-green-600">{article.category}</span>
                </div>
                <h3 className="font-serif font-bold text-green-100 mb-2 line-clamp-2 text-base">{article.title}</h3>
                <p className="text-xs text-green-700">{article.date} · {article.readTime} min</p>
              </a>
            ))}
          </div>
        </section>

        <AdSlot id='home-bottom' />
      </div>
    </>
  );
}
