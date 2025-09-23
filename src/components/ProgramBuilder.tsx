import React, { useState } from 'react';
import { ChevronRight, Target, TrendingUp, Users, CheckCircle } from 'lucide-react';
import type { UserPreferences } from '../App';

interface ProgramBuilderProps {
  onProgramGenerated: (preferences: UserPreferences) => void;
}

export function ProgramBuilder({ onProgramGenerated }: ProgramBuilderProps) {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<UserPreferences>({
    goal: '',
    skillLevel: '',
    bodyParts: []
  });

  const goals = [
    { id: 'weight-loss', label: 'Weight Loss', icon: TrendingUp, color: 'bg-primary' },
    { id: 'muscle-building', label: 'Muscle Building', icon: Target, color: 'bg-accent' },
    { id: 'strength-training', label: 'Strength Training', icon: CheckCircle, color: 'bg-secondary-light' },
    { id: 'cardio-endurance', label: 'Cardio Endurance', icon: Users, color: 'bg-primary' }
  ];

  const skillLevels = [
    { id: 'beginner', label: 'Beginner', description: 'New to fitness or returning after a break - we\'ll guide you every step' },
    { id: 'intermediate', label: 'Intermediate', description: '6+ months of consistent training - ready to level up your routine' },
    { id: 'expert', label: 'Expert', description: '2+ years of advanced training - let\'s push your limits safely' }
  ];

  const bodyParts = [
    { id: 'chest', label: 'Chest' },
    { id: 'back', label: 'Back' },
    { id: 'shoulders', label: 'Shoulders' },
    { id: 'arms', label: 'Arms' },
    { id: 'legs', label: 'Legs' },
    { id: 'glutes', label: 'Glutes' },
    { id: 'abs', label: 'Abs' },
    { id: 'full-body', label: 'Full Body' }
  ];

  const handleGoalSelect = (goalId: string) => {
    setPreferences({ ...preferences, goal: goalId });
    setStep(2);
  };

  const handleSkillLevelSelect = (skillId: string) => {
    setPreferences({ ...preferences, skillLevel: skillId });
    setStep(3);
  };

  const handleBodyPartToggle = (bodyPartId: string) => {
    const updatedBodyParts = preferences.bodyParts.includes(bodyPartId)
      ? preferences.bodyParts.filter(id => id !== bodyPartId)
      : [...preferences.bodyParts, bodyPartId];
    
    setPreferences({ ...preferences, bodyParts: updatedBodyParts });
  };

  const handleGenerateProgram = () => {
    onProgramGenerated(preferences);
  };

  const canProceed = preferences.bodyParts.length > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-center space-x-8">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all duration-300 ${
                step >= stepNumber 
                  ? 'bg-primary text-white border-transparent' 
                  : 'border-accent/30 text-accent/50'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <ChevronRight className={`ml-4 h-5 w-5 transition-colors duration-300 ${
                  step > stepNumber ? 'text-primary' : 'text-accent/30'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <div className="text-center">
            <h2 className="text-xl font-heading text-accent">
              {step === 1 && 'Choose Your Goal'}
              {step === 2 && 'Select Your Level'}
              {step === 3 && 'Target Body Parts'}
            </h2>
            <p className="text-accent/70 mt-1 font-body">
              {step === 1 && 'What do you want to achieve?'}
              {step === 2 && 'How experienced are you?'}
              {step === 3 && 'Which areas do you want to focus on?'}
            </p>
          </div>
        </div>
      </div>

      {/* Step 1: Goal Selection */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const IconComponent = goal.icon;
            return (
              <button
                key={goal.id}
                onClick={() => handleGoalSelect(goal.id)}
                className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-secondary-light/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:shadow-lg"
              >
                <div className={`w-16 h-16 rounded-2xl ${goal.color} p-4 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-heading text-accent mb-2">{goal.label}</h3>
              </button>
            );
          })}
        </div>
      )}

      {/* Step 2: Skill Level Selection */}
      {step === 2 && (
        <div className="space-y-4 max-w-2xl mx-auto">
          {skillLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => handleSkillLevelSelect(level.id)}
              className="w-full p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-secondary-light/50 hover:border-primary/50 transition-all duration-300 hover:bg-white/90 hover:shadow-lg text-left group"
            >
              <h3 className="text-xl font-heading text-accent mb-2 group-hover:text-primary transition-colors">
                {level.label}
              </h3>
              <p className="text-accent/70 font-body">{level.description}</p>
            </button>
          ))}
        </div>
      )}

      {/* Step 3: Body Parts Selection */}
      {step === 3 && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bodyParts.map((bodyPart) => (
              <button
                key={bodyPart.id}
                onClick={() => handleBodyPartToggle(bodyPart.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                  preferences.bodyParts.includes(bodyPart.id)
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-secondary-light bg-white/60 text-accent hover:border-primary/50 hover:bg-white/80'
                }`}
              >
                <div className="font-heading">{bodyPart.label}</div>
                {preferences.bodyParts.includes(bodyPart.id) && (
                  <CheckCircle className="h-5 w-5 text-primary mx-auto mt-2" />
                )}
              </button>
            ))}
          </div>

          {canProceed && (
            <div className="flex justify-center">
              <button
                onClick={handleGenerateProgram}
                className="px-12 py-4 bg-primary text-white font-heading rounded-2xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Start Your Journey
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}