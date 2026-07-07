# Resume Website — Design

**Date:** 2026-07-06
**Repo:** this-is-my-life (deployed via GitHub Pages)

## Overview

A single-page personal resume website for Steven Gandham with three sections — **About Me**, **Resume**, **Projects** — styled with an anaglyph-3D ("red/cyan glasses") aesthetic. About Me and Resume ship with real content parsed from Steven's LinkedIn About and 2025 resume PDF; Projects ships as placeholder cards to be wired later.

## Stack & Hosting

- Plain static site: `index.html`, `css/style.css`, `js/script.js`, `assets/` (resume PDF, images).
- No frameworks, no build step, no external requests (system font stack).
- Deployable straight from this repo on GitHub Pages.

## Layout & Navigation

- Single page, sticky top nav: **About Me · Resume · Projects** + a **🕶 3D mode** toggle.
- Nav links smooth-scroll to sections; active section highlighted on scroll (IntersectionObserver).
- Responsive down to mobile (nav collapses gracefully; card grid stacks).

## Visual Style — "Anaglyph Eclectic"

Anaglyph 3D: display elements are rendered with horizontally offset red/cyan copies (text-shadow / layered pseudo-elements). Through red/cyan glasses, each eye sees one copy and the brain fuses them at depth. Offset direction = pop out vs. sink in; offset size = amount of depth. Without glasses, chromostereopsis still makes reds feel near and cyans far.

### Palette

| Role | Hex | Use |
|---|---|---|
| Background | `#0e0e10` | Near-black ground so fringes fuse cleanly |
| Base text | `#f2f0e9` | Warm off-white; screen-depth, fully readable |
| 3D near (right eye) | `#ff2a2a` | Red channel of anaglyph offsets |
| 3D far (left eye) | `#00e5e5` | Cyan channel |
| Accent 1 | `#ffd23f` | Retro yellow — tags, highlights |
| Accent 2 | `#b14aed` | Violet — links, hovers |

### Depth application

- Hero name: largest offset (~6px) — floats off the page.
- Section headings: medium offset (~3px).
- Project cards: offset red/cyan borders that shift on hover.
- Body text: **no offset** — clean and readable for visitors without glasses.
- **3D mode toggle** in nav: three states — off (no fringing), default, boosted (bigger offsets, applied to more elements). Persisted in `localStorage`.

## Content

### About Me (hero)

- Name: **Steven Gandham** — Software Engineer.
- Tagline: "Software is a solved problem. The real question is: what do we build next, and for whom?"
- Bio condensed from LinkedIn About: 5 years building enterprise backend systems touching 1.5M+ customers (Node.js, AWS serverless, event-driven architecture, agentic AI); driven by underserved users — clinics without CTOs, community colleges, local government; AI as a blank canvas ("the technology isn't the art — what you choose to paint is"); scarcest skill is knowing what to build and why; seeking a team that believes the most important software hasn't been written yet.
- Links: GitHub `stevengandham`, LinkedIn `steven-s-gandham`, email `stevengandham@gmail.com`. **Phone number omitted** from the public site.

### Resume

Timeline of experience (from resume PDF, lightly tightened):

1. **Realtor.com — Software Engineer II** (Jul 2021 – Present): $300K+ cost savings resolving processing failures; migrated 15-year legacy .NET service to Node.js 20; built/enhanced 7+ enterprise backend APIs; Splunk dashboards/alerts; Auth0 + SSO identity implementation; architecture documentation; mentored new grads and interns.
2. **Scorpion.co — Web Development Intern** (Jul – Sep 2019): Word-HTML → platform-HTML conversion tool (+280% efficiency); Chrome extension for DOM element conversion.
3. **Realtor.com — Engineering Intern** (Jul – Sep 2018): AWS Lambda, Transcribe, Comprehend, S3 audio-to-text; Node.js data-analysis scripts.
4. **Realtor.com — Application Development Intern** (Jun – Aug 2017): AWS proof-of-concept (S3, EC2, Firehose, API Gateway, CloudWatch, Lambda, VPC, Data Pipeline, SNS).
5. **TEECOM SCOUT Autonomous Drone — LiDAR Navigation Programmer Lead**: RPLidar A3M1 360° scanner; doorway/window/hallway detection and 2D room mapping; Python navigation code.

Skills, grouped (merged resume + LinkedIn):

- **Languages:** JavaScript, SQL, Python, C, Java, Bash/Zsh
- **Backend & Event-Driven:** Node.js, REST APIs, PostgreSQL, MySQL, MongoDB, MS SQL, Kafka, SNS/SQS, Pub/Sub
- **AWS Serverless:** Lambda, Step Functions, S3, API Gateway, CloudWatch
- **AI & Orchestration:** Claude, Devin, agentic workflows, autonomous system design
- **CI/CD & Observability:** Jenkins, Helm, ArgoCD, CircleCI, Docker, Splunk, New Relic

Education: **Cal Poly San Luis Obispo — B.S. Computer Engineering (2016–2020)**.

"Download PDF" button → `assets/Steven-Gandham-Resume-2025.pdf` (copied from ~/Downloads).

### Projects (placeholders)

- Responsive card grid; each card: name, short description, tech tags, **View Live ↗** button (opens in new tab).
- Ships with clearly-marked placeholder cards (Waypoint, Grounded, + one template card) with `#` URLs and `[TODO]` markers; Steven wires real links/descriptions later.

## Error handling / Edge cases

- All JS is progressive enhancement: page fully readable with JS disabled (no scroll-spy or toggle, but content intact).
- `prefers-reduced-motion` respected: no smooth-scroll or hover animations.
- 3D fringing kept off body copy at all times for readability/accessibility; toggle "off" state removes it entirely.

## Testing

- Open locally; verify nav scrolling + scroll-spy, 3D toggle states persist, responsive layout at mobile/tablet/desktop widths, PDF download link, and readability with fringing on/off.
