import { useState } from "react";
import SetRow from "./SetRow";
import PreviousSession from "./PreviousSession";
import { findExercise } from "../data/exercises";

function newSet() {
  return { weight: "", reps: "", type: "straight", rir: 2 };
}

export default function WorkoutSession({ exerciseId, lastSession, onSave, onBack }) {
  const exercise = findExercise(exerciseId);
  const [sets, setSets] = useState([newSet()]);
  const [saved, setSaved] = useState(false);

  const updateSet = (index, updated) => {
    setSets((prev) => prev.map((s, i) => (i === index ? updated : s)));
  };

  const removeSet = (index) => {
    setSets((prev) => prev.filter((_, i) => i !== index));
  };

  const addSet = () => {
    const last = sets[sets.length - 1];
    setSets((prev) => [...prev, { ...newSet(), weight: last?.weight || "" }]);
  };

  const handleSave = () => {
    const filled = sets.filter((s) => s.weight || s.reps);
    if (filled.length === 0) return;
    onSave(exerciseId, filled);
    setSaved(true);
  };

  return (
    <div className="session-view">
      <div className="session-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <div className="exercise-title">
          <span className="exercise-icon">{exercise?.icon}</span>
          <div>
            <h2>{exercise?.name}</h2>
            <span className="category-tag">{exercise?.category}</span>
          </div>
        </div>
      </div>

      <PreviousSession session={lastSession} />

      <div className="sets-legend">
        <span>Set</span>
        <span>Weight</span>
        <span>Reps</span>
        <span className="legend-type" title="Tap pill to cycle: — → RIR → MYO">Type ⓘ</span>
      </div>

      <div className="sets-list">
        {sets.map((set, i) => (
          <SetRow
            key={i}
            setNumber={i + 1}
            set={set}
            onChange={(updated) => updateSet(i, updated)}
            onRemove={() => removeSet(i)}
          />
        ))}
      </div>

      <button className="add-set-btn" onClick={addSet}>
        + Add Set
      </button>

      {saved ? (
        <div className="save-success">
          <span>✓ Session saved</span>
          <button className="btn-primary" onClick={onBack}>
            Done
          </button>
        </div>
      ) : (
        <button className="btn-primary save-btn" onClick={handleSave}>
          Save Session
        </button>
      )}
    </div>
  );
}
