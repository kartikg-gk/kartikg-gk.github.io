import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import { social } from "./links";
import ThemeToggle from "./components/ThemeToggle";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <section>
      <p className="label">archive / 404</p>
      <h1>nothing here.</h1>
      <p className="lede">
        <Link to="/">back home</Link>
      </p>
    </section>
  );
}

export default function App() {
  return (
    <div className="shell">
      <ScrollToTop />
      <header className="top">
        <Link to="/" className="brand">
          kartik<span className="dot">.</span>
        </Link>
        <ThemeToggle />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="foot">
        <span>kartik gadad · 2026</span>
        <span className="foot-links">
          {social.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </span>
      </footer>
    </div>
  );
}
