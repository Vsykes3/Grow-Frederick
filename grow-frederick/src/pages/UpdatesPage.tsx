import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, AlertTriangle, Users, Newspaper } from 'lucide-react';
import { Button } from '/src/components/ui/Button';
import { ProBadge } from '/src/components/ui/ProBadge';

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-gc-light/20">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h1 className="text-3xl font-bold text-gc-dark">
                Updates & News
              </h1>
              <p className="text-muted-foreground mt-2">
                Stay informed with the latest gardening news, weather alerts, and community updates
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Newspaper className="w-16 h-16 text-gc-accent mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gc-dark mb-4">
            Coming Soon
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            We're working on bringing you the latest gardening news, weather alerts, and community updates.
          </p>
          <Button>
            <ProBadge size="sm" className="mr-2" />
            Get Early Access
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

