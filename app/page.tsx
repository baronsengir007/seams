import Terminal from "./Terminal";
import Playground from "./Playground";
import CopyInstall from "./CopyInstall";

function Section({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="man-h text-sm">{name}</h2>
      <div className="mt-3 pl-0 sm:pl-6">{children}</div>
    </section>
  );
}

const OPTIONS = [
  ["check <a> <b>", "compare two environments, exit 1 when unexpected seams exist"],
  ["--only env|flags|tf", "limit the comparison to one source"],
  ["--expect <file>", "seams listed in seams.expected.yml are reported, not fatal"],
  ["--format table|json", "human table (default) or JSON for CI annotations"],
  ["watch", "run on a schedule and post new seams to a webhook"],
];

const EXAMPLES = [
  {
    cmd: "seams check prod staging",
    txt: "The deploy-day question, answered before the deploy: what is different, and is it supposed to be?",
  },
  {
    cmd: "seams check prod staging --format json | jq '.unexpected'",
    txt: "Fail a pipeline only on seams nobody declared.",
  },
  {
    cmd: "seams watch --interval 6h --notify slack://deploys",
    txt: "Drift never announces itself. Get told the day it happens, not the day it hurts.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-20">
      {/* Man-page header */}
      <header className="flex items-baseline justify-between border-b border-border py-4 text-xs text-muted">
        <span>SEAMS(1)</span>
        <span className="hidden sm:inline">Environment Maintenance Manual</span>
        <span>SEAMS(1)</span>
      </header>

      {/* NAME + hero */}
      <Section name="NAME">
        <h1 className="text-2xl font-bold text-text sm:text-3xl">
          seams: find where your environments disagree
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Production and staging were identical once. Since then: 214
          deploys, 9 hotfixes, one intern with admin rights. seams diffs
          your env vars, feature flags and infra parameters across
          environments and tells you which differences are deliberate and
          which are drift.
        </p>
      </Section>

      <Section name="SYNOPSIS">
        <div className="space-y-4">
          <Terminal />
          <CopyInstall />
          <p className="text-xs text-muted">
            Single binary, no daemon. Linux, macOS. Reads, never writes.
          </p>
        </div>
      </Section>

      <Section name="DESCRIPTION">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-md border border-border bg-panel p-5">
            <h3 className="font-bold text-text">Three sources, one report</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Environment variables, feature flags (LaunchDarkly, Unleash,
              flat files) and Terraform outputs, joined on one key space so
              a flag in staging and a var in prod still line up.
            </p>
          </div>
          <div className="rounded-md border border-border bg-panel p-5">
            <h3 className="font-bold text-text">Expected is not noise</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Some differences are the point: instance sizes, debug flags.
              Declare them in <span className="text-text">seams.expected.yml</span>{" "}
              and they stay visible but stop failing your pipeline.
            </p>
          </div>
          <div className="rounded-md border border-border bg-panel p-5">
            <h3 className="font-bold text-text">Read-only by design</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              seams never mutates an environment and never phones home.
              Secrets are compared as digests; values stay on your machine.
            </p>
          </div>
          <div className="rounded-md border border-border bg-panel p-5">
            <h3 className="font-bold text-text">Exit codes you can ship</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              0 clean, 1 unexpected seams, 2 source unreachable. Wire it
              into CI in one line; the JSON output carries file-level
              annotations.
            </p>
          </div>
        </div>
      </Section>

      <Section name="OPTIONS">
        <dl className="divide-y divide-border rounded-md border border-border bg-panel">
          {OPTIONS.map(([flag, txt]) => (
            <div key={flag} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[240px_1fr] sm:gap-4">
              <dt className="text-amber">{flag}</dt>
              <dd className="text-sm text-muted">{txt}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section name="EXAMPLES">
        <div className="space-y-6">
          {EXAMPLES.map((e) => (
            <div key={e.cmd}>
              <div className="rounded-md border border-border bg-raised px-4 py-2.5 text-sm">
                <span className="text-muted">$ </span>
                {e.cmd}
              </div>
              <p className="mt-2 pl-1 text-sm text-muted">{e.txt}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section name="TRY IT">
        <Playground />
      </Section>

      <Section name="INSTALL">
        <div className="space-y-3">
          <CopyInstall />
          <p className="text-sm text-muted">
            Or grab the binary from the releases page. MIT licensed, source
            on GitHub.
          </p>
        </div>
      </Section>

      <Section name="COLOPHON">
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          <span className="font-bold text-text">seams</span> is a fictional
          tool. A portfolio project by Rienk Rienks -{" "}
          <a
            href="https://github.com/baronsengir007/seams"
            className="text-amber underline underline-offset-4"
          >
            source and design notes on GitHub
          </a>
          . Built with Next.js and Tailwind CSS, statically exported.
        </p>
      </Section>

      <footer className="mt-14 flex items-baseline justify-between border-t border-border pt-4 text-xs text-muted">
        <span>v0.0.0-fiction</span>
        <span>August 2026</span>
        <span>SEAMS(1)</span>
      </footer>
    </main>
  );
}
