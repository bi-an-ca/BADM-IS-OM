import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, Clock, Target, Zap } from 'lucide-react';
import { ExerciseCard } from './ExerciseCard';
import type { WorkoutDay } from './WorkoutProgram';

interface WeeklyScheduleProps {
  weeklyProgram: WorkoutDay[];
}

export function WeeklySchedule({ weeklyProgram }: WeeklyScheduleProps) {
  const [expandedDay, setExpandedDay] = useState<string | null>('Mon');

  const toggleDay = (day: string) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const getRestDayContent = (focus: string) => {
    if (focus === 'Rest Day') {
      return {
        title: 'Complete Rest',
        description: 'Take a full day off to let your muscles recover and rebuild stronger.',
        activities: ['Stay hydrated', 'Get quality sleep', 'Light stretching if desired']
      };
    } else {
      return {
        title: 'Active Recovery',
        description: 'Light movement to promote blood flow and recovery.',
        activities: ['20-30 minute walk', 'Gentle yoga or stretching', 'Foam rolling', 'Meditation']
      };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-6">
        <Calendar className="h-6 w-6 text-primary mr-3" />
        <h2 className="text-2xl font-heading text-accent">Your Weekly Program</h2>
      </div>

      {weeklyProgram.map((day) => (
        <div
          key={day.day}
          className="bg-white/90 backdrop-blur-sm rounded-2xl border border-secondary-light/50 overflow-hidden shadow-sm"
        >
          {/* Day Header */}
          <button
            onClick={() => toggleDay(day.day)}
            className="w-full p-6 text-left hover:bg-secondary-light/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-heading ${
                  day.isRestDay ? 'bg-secondary-light' : 'bg-primary'
                }`}>
                  {day.day}
                </div>
                <div>
                  <h3 className="text-xl font-heading text-accent">{day.dayName}</h3>
                  <p className="text-accent/70 font-body">{day.focus}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {!day.isRestDay && (
                  <div className="flex items-center space-x-4 text-accent/70">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm font-body">{day.duration} min</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      <span className="text-sm font-body">{day.exercises.length} exercises</span>
                    </div>
                  </div>
                )}
                
                {expandedDay === day.day ? (
                  <ChevronUp className="h-5 w-5 text-accent/70" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-accent/70" />
                )}
              </div>
            </div>
          </button>

          {/* Day Content */}
          {expandedDay === day.day && (
            <div className="border-t border-secondary-light/30">
              {day.isRestDay ? (
                <div className="p-6">
                  {(() => {
                    const restContent = getRestDayContent(day.focus);
                    return (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
                          <Zap className="h-8 w-8 text-white" />
                        </div>
                        <h4 className="text-lg font-heading text-accent mb-2">{restContent.title}</h4>
                        <p className="text-accent/70 font-body mb-4 max-w-md mx-auto">
                          {restContent.description}
                        </p>
                        <div className="space-y-2">
                          <p className="text-accent/70 text-sm font-body">Suggested activities:</p>
                          <ul className="text-accent/60 text-sm font-body space-y-1">
                            {restContent.activities.map((activity, index) => (
                              <li key={index}>• {activity}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {day.exercises.map((exercise, index) => (
                      <ExerciseCard 
                        key={exercise.id} 
                        exercise={exercise} 
                        index={index}
                        dayContext={day.focus}
                      />
                    ))}
                  </div>
                  
                  {day.exercises.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-accent/70 font-body">
                        No exercises available for this focus area. Try adjusting your preferences.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}