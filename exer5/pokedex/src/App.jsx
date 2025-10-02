import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav.jsx";

const API = "https://pokeapi.co/api/v2/pokemon/";

function App() {
  const [dexId, setDexId] = useState(1);
  const [pokemon, setPokemon] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    async function load() {
      try {
        setStatus("loading");
        const url = `${API}${dexId}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        const json = await res.json();
        setPokemon(json);
        setStatus("idle");
      } catch (e) {
        setPokemon(null);
        setStatus("error");
      }
    }
    load();
  }, [dexId]);

  const prev = () => setDexId((n) => Math.max(1, n - 1));
  const next = () => setDexId((n) => n + 1);

  return (
    <div className="wrap">
      <h1>Exercise 5 - PokeDex!</h1>
      <div className="content">
        <div className="left">
          <div className="status">Status: {status}</div>
          <div>Dex ID: {dexId}</div>

          <Nav onPrev={prev} onNext={next} disabledPrev={dexId <= 1}></Nav>
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
