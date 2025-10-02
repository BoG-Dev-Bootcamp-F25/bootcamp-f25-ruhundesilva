import React from "react";

function MovesPanel({ pokemon }) {
  return (
    <div className="panel">
      <h3>Moves</h3>
      <div className="panel-body moves">
        {!pokemon
          ? "—"
          : pokemon.moves.map((m) => (
              <div key={m.move.name}>{m.move.name}</div>
            ))}
      </div>
    </div>
  );
}

export default MovesPanel;
