import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Target, 
  Dumbbell, 
  Heart, 
  Zap, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight
} from 'lucide-react';
import type { UserProfile, WorkoutStyle } from '../types/user';

interface OnboardingFlowProps {
  onComplete: (profile: Partial<UserProfile>) => void;
  onSkip: () => void;
}

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    fullName: '',
    age: 25,
    gender: 'prefer-not-to-say',
    fitnessGoals: [],
    preferredWorkoutStyles: [],
    targetMuscleGroups: [],
    skillLevel: 'beginner'
  });

  const workoutStyles: WorkoutStyle[] = [
    { id: 'strength', name: 'Strength Training', description: 'Build muscle and increase strength', icon: '💪', color: 'bg-blue-500' },
    { id: 'yoga', name: 'Yoga', description: 'Flexibility, balance, and mindfulness', icon: '🧘', color: 'bg-green-500' },
    { id: 'pilates', name: 'Pilates', description: 'Core strength and body awareness', icon: '🤸', color: 'bg-purple-500' },
    { id: 'muscle-building', name: 'Muscle Building', description: 'Hypertrophy and muscle growth', icon: '🏋️', color: 'bg-red-500' },
    { id: 'cardio', name: 'Cardio', description: 'Heart health and endurance', icon: '❤️', color: 'bg-pink-500' },
    { id: 'general-fitness', name: 'General Fitness', description: 'Overall health and wellness', icon: '⚡', color: 'bg-yellow-500' }
  ];

  const fitnessGoals = [
    { id: 'weight-loss', label: 'Weight Loss', icon: Target, description: 'Burn calories and lose weight' },
    { id: 'muscle-gain', label: 'Muscle Gain', icon: Dumbbell, description: 'Build lean muscle mass' },
    { id: 'strength', label: 'Get Stronger', icon: Zap, description: 'Increase overall strength' },
    { id: 'endurance', label: 'Improve Endurance', icon: Heart, description: 'Build cardiovascular fitness' },
    { id: 'flexibility', label: 'Flexibility', icon: CheckCircle, description: 'Improve mobility and flexibility' },
    { id: 'general-health', label: 'General Health', icon: User, description: 'Maintain overall wellness' }
  ];

  const muscleGroups = [
    { id: 'chest', label: 'Chest', icon: '🫁' },
    { id: 'back', label: 'Back', icon: '🦴' },
    { id: 'shoulders', label: 'Shoulders', icon: '💪' },
    { id: 'arms', label: 'Arms', icon: '💪' },
    { id: 'legs', label: 'Legs', icon: '🦵' },
    { id: 'glutes', label: 'Glutes', icon: '🍑' },
    { id: 'abs', label: 'Core', icon: '🎯' },
    { id: 'full-body', label: 'Full Body', icon: '👤' }
  ];

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      onComplete(profile);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleGoalToggle = (goalId: string) => {
    const updatedGoals = profile.fitnessGoals?.includes(goalId)
      ? profile.fitnessGoals.filter(id => id !== goalId)
      : [...(profile.fitnessGoals || []), goalId];
    setProfile({ ...profile, fitnessGoals: updatedGoals });
  };

  const handleWorkoutStyleToggle = (styleId: string) => {
    const updatedStyles = profile.preferredWorkoutStyles?.some(style => style.id === styleId)
      ? profile.preferredWorkoutStyles.filter(style => style.id !== styleId)
      : [...(profile.preferredWorkoutStyles || []), workoutStyles.find(style => style.id === styleId)!];
    setProfile({ ...profile, preferredWorkoutStyles: updatedStyles });
  };

  const handleMuscleGroupToggle = (muscleId: string) => {
    const updatedMuscles = profile.targetMuscleGroups?.includes(muscleId)
      ? profile.targetMuscleGroups.filter(id => id !== muscleId)
      : [...(profile.targetMuscleGroups || []), muscleId];
    setProfile({ ...profile, targetMuscleGroups: updatedMuscles });
  };

  const canProceed = () => {
    switch (step) {
      case 1: return profile.fullName && profile.fullName.trim().length > 0;
      case 2: return profile.age && profile.age >= 13 && profile.age <= 100;
      case 3: return profile.fitnessGoals && profile.fitnessGoals.length > 0;
      case 4: return profile.preferredWorkoutStyles && profile.preferredWorkoutStyles.length > 0;
      case 5: return profile.targetMuscleGroups && profile.targetMuscleGroups.length > 0;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary-light to-secondary-dark font-body">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary rounded-2xl">
              <Dumbbell className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-heading text-accent mb-2">Welcome to Momentum</h1>
          <p className="text-accent/70 font-body">Let's personalize your fitness journey</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step >= stepNumber 
                    ? 'bg-primary text-white' 
                    : 'bg-accent/20 text-accent/50'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 5 && (
                  <ChevronRight className={`ml-2 h-4 w-4 transition-colors duration-300 ${
                    step > stepNumber ? 'text-primary' : 'text-accent/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-secondary-light/50 p-8 shadow-lg">
          {/* Step 1: Name */}
          {step === 1 && (
            <div className="text-center">
              <User className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-heading text-accent mb-4">What's your name?</h2>
              <p className="text-accent/70 font-body mb-8">We'd love to know what to call you</p>
              <input
                type="text"
                value={profile.fullName || ''}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                placeholder="Enter your name"
                className="w-full max-w-md mx-auto px-6 py-4 text-lg border border-secondary-light/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-body"
                autoFocus
              />
            </div>
          )}

          {/* Step 2: Age & Gender */}
          {step === 2 && (
            <div className="text-center">
              <Calendar className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-heading text-accent mb-4">Tell us about yourself</h2>
              <p className="text-accent/70 font-body mb-8">This helps us recommend the right workouts</p>
              
              <div className="space-y-6 max-w-md mx-auto">
                <div>
                  <label className="block text-accent font-body mb-2">Age</label>
                  <input
                    type="number"
                    value={profile.age || ''}
                    onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 25 })}
                    min="13"
                    max="100"
                    className="w-full px-4 py-3 border border-secondary-light/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-body"
                  />
                </div>
                
                <div>
                  <label className="block text-accent font-body mb-2">Gender (Optional)</label>
                  <select
                    value={profile.gender || 'prefer-not-to-say'}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value as any })}
                    className="w-full px-4 py-3 border border-secondary-light/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-body"
                  >
                    <option value="prefer-not-to-say">Prefer not to say</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Fitness Goals */}
          {step === 3 && (
            <div>
              <Target className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-heading text-accent mb-4 text-center">What are your fitness goals?</h2>
              <p className="text-accent/70 font-body mb-8 text-center">Select all that apply</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fitnessGoals.map((goal) => {
                  const IconComponent = goal.icon;
                  const isSelected = profile.fitnessGoals?.includes(goal.id);
                  return (
                    <button
                      key={goal.id}
                      onClick={() => handleGoalToggle(goal.id)}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left group ${
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-secondary-light/50 bg-white/60 hover:border-primary/50 hover:bg-white/80'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${isSelected ? 'bg-primary text-white' : 'bg-accent/10 text-accent'}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-heading text-accent mb-1">{goal.label}</h3>
                          <p className="text-sm text-accent/70 font-body">{goal.description}</p>
                        </div>
                        {isSelected && <CheckCircle className="h-5 w-5 text-primary ml-auto" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Workout Styles */}
          {step === 4 && (
            <div>
              <Dumbbell className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-heading text-accent mb-4 text-center">What workout styles interest you?</h2>
              <p className="text-accent/70 font-body mb-8 text-center">Choose your preferred training methods</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workoutStyles.map((style) => {
                  const isSelected = profile.preferredWorkoutStyles?.some(s => s.id === style.id);
                  return (
                    <button
                      key={style.id}
                      onClick={() => handleWorkoutStyleToggle(style.id)}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left group ${
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-secondary-light/50 bg-white/60 hover:border-primary/50 hover:bg-white/80'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-12 h-12 rounded-xl ${style.color} flex items-center justify-center text-2xl mx-auto mb-3`}>
                          {style.icon}
                        </div>
                        <h3 className="font-heading text-accent mb-2">{style.name}</h3>
                        <p className="text-sm text-accent/70 font-body">{style.description}</p>
                        {isSelected && <CheckCircle className="h-5 w-5 text-primary mx-auto mt-2" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Target Muscle Groups */}
          {step === 5 && (
            <div>
              <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-heading text-accent mb-4 text-center">Which areas do you want to focus on?</h2>
              <p className="text-accent/70 font-body mb-8 text-center">Select the muscle groups you'd like to target</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {muscleGroups.map((muscle) => {
                  const isSelected = profile.targetMuscleGroups?.includes(muscle.id);
                  return (
                    <button
                      key={muscle.id}
                      onClick={() => handleMuscleGroupToggle(muscle.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-center group ${
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-secondary-light/50 bg-white/60 hover:border-primary/50 hover:bg-white/80'
                      }`}
                    >
                      <div className="text-3xl mb-2">{muscle.icon}</div>
                      <div className="font-heading text-accent text-sm">{muscle.label}</div>
                      {isSelected && <CheckCircle className="h-4 w-4 text-primary mx-auto mt-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-secondary-light/30">
            <button
              onClick={step === 1 ? onSkip : handleBack}
              className="px-6 py-3 text-accent/70 hover:text-accent transition-colors font-body"
            >
              {step === 1 ? 'Skip for now' : (
                <>
                  <ChevronLeft className="h-4 w-4 inline mr-2" />
                  Back
                </>
              )}
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-8 py-3 bg-primary text-white font-heading rounded-xl hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <span>{step === 5 ? 'Complete Setup' : 'Continue'}</span>
              {step < 5 && <ChevronRight className="h-4 w-4" />}
              {step === 5 && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
