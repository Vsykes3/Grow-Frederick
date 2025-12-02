'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, User, Tag, ArrowRight, Search, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  category: string;
  readTime: string;
  imageUrl: string;
  slug: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Gardening in Frederick County: A Complete Guide for Zone 6b-7a',
    excerpt: 'Learn the fundamentals of gardening in Frederick County\'s unique climate. From understanding your hardiness zone to selecting the right plants, this comprehensive guide will help you start your gardening journey with confidence.',
    author: 'Maxwell Liu',
    publishedAt: new Date().toISOString(),
    category: 'Getting Started',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=500&fit=crop&q=80',
    slug: 'getting-started-frederick-county-gardening',
    featured: true
  },
  {
    id: '2',
    title: 'From Tics to Tomatoes: My Journey with Tourette\'s and Gardening',
    excerpt: 'A deeply personal story about finding peace through gardening while living with Tourette\'s Syndrome. Discover how getting your hands dirty can transform your life and create a space where you belong just as you are.',
    author: 'Maxwell Liu',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Horticultural Therapy',
    readTime: '15 min read',
    imageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&h=500&fit=crop&q=80',
    slug: 'horticultural-therapy-tourettes',
    featured: true
  },
  {
    id: '3',
    title: 'Best Vegetables to Grow in Maryland: Top 10 Picks for Zone 6b-7a',
    excerpt: 'Discover the most successful vegetables for Maryland gardens. From tomatoes to leafy greens, learn which varieties thrive in our climate and how to maximize your harvest.',
    author: 'GrowCommon Team',
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Vegetable Gardening',
    readTime: '10 min read',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=500&fit=crop&q=80',
    slug: 'best-vegetables-maryland-zone-6b-7a',
    featured: false
  },
  {
    id: '4',
    title: 'Native Plants for Frederick County: Supporting Local Ecosystems',
    excerpt: 'Explore the beautiful native plants that thrive in Frederick County. Learn how native gardening supports local wildlife, requires less maintenance, and creates a sustainable landscape.',
    author: 'GrowCommon Team',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Native Plants',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop&q=80',
    slug: 'native-plants-frederick-county',
    featured: false
  },
  {
    id: '5',
    title: 'Companion Planting Guide: Maximize Your Garden\'s Potential',
    excerpt: 'Learn which plants work best together to improve yields, deter pests, and create a more productive garden. This guide covers the science behind companion planting and practical combinations for your garden.',
    author: 'GrowCommon Team',
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Garden Planning',
    readTime: '9 min read',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop&q=80',
    slug: 'companion-planting-guide',
    featured: false
  },
  {
    id: '6',
    title: 'Soil Health 101: Testing and Amending Your Garden Soil',
    excerpt: 'Healthy soil is the foundation of a successful garden. Learn how to test your soil, understand pH levels, and amend it for optimal plant growth in Frederick County.',
    author: 'GrowCommon Team',
    publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Soil Health',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=500&fit=crop&q=80',
    slug: 'soil-health-testing-amending',
    featured: false
  },
  {
    id: '8',
    title: 'Container Gardening for Small Spaces: Grow Food Anywhere',
    excerpt: 'Don\'t have a large yard? No problem! Learn how to grow vegetables, herbs, and flowers in containers. Perfect for apartments, patios, and small urban spaces.',
    author: 'GrowCommon Team',
    publishedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Container Gardening',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&h=500&fit=crop&q=80',
    slug: 'container-gardening-small-spaces',
    featured: false
  }
];

const categories = ['All', 'Getting Started', 'Horticultural Therapy', 'Vegetable Gardening', 'Native Plants', 'Garden Planning', 'Soil Health', 'Container Gardening'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-gc-accent/10 to-green-700/10 border-b border-gc-light/20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <BookOpen className="h-10 w-10" />
              GrowCommon Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Expert gardening advice, tips, and stories from Frederick County and beyond. 
              Learn, grow, and connect with our community.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gc-accent"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === 'All' && searchQuery === '' && featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-200">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-gc-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="group-hover:text-gc-accent">
                          Read More
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {selectedCategory === 'All' && searchQuery === '' ? 'All Articles' : 'Search Results'}
          </h2>
          {regularPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-200 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-gc-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs group-hover:text-gc-accent">
                          Read More
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

