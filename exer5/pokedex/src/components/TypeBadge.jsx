import React from "react";
import { typeHex } from "./pokeColors.jsx";

function TypeBadge({ typeName }) {
  const color = typeHex[typeName] || "#999999";
  return (
    <span className="type-badge" style={{ backgroundColor: color }}>
      {typeName}
    </span>
  );
}

export default TypeBadge;
