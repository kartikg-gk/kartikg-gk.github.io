import { useCallback, useEffect, useState } from "react";

const USER = "kartikg-gk";
const CACHE_KEY = "gh-card-v1";
const REFRESH_MS = 10 * 60 * 1000;

type Day = { date: string; count: number; level: number };
type Stats = {
  contributions: number;
  repos: number;
  stars: number;
  followers: number;
  language: string;
  pushed: string;
};
type Snapshot = { days: Day[]; stats: Stats; at: number };

function ago(iso: string | number) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  const t = (n: number, u: string) => `${n} ${u}${n === 1 ? "" : "s"} ago`;
  if (s < 60) return "just now";
  if (s < 3600) return t(Math.round(s / 60), "minute");
  if (s < 86400) return t(Math.round(s / 3600), "hour");
  return t(Math.round(s / 86400), "day");
}

function readCache(): Snapshot | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as Snapshot) : null;
  } catch {
    return null;
  }
}

function writeCache(s: Snapshot) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable */
  }
}

async function fetchSnapshot(): Promise<Snapshot> {
  const ok = (r: Response) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status))));
  const [c, u, repos] = await Promise.all([
    fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`).then(ok),
    fetch(`https://api.github.com/users/${USER}`).then(ok),
    fetch(`https://api.github.com/users/${USER}/repos?per_page=100`).then(ok),
  ]);
  const list = repos as {
    stargazers_count: number;
    language: string | null;
    pushed_at: string;
    fork: boolean;
  }[];
  const own = list.filter((r) => !r.fork);
  const langs: Record<string, number> = {};
  own.forEach((r) => {
    if (r.language) langs[r.language] = (langs[r.language] ?? 0) + 1;
  });
  const top = Object.entries(langs).sort((a, b) => b[1] - a[1])[0];
  return {
    days: (c.contributions as Day[]).slice(-133),
    stats: {
      contributions: Object.values(c.total as Record<string, number>)[0] ?? 0,
      repos: u.public_repos,
      stars: own.reduce((n, r) => n + r.stargazers_count, 0),
      followers: u.followers,
      language: top ? top[0] : "n/a",
      pushed: list.map((r) => r.pushed_at).sort().pop() ?? "",
    },
    at: Date.now(),
  };
}

export default function GithubCard() {
  const [snap, setSnap] = useState<Snapshot | null>(readCache);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [, tick] = useState(0);

  const sync = useCallback(async () => {
    setBusy(true);
    try {
      const next = await fetchSnapshot();
      writeCache(next);
      setSnap(next);
      setFailed(false);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    const stale = !snap || Date.now() - snap.at > 60 * 1000;
    if (stale) void sync();
    const refresh = window.setInterval(() => {
      if (document.visibilityState === "visible") void sync();
    }, REFRESH_MS);
    const clock = window.setInterval(() => tick((n) => n + 1), 30 * 1000);
    return () => {
      window.clearInterval(refresh);
      window.clearInterval(clock);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sync]);

  if (!snap) return null;
  const { days, stats } = snap;
  return (
    <div className="gh-card">
      <div className="gh-head">
        <span className="label">github</span>
        <a
          className="gh-handle"
          href={`https://github.com/${USER}`}
          target="_blank"
          rel="noreferrer"
        >
          @{USER}
        </a>
      </div>
      <div className="gh-grid" aria-hidden="true">
        {days.map((d) => (
          <span
            key={d.date}
            className={`gh-cell l${d.level}`}
            title={`${d.count} on ${d.date}`}
          />
        ))}
      </div>
      <div className="gh-legend">
        less
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} className={`gh-cell l${l}`} />
        ))}
        more
      </div>
      <dl className="gh-stats">
        <div><dt>{stats.contributions.toLocaleString()}</dt><dd>contributions / yr</dd></div>
        <div><dt>{stats.repos}</dt><dd>repos</dd></div>
        <div><dt>{stats.stars}</dt><dd>stars</dd></div>
        <div><dt>{stats.followers}</dt><dd>followers</dd></div>
        <div><dt>{stats.language}</dt><dd>top</dd></div>
        <div><dt>{stats.pushed ? ago(stats.pushed) : "n/a"}</dt><dd>pushed</dd></div>
      </dl>
      <p className="gh-foot">
        <span>
          {failed ? "sync failed, showing saved data" : `synced ${ago(snap.at)}`}
        </span>
        <button className="gh-sync" onClick={() => void sync()} disabled={busy}>
          {busy ? "syncing…" : "sync now"}
        </button>
      </p>
    </div>
  );
}
