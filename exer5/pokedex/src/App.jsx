import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav.jsx";
import TypeBadge from "./components/TypeBadge.jsx";
import ToggleBar from "./components/ToggleBar.jsx";
import InfoPanel from "./components/InfoPanel.jsx";

const API = "https://pokeapi.co/api/v2/pokemon/";

function App() {
  const [dexId, setDexId] = useState(1);
  const [pokemon, setPokemon] = useState(null);
  const [status, setStatus] = useState("idle");
  const [mode, setMode] = useState("info");

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

  const imageUrl =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ??
    pokemon?.sprites?.other?.dream_world?.front_default ??
    pokemon?.sprites?.other?.home?.front_default ??
    pokemon?.sprites?.front_default ??
    "";

  const types = pokemon ? pokemon.types.map((t) => t.type.name) : [];

  return (
    <div className="wrap">
      <h1>Exercise 5 - PokeDex!</h1>
      <div className="content">
        <div className="left">
          <div className="sprite-box">
            {status === "loading" ? (
              <div className="loading">Loading…</div>
            ) : status === "error" ? (
              <div className="error">Not found</div>
            ) : imageUrl ? (
              <img src={imageUrl} alt={pokemon?.name || `pokemon #${dexId}`} />
            ) : (
              <div className="loading">—</div>
            )}
          </div>
          <div className="name-plate">{pokemon ? pokemon.name : "-"}</div>
          <div className="types">
            <div className="types-label">Types:</div>
            <div className="types-row">
              {types.length === 0
                ? "—"
                : types.map((t) => <TypeBadge key={t} typeName={t} />)}
            </div>
          </div>
          <div className="status">Status: {status}</div>
          <div>Dex ID: {dexId}</div>

          <Nav onPrev={prev} onNext={next} disabledPrev={dexId <= 1}></Nav>
        </div>
        <div className="right">
          <div className="panel-area">
            {mode === "info" ? (
              <InfoPanel pokemon={pokemon} />
            ) : (
              <div className="panel">
                <h3>Moves</h3>
                <div className="panel-body">Moves view</div>
              </div>
            )}
          </div>

          <div className="toggle-row">
            <ToggleBar mode={mode} setMode={setMode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
