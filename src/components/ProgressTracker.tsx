import React, { useState, useEffect } from 'react';
import { Trophy, Target, Calendar, Clock, TrendingUp, Flame } from 'lucide-react';
import { storage } from '../utils/storage';

interface ProgressTrackerProps {
  onClose?: () => void;
}

export function ProgressTracker({ onClose }: ProgressTrackerProps) {
  const [stats, setStats] = useState(storage.getWorkoutStats());
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    setStats(storage.getWorkoutStats());
  }, []);

  const getStreakMessage = () => {
    if (stats.currentStreak === 0) {
      return "Start your fitness journey today!";
    } else if (stats.currentStreak === 1) {
      return "Great start! Keep it going!";
    } else if (stats.currentStreak < 7) {
      return `Awesome! ${stats.currentStreak} day streak!`;
    } else if (stats.currentStreak < 30) {
      return `Incredible! ${stats.currentStreak} day streak!`;
    } else {
      return `Legendary! ${stats.currentStreak} day streak!`;
    }
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Every workout counts!",
      "Consistency is key!",
      "You're stronger than you think!",
      "Progress, not perfection!",
      "Keep pushing forward!",
      "You're building healthy habits!",
      "Every rep matters!",
      "Stay committed to your goals!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-secondary-light/50 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading text-accent">Your Progress</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-accent/70 hover:text-accent transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Streak Section */}
      <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <Flame className="h-6 w-6 mr-2" />
              <span className="text-lg font-heading">Current Streak</span>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.currentStreak} days</div>
            <p className="text-orange-100 text-sm">{getStreakMessage()}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-orange-100">Best Streak</div>
            <div className="text-2xl font-bold">{stats.longestStreak} days</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary/10 rounded-xl p-4 text-center">
          <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-accent">{stats.totalWorkouts}</div>
          <div className="text-sm text-accent/70">Total Workouts</div>
        </div>

        <div className="bg-accent/10 rounded-xl p-4 text-center">
          <Calendar className="h-8 w-8 text-accent mx-auto mb-2" />
          <div className="text-2xl font-bold text-accent">{stats.workoutsThisWeek}</div>
          <div className="text-sm text-accent/70">This Week</div>
        </div>

        <div className="bg-secondary-light/10 rounded-xl p-4 text-center">
          <Target className="h-8 w-8 text-secondary-light mx-auto mb-2" />
          <div className="text-2xl font-bold text-accent">{stats.workoutsThisMonth}</div>
          <div className="text-sm text-accent/70">This Month</div>
        </div>

        <div className="bg-green-500/10 rounded-xl p-4 text-center">
          <Clock className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-accent">{stats.averageWorkoutDuration}</div>
          <div className="text-sm text-accent/70">Avg Duration (min)</div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 text-center">
        <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
        <p className="text-accent font-body">{getMotivationalMessage()}</p>
      </div>

      {/* Progress Tips */}
      <div className="mt-6">
        <h3 className="text-lg font-heading text-accent mb-4">Tips to Keep Going</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">1</div>
            <p className="text-accent/70 text-sm font-body">Set a consistent workout time each day</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">2</div>
            <p className="text-accent/70 text-sm font-body">Start with shorter workouts if you're struggling</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">3</div>
            <p className="text-accent/70 text-sm font-body">Track your progress and celebrate small wins</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">4</div>
            <p className="text-accent/70 text-sm font-body">Don't be too hard on yourself - consistency over perfection</p>
          </div>
        </div>
      </div>
    </div>
  );
}
