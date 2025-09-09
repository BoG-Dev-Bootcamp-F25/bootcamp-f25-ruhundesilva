document.addEventListener("DOMContentLoaded", () => {
  const profileCard = document.querySelector("#profileCard");
  const flipCardButton = document.querySelector("#flipCardButton");
  const flipBackButton = document.querySelector("#flipBackButton");
  const themeToggleButton = document.querySelector("#themeToggleButton");
  const colorShuffleButton = document.querySelector("#accentShuffleButton");
  const copyEmailButton = document.querySelector("#copyEmailButton");
  const newFunFactButton = document.querySelector("#newFunFactButton");
  const savedSettings = window.localStorage;

  const setCardFlipped = (shouldFlip) => {
    profileCard.classList.toggle("is-flipped", shouldFlip);
    flipCardButton.setAttribute("aria-pressed", String(shouldFlip));
  };

  flipCardButton.addEventListener("click", () => {
    setCardFlipped(!profileCard.classList.contains("is-flipped"));
  });
  flipBackButton.addEventListener("click", () => setCardFlipped(false));

  profileCard.addEventListener("click", (event) => {
    const tag = (event.target.tagName || "").toLowerCase();
    if (tag === "button" || tag === "a") return;
    setCardFlipped(!profileCard.classList.contains("is-flipped"));
  });

  const applyThemePreference = (theme) =>
    document.documentElement.setAttribute("data-theme", theme);

  const storedTheme = savedSettings.getItem("theme-preference");
  if (storedTheme) applyThemePreference(storedTheme);

  themeToggleButton.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const nextTheme = current === "light" ? "dark" : "light";
    applyThemePreference(nextTheme);
    savedSettings.setItem("theme-preference", nextTheme);
  });

  const applyAccentColor = (color) =>
    document.documentElement.style.setProperty("--highlight-color", color);

  const storedAccent = savedSettings.getItem("accent-color");
  if (storedAccent) applyAccentColor(storedAccent);

  colorShuffleButton.addEventListener("click", () => {
    const hue = Math.floor(Math.random() * 360);
    const newColor = `hsl(${hue} 98% 58%)`;
    applyAccentColor(newColor);
    savedSettings.setItem("accent-color", newColor);
  });

  copyEmailButton.addEventListener("click", (event) => {
    event.preventDefault();
    navigator.clipboard.writeText("rsilva48@gatech.edu").catch(() => {});
  });

  const funFacts = [
    "I once taught a workshop for first-time coders.",
    "I love F1 data and built a race predictor.",
    "I am currently watching How I Met Your Mother (incredible show).",
  ];

  newFunFactButton.addEventListener("click", () => {
    const pick = funFacts[Math.floor(Math.random() * funFacts.length)];
    const funFactText = document.getElementById("funFactText");
    funFactText.textContent = `Fun fact: ${pick}`;
  });
});
