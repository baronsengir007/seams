"use client";

import { useEffect, useState } from "react";

const CMD = "seams check prod staging";
const REPORT = [
  { t: "comparing 3 sources: env, flags, terraform outputs …", c: "muted" },
  { t: "", c: "muted" },
  { t: "~ env      REDIS_TTL          prod=900      staging=60", c: "amber" },
  { t: "- env      PAYMENT_RETRIES    prod=3        staging=∅", c: "removed" },
  { t: "+ flags    new-checkout       prod=off      staging=on", c: "added" },
  { t: "~ tf       db_instance_class  prod=r6.large staging=t3.medium (expected)", c: "muted" },
  { t: "", c: "muted" },
  { t: "3 seams found, 1 expected · exit code 1", c: "text" },
];

const COLOR: Record<string, string> = {
  muted: "text-muted",
  amber: "text-amber",
  added: "text-added",
  removed: "text-removed",
  text: "text-text",
};

export default function Terminal() {
  const [typed, setTyped] = useState(0);
  const [lines, setLines] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      setTyped(CMD.length);
      setLines(REPORT.length);
      return;
    }
    let cancelled = false;
    let i = 0;
    const typeNext = () => {
      if (cancelled) return;
      if (i <= CMD.length) {
        setTyped(i);
        i += 1;
        setTimeout(typeNext, 45);
      } else {
        let l = 0;
        const printNext = () => {
          if (cancelled) return;
          if (l <= REPORT.length) {
            setLines(l);
            l += 1;
            setTimeout(printNext, 260);
          }
        };
        setTimeout(printNext, 350);
      }
    };
    const start = setTimeout(typeNext, 600);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, []);

  const done = lines >= REPORT.length;

  return (
    <div className="overflow-hidden rounded-md border border-border bg-panel shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-removed/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-added/70" />
        <span className="ml-3 text-xs text-muted">deploy-day, 09:41</span>
      </div>
      <div className="min-h-[300px] p-5 text-[13px] leading-relaxed sm:text-sm">
        <div>
          <span className="text-muted">$ </span>
          <span className={typed >= CMD.length && !done && !reduced ? "" : ""}>
            {CMD.slice(0, typed)}
          </span>
          {typed < CMD.length && <span className="caret" />}
        </div>
        <div className="mt-2" aria-live="polite">
          {REPORT.slice(0, lines).map((l, i) => (
            <div key={i} className={COLOR[l.c]}>
              {l.t || " "}
            </div>
          ))}
          {done && (
            <div className="mt-1">
              <span className="text-muted">$ </span>
              <span className="caret" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
