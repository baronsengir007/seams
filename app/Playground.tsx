"use client";

import { useRef, useState } from "react";

type Line = { t: string; c: string };

const COLOR: Record<string, string> = {
  muted: "text-muted",
  amber: "text-amber",
  added: "text-added",
  removed: "text-removed",
  text: "text-text",
};

const HELP: Line[] = [
  { t: "usage: seams <command> [options]", c: "text" },
  { t: "", c: "muted" },
  { t: "  check <a> <b>        compare two environments", c: "muted" },
  { t: "  check --only <src>   limit to one source: env | flags | tf", c: "muted" },
  { t: "  sources              list configured sources", c: "muted" },
  { t: "  --help               this text", c: "muted" },
];

const REPORT_ENV: Line[] = [
  { t: "~ env   REDIS_TTL          prod=900   staging=60", c: "amber" },
  { t: "- env   PAYMENT_RETRIES    prod=3     staging=∅", c: "removed" },
  { t: "2 seams found · exit code 1", c: "text" },
];

const REPORT_FLAGS: Line[] = [
  { t: "+ flags new-checkout       prod=off   staging=on", c: "added" },
  { t: "1 seam found · exit code 1", c: "text" },
];

const REPORT_TF: Line[] = [
  { t: "~ tf    db_instance_class  prod=r6.large staging=t3.medium (expected)", c: "muted" },
  { t: "0 unexpected seams · exit code 0", c: "text" },
];

const REPORT_ALL: Line[] = [
  { t: "comparing 3 sources: env, flags, terraform outputs …", c: "muted" },
  ...REPORT_ENV.slice(0, 2),
  ...REPORT_FLAGS.slice(0, 1),
  ...REPORT_TF.slice(0, 1),
  { t: "3 seams found, 1 expected · exit code 1", c: "text" },
];

function run(input: string): Line[] {
  const cmd = input.trim().replace(/\s+/g, " ");
  if (cmd === "" ) return [];
  if (!cmd.startsWith("seams"))
    return [{ t: `sh: command not found: ${cmd.split(" ")[0]} (try: seams --help)`, c: "removed" }];
  const rest = cmd.slice(5).trim();
  if (rest === "--help" || rest === "help" || rest === "")
    return HELP;
  if (rest === "sources")
    return [
      { t: "env    .env files via ssh (prod, staging)", c: "muted" },
      { t: "flags  LaunchDarkly project frontend", c: "muted" },
      { t: "tf     terraform outputs, workspace per env", c: "muted" },
    ];
  if (/^check\b/.test(rest)) {
    if (rest.includes("--only env")) return REPORT_ENV;
    if (rest.includes("--only flags")) return REPORT_FLAGS;
    if (rest.includes("--only tf")) return REPORT_TF;
    const args = rest.replace(/--\S+(\s+\S+)?/g, "").trim().split(" ").filter(Boolean);
    if (args.length >= 3) return REPORT_ALL;
    return [{ t: "seams: check needs two environments, e.g. `seams check prod staging`", c: "removed" }];
  }
  return [{ t: `seams: unknown command '${rest.split(" ")[0]}' (try: seams --help)`, c: "removed" }];
}

export default function Playground() {
  const [history, setHistory] = useState<Line[]>([
    { t: "# type a command — try `seams check prod staging` or `seams --help`", c: "muted" },
  ]);
  const [value, setValue] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  const submit = () => {
    const out = run(value);
    setHistory((h) => [
      ...h.slice(-40),
      { t: `$ ${value}`, c: "text" },
      ...out,
    ]);
    setValue("");
    requestAnimationFrame(() => {
      boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight });
    });
  };

  return (
    <div className="overflow-hidden rounded-md border border-border bg-panel">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 text-xs text-muted">
        interactive — commands run locally in your browser, nothing is sent anywhere
      </div>
      <div
        ref={boxRef}
        className="max-h-72 min-h-40 overflow-y-auto p-5 text-[13px] leading-relaxed sm:text-sm"
      >
        {history.map((l, i) => (
          <div key={i} className={COLOR[l.c]}>
            {l.t || " "}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex items-center gap-2 border-t border-border px-5 py-3"
      >
        <span className="text-muted">$</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="seams check prod staging"
          aria-label="Type a seams command"
          className="w-full bg-transparent text-sm text-text placeholder-muted outline-none"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className="rounded border border-border px-3 py-1 text-xs text-muted hover:border-amber hover:text-amber"
        >
          run
        </button>
      </form>
    </div>
  );
}
