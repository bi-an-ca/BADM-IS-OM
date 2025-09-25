import type { Exercise } from '../App';

export const exerciseDatabase: Exercise[] = [
  {
    id: '1',
    name: 'Push-ups',
    description: 'Classic bodyweight exercise for chest, shoulders, and triceps',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Chest', 'Shoulders', 'Arms'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Start in a plank position with hands slightly wider than shoulders',
      'Lower your body until chest nearly touches the floor',
      'Push back up to starting position',
      'Keep your body in a straight line throughout'
    ]
  },
  {
    id: '2',
    name: 'Squats',
    description: 'Fundamental lower body exercise targeting quads, glutes, and hamstrings',
    imageUrl: 'https://images.pexels.com/photos/4162438/pexels-photo-4162438.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Legs', 'Glutes'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower down as if sitting back into a chair',
      'Keep chest up and knees behind toes',
      'Return to standing position'
    ]
  },
  {
    id: '3',
    name: 'Deadlifts',
    description: 'Compound movement working posterior chain muscles',
    imageUrl: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Back', 'Legs', 'Glutes'],
    equipment: 'Barbell',
    difficulty: 'intermediate',
    instructions: [
      'Stand with feet hip-width apart, bar over mid-foot',
      'Hinge at hips, grab bar with mixed or double overhand grip',
      'Drive through heels, extend hips and knees simultaneously',
      'Stand tall, then lower bar with control'
    ]
  },
  {
    id: '4',
    name: 'Pull-ups',
    description: 'Upper body pulling exercise for back and biceps',
    imageUrl: 'https://images.pexels.com/photos/4164744/pexels-photo-4164744.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Back', 'Arms'],
    equipment: 'Pull-up bar',
    difficulty: 'intermediate',
    instructions: [
      'Hang from bar with palms facing away',
      'Pull body up until chin clears the bar',
      'Lower with control to full arm extension',
      'Engage core throughout movement'
    ]
  },
  {
    id: '5',
    name: 'Bench Press',
    description: 'Classic chest-building exercise with barbell',
    imageUrl: 'https://images.pexels.com/photos/4162491/pexels-photo-4162491.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Chest', 'Shoulders', 'Arms'],
    equipment: 'Barbell',
    difficulty: 'intermediate',
    instructions: [
      'Lie on bench with feet firmly on floor',
      'Grip bar slightly wider than shoulders',
      'Lower bar to chest with control',
      'Press bar up until arms are fully extended'
    ]
  },
  {
    id: '6',
    name: 'Planks',
    description: 'Isometric core strengthening exercise',
    imageUrl: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Abs'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Start in push-up position on forearms',
      'Keep body in straight line from head to heels',
      'Engage core muscles',
      'Hold position for specified time'
    ]
  },
  {
    id: '7',
    name: 'Overhead Press',
    description: 'Shoulder and core strengthening exercise',
    imageUrl: 'https://images.pexels.com/photos/4164758/pexels-photo-4164758.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Shoulders', 'Arms'],
    equipment: 'Barbell',
    difficulty: 'intermediate',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Hold bar at shoulder level',
      'Press bar overhead until arms are fully extended',
      'Lower bar back to shoulders with control'
    ]
  },
  {
    id: '8',
    name: 'Lunges',
    description: 'Unilateral leg exercise for strength and stability',
    imageUrl: 'https://images.pexels.com/photos/4162505/pexels-photo-4162505.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Legs', 'Glutes'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Step forward with one leg',
      'Lower hips until both knees are at 90 degrees',
      'Push back to starting position',
      'Alternate legs or complete set on one side'
    ]
  },
  {
    id: '9',
    name: 'Burpees',
    description: 'Full-body cardio exercise combining squat, push-up, and jump',
    imageUrl: 'https://images.pexels.com/photos/4162483/pexels-photo-4162483.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Cardio', 'Full Body'],
    equipment: 'Bodyweight',
    difficulty: 'intermediate',
    instructions: [
      'Start in standing position',
      'Drop into squat and place hands on floor',
      'Jump feet back to plank position',
      'Do push-up, jump feet to squat, then jump up'
    ]
  },
  {
    id: '10',
    name: 'Mountain Climbers',
    description: 'Dynamic cardio exercise targeting core and legs',
    imageUrl: 'https://images.pexels.com/photos/4162515/pexels-photo-4162515.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Cardio', 'Abs', 'Legs'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Start in plank position',
      'Bring right knee toward chest',
      'Quickly switch and bring left knee to chest',
      'Continue alternating at a rapid pace'
    ]
  },
  {
    id: '11',
    name: 'Dumbbell Rows',
    description: 'Back strengthening exercise with dumbbells',
    imageUrl: 'https://images.pexels.com/photos/4164763/pexels-photo-4164763.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Back', 'Arms'],
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Bend over with one knee on bench',
      'Hold dumbbell in opposite hand',
      'Pull dumbbell to hip, squeezing shoulder blade',
      'Lower with control and repeat'
    ]
  },
  {
    id: '12',
    name: 'Hip Thrusts',
    description: 'Glute-focused exercise for posterior chain development',
    imageUrl: 'https://images.pexels.com/photos/4162440/pexels-photo-4162440.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Glutes', 'Legs'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Lie on back with knees bent',
      'Squeeze glutes and lift hips up',
      'Create straight line from knees to shoulders',
      'Lower with control and repeat'
    ]
  },
  {
    id: '13',
    name: 'Jumping Jacks',
    description: 'Full-body cardio exercise for warming up and endurance',
    imageUrl: 'https://images.pexels.com/photos/4162483/pexels-photo-4162483.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Cardio', 'Full Body'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Stand with feet together and arms at sides',
      'Jump up spreading feet shoulder-width apart',
      'Simultaneously raise arms overhead',
      'Jump back to starting position'
    ]
  },
  {
    id: '14',
    name: 'Diamond Push-ups',
    description: 'Advanced push-up variation targeting triceps and chest',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Chest', 'Arms'],
    equipment: 'Bodyweight',
    difficulty: 'intermediate',
    instructions: [
      'Start in push-up position with hands close together',
      'Form diamond shape with thumbs and index fingers',
      'Lower chest toward hands',
      'Push back up to starting position'
    ]
  },
  {
    id: '15',
    name: 'Bulgarian Split Squats',
    description: 'Single-leg squat variation for strength and stability',
    imageUrl: 'https://images.pexels.com/photos/4162505/pexels-photo-4162505.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Legs', 'Glutes'],
    equipment: 'Bodyweight',
    difficulty: 'intermediate',
    instructions: [
      'Stand 2-3 feet in front of a bench',
      'Place top of rear foot on bench',
      'Lower into lunge position',
      'Drive through front heel to return to start'
    ]
  },
  {
    id: '16',
    name: 'Russian Twists',
    description: 'Core exercise targeting obliques and rotational strength',
    imageUrl: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Abs'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Sit with knees bent and feet flat',
      'Lean back slightly and lift feet off ground',
      'Rotate torso side to side',
      'Keep core engaged throughout'
    ]
  },
  {
    id: '17',
    name: 'Wall Sits',
    description: 'Isometric leg exercise for quad strength and endurance',
    imageUrl: 'https://images.pexels.com/photos/4162505/pexels-photo-4162505.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Legs'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Stand with back against wall',
      'Slide down until thighs are parallel to floor',
      'Hold position with knees at 90 degrees',
      'Keep back flat against wall'
    ]
  },
  {
    id: '18',
    name: 'Tricep Dips',
    description: 'Upper body exercise targeting triceps and shoulders',
    imageUrl: 'https://images.pexels.com/photos/4164744/pexels-photo-4164744.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Arms', 'Shoulders'],
    equipment: 'Bodyweight',
    difficulty: 'intermediate',
    instructions: [
      'Sit on edge of bench with hands gripping edge',
      'Slide forward and lower body',
      'Bend elbows to 90 degrees',
      'Push back up to starting position'
    ]
  },
  {
    id: '19',
    name: 'High Knees',
    description: 'Cardio exercise for leg strength and endurance',
    imageUrl: 'https://images.pexels.com/photos/4162515/pexels-photo-4162515.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Cardio', 'Legs'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Stand with feet hip-width apart',
      'Run in place bringing knees up high',
      'Pump arms naturally',
      'Land softly on balls of feet'
    ]
  },
  {
    id: '20',
    name: 'Side Planks',
    description: 'Core exercise targeting obliques and stability',
    imageUrl: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Abs'],
    equipment: 'Bodyweight',
    difficulty: 'intermediate',
    instructions: [
      'Lie on side with legs straight',
      'Prop up on forearm',
      'Lift hips to create straight line',
      'Hold position and breathe normally'
    ]
  },
  {
    id: '21',
    name: 'Jump Squats',
    description: 'Explosive leg exercise for power and cardio',
    imageUrl: 'https://images.pexels.com/photos/4162505/pexels-photo-4162505.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Legs', 'Glutes', 'Cardio'],
    equipment: 'Bodyweight',
    difficulty: 'intermediate',
    instructions: [
      'Start in squat position',
      'Jump up explosively',
      'Land softly back in squat',
      'Immediately prepare for next jump'
    ]
  },
  {
    id: '22',
    name: 'Bicycle Crunches',
    description: 'Core exercise mimicking bicycle pedaling motion',
    imageUrl: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Abs'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Lie on back with hands behind head',
      'Bring knees to 90 degrees',
      'Alternate bringing elbow to opposite knee',
      'Keep lower back pressed to floor'
    ]
  },
  {
    id: '23',
    name: 'Inchworms',
    description: 'Full-body exercise combining forward fold and plank walk',
    imageUrl: 'https://images.pexels.com/photos/4162483/pexels-photo-4162483.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Full Body', 'Cardio'],
    equipment: 'Bodyweight',
    difficulty: 'intermediate',
    instructions: [
      'Start standing with feet together',
      'Bend forward and walk hands out to plank',
      'Hold plank for a moment',
      'Walk hands back to feet and stand up'
    ]
  },
  {
    id: '24',
    name: 'Glute Bridges',
    description: 'Hip extension exercise for glutes and hamstrings',
    imageUrl: 'https://images.pexels.com/photos/4162440/pexels-photo-4162440.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Glutes', 'Legs'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Lie on back with knees bent and feet flat',
      'Squeeze glutes and lift hips up',
      'Create straight line from knees to shoulders',
      'Lower with control and repeat'
    ]
  }
];