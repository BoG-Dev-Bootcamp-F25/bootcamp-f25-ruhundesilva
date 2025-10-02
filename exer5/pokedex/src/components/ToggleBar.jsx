import React from "react";

function ToggleBar({ mode, setMode }) {
  return (
    <div className="toggle">
      <button
        className={mode === "info" ? "active" : ""}
        onClick={() => setMode("info")}
      >
        Info
      </button>
      <button
        className={mode === "moves" ? "active" : ""}
        onClick={() => setMode("moves")}
      >
        Moves
      </button>
    </div>
  );
}

export default ToggleBar;
