import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Calendar, 
  TrendingUp, 
  Clock, 
  Target,
  Dumbbell,
  BookOpen,
  BarChart3,
  User,
  Plus,
  Star,
  Zap
} from 'lucide-react';
import { MainNavigation, QuickActions, StatsCards } from './MainNavigation';
import { ExerciseLibrary } from './ExerciseLibrary';
import { WorkoutSession } from './WorkoutSession';
import { prebuiltPrograms } from '../data/prebuiltPrograms';
import { exerciseCategories } from '../data/exerciseCategories';
import type { WorkoutProgram, WorkoutSession as WorkoutSessionType, UserProfile } from '../types/user';

interface DashboardProps {
  user: any;
  hasSupabase: boolean;
  userProfile?: UserProfile;
  onProfileUpdate?: (profile: Partial<UserProfile>) => void;
}

export function Dashboard({ user, hasSupabase, userProfile, onProfileUpdate }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'programs' | 'exercises' | 'progress' | 'profile'>('home');
  const [selectedProgram, setSelectedProgram] = useState<WorkoutProgram | null>(null);
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);
  const [completedSessions, setCompletedSessions] = useState<WorkoutSessionType[]>([]);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    currentStreak: 0,
    thisWeekWorkouts: 0,
    totalDuration: 0
  });

  // Calculate stats from completed sessions
  useEffect(() => {
    const totalWorkouts = completedSessions.length;
    const totalDuration = completedSessions.reduce((sum, session) => sum + session.totalDuration, 0);
    
    // Calculate current streak (simplified - would need more complex logic in real app)
    const currentStreak = completedSessions.length > 0 ? Math.min(completedSessions.length, 7) : 0;
    
    // Calculate this week's workouts (simplified)
    const thisWeekWorkouts = completedSessions.filter(session => {
      const sessionDate = new Date(session.completedAt || session.startedAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return sessionDate >= weekAgo;
    }).length;

    setStats({
      totalWorkouts,
      currentStreak,
      thisWeekWorkouts,
      totalDuration
    });
  }, [completedSessions]);

  const handleWorkoutComplete = (session: WorkoutSessionType) => {
    setCompletedSessions(prev => [...prev, session]);
    setSelectedProgram(null);
    setActiveTab('home');
  };

  const handleStartWorkout = () => {
    setActiveTab('programs');
  };

  const handleViewPrograms = () => {
    setActiveTab('programs');
  };

  const handleBrowseExercises = () => {
    setShowExerciseLibrary(true);
  };

  const getRecommendedPrograms = () => {
    if (!userProfile) return prebuiltPrograms.slice(0, 3);
    
    // Simple recommendation logic based on user preferences
    return prebuiltPrograms.filter(program => {
      const matchesGoal = userProfile.fitnessGoals.some(goal => 
        program.name.toLowerCase().includes(goal.replace('-', ' ')) ||
        program.targetMuscleGroups.some(muscle => 
          userProfile.targetMuscleGroups.includes(muscle.toLowerCase())
        )
      );
      const matchesDifficulty = program.difficulty === userProfile.skillLevel;
      return matchesGoal || matchesDifficulty;
    }).slice(0, 3);
  };

  const getTodaysWorkout = () => {
    // In a real app, this would be based on user's schedule
    return prebuiltPrograms.find(p => p.id === 'beginner-strength');
  };

  const renderHomeTab = () => (
    <div className="max-w-6xl mx-auto p-4 pb-20">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading text-accent mb-2">
          Welcome back{userProfile?.fullName ? `, ${userProfile.fullName}` : ''}!
        </h1>
        <p className="text-accent/70 font-body">
          Ready to continue your fitness journey?
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards
        totalWorkouts={stats.totalWorkouts}
        currentStreak={stats.currentStreak}
        thisWeekWorkouts={stats.thisWeekWorkouts}
        totalDuration={stats.totalDuration}
      />

      {/* Quick Actions */}
      <QuickActions
        onStartWorkout={handleStartWorkout}
        onViewPrograms={handleViewPrograms}
        onBrowseExercises={handleBrowseExercises}
      />

      {/* Today's Workout */}
      {getTodaysWorkout() && (
        <div className="mb-8">
          <h2 className="text-2xl font-heading text-accent mb-4">Today's Workout</h2>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-secondary-light/50 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-heading text-accent mb-2">{getTodaysWorkout()?.name}</h3>
                <p className="text-accent/70 font-body mb-4">{getTodaysWorkout()?.description}</p>
                <div className="flex items-center space-x-4 text-sm text-accent/70 font-body">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{getTodaysWorkout()?.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-4 w-4" />
                    <span className="capitalize">{getTodaysWorkout()?.difficulty}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Dumbbell className="h-4 w-4" />
                    <span>{getTodaysWorkout()?.exercises.length} exercises</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedProgram(getTodaysWorkout()!)}
                className="flex items-center space-x-2 px-6 py-3 bg-primary text-white font-heading rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Play className="h-5 w-5" />
                <span>Start Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Programs */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading text-accent mb-4">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getRecommendedPrograms().map(program => (
            <div
              key={program.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-secondary-light/50 p-6 hover:bg-white/90 hover:border-primary/50 transition-all duration-300 hover:scale-105 shadow-lg group cursor-pointer"
              onClick={() => setSelectedProgram(program)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Dumbbell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-accent group-hover:text-primary transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-sm text-accent/70 font-body capitalize">{program.difficulty}</p>
                </div>
              </div>
              
              <p className="text-accent/70 text-sm font-body mb-4 line-clamp-2">
                {program.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-accent/70 font-body">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{program.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-4 w-4" />
                    <span>{program.exercises.length} exercises</span>
                  </div>
                </div>
                <button className="p-2 text-accent/50 hover:text-primary transition-colors">
                  <Play className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {completedSessions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-heading text-accent mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {completedSessions.slice(-3).reverse().map(session => {
              const program = prebuiltPrograms.find(p => p.id === session.programId);
              return (
                <div
                  key={session.id}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-secondary-light/30"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading text-accent">{program?.name || 'Unknown Program'}</h4>
                      <p className="text-sm text-accent/70 font-body">
                        {new Date(session.completedAt || session.startedAt).toLocaleDateString()} • {session.totalDuration} min
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-body text-accent/70">Completed</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const renderProgramsTab = () => (
    <div className="max-w-6xl mx-auto p-4 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-heading text-accent mb-2">Workout Programs</h1>
        <p className="text-accent/70 font-body">Choose from our curated programs or create your own</p>
      </div>

      {/* Program Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-heading text-accent mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {exerciseCategories.slice(0, 4).map(category => (
            <button
              key={category.id}
              className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-secondary-light/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 text-center group"
            >
              <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {category.icon}
              </div>
              <h3 className="font-heading text-accent group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </button>
          ))}
        </div>
      </div>

      {/* All Programs */}
      <div className="mb-8">
        <h2 className="text-xl font-heading text-accent mb-4">All Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prebuiltPrograms.map(program => (
            <div
              key={program.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-secondary-light/50 p-6 hover:bg-white/90 hover:border-primary/50 transition-all duration-300 hover:scale-105 shadow-lg group cursor-pointer"
              onClick={() => setSelectedProgram(program)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Dumbbell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-accent group-hover:text-primary transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-sm text-accent/70 font-body capitalize">{program.difficulty}</p>
                </div>
              </div>
              
              <p className="text-accent/70 text-sm font-body mb-4 line-clamp-2">
                {program.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-accent/70 font-body">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{program.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-4 w-4" />
                    <span>{program.exercises.length} exercises</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-body text-accent/70">4.8</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProgram(program);
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Play className="h-4 w-4" />
                  <span className="text-sm font-body">Start</span>
                </button>
                <button className="p-2 text-accent/50 hover:text-primary transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProgressTab = () => (
    <div className="max-w-6xl mx-auto p-4 pb-20">
      <h1 className="text-3xl font-heading text-accent mb-2">Your Progress</h1>
      <p className="text-accent/70 font-body mb-8">Track your fitness journey and achievements</p>
      
      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-secondary-light/50">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-heading text-accent">Total Workouts</h3>
          </div>
          <p className="text-3xl font-heading text-accent">{stats.totalWorkouts}</p>
          <p className="text-sm text-accent/70 font-body">All time</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-secondary-light/50">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Zap className="h-5 w-5 text-orange-500" />
            </div>
            <h3 className="font-heading text-accent">Current Streak</h3>
          </div>
          <p className="text-3xl font-heading text-accent">{stats.currentStreak}</p>
          <p className="text-sm text-accent/70 font-body">Days in a row</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-secondary-light/50">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Calendar className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="font-heading text-accent">This Week</h3>
          </div>
          <p className="text-3xl font-heading text-accent">{stats.thisWeekWorkouts}</p>
          <p className="text-sm text-accent/70 font-body">Workouts completed</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-secondary-light/50">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="font-heading text-accent">Total Time</h3>
          </div>
          <p className="text-3xl font-heading text-accent">
            {Math.floor(stats.totalDuration / 60)}h {stats.totalDuration % 60}m
          </p>
          <p className="text-sm text-accent/70 font-body">Time invested</p>
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-secondary-light/50">
        <h2 className="text-xl font-heading text-accent mb-4">Recent Workouts</h2>
        {completedSessions.length === 0 ? (
          <div className="text-center py-8">
            <BarChart3 className="h-16 w-16 text-accent/30 mx-auto mb-4" />
            <p className="text-accent/70 font-body">No workouts completed yet. Start your first workout!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {completedSessions.slice(-5).reverse().map(session => {
              const program = prebuiltPrograms.find(p => p.id === session.programId);
              return (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-white/60 rounded-lg border border-secondary-light/30"
                >
                  <div>
                    <h4 className="font-heading text-accent">{program?.name || 'Unknown Program'}</h4>
                    <p className="text-sm text-accent/70 font-body">
                      {new Date(session.completedAt || session.startedAt).toLocaleDateString()} • {session.totalDuration} min
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-body text-accent/70">Completed</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="max-w-4xl mx-auto p-4 pb-20">
      <h1 className="text-3xl font-heading text-accent mb-2">Your Profile</h1>
      <p className="text-accent/70 font-body mb-8">Manage your account and preferences</p>
      
      {userProfile ? (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-secondary-light/50 p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-heading text-accent mb-4">Personal Info</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-body text-accent/70 mb-1">Name</label>
                  <p className="font-body text-accent">{userProfile.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm font-body text-accent/70 mb-1">Age</label>
                  <p className="font-body text-accent">{userProfile.age} years old</p>
                </div>
                <div>
                  <label className="block text-sm font-body text-accent/70 mb-1">Gender</label>
                  <p className="font-body text-accent capitalize">{userProfile.gender.replace('-', ' ')}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-heading text-accent mb-4">Fitness Goals</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.fitnessGoals.map(goal => (
                  <span key={goal} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-body">
                    {goal.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-heading text-accent mb-4">Workout Styles</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.preferredWorkoutStyles.map(style => (
                  <span key={style.id} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-body">
                    {style.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-heading text-accent mb-4">Target Areas</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.targetMuscleGroups.map(muscle => (
                  <span key={muscle} className="px-3 py-1 bg-green-500/20 text-green-700 rounded-full text-sm font-body">
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-accent/30 mx-auto mb-4" />
          <h3 className="text-xl font-heading text-accent mb-2">No Profile Found</h3>
          <p className="text-accent/70 font-body">Complete your profile setup to get personalized recommendations.</p>
        </div>
      )}
    </div>
  );

  if (selectedProgram) {
    return (
      <WorkoutSession
        program={selectedProgram}
        onComplete={handleWorkoutComplete}
        onCancel={() => setSelectedProgram(null)}
      />
    );
  }

  if (showExerciseLibrary) {
    return (
      <ExerciseLibrary
        onClose={() => setShowExerciseLibrary(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary-light to-secondary-dark">
      {/* Main Content */}
      {activeTab === 'home' && renderHomeTab()}
      {activeTab === 'programs' && renderProgramsTab()}
      {activeTab === 'exercises' && (
        <ExerciseLibrary
          onClose={() => setActiveTab('home')}
        />
      )}
      {activeTab === 'progress' && renderProgressTab()}
      {activeTab === 'profile' && renderProfileTab()}

      {/* Bottom Navigation */}
      <MainNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasSupabase={hasSupabase}
        user={user}
      />
    </div>
  );
}
