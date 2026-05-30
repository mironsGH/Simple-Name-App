function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function setLabel(set) {
  const weight = set.weight ? `${set.weight}lbs` : "BW";
  const reps = set.reps ? `×${set.reps}` : "";
  if (set.type === "rir") return `${weight}${reps} @RIR${set.rir ?? "?"}`;
  if (set.type === "myo") {
    const miniCount = set.miniSets?.length ?? 0;
    return `${weight}${reps}+${miniCount} MYO`;
  }
  return `${weight}${reps}`;
}

export default function PreviousSession({ session }) {
  if (!session) return null;

  return (
    <div className="previous-session">
      <div className="prev-header">
        <span className="prev-label">Last time</span>
        <span className="prev-date">{formatDate(session.date)}</span>
      </div>
      <div className="prev-sets">
        {session.sets.map((set, i) => (
          <span key={i} className={`prev-set prev-set--${set.type || "straight"}`}>
            {setLabel(set)}
          </span>
        ))}
      </div>
    </div>
  );
}
