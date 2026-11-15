import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { social } from "../links";
import GithubCard from "../components/GithubCard";

export default function Home() {
  const [tag, setTag] = useState<string | null>(null);
  const navigate = useNavigate();

  const shown = projects.filter((p) => !tag || p.tags.includes(tag));

  return (
    <section>
      <p className="label">archive · 2026</p>
      <h1 className="hero">
        hi, i'm kartik<span className="dot">.</span>
      </h1>
      <p className="sub">
        research engineer <span className="sep">·</span> i build agents <span className="sep">·</span> pre-training and
        post-training of language models
      </p>
      <p className="now">
        as of now <span className="sep">·</span> exploring distributed systems,
        LM inference and mechanistic interpretability
      </p>
      <p className="links">
        {social.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
      </p>

      <h2 className="work-title">
        about <span className="jp" lang="ja">概要</span>
      </h2>
      <p className="about">
        I work at the intersection of AI research and engineering, focusing on RL
        post-training and agent systems. I'm interested in
        understanding how language models learn, improving their efficiency and
        reliability, and building systems to evaluate them.
      </p>

      <h2 className="work-title">
        work <span className="jp" lang="ja">仕事</span>
      </h2>
      <p className="work-sub">
        agents, retrieval and language-model training, built and written up.
      </p>

      {tag && (
        <p className="filter-note">
          showing “{tag}” ·{" "}
          <button className="plain" onClick={() => setTag(null)}>
            clear
          </button>
        </p>
      )}

      <ul className="proj-list">
        {shown.map((p) => (
          <li
            key={p.slug}
            className="proj"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a, button")) return;
              navigate(`/work/${p.slug}`);
            }}
          >
            <div className="proj-body">
              <h3 className="proj-name">
                <Link to={`/work/${p.slug}`}>{p.name}</Link>
              </h3>
              <p className="proj-desc">{p.summary}</p>
              <p className="proj-tags">
                {p.tags.map((t, i) => (
                  <span key={t}>
                    {i > 0 && <span className="proj-dot"> · </span>}
                    <button
                      className={tag === t ? "proj-tag on" : "proj-tag"}
                      onClick={() => setTag(tag === t ? null : t)}
                    >
                      {t}
                    </button>
                  </span>
                ))}
              </p>
              <p className="proj-links">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                    {l.label} ↗
                  </a>
                ))}
                {p.how.length > 0 && <Link to={`/work/${p.slug}`}>write-up</Link>}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="gh-wrap">
        <GithubCard />
      </div>
    </section>
  );
}
