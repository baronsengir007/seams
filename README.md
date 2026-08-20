# seams

A fictional developer CLI: find where your environments disagree (env
vars, feature flags, Terraform outputs). Built as a portfolio
demonstration by Rienk Rienks; the page's COLOPHON says so too.

Live: https://baronsengir007.github.io/seams/

## Stack

Next.js (App Router, static export), Tailwind CSS v4, TypeScript.
Deployed on GitHub Pages. No backend, no tracking.

## How this site was designed

Built behavior-first, following the same behavior-driven UI method as my
other demos: derive the layout from a Behavior Read (five behavioural
states), then name the style and patterns from an interface field guide,
then execute.

**Behavior Read:** get a skeptical developer (arriving from a link, high
ability, low patience) to run the install command; the barrier is
motivation (is this worth 30 seconds of my terminal?); the page carries
them from Arrival to Action; measured by copy-clicks on the install
command.

Derived decisions:

- **Style: dark tech / terminal mono**: the field guide's fit for
  developer tools: but deliberately NOT the near-black-plus-acid-green
  cliche it warns about: deep slate blue surfaces in three tiers, one
  amber accent, diff colors reserved for actual diff semantics.
- **Signature element: the page IS a man page.** NAME, SYNOPSIS,
  DESCRIPTION, OPTIONS, EXAMPLES, COLOPHON: the product's own vernacular
  as the information architecture. Structure encodes something true, it
  does not decorate.
- **Show the payoff first:** the hero terminal types the command and
  prints the color-coded seam report (typewriter, once, no infinite
  loop; `prefers-reduced-motion` renders the finished state).
- **The action is one copy-click**: the install command is a button,
  repeated at the end (friction removed from the desired behaviour;
  serial-position effect on the final placement).
- **Type:** JetBrains Mono only: one family, weights carry the
  hierarchy. Honest specifics over superlatives everywhere: exit codes,
  read-only guarantees, what stays on your machine.

**Also demonstrated here:** the TRY IT section is an interactive
terminal: a small deterministic command parser (help, sources, check
with `--only` filters, error paths with hints) driving typed React
state, with history capping and auto-scroll. Everything runs
client-side; nothing is sent anywhere.

Quality floor: responsive, visible focus states, `aria-live` on the
terminal output, keyboard-reachable copy button, reduced motion
respected.

## How this was built

Written in Claude Code, but the design decisions come from a fixed
pipeline rather than from prompting until something looks nice. Two
reference documents of my own do the deciding: a behavior-driven UI
method (the five behavioural states and the Behavior Read above) and an
interface field guide (named layout patterns, style families, and the
cliches to avoid, refreshed as they rotate). Two Claude Code skills
execute against those: `design-taste-frontend` for visual direction and
anti-template discipline, and `emil-design-eng` for the motion rules
(transform and opacity only, ease-out curves, hover gated behind a
pointer query, reduced motion respected).

Behaviour outranks aesthetics at every conflict. That is why this page
is the quietest of the three demos: for a developer tool the field
guide's motion budget is near zero. The hero terminal types once and
settles, and man-page sections rise 6px as you scroll past them, half
the distance used on the other two demos. Restraint here was the
derived answer, not a shortcut.

The reveals are CSS scroll-driven animations (`animation-timeline:
view()`) inside `@supports` and `prefers-reduced-motion:
no-preference`, so the `opacity: 0` starting state never applies where
it is unsupported or unwanted: motion can never be the reason a section
is missing.
