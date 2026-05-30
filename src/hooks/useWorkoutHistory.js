import { useState, useCallback } from "react";

export function useWorkoutHistory() {
  const [cache, setCache] = useState({});

  const getLastSession = useCallback(
    async (exerciseId) => {
      if (cache[exerciseId] !== undefined) return cache[exerciseId];
      try {
        const res = await fetch(`/api/history/${exerciseId}`);
        const { last } = await res.json();
        setCache((prev) => ({ ...prev, [exerciseId]: last }));
        return last;
      } catch {
        return null;
      }
    },
    [cache]
  );

  const saveSession = useCallback(async (exerciseId, sets) => {
    await fetch(`/api/history/${exerciseId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sets }),
    });
    setCache((prev) => ({ ...prev, [exerciseId]: undefined }));
  }, []);

  return { getLastSession, saveSession };
}
