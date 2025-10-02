import React, { useEffect, useState } from "react";
import "./App.css";

const API = "https://pokeapi.co/api/v2/pokemon/";

function App() {
  const [dexId, setDexId] = useState(1);
  const [pokemon, setPokemon] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setStatus("loading");
        const url = `${API}${dexId}`;
        const res = await fetch(url);

        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        const json = await res.json();
        if (!cancelled) {
          setPokemon(json);
          setStatus("idle");
        }
      } catch (e) {
        if (!cancelled) {
          setPokemon(null);
          setStatus("error");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [dexId]);

  return (
    <div className="wrap">
      <h1>Exercise 5 - PokeDex!</h1>
      <div className="content">
        <div className="left">
          <div className="status">Status: {status}</div>
          <div>Dex ID: {dexId}</div>
        </div>
        <div className="right">
          <pre className="debug">
            {pokemon ? `Loaded ${pokemon.name}` : "No data yet"}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
