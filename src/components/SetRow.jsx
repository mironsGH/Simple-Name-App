const SET_TYPES = ["straight", "rir", "myo"];

export default function SetRow({ setNumber, set, onChange, onRemove }) {
  const cycleType = () => {
    const next = SET_TYPES[(SET_TYPES.indexOf(set.type) + 1) % SET_TYPES.length];
    onChange({ ...set, type: next, rir: next === "rir" ? (set.rir ?? 2) : set.rir });
  };

  const typeLabel = { straight: null, rir: "RIR", myo: "MYO" }[set.type];

  return (
    <div className="set-row">
      <span className="set-number">{setNumber}</span>

      <div className="input-group">
        <input
          type="number"
          className="set-input"
          placeholder="0"
          value={set.weight || ""}
          onChange={(e) => onChange({ ...set, weight: e.target.value })}
          min="0"
        />
        <label className="input-label">lbs</label>
      </div>

      <div className="input-group">
        <input
          type="number"
          className="set-input"
          placeholder="0"
          value={set.reps || ""}
          onChange={(e) => onChange({ ...set, reps: e.target.value })}
          min="0"
        />
        <label className="input-label">reps</label>
      </div>

      <div className="set-modifiers">
        <button
          className={`type-pill type-pill--${set.type}`}
          onClick={cycleType}
          title="Tap to cycle: Straight → RIR → Myo"
        >
          {typeLabel || "—"}
        </button>
        {set.type === "rir" && (
          <input
            type="number"
            className="rir-input"
            value={set.rir ?? 2}
            onChange={(e) =>
              onChange({ ...set, rir: Math.max(0, Math.min(10, Number(e.target.value))) })
            }
            min="0"
            max="10"
            title="Reps in Reserve"
          />
        )}
      </div>

      <button className="remove-set" onClick={onRemove} aria-label="Remove set">
        ×
      </button>
    </div>
  );
}
