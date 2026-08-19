"use client";

import { useState } from "react";

const CMD = "curl -fsSL https://get.seams.example | sh";

export default function CopyInstall() {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(CMD).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
      className="group flex w-full items-center justify-between gap-4 rounded-md border border-border bg-raised px-4 py-3 text-left text-sm transition-colors hover:border-amber/60"
      aria-label="Copy install command"
    >
      <span>
        <span className="text-muted">$ </span>
        {CMD}
      </span>
      <span className={copied ? "text-added" : "text-muted group-hover:text-amber"}>
        {copied ? "copied" : "copy"}
      </span>
    </button>
  );
}
