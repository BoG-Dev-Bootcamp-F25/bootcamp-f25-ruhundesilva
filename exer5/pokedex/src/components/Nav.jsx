import React from "react";

function Nav({ onPrev, onNext, disabledPrev, disabledNext }) {
  return (
    <div className="nav">
      <button onClick={onPrev} disabled={disabledPrev}>
        &lt;
      </button>
      <button onClick={onNext} disabled={disabledNext}>
        &gt;
      </button>
    </div>
  );
}

export default Nav;
