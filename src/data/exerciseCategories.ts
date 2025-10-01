export interface ExerciseCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  exercises: string[]; // exercise IDs
}

export const exerciseCategories: ExerciseCategory[] = [
  {
    id: 'strength',
    name: 'Strength Training',
    description: 'Build muscle and increase strength with resistance exercises',
    icon: '💪',
    color: 'bg-blue-500',
    exercises: ['1', '3', '4', '5', '7', '11', '14', '15', '18', '21']
  },
  {
    id: 'yoga',
    name: 'Yoga',
    description: 'Improve flexibility, balance, and mindfulness',
    icon: '🧘',
    color: 'bg-green-500',
    exercises: ['yoga-1', 'yoga-2', 'yoga-3', 'yoga-4', 'yoga-5', 'yoga-6']
  },
  {
    id: 'pilates',
    name: 'Pilates',
    description: 'Core strength and body awareness exercises',
    icon: '🤸',
    color: 'bg-purple-500',
    exercises: ['pilates-1', 'pilates-2', 'pilates-3', 'pilates-4', 'pilates-5', 'pilates-6']
  },
  {
    id: 'cardio',
    name: 'Cardio',
    description: 'Heart-pumping exercises for endurance and fat burning',
    icon: '❤️',
    color: 'bg-pink-500',
    exercises: ['9', '13', '19', '21', '23']
  },
  {
    id: 'core',
    name: 'Core & Abs',
    description: 'Strengthen your core and abdominal muscles',
    icon: '🎯',
    color: 'bg-orange-500',
    exercises: ['6', '16', '20', '22', '24']
  },
  {
    id: 'flexibility',
    name: 'Flexibility',
    description: 'Improve mobility and range of motion',
    icon: '🤸‍♀️',
    color: 'bg-teal-500',
    exercises: ['flex-1', 'flex-2', 'flex-3', 'flex-4', 'flex-5']
  },
  {
    id: 'bodyweight',
    name: 'Bodyweight',
    description: 'No equipment needed - exercise anywhere',
    icon: '👤',
    color: 'bg-indigo-500',
    exercises: ['1', '2', '6', '8', '9', '10', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
  },
  {
    id: 'beginner',
    name: 'Beginner Friendly',
    description: 'Perfect for those new to fitness',
    icon: '🌟',
    color: 'bg-yellow-500',
    exercises: ['1', '2', '6', '8', '10', '12', '13', '16', '17', '19', '22', '24']
  }
];

export const workoutStyles = [
  { id: 'strength', name: 'Strength Training', description: 'Build muscle and increase strength', icon: '💪', color: 'bg-blue-500' },
  { id: 'yoga', name: 'Yoga', description: 'Flexibility, balance, and mindfulness', icon: '🧘', color: 'bg-green-500' },
  { id: 'pilates', name: 'Pilates', description: 'Core strength and body awareness', icon: '🤸', color: 'bg-purple-500' },
  { id: 'muscle-building', name: 'Muscle Building', description: 'Hypertrophy and muscle growth', icon: '🏋️', color: 'bg-red-500' },
  { id: 'cardio', name: 'Cardio', description: 'Heart health and endurance', icon: '❤️', color: 'bg-pink-500' },
  { id: 'general-fitness', name: 'General Fitness', description: 'Overall health and wellness', icon: '⚡', color: 'bg-yellow-500' }
];
