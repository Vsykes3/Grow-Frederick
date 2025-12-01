import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '/src/components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          className="max-w-2xl mx-auto space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Animation */}
          <motion.div
            className="text-8xl md:text-9xl font-bold text-gc-accent mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            404
          </motion.div>

          {/* Plant Illustration */}
          <motion.div
            className="text-6xl mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            ðŸŒ±
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-gc-dark mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Looks like this page has gone to seed! The page you're looking for 
            doesn't exist or has been moved to a different location.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="text-lg px-8">
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Search Suggestion */}
          <motion.div
            className="mt-12 p-6 bg-gc-cream rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-gc-dark mb-3">
              Looking for something specific?
            </h3>
            <p className="text-muted-foreground mb-4">
              Try searching for plants, weather information, or gardening tips.
            </p>
            <Link to="/plants">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Browse Plants
              </Button>
            </Link>
          </motion.div>

          {/* Popular Links */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-sm text-muted-foreground mb-4">
              Popular pages:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/plants" className="text-gc-accent hover:text-gc-dark transition-colors">
                Plant Index
              </Link>
              <Link to="/calendar" className="text-gc-accent hover:text-gc-dark transition-colors">
                Calendar
              </Link>
              <Link to="/map" className="text-gc-accent hover:text-gc-dark transition-colors">
                Weather Map
              </Link>
              <Link to="/about" className="text-gc-accent hover:text-gc-dark transition-colors">
                About Us
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

