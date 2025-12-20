'use client'

import React, { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  source: string;
  category: 'gardening' | 'pest' | 'weather';
  location: string;
  date: string;
  featured: boolean;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'gardening' | 'pest' | 'weather'>('all');
  const [error, setError] = useState('');

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Load from JSON file
      const response = await fetch('/data/news-articles.json');
      
      if (!response.ok) {
        throw new Error('Failed to load news articles');
      }
      
      const articles: NewsArticle[] = await response.json();
      
      // Sort by date (newest first)
      const sorted = articles.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      setNews(sorted);
    } catch (err: any) {
      console.error('Error loading news:', err);
      setError('Unable to load news articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = filter === 'all' 
    ? news 
    : news.filter(article => article.category === filter);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'gardening':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pest':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'weather':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'gardening':
        return '🌱';
      case 'pest':
        return '🐛';
      case 'weather':
        return '🌤️';
      default:
        return '📰';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="text-6xl mb-4 animate-pulse">📰</div>
          <p className="text-xl">Loading latest gardening news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-xl text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={loadNews}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-foreground">Gardening News & Alerts</h1>
        <p className="text-muted-foreground">
          Stay updated with the latest gardening tips, pest alerts, and weather warnings from trusted sources
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {['all', 'gardening', 'pest', 'weather'].map(category => (
          <button
            key={category}
            onClick={() => setFilter(category as any)}
            className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition ${
              filter === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category === 'all' && 'All News'}
            {category === 'gardening' && 'Gardening'}
            {category === 'pest' && 'Pest Alerts'}
            {category === 'weather' && 'Weather'}
          </button>
        ))}
      </div>

      {/* Featured Articles */}
      {filter === 'all' && news.filter(a => a.featured).length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Stories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {news.filter(a => a.featured).slice(0, 2).map(article => (
              <article
                key={article.id}
                className="bg-card rounded-lg overflow-hidden border-2 border-primary shadow-lg hover:shadow-xl transition"
              >
                {/* Article Image */}
                <div className="relative h-64 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 flex items-center justify-center">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover absolute inset-0"
                    onError={(e) => {
                      // Show category icon instead of broken image
                      const img = e.target as HTMLImageElement;
                      img.style.display = 'none';
                      const iconDiv = img.parentElement?.querySelector('.category-icon-large');
                      if (iconDiv) (iconDiv as HTMLElement).classList.remove('hidden');
                    }}
                  />
                  <div className={`category-icon-large hidden text-8xl opacity-50`}>
                    {getCategoryIcon(article.category)}
                  </div>
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(article.category)}`}>
                      {article.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                    <span className="font-semibold">{article.source}</span>
                    <span>•</span>
                    <span>📍 {article.location}</span>
                    <span>•</span>
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-foreground hover:text-primary transition">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {article.description}
                  </p>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
                  >
                    Read More →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* All Articles Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">
          {filter === 'all' ? 'Latest News' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} News`}
        </h2>
        
        {filteredNews.length === 0 ? (
          <div className="text-center py-16 bg-muted rounded-lg">
            <p className="text-xl text-muted-foreground">
              No {filter !== 'all' ? filter : ''} news articles available.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredNews.map(article => (
              <article
                key={article.id}
                className="bg-card rounded-lg overflow-hidden border-2 border-border hover:border-primary transition shadow-md hover:shadow-lg"
              >
                <div className="md:flex">
                  {/* Article Image */}
                  <div className="md:w-1/3 relative">
                    <div className="w-full h-64 md:h-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 flex items-center justify-center">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover absolute inset-0"
                        onError={(e) => {
                          // Show category icon instead of broken image
                          const img = e.target as HTMLImageElement;
                          img.style.display = 'none';
                          const iconDiv = img.parentElement?.querySelector('.category-icon');
                          if (iconDiv) (iconDiv as HTMLElement).classList.remove('hidden');
                        }}
                      />
                      <div className={`category-icon hidden text-6xl ${article.imageUrl ? '' : ''}`}>
                        {getCategoryIcon(article.category)}
                      </div>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        📍 {article.location}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-foreground hover:text-primary transition">
                      {article.title}
                    </h3>

                    <p className="text-muted-foreground mb-4">
                      {article.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-muted-foreground">
                        Source: {article.source}
                      </span>
                      
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* News Sources Footer */}
      <div className="mt-12 p-6 bg-muted rounded-lg border border-border">
        <h3 className="text-lg font-bold mb-3 text-foreground">Trusted News Sources</h3>
        <p className="text-sm text-muted-foreground mb-3">
          GrowCommon aggregates gardening news from trusted publications including:
        </p>
        <div className="flex flex-wrap gap-3">
          {['The New York Times', 'The Independent', 'Fine Gardening', 'U.S. News', 'WTOP News', 'The Sun', 'National Garden Clubs'].map(source => (
            <span key={source} className="px-3 py-1 bg-card border border-border rounded-full text-sm font-semibold text-foreground">
              {source}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
