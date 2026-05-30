import { useState } from "react";
import ExercisePicker from "./components/ExercisePicker";
import WorkoutSession from "./components/WorkoutSession";
import { useWorkoutHistory } from "./hooks/useWorkoutHistory";

function App() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const { getLastSession, saveSession } = useWorkoutHistory();

  const handleSave = (exerciseId, sets) => {
    saveSession(exerciseId, sets);
  };

  if (selectedExercise) {
    return (
      <WorkoutSession
        exerciseId={selectedExercise}
        lastSession={getLastSession(selectedExercise)}
        onSave={handleSave}
        onBack={() => setSelectedExercise(null)}
      />
    );
  }

  return (
    <ExercisePicker
      onSelect={setSelectedExercise}
      history={JSON.parse(localStorage.getItem("workout_history") || "{}")}
    />
  );
}

export default App;
