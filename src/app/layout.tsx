import type { Metadata } from "next";
import "./globals.css";
import SearchBar from "@/components/SearchBar";

export const metadata: Metadata = {
  verification: { google: "Y9bYAWGBOs0iyKHC2knpGdauqdjIi67FhxqLrjKarsM" },
  verification: { google: "Y9bYAWGBOs0iyKHC2knpGdauqdjIi67FhxqLrjKarsM" },
  metadataBase: new URL("https://gardening-tips.vercel.app"),
  title: { default: "Gardening Tips | Grow Something Beautiful 2026", template: "%s | Gardening Tips" },
  description: "Expert gardening guides, plant care tips, landscaping ideas, and sustainable growing advice.",
  keywords: ["gardening","plant care","landscaping","vegetable garden","indoor plants","composting"],
  openGraph: { type: "website", siteName: "Gardening Tips", title: "Gardening Tips | Plant Care & Design", description: "Grow better with expert gardening guides." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6600381860016497" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A1A0F]/90 border-b border-green-900/30">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">🌿</span>
              <span className="text-xl font-serif italic text-green-100">Gardening Tips</span>
            </a>
            <nav className="flex gap-8 text-sm">
              <a href="/" className="text-green-400/70 hover:text-green-300 transition-colors">Home</a>
              <a href="/articles" className="text-green-400/70 hover:text-green-300 transition-colors">All Guides</a>
              <a href="/#categories" className="text-green-400/70 hover:text-green-300 transition-colors">Topics</a>
            </nav>
            <SearchBar placeholder="Search plants..." className="w-44" />
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-green-900/20 bg-[#071208] py-12 mt-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-green-200 font-serif italic text-xl mb-2">🌱 Gardening Tips</p>
            <p className="text-green-700 text-sm mb-4">Growing knowledge, one garden at a time.</p>
            <div className="flex justify-center gap-6 text-sm text-green-700">
              <a href="/privacy" className="hover:text-green-400">Privacy</a>
              <a href="/terms" className="hover:text-green-400">Terms</a>
            </div>
            <p className="text-green-800 text-xs mt-8">© {new Date().getFullYear()}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}



