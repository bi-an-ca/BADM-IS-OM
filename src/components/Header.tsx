import React from 'react';
import { Dumbbell } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-secondary-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-xl">
              <Dumbbell className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-heading text-accent">Momentum</h1>
              <p className="text-sm text-accent/70 font-body">Fitness made simple, safe, and accessible</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}