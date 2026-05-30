const SET_TYPES = ["straight", "rir", "myo"];

function MiniSets({ miniSets, onChange }) {
  const update = (i, reps) => {
    const updated = miniSets.map((ms, idx) => (idx === i ? { reps } : ms));
    onChange(updated);
  };
  const add = () => onChange([...miniSets, { reps: "" }]);
  const remove = (i) => onChange(miniSets.filter((_, idx) => idx !== i));

  return (
    <div className="mini-sets">
      <span className="mini-sets-label">Mini-sets</span>
      <div className="mini-sets-row">
        {miniSets.map((ms, i) => (
          <div key={i} className="mini-set-chip">
            <input
              type="number"
              className="mini-set-input"
              placeholder="0"
              value={ms.reps}
              onChange={(e) => update(i, e.target.value)}
              min="0"
            />
            <span className="mini-set-unit">reps</span>
            <button className="mini-set-remove" onClick={() => remove(i)} aria-label="Remove">×</button>
          </div>
        ))}
        <button className="mini-set-add" onClick={add} title="Add mini-set">+</button>
      </div>
    </div>
  );
}

export default function SetRow({ setNumber, set, onChange, onRemove }) {
  const cycleType = () => {
    const next = SET_TYPES[(SET_TYPES.indexOf(set.type) + 1) % SET_TYPES.length];
    onChange({
      ...set,
      type: next,
      rir: next === "rir" ? (set.rir ?? 2) : set.rir,
      miniSets: next === "myo" ? (set.miniSets?.length ? set.miniSets : [{ reps: "" }]) : set.miniSets,
    });
  };

  const typeLabel = { straight: null, rir: "RIR", myo: "MYO" }[set.type];
  const isMyo = set.type === "myo";

  return (
    <div className={`set-row-wrap ${isMyo ? "set-row-wrap--myo" : ""}`}>
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

        <div className={`input-group ${isMyo ? "input-group--myo-act" : ""}`}>
          <input
            type="number"
            className="set-input"
            placeholder="0"
            value={set.reps || ""}
            onChange={(e) => onChange({ ...set, reps: e.target.value })}
            min="0"
          />
          <label className="input-label">{isMyo ? "activation" : "reps"}</label>
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

        <button className="remove-set" onClick={onRemove} aria-label="Remove set">×</button>
      </div>

      {isMyo && (
        <MiniSets
          miniSets={set.miniSets || []}
          onChange={(miniSets) => onChange({ ...set, miniSets })}
        />
      )}
    </div>
  );
}
