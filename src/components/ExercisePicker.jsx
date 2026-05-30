import { useState } from "react";
import { EXERCISE_CATEGORIES } from "../data/exercises";

export default function ExercisePicker({ onSelect }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = EXERCISE_CATEGORIES.map((cat) => ({
    ...cat,
    exercises: cat.exercises.filter(
      (ex) =>
        (!activeCategory || cat.name === activeCategory) &&
        ex.name.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.exercises.length > 0);

  return (
    <div className="picker-view">
      <div className="picker-header">
        <h1 className="app-title">
          <span className="title-accent">Lift</span>Log
        </h1>
        <p className="app-subtitle">Choose an exercise to log</p>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search exercises..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="category-tabs">
        <button
          className={`cat-tab ${!activeCategory ? "cat-tab--active" : ""}`}
          onClick={() => setActiveCategory(null)}
        >
          All
        </button>
        {EXERCISE_CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            className={`cat-tab ${activeCategory === cat.name ? "cat-tab--active" : ""}`}
            onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="exercise-list">
        {filtered.map((cat) => (
          <div key={cat.name} className="cat-group">
            <h3 className="cat-name">{cat.name}</h3>
            {cat.exercises.map((ex) => (
              <button
                key={ex.id}
                className="exercise-card"
                onClick={() => onSelect(ex.id)}
              >
                <span className="ex-icon">{ex.icon}</span>
                <span className="ex-name">{ex.name}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
