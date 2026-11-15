import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const i = projects.findIndex((p) => p.slug === slug);

  if (i === -1) {
    return (
      <section>
        <p className="label">archive / work</p>
        <h1>not found.</h1>
        <p className="lede">
          <Link to="/">all work</Link>
        </p>
      </section>
    );
  }

  const p = projects[i];
  const prev = projects[i - 1];
  const next = projects[i + 1];

  return (
    <section>
      <p className="label">
        <Link to="/">archive / work</Link> /{" "}
        {String(i + 1).padStart(2, "0")}
      </p>
      <h1>{p.title}</h1>
      <p className="tags">
        {p.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </p>
      <p className="links">
        {p.links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
            {l.label} ↗
          </a>
        ))}
      </p>

      {p.stats && (
        <dl className="stats">
          {p.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      )}

      <h2 className="label">what it is</h2>
      <p className="prose">{p.what}</p>

      {p.image && (
        <figure className="figure">
          <img src={p.image.src} alt={p.image.alt} loading="lazy" />
        </figure>
      )}

      {p.how.length > 0 && (
        <>
          <h2 className="label">how it works</h2>
          <ul className="how">
            {p.how.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </>
      )}

      {p.note && (
        <>
          <h2 className="label">where it stands</h2>
          <p className="prose">{p.note}</p>
        </>
      )}

      <nav className="pager">
        {prev ? <Link to={`/work/${prev.slug}`}>← {prev.title}</Link> : <span />}
        {next ? <Link to={`/work/${next.slug}`}>{next.title} →</Link> : <span />}
      </nav>
    </section>
  );
}
