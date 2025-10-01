import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  CheckCircle, 
  Clock, 
  RotateCcw,
  X,
  Timer,
  Target,
  BarChart3
} from 'lucide-react';
import type { WorkoutProgram, ProgramExercise, CompletedExercise, CompletedSet, WorkoutSession as WorkoutSessionType } from '../types/user';
import { exerciseDatabase } from '../data/exercises';

interface WorkoutSessionProps {
  program: WorkoutProgram;
  onComplete: (session: WorkoutSessionType) => void;
  onCancel: () => void;
}

export function WorkoutSession({ program, onComplete, onCancel }: WorkoutSessionProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<CompletedExercise[]>([]);
  const [currentSet, setCurrentSet] = useState(1);
  const [sessionStartTime] = useState(new Date());
  const [restTimeRemaining, setRestTimeRemaining] = useState(0);

  const currentExercise = program.exercises[currentExerciseIndex];
  const exercise = exerciseDatabase.find(e => e.id === currentExercise.exerciseId);
  const isLastExercise = currentExerciseIndex === program.exercises.length - 1;
  const isLastSet = currentSet === currentExercise.sets;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    let restInterval: NodeJS.Timeout;
    if (restTimeRemaining > 0) {
      restInterval = setInterval(() => {
        setRestTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(restInterval);
  }, [restTimeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSetComplete = () => {
    const newCompletedSet: CompletedSet = {
      setNumber: currentSet,
      reps: typeof currentExercise.reps === 'number' ? currentExercise.reps : undefined,
      duration: typeof currentExercise.reps === 'string' ? parseInt(currentExercise.reps) : undefined,
      completed: true,
      restTime: currentExercise.restTime
    };

    const existingExercise = completedExercises.find(e => e.exerciseId === currentExercise.exerciseId);
    
    if (existingExercise) {
      setCompletedExercises(prev => prev.map(e => 
        e.exerciseId === currentExercise.exerciseId 
          ? { ...e, sets: [...e.sets, newCompletedSet] }
          : e
      ));
    } else {
      setCompletedExercises(prev => [...prev, {
        exerciseId: currentExercise.exerciseId,
        sets: [newCompletedSet],
        notes: ''
      }]);
    }

    if (isLastSet) {
      // Exercise completed
      if (isLastExercise) {
        // Workout completed
        const session: WorkoutSessionType = {
          id: `session-${Date.now()}`,
          programId: program.id,
          userId: 'current-user', // This would come from auth context
          startedAt: sessionStartTime,
          completedAt: new Date(),
          exercises: completedExercises,
          totalDuration: Math.floor(timeElapsed / 60),
          notes: ''
        };
        onComplete(session);
      } else {
        // Move to next exercise
        setCurrentExerciseIndex(prev => prev + 1);
        setCurrentSet(1);
        setRestTimeRemaining(currentExercise.restTime);
      }
    } else {
      // Move to next set
      setCurrentSet(prev => prev + 1);
      setRestTimeRemaining(currentExercise.restTime);
    }
  };

  const handleSkip = () => {
    if (isLastExercise && isLastSet) {
      // Complete workout
      const session: WorkoutSessionType = {
        id: `session-${Date.now()}`,
        programId: program.id,
        userId: 'current-user',
        startedAt: sessionStartTime,
        completedAt: new Date(),
        exercises: completedExercises,
        totalDuration: Math.floor(timeElapsed / 60),
        notes: ''
      };
      onComplete(session);
    } else if (isLastSet) {
      // Skip to next exercise
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSet(1);
      setRestTimeRemaining(currentExercise.restTime);
    } else {
      // Skip to next set
      setCurrentSet(prev => prev + 1);
      setRestTimeRemaining(currentExercise.restTime);
    }
  };

  const handleRestComplete = () => {
    setRestTimeRemaining(0);
  };

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-secondary-light to-secondary-dark flex items-center justify-center">
        <div className="text-center">
          <X className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-heading text-accent mb-2">Exercise Not Found</h2>
          <p className="text-accent/70 font-body mb-4">The exercise could not be loaded.</p>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-primary text-white font-heading rounded-xl hover:bg-primary/90 transition-colors"
          >
            Back to Programs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary-light to-secondary-dark">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-secondary-light/30 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-heading text-accent">{program.name}</h1>
            <p className="text-accent/70 font-body">Exercise {currentExerciseIndex + 1} of {program.exercises.length}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-heading text-accent">{formatTime(timeElapsed)}</div>
              <div className="text-xs text-accent/70 font-body">Time</div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 text-accent/70 hover:text-accent transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-body text-accent/70">Progress</span>
            <span className="text-sm font-body text-accent/70">
              {currentExerciseIndex + 1} / {program.exercises.length}
            </span>
          </div>
          <div className="w-full bg-accent/20 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentExerciseIndex + 1) / program.exercises.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Rest Timer */}
        {restTimeRemaining > 0 && (
          <div className="mb-8 bg-orange-50 border border-orange-200 rounded-2xl p-6 text-center">
            <Timer className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-heading text-orange-800 mb-2">Rest Time</h3>
            <div className="text-4xl font-heading text-orange-600 mb-4">
              {formatTime(restTimeRemaining)}
            </div>
            <button
              onClick={handleRestComplete}
              className="px-6 py-3 bg-orange-500 text-white font-heading rounded-xl hover:bg-orange-600 transition-colors"
            >
              Skip Rest
            </button>
          </div>
        )}

        {/* Exercise Content */}
        {restTimeRemaining === 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-secondary-light/50 p-8 shadow-lg mb-8">
            {/* Exercise Image */}
            <div className="mb-6">
              <img
                src={exercise.imageUrl}
                alt={exercise.name}
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>

            {/* Exercise Info */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-heading text-accent mb-2">{exercise.name}</h2>
              <p className="text-accent/70 font-body mb-4">{exercise.description}</p>
              
              <div className="flex items-center justify-center space-x-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-heading text-primary">{currentSet}</div>
                  <div className="text-sm text-accent/70 font-body">Set</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading text-primary">{currentExercise.sets}</div>
                  <div className="text-sm text-accent/70 font-body">Total Sets</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading text-primary">
                    {typeof currentExercise.reps === 'number' ? currentExercise.reps : currentExercise.reps}
                  </div>
                  <div className="text-sm text-accent/70 font-body">
                    {typeof currentExercise.reps === 'number' ? 'Reps' : 'Duration'}
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-8">
              <h3 className="text-lg font-heading text-accent mb-4">Instructions</h3>
              <ol className="space-y-2">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white text-sm font-bold rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-accent/80 font-body">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center space-x-2 px-8 py-4 bg-primary text-white font-heading rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                <span>{isPlaying ? 'Pause' : 'Start'}</span>
              </button>

              <button
                onClick={handleSetComplete}
                className="flex items-center space-x-2 px-8 py-4 bg-green-500 text-white font-heading rounded-xl hover:bg-green-600 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Complete Set</span>
              </button>

              <button
                onClick={handleSkip}
                className="flex items-center space-x-2 px-6 py-4 bg-accent/10 text-accent font-heading rounded-xl hover:bg-accent/20 transition-all duration-300"
              >
                <SkipForward className="h-5 w-5" />
                <span>Skip</span>
              </button>
            </div>
          </div>
        )}

        {/* Exercise List */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
          <h3 className="text-lg font-heading text-accent mb-4">Workout Plan</h3>
          <div className="space-y-2">
            {program.exercises.map((ex, index) => {
              const exData = exerciseDatabase.find(e => e.id === ex.exerciseId);
              const isCompleted = completedExercises.some(ce => ce.exerciseId === ex.exerciseId);
              const isCurrent = index === currentExerciseIndex;
              
              return (
                <div
                  key={ex.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                    isCurrent 
                      ? 'bg-primary/10 border border-primary/30' 
                      : isCompleted 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-white/60 border border-secondary-light/30'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrent 
                        ? 'bg-primary text-white' 
                        : 'bg-accent/20 text-accent/60'
                  }`}>
                    {isCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-heading text-accent">{exData?.name || 'Unknown Exercise'}</div>
                    <div className="text-sm text-accent/70 font-body">
                      {ex.sets} sets × {typeof ex.reps === 'number' ? ex.reps : ex.reps}
                    </div>
                  </div>
                  {isCurrent && <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
