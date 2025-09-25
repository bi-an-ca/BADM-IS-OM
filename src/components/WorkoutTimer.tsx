import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, Timer } from 'lucide-react';

interface WorkoutTimerProps {
  exerciseName: string;
  duration: number; // in seconds
  restDuration?: number; // in seconds
  onComplete?: () => void;
  onRestComplete?: () => void;
}

export function WorkoutTimer({ 
  exerciseName, 
  duration, 
  restDuration = 30, 
  onComplete, 
  onRestComplete 
}: WorkoutTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (!isRest) {
              setIsRest(true);
              setTimeLeft(restDuration);
              return restDuration;
            } else {
              setIsCompleted(true);
              onComplete?.();
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, isRest, restDuration, onComplete]);

  const handleStartPause = () => {
    if (isCompleted) {
      // Reset timer
      setIsCompleted(false);
      setIsRest(false);
      setTimeLeft(duration);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsRest(false);
    setIsCompleted(false);
    setTimeLeft(duration);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = isRest ? restDuration : duration;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const getStatusText = () => {
    if (isCompleted) return 'Workout Complete!';
    if (isRest) return 'Rest Time';
    return 'Work Time';
  };

  const getStatusColor = () => {
    if (isCompleted) return 'text-green-500';
    if (isRest) return 'text-blue-500';
    return 'text-primary';
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-secondary-light/50 p-6 shadow-lg">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          {isRest ? (
            <Clock className="h-6 w-6 text-blue-500 mr-2" />
          ) : (
            <Timer className="h-6 w-6 text-primary mr-2" />
          )}
          <h3 className="text-lg font-heading text-accent">{exerciseName}</h3>
        </div>
        
        <div className="mb-4">
          <p className={`text-sm font-body ${getStatusColor()}`}>
            {getStatusText()}
          </p>
        </div>

        {/* Circular Progress */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-secondary-light/30"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgress() / 100)}`}
              className={isRest ? 'text-blue-500' : 'text-primary'}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-heading text-accent">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handleStartPause}
            className={`px-6 py-3 rounded-xl font-heading transition-all duration-300 ${
              isRunning
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-primary hover:bg-primary/90 text-white'
            }`}
          >
            {isRunning ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
          
          <button
            onClick={handleReset}
            className="p-3 bg-secondary-light/20 hover:bg-secondary-light/30 text-accent rounded-xl transition-all duration-300"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-secondary-light/30 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isRest ? 'bg-blue-500' : 'bg-primary'
              }`}
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
