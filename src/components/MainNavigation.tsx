import React from 'react';
import { 
  Home, 
  Dumbbell, 
  BookOpen, 
  BarChart3, 
  User, 
  Play,
  Calendar,
  Target
} from 'lucide-react';

export type NavigationTab = 'home' | 'programs' | 'exercises' | 'progress' | 'profile';

interface MainNavigationProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  hasSupabase: boolean;
  user: any;
}

export function MainNavigation({ activeTab, onTabChange, hasSupabase, user }: MainNavigationProps) {
  const navigationItems = [
    {
      id: 'home' as NavigationTab,
      label: 'Home',
      icon: Home,
      description: 'Dashboard and today\'s workout'
    },
    {
      id: 'programs' as NavigationTab,
      label: 'Programs',
      icon: Dumbbell,
      description: 'Workout programs and routines'
    },
    {
      id: 'exercises' as NavigationTab,
      icon: BookOpen,
      label: 'Exercises',
      description: 'Exercise library and guides'
    },
    {
      id: 'progress' as NavigationTab,
      label: 'Progress',
      icon: BarChart3,
      description: 'Track your fitness journey'
    },
    {
      id: 'profile' as NavigationTab,
      label: 'Profile',
      icon: User,
      description: 'Account and preferences'
    }
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-t border-secondary-light/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center py-3 px-2 min-w-0 flex-1 transition-all duration-300 group ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-accent/60 hover:text-accent'
                }`}
              >
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary/10' 
                    : 'group-hover:bg-accent/10'
                }`}>
                  <IconComponent className={`h-5 w-5 transition-all duration-300 ${
                    isActive ? 'scale-110' : 'group-hover:scale-105'
                  }`} />
                </div>
                <span className={`text-xs font-body mt-1 transition-all duration-300 ${
                  isActive ? 'font-semibold' : 'font-medium'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

// Quick Action Buttons for Home Tab
export function QuickActions({ onStartWorkout, onViewPrograms, onBrowseExercises }: {
  onStartWorkout: () => void;
  onViewPrograms: () => void;
  onBrowseExercises: () => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <button
        onClick={onStartWorkout}
        className="group p-6 bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105 shadow-lg"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <Play className="h-6 w-6" />
          </div>
          <div className="text-left">
            <h3 className="font-heading text-lg mb-1">Start Workout</h3>
            <p className="text-white/80 text-sm font-body">Begin your fitness session</p>
          </div>
        </div>
      </button>

      <button
        onClick={onViewPrograms}
        className="group p-6 bg-white/80 backdrop-blur-sm border border-secondary-light/50 rounded-2xl hover:bg-white/90 hover:border-primary/50 transition-all duration-300 hover:scale-105 shadow-lg"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-accent/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <Dumbbell className="h-6 w-6 text-accent" />
          </div>
          <div className="text-left">
            <h3 className="font-heading text-lg text-accent mb-1">Browse Programs</h3>
            <p className="text-accent/70 text-sm font-body">Find your perfect routine</p>
          </div>
        </div>
      </button>

      <button
        onClick={onBrowseExercises}
        className="group p-6 bg-white/80 backdrop-blur-sm border border-secondary-light/50 rounded-2xl hover:bg-white/90 hover:border-primary/50 transition-all duration-300 hover:scale-105 shadow-lg"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-accent/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <BookOpen className="h-6 w-6 text-accent" />
          </div>
          <div className="text-left">
            <h3 className="font-heading text-lg text-accent mb-1">Exercise Library</h3>
            <p className="text-accent/70 text-sm font-body">Learn new exercises</p>
          </div>
        </div>
      </button>
    </div>
  );
}

// Stats Cards for Home Tab
export function StatsCards({ 
  totalWorkouts, 
  currentStreak, 
  thisWeekWorkouts, 
  totalDuration 
}: {
  totalWorkouts: number;
  currentStreak: number;
  thisWeekWorkouts: number;
  totalDuration: number;
}) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-secondary-light/50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-heading text-accent">{totalWorkouts}</p>
            <p className="text-xs text-accent/70 font-body">Total Workouts</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-secondary-light/50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-500/10 rounded-lg">
            <Calendar className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <p className="text-2xl font-heading text-accent">{currentStreak}</p>
            <p className="text-xs text-accent/70 font-body">Day Streak</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-secondary-light/50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <BarChart3 className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-2xl font-heading text-accent">{thisWeekWorkouts}</p>
            <p className="text-xs text-accent/70 font-body">This Week</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-secondary-light/50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Play className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-heading text-accent">{formatDuration(totalDuration)}</p>
            <p className="text-xs text-accent/70 font-body">Total Time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
