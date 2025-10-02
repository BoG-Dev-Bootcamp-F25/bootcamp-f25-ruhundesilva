import React, { useMemo } from "react";
import { toKilograms, toMeters } from "./Utils.jsx";

function InfoPanel({ pokemon }) {
  const statsList = useMemo(() => {
    if (!pokemon) return [];
    return pokemon.stats.map((s) => ({ name: s.stat.name, val: s.base_stat }));
  }, [pokemon]);

  return (
    <div className="panel">
      <h3>Info</h3>
      <div className="panel-body">
        {!pokemon ? (
          "—"
        ) : (
          <>
            <div>height: {toMeters(pokemon.height)}m</div>
            <div>weight: {toKilograms(pokemon.weight)}kg</div>
            {statsList.map((s) => (
              <div key={s.name}>
                {s.name}: {s.val}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default InfoPanel;
