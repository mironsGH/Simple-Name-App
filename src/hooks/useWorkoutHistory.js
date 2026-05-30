import { useState, useCallback } from "react";

const STORAGE_KEY = "workout_history";

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function useWorkoutHistory() {
  const [history, setHistory] = useState(loadHistory);

  const getLastSession = useCallback(
    (exerciseId) => {
      const sessions = history[exerciseId];
      if (!sessions || sessions.length === 0) return null;
      return sessions[sessions.length - 1];
    },
    [history]
  );

  const saveSession = useCallback(
    (exerciseId, sets) => {
      const newSession = {
        date: new Date().toISOString(),
        sets,
      };
      const updated = {
        ...history,
        [exerciseId]: [...(history[exerciseId] || []), newSession],
      };
      setHistory(updated);
      saveHistory(updated);
    },
    [history]
  );

  return { getLastSession, saveSession };
}
