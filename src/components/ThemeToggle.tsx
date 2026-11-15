import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function initial(): Theme {
  try {
    return localStorage.getItem("theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(initial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  return (
    <button
      className="theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? "light" : "dark"}
    </button>
  );
}
