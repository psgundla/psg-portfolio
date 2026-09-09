import { useEffect, useState } from "react";
import { motion, useScroll } from "motion/react";
import Journey from "./components/Journey";
import NavPill from "./components/NavPill";
import "./styles/Portfolio.css";

function initialTheme() {
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch { /* Fall back to system preference. */ }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [theme, setTheme] = useState(initialTheme);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#111A29" : "#F4F5F7");
    try { localStorage.setItem("portfolio-theme", theme); } catch { /* Keep session theme. */ }
  }, [theme]);

  return (
    <div className="site-shell journey-page">
      <a className="skip-link" href="#about">Skip to journey</a>
      <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#about" aria-label="Pranav Swaroop Gundla, journey home">
          <img src={`/brand/psg-final/psg-${theme === "dark" ? "white" : "black"}.svg`} width="1600" height="864" alt="" />
        </a>
        <NavPill />
        <div className="header-actions">
          <button type="button" className="theme-toggle" aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme === "light" ? "Dark" : "Light"}</button>
        </div>
      </header>
      <main id="main"><Journey /></main>
      <footer id="journey-contact" className="site-footer">
        <span>Pranav Swaroop Gundla</span>
        <a href="mailto:contact@psgundla.com">Let’s connect ↗</a>
      </footer>
    </div>
  );
}
