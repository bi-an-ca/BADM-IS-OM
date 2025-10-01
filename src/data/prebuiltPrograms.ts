import type { WorkoutProgram } from '../types/user';

export const prebuiltPrograms: WorkoutProgram[] = [
  {
    id: 'beginner-strength',
    name: 'Beginner Strength',
    description: 'Perfect introduction to strength training with basic movements',
    type: 'pre-built',
    difficulty: 'beginner',
    duration: 30,
    targetMuscleGroups: ['Full Body'],
    equipment: ['Bodyweight'],
    createdBy: 'system',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    exercises: [
      { id: '1', exerciseId: '1', sets: 3, reps: 8, restTime: 60, order: 1, notes: 'Modify on knees if needed' },
      { id: '2', exerciseId: '2', sets: 3, reps: 10, restTime: 60, order: 2, notes: 'Keep chest up' },
      { id: '3', exerciseId: '6', sets: 3, reps: '30 seconds', restTime: 45, order: 3, notes: 'Hold straight line' },
      { id: '4', exerciseId: '8', sets: 2, reps: 8, restTime: 60, order: 4, notes: 'Alternate legs' },
      { id: '5', exerciseId: '12', sets: 3, reps: 12, restTime: 45, order: 5, notes: 'Squeeze glutes at top' }
    ]
  },
  {
    id: 'intro-yoga',
    name: 'Intro to Yoga',
    description: 'Gentle introduction to yoga with basic poses and breathing',
    type: 'pre-built',
    difficulty: 'beginner',
    duration: 25,
    targetMuscleGroups: ['Full Body', 'Flexibility'],
    equipment: ['Bodyweight'],
    createdBy: 'system',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    exercises: [
      { id: '1', exerciseId: 'yoga-6', sets: 1, reps: '2 minutes', restTime: 0, order: 1, notes: 'Focus on breathing' },
      { id: '2', exerciseId: 'yoga-5', sets: 1, reps: '10 reps', restTime: 0, order: 2, notes: 'Move slowly' },
      { id: '3', exerciseId: 'yoga-1', sets: 1, reps: '5 breaths', restTime: 0, order: 3, notes: 'Press hands down' },
      { id: '4', exerciseId: 'yoga-2', sets: 1, reps: '5 breaths each side', restTime: 0, order: 4, notes: 'Strong foundation' },
      { id: '5', exerciseId: 'yoga-3', sets: 1, reps: '30 seconds each side', restTime: 0, order: 5, notes: 'Find your balance' },
      { id: '6', exerciseId: 'yoga-4', sets: 1, reps: '2 minutes', restTime: 0, order: 6, notes: 'Rest and breathe' }
    ]
  },
  {
    id: 'pilates-basics',
    name: 'Pilates Basics',
    description: 'Core-focused Pilates routine for strength and stability',
    type: 'pre-built',
    difficulty: 'beginner',
    duration: 20,
    targetMuscleGroups: ['Core', 'Abs'],
    equipment: ['Bodyweight'],
    createdBy: 'system',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    exercises: [
      { id: '1', exerciseId: 'pilates-1', sets: 1, reps: '100 counts', restTime: 30, order: 1, notes: 'Breathe rhythmically' },
      { id: '2', exerciseId: 'pilates-5', sets: 1, reps: '8 each side', restTime: 30, order: 2, notes: 'Keep core engaged' },
      { id: '3', exerciseId: 'pilates-3', sets: 1, reps: '5 each direction', restTime: 30, order: 3, notes: 'Keep hips stable' },
      { id: '4', exerciseId: 'pilates-2', sets: 1, reps: 5, restTime: 45, order: 4, notes: 'Roll slowly' },
      { id: '5', exerciseId: 'pilates-4', sets: 1, reps: 6, restTime: 0, order: 5, notes: 'Control the movement' }
    ]
  },
  {
    id: '4-week-full-body',
    name: '4-Week Full Body',
    description: 'Progressive full-body program that builds strength over 4 weeks',
    type: 'pre-built',
    difficulty: 'intermediate',
    duration: 45,
    targetMuscleGroups: ['Full Body'],
    equipment: ['Bodyweight', 'Dumbbells'],
    createdBy: 'system',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    exercises: [
      { id: '1', exerciseId: '1', sets: 4, reps: 12, restTime: 90, order: 1, notes: 'Week 1: 8 reps, Week 4: 15 reps' },
      { id: '2', exerciseId: '2', sets: 4, reps: 15, restTime: 90, order: 2, notes: 'Add weight in weeks 3-4' },
      { id: '3', exerciseId: '3', sets: 3, reps: 8, restTime: 120, order: 3, notes: 'Focus on form' },
      { id: '4', exerciseId: '4', sets: 3, reps: 6, restTime: 120, order: 4, notes: 'Use assistance if needed' },
      { id: '5', exerciseId: '5', sets: 3, reps: 10, restTime: 90, order: 5, notes: 'Progressive overload' },
      { id: '6', exerciseId: '6', sets: 3, reps: '45 seconds', restTime: 60, order: 6, notes: 'Increase time weekly' }
    ]
  },
  {
    id: 'cardio-blast',
    name: 'Cardio Blast',
    description: 'High-energy cardio workout for fat burning and endurance',
    type: 'pre-built',
    difficulty: 'intermediate',
    duration: 25,
    targetMuscleGroups: ['Cardio', 'Full Body'],
    equipment: ['Bodyweight'],
    createdBy: 'system',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    exercises: [
      { id: '1', exerciseId: '13', sets: 1, reps: '1 minute', restTime: 30, order: 1, notes: 'Warm up pace' },
      { id: '2', exerciseId: '9', sets: 3, reps: 8, restTime: 60, order: 2, notes: 'Full range of motion' },
      { id: '3', exerciseId: '19', sets: 1, reps: '45 seconds', restTime: 30, order: 3, notes: 'High knees' },
      { id: '4', exerciseId: '10', sets: 1, reps: '30 seconds', restTime: 30, order: 4, notes: 'Fast pace' },
      { id: '5', exerciseId: '21', sets: 3, reps: 10, restTime: 60, order: 5, notes: 'Explosive movement' },
      { id: '6', exerciseId: '23', sets: 1, reps: '1 minute', restTime: 0, order: 6, notes: 'Cool down' }
    ]
  },
  {
    id: 'core-crusher',
    name: 'Core Crusher',
    description: 'Intensive core workout for strong abs and stability',
    type: 'pre-built',
    difficulty: 'intermediate',
    duration: 20,
    targetMuscleGroups: ['Abs', 'Core'],
    equipment: ['Bodyweight'],
    createdBy: 'system',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    exercises: [
      { id: '1', exerciseId: '6', sets: 3, reps: '45 seconds', restTime: 30, order: 1, notes: 'Hold straight line' },
      { id: '2', exerciseId: '16', sets: 3, reps: 20, restTime: 30, order: 2, notes: 'Control the twist' },
      { id: '3', exerciseId: '20', sets: 2, reps: '30 seconds each side', restTime: 30, order: 3, notes: 'Keep hips up' },
      { id: '4', exerciseId: '22', sets: 3, reps: 20, restTime: 30, order: 4, notes: 'Alternate sides' },
      { id: '5', exerciseId: '24', sets: 3, reps: 15, restTime: 30, order: 5, notes: 'Squeeze at top' },
      { id: '6', exerciseId: 'pilates-1', sets: 1, reps: '50 counts', restTime: 0, order: 6, notes: 'Finish strong' }
    ]
  },
  {
    id: 'flexibility-flow',
    name: 'Flexibility Flow',
    description: 'Gentle stretching routine to improve mobility and reduce tension',
    type: 'pre-built',
    difficulty: 'beginner',
    duration: 30,
    targetMuscleGroups: ['Flexibility', 'Full Body'],
    equipment: ['Bodyweight'],
    createdBy: 'system',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    exercises: [
      { id: '1', exerciseId: 'yoga-6', sets: 1, reps: '2 minutes', restTime: 0, order: 1, notes: 'Center yourself' },
      { id: '2', exerciseId: 'flex-1', sets: 1, reps: '1 minute each side', restTime: 0, order: 2, notes: 'Breathe deeply' },
      { id: '3', exerciseId: 'flex-2', sets: 1, reps: '1 minute each side', restTime: 0, order: 3, notes: 'Keep back straight' },
      { id: '4', exerciseId: 'flex-3', sets: 1, reps: '30 seconds each side', restTime: 0, order: 4, notes: 'Gentle pull' },
      { id: '5', exerciseId: 'flex-4', sets: 1, reps: '1 minute', restTime: 0, order: 5, notes: 'Open chest' },
      { id: '6', exerciseId: 'flex-5', sets: 1, reps: '1 minute each side', restTime: 0, order: 6, notes: 'Twist gently' },
      { id: '7', exerciseId: 'yoga-4', sets: 1, reps: '3 minutes', restTime: 0, order: 7, notes: 'Final relaxation' }
    ]
  },
  {
    id: 'upper-body-blast',
    name: 'Upper Body Blast',
    description: 'Comprehensive upper body workout for chest, back, shoulders, and arms',
    type: 'pre-built',
    difficulty: 'intermediate',
    duration: 40,
    targetMuscleGroups: ['Chest', 'Back', 'Shoulders', 'Arms'],
    equipment: ['Bodyweight', 'Dumbbells'],
    createdBy: 'system',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    exercises: [
      { id: '1', exerciseId: '1', sets: 4, reps: 12, restTime: 90, order: 1, notes: 'Chest focus' },
      { id: '2', exerciseId: '4', sets: 3, reps: 8, restTime: 120, order: 2, notes: 'Back strength' },
      { id: '3', exerciseId: '7', sets: 3, reps: 10, restTime: 90, order: 3, notes: 'Shoulder power' },
      { id: '4', exerciseId: '11', sets: 3, reps: 12, restTime: 90, order: 4, notes: 'Back detail' },
      { id: '5', exerciseId: '14', sets: 3, reps: 10, restTime: 90, order: 5, notes: 'Tricep focus' },
      { id: '6', exerciseId: '18', sets: 3, reps: 12, restTime: 90, order: 6, notes: 'Arm strength' }
    ]
  }
];

export const getProgramById = (id: string): WorkoutProgram | undefined => {
  return prebuiltPrograms.find(program => program.id === id);
};

export const getProgramsByDifficulty = (difficulty: string): WorkoutProgram[] => {
  return prebuiltPrograms.filter(program => program.difficulty === difficulty);
};

export const getProgramsByCategory = (category: string): WorkoutProgram[] => {
  return prebuiltPrograms.filter(program => 
    program.targetMuscleGroups.includes(category) || 
    program.equipment.includes(category)
  );
};
