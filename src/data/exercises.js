export const EXERCISE_CATEGORIES = [
  {
    name: "Push",
    exercises: [
      { id: "bench-press", name: "Bench Press", icon: "🏋️" },
      { id: "incline-bench", name: "Incline Bench Press", icon: "🏋️" },
      { id: "overhead-press", name: "Overhead Press", icon: "🔝" },
      { id: "dumbbell-shoulder-press", name: "DB Shoulder Press", icon: "💪" },
      { id: "dips", name: "Dips", icon: "⬇️" },
      { id: "tricep-pushdown", name: "Tricep Pushdown", icon: "🔽" },
      { id: "lateral-raises", name: "Lateral Raises", icon: "↔️" },
      { id: "chest-fly", name: "Cable Chest Fly", icon: "🦅" },
    ],
  },
  {
    name: "Pull",
    exercises: [
      { id: "deadlift", name: "Deadlift", icon: "🔱" },
      { id: "barbell-row", name: "Barbell Row", icon: "🚣" },
      { id: "pull-ups", name: "Pull-Ups", icon: "⬆️" },
      { id: "lat-pulldown", name: "Lat Pulldown", icon: "🏹" },
      { id: "cable-row", name: "Seated Cable Row", icon: "🚣" },
      { id: "face-pulls", name: "Face Pulls", icon: "🎯" },
      { id: "bicep-curl", name: "Bicep Curl", icon: "💪" },
      { id: "hammer-curl", name: "Hammer Curl", icon: "🔨" },
    ],
  },
  {
    name: "Legs",
    exercises: [
      { id: "squat", name: "Back Squat", icon: "🦵" },
      { id: "front-squat", name: "Front Squat", icon: "🦵" },
      { id: "romanian-deadlift", name: "Romanian Deadlift", icon: "🔱" },
      { id: "leg-press", name: "Leg Press", icon: "🦵" },
      { id: "leg-curl", name: "Leg Curl", icon: "🔄" },
      { id: "leg-extension", name: "Leg Extension", icon: "↗️" },
      { id: "calf-raise", name: "Calf Raise", icon: "⬆️" },
      { id: "bulgarian-split-squat", name: "Bulgarian Split Squat", icon: "🦵" },
    ],
  },
  {
    name: "Core",
    exercises: [
      { id: "plank", name: "Plank", icon: "🧱" },
      { id: "ab-wheel", name: "Ab Wheel Rollout", icon: "⚙️" },
      { id: "cable-crunch", name: "Cable Crunch", icon: "〰️" },
      { id: "hanging-leg-raise", name: "Hanging Leg Raise", icon: "🏗️" },
    ],
  },
];

export const ALL_EXERCISES = EXERCISE_CATEGORIES.flatMap((cat) =>
  cat.exercises.map((ex) => ({ ...ex, category: cat.name }))
);

export function findExercise(id) {
  return ALL_EXERCISES.find((ex) => ex.id === id);
}
