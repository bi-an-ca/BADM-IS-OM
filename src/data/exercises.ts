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
  },
  // Yoga Exercises
  {
    id: 'yoga-1',
    name: 'Downward Dog',
    description: 'Classic yoga pose that stretches the entire body',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Full Body', 'Flexibility'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Start on hands and knees',
      'Tuck toes and lift hips up and back',
      'Straighten legs as much as comfortable',
      'Press hands into floor and lengthen spine',
      'Hold for 5-10 breaths'
    ]
  },
  {
    id: 'yoga-2',
    name: 'Warrior I',
    description: 'Powerful standing pose that builds strength and focus',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Legs', 'Core', 'Balance'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Step one foot forward into a lunge',
      'Turn back foot 45 degrees',
      'Raise arms overhead',
      'Bend front knee over ankle',
      'Hold for 5-8 breaths, then switch sides'
    ]
  },
  {
    id: 'yoga-3',
    name: 'Tree Pose',
    description: 'Balancing pose that improves focus and stability',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Legs', 'Balance', 'Core'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Stand on one leg',
      'Place other foot on inner thigh or calf',
      'Bring hands to prayer position',
      'Focus on a fixed point',
      'Hold for 30-60 seconds, then switch'
    ]
  },
  {
    id: 'yoga-4',
    name: 'Child\'s Pose',
    description: 'Restorative pose for relaxation and gentle stretching',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Back', 'Hips', 'Flexibility'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Kneel on the floor',
      'Sit back on heels',
      'Fold forward with arms extended',
      'Rest forehead on floor',
      'Hold for 1-3 minutes'
    ]
  },
  {
    id: 'yoga-5',
    name: 'Cat-Cow Stretch',
    description: 'Gentle spinal movement for flexibility and mobility',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Back', 'Spine', 'Flexibility'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Start on hands and knees',
      'Arch back and look up (cow)',
      'Round spine and tuck chin (cat)',
      'Move slowly between poses',
      'Repeat 8-10 times'
    ]
  },
  {
    id: 'yoga-6',
    name: 'Mountain Pose',
    description: 'Foundation pose that improves posture and awareness',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Posture', 'Core', 'Balance'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Stand with feet hip-width apart',
      'Arms at sides, palms facing forward',
      'Lengthen spine and engage core',
      'Breathe deeply and stand tall',
      'Hold for 1-2 minutes'
    ]
  },
  // Pilates Exercises
  {
    id: 'pilates-1',
    name: 'Hundred',
    description: 'Classic Pilates exercise for core strength and breathing',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Abs', 'Core'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Lie on back with knees bent',
      'Lift head and shoulders off floor',
      'Extend arms by sides, palms down',
      'Pump arms up and down',
      'Count to 100 while breathing rhythmically'
    ]
  },
  {
    id: 'pilates-2',
    name: 'Roll Up',
    description: 'Spinal articulation exercise for core strength',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Abs', 'Spine', 'Flexibility'],
    equipment: 'Bodyweight',
    difficulty: 'intermediate',
    instructions: [
      'Lie on back with arms overhead',
      'Slowly roll up one vertebra at a time',
      'Reach forward over legs',
      'Roll back down slowly',
      'Repeat 5-8 times'
    ]
  },
  {
    id: 'pilates-3',
    name: 'Single Leg Circle',
    description: 'Hip mobility and core stability exercise',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Hips', 'Core', 'Legs'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Lie on back with one leg extended',
      'Other leg bent, foot on floor',
      'Circle extended leg in both directions',
      'Keep hips stable and core engaged',
      'Complete 5 circles each direction, then switch'
    ]
  },
  {
    id: 'pilates-4',
    name: 'Rolling Like a Ball',
    description: 'Massage and strengthen the spine',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Core', 'Spine', 'Balance'],
    equipment: 'Bodyweight',
    difficulty: 'intermediate',
    instructions: [
      'Sit with knees to chest',
      'Hold behind thighs',
      'Roll back to shoulders',
      'Roll forward to sitting',
      'Repeat 6-8 times'
    ]
  },
  {
    id: 'pilates-5',
    name: 'Single Leg Stretch',
    description: 'Core stability and coordination exercise',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Abs', 'Core', 'Legs'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Lie on back with knees to chest',
      'Lift head and shoulders',
      'Extend one leg while pulling other knee in',
      'Switch legs rhythmically',
      'Repeat 8-10 times each side'
    ]
  },
  {
    id: 'pilates-6',
    name: 'Double Leg Stretch',
    description: 'Advanced core exercise for strength and control',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Abs', 'Core', 'Legs'],
    equipment: 'Bodyweight',
    difficulty: 'intermediate',
    instructions: [
      'Lie on back with knees to chest',
      'Lift head and shoulders',
      'Extend both legs and arms',
      'Circle arms back to knees',
      'Repeat 6-8 times'
    ]
  },
  // Flexibility Exercises
  {
    id: 'flex-1',
    name: 'Hip Flexor Stretch',
    description: 'Stretches tight hip flexors from sitting',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Hips', 'Flexibility'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Start in lunge position',
      'Lower back knee to ground',
      'Push hips forward',
      'Hold for 30-60 seconds',
      'Switch sides and repeat'
    ]
  },
  {
    id: 'flex-2',
    name: 'Hamstring Stretch',
    description: 'Improves flexibility in the back of the legs',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Legs', 'Flexibility'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Sit with one leg extended',
      'Other leg bent, foot to inner thigh',
      'Reach forward over extended leg',
      'Keep back straight',
      'Hold for 30-60 seconds, then switch'
    ]
  },
  {
    id: 'flex-3',
    name: 'Shoulder Stretch',
    description: 'Relieves tension in shoulders and upper back',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Shoulders', 'Flexibility'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Bring one arm across chest',
      'Use other arm to gently pull',
      'Keep shoulders relaxed',
      'Hold for 30 seconds',
      'Switch arms and repeat'
    ]
  },
  {
    id: 'flex-4',
    name: 'Chest Opener',
    description: 'Counteracts rounded shoulders from desk work',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Chest', 'Shoulders', 'Flexibility'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Stand with feet hip-width apart',
      'Clasp hands behind back',
      'Lift arms up and back',
      'Open chest and shoulders',
      'Hold for 30-60 seconds'
    ]
  },
  {
    id: 'flex-5',
    name: 'Spinal Twist',
    description: 'Improves spinal mobility and relieves back tension',
    imageUrl: 'https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg?auto=compress&cs=tinysrgb&w=800',
    muscleGroups: ['Spine', 'Back', 'Flexibility'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Sit with legs extended',
      'Bend one knee and place foot outside opposite knee',
      'Twist toward bent knee',
      'Place opposite elbow on knee',
      'Hold for 30-60 seconds, then switch'
    ]
  }
];