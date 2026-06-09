import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gardening-tips.vercel.app"),
  title: {
    default: "Gardening Tips | Expert Tips",
    template: "%s | Gardening Tips",
  },
  description: "Expert gardening tips guides, gardening tips tips, and gardening tips.",
  keywords: ["gardening tips","gardening tips","gardening tips","gardening tips","gardening tips","gardening tips","gardening tips","gardening tips"],
  openGraph: {
    type: "website", siteName: "Gardening Tips",
    title: "Gardening Tips | Expert Advice",
    description: "Expert gardening tips guides and gardening tips tips for every room.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6600381860016497" crossOrigin="anonymous" />
      </head>
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-blue-600">Gardening Tips</a>
            <nav className="flex gap-6 text-sm">
              <a href="/" className="hover:text-blue-600">Home</a>
              <a href="/#categories" className="hover:text-blue-600">Categories</a>
              <a href="/#latest" className="hover:text-blue-600">Latest</a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-gray-200 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Gardening Tips. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="/privacy" className="hover:text-blue-600">Privacy Policy</a>
              <a href="/terms" className="hover:text-blue-600">Terms</a>
              <a href="/sitemap.xml" className="hover:text-blue-600">Sitemap</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
