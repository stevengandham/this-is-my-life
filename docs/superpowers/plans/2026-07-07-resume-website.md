# Anaglyph Resume Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page static resume website (About Me / Resume / Projects) with an anaglyph red/cyan 3D aesthetic and real content for Steven Gandham.

**Architecture:** One `index.html` holding all content, one stylesheet driving layout plus the anaglyph depth system (a `--d` CSS multiplier scaled by `body[data-3d]`), and one small script for the 3D-mode toggle and scroll-spy. No build step; everything is progressive enhancement over readable HTML.

**Tech Stack:** Plain HTML5, CSS3 (custom properties, grid, IntersectionObserver-friendly markup), vanilla JS. Hosted on GitHub Pages.

## Global Constraints

- No external requests of any kind: no CDN fonts, scripts, or images. System font stack only.
- Palette (exact values): background `#0e0e10`, base text `#f2f0e9`, red `#ff2a2a`, cyan `#00e5e5`, yellow `#ffd23f`, violet `#b14aed`.
- Anaglyph fringing NEVER applies to body copy — display elements (name, headings, card borders, tags) only.
- 3D mode has three states — `on` (default), `boost`, `off` — persisted in `localStorage` key `mode3d`.
- Page must remain fully readable with JavaScript disabled.
- Respect `prefers-reduced-motion` (no smooth scroll / hover motion).
- Phone number must NOT appear anywhere on the site.
- Spec: `docs/superpowers/specs/2026-07-06-resume-website-design.md`.

---

### Task 1: HTML content skeleton

**Files:**
- Create: `index.html`

**Interfaces:**
- Produces: section ids `about`, `resume`, `projects` (Task 3 scroll-spy targets); nav links with class `nav-link`; button `#toggle-3d`; `body[data-3d="on"]`; classes `anaglyph`, `hero-name`, `card` consumed by Task 2 CSS; `css/style.css` and `js/script.js` referenced (created in Tasks 2–3).

- [ ] **Step 1: Write `index.html` with the full site content**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Steven Gandham — Software Engineer</title>
  <meta name="description" content="Steven Gandham — software engineer building backend systems and AI-powered tools for the people who need them most.">
  <link rel="stylesheet" href="css/style.css">
</head>
<body data-3d="on">

<header class="site-nav">
  <a class="brand anaglyph" href="#about">SG</a>
  <nav class="nav-links" aria-label="Sections">
    <a class="nav-link" href="#about">About Me</a>
    <a class="nav-link" href="#resume">Resume</a>
    <a class="nav-link" href="#projects">Projects</a>
  </nav>
  <button id="toggle-3d" class="toggle-3d" type="button" aria-label="Cycle 3D mode">🕶 3D: on</button>
</header>

<main>
  <!-- ============ ABOUT ME ============ -->
  <section id="about" class="section hero">
    <p class="kicker">Software Engineer</p>
    <h1 class="hero-name anaglyph-big">Steven Gandham</h1>
    <p class="tagline">Software is a solved problem. The real question is: <em>what do we build next, and for whom?</em></p>
    <div class="bio">
      <p>I've spent 5 years building enterprise-grade backend systems touching 1.5M+ customers — Node.js, AWS serverless, event-driven architecture, agentic AI. I've lived in the stack. But what drives me isn't the technology. It's the people still waiting in a DMV line in 2026 wondering why nothing has changed.</p>
      <p>Big tech doesn't need my help — they have armies. The underserved do: the small clinic that can't afford a CTO, the community college trying to democratize education, the local government running on software older than its employees. AI finally gives us the tools to solve these problems at scale.</p>
      <p>I think of AI like a blank canvas. <strong>The technology isn't the art. What you choose to paint is.</strong> In an age where AI can execute, the scarcest skill is knowing what to build and why.</p>
      <p>I'm looking for a team that believes the most important software hasn't been written yet — and that the people who need it most aren't on the Forbes list.</p>
    </div>
    <div class="hero-links">
      <a class="btn" href="https://github.com/stevengandham" target="_blank" rel="noopener">GitHub ↗</a>
      <a class="btn" href="https://www.linkedin.com/in/steven-s-gandham" target="_blank" rel="noopener">LinkedIn ↗</a>
      <a class="btn" href="mailto:stevengandham@gmail.com">Email</a>
    </div>
  </section>

  <!-- ============ RESUME ============ -->
  <section id="resume" class="section">
    <h2 class="section-title anaglyph">Resume</h2>
    <a class="btn btn-accent" href="assets/Steven-Gandham-Resume-2025.pdf" download>Download PDF ⤓</a>

    <h3 class="subhead">Experience</h3>
    <ol class="timeline">
      <li class="entry">
        <div class="entry-head">
          <h4>Software Engineer II · <span class="org">Realtor.com</span></h4>
          <p class="dates">Jul 2021 – Present</p>
        </div>
        <ul>
          <li>Resolved complex processing failures, saving over $300,000 in third-party billing.</li>
          <li>Migrated a 15-year-old legacy .NET service to a Node.js 20 framework.</li>
          <li>Developed and enhanced 7+ enterprise backend APIs integrating diverse databases and external service pipelines.</li>
          <li>Built comprehensive Splunk dashboards, reports, and alerts for high-impact services.</li>
          <li>Implemented Auth0 and SSO identity for user sign-up and login.</li>
          <li>Authored service architecture documentation — presentations and one-pagers on features and company impact.</li>
          <li>Mentored a new-grad hire and summer interns.</li>
        </ul>
      </li>
      <li class="entry">
        <div class="entry-head">
          <h4>Web Development Intern · <span class="org">Scorpion.co</span></h4>
          <p class="dates">Jul – Sep 2019</p>
        </div>
        <ul>
          <li>Built a tool converting Word HTML to Scorpion-platform HTML, boosting efficiency 280%.</li>
          <li>Collaborated on a Chrome extension converting selected DOM elements to properly formatted HTML.</li>
        </ul>
      </li>
      <li class="entry">
        <div class="entry-head">
          <h4>Engineering Intern · <span class="org">Realtor.com</span></h4>
          <p class="dates">Jul – Sep 2018</p>
        </div>
        <ul>
          <li>Audio-to-text transcription with AWS Lambda, Transcribe, Comprehend, and S3.</li>
          <li>Wrote Node.js algorithms and Lambda functions for data analysis.</li>
        </ul>
      </li>
      <li class="entry">
        <div class="entry-head">
          <h4>Application Development Intern · <span class="org">Realtor.com</span></h4>
          <p class="dates">Jun – Aug 2017</p>
        </div>
        <ul>
          <li>Built an AWS proof of concept spanning S3, EC2, Firehose, API Gateway, CloudWatch, Lambda, VPC, Data Pipeline, and SNS.</li>
        </ul>
      </li>
      <li class="entry">
        <div class="entry-head">
          <h4>LiDAR Navigation Programmer Lead · <span class="org">TEECOM SCOUT Autonomous Drone</span></h4>
          <p class="dates">Cal Poly</p>
        </div>
        <ul>
          <li>Interpreted RPLidar A3M1 360° scanner data for doorway/window/hallway detection and 2D room mapping.</li>
          <li>Developed Python drone-navigation code accounting for flight stability.</li>
        </ul>
      </li>
    </ol>

    <h3 class="subhead">Skills</h3>
    <dl class="skills">
      <div class="skill-group"><dt>Languages</dt><dd><span class="tag">JavaScript</span><span class="tag">SQL</span><span class="tag">Python</span><span class="tag">C</span><span class="tag">Java</span><span class="tag">Bash/Zsh</span></dd></div>
      <div class="skill-group"><dt>Backend &amp; Event-Driven</dt><dd><span class="tag">Node.js</span><span class="tag">REST APIs</span><span class="tag">PostgreSQL</span><span class="tag">MySQL</span><span class="tag">MongoDB</span><span class="tag">MS SQL</span><span class="tag">Kafka</span><span class="tag">SNS/SQS</span><span class="tag">Pub/Sub</span></dd></div>
      <div class="skill-group"><dt>AWS Serverless</dt><dd><span class="tag">Lambda</span><span class="tag">Step Functions</span><span class="tag">S3</span><span class="tag">API Gateway</span><span class="tag">CloudWatch</span></dd></div>
      <div class="skill-group"><dt>AI &amp; Orchestration</dt><dd><span class="tag">Claude</span><span class="tag">Devin</span><span class="tag">Agentic workflows</span><span class="tag">Autonomous system design</span></dd></div>
      <div class="skill-group"><dt>CI/CD &amp; Observability</dt><dd><span class="tag">Jenkins</span><span class="tag">Helm</span><span class="tag">ArgoCD</span><span class="tag">CircleCI</span><span class="tag">Docker</span><span class="tag">Splunk</span><span class="tag">New Relic</span></dd></div>
    </dl>

    <h3 class="subhead">Education</h3>
    <div class="entry">
      <div class="entry-head">
        <h4>B.S. Computer Engineering · <span class="org">Cal Poly San Luis Obispo</span></h4>
        <p class="dates">2016 – 2020</p>
      </div>
    </div>
  </section>

  <!-- ============ PROJECTS (placeholders — wire real links later) ============ -->
  <section id="projects" class="section">
    <h2 class="section-title anaglyph">Projects</h2>
    <div class="card-grid">
      <article class="card">
        <h3>Waypoint</h3>
        <p>[TODO: one-sentence description of Waypoint]</p>
        <p class="card-tags"><span class="tag">JavaScript</span><span class="tag">[TODO]</span></p>
        <a class="btn btn-accent" href="#" target="_blank" rel="noopener">View Live ↗ <!-- TODO: live URL --></a>
      </article>
      <article class="card">
        <h3>Grounded</h3>
        <p>[TODO: one-sentence description of Grounded]</p>
        <p class="card-tags"><span class="tag">[TODO]</span></p>
        <a class="btn btn-accent" href="#" target="_blank" rel="noopener">View Live ↗ <!-- TODO: live URL --></a>
      </article>
      <article class="card">
        <h3>[TODO: Project name]</h3>
        <p>[TODO: description — duplicate this card for more projects]</p>
        <p class="card-tags"><span class="tag">[TODO]</span></p>
        <a class="btn btn-accent" href="#" target="_blank" rel="noopener">View Live ↗</a>
      </article>
    </div>
  </section>
</main>

<footer class="site-footer">
  <p>© 2026 Steven Gandham · Built by hand, no frameworks · <span class="anaglyph">Best enjoyed with red/cyan glasses</span> 🕶</p>
</footer>

<script src="js/script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify the HTML parses and content is present**

Run: `python3 -c "from html.parser import HTMLParser; HTMLParser().feed(open('index.html').read()); print('parsed OK')" && grep -c "660-3757" index.html; true`
Expected: `parsed OK`, and grep count `0` (phone number absent).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add site HTML with About Me, Resume, and placeholder Projects"
```

---

### Task 2: Stylesheet — layout, palette, anaglyph depth system

**Files:**
- Create: `css/style.css`

**Interfaces:**
- Consumes: classes/ids from Task 1 (`site-nav`, `nav-link`, `toggle-3d`, `section`, `hero`, `hero-name`, `anaglyph`, `anaglyph-big`, `section-title`, `subhead`, `timeline`, `entry`, `entry-head`, `org`, `dates`, `skills`, `skill-group`, `tag`, `card-grid`, `card`, `card-tags`, `btn`, `btn-accent`, `kicker`, `tagline`, `bio`, `hero-links`, `site-footer`).
- Produces: `body[data-3d="off"|"on"|"boost"]` sets `--d` (0 / 1 / 2); `.nav-link.active` highlight consumed by Task 3.

- [ ] **Step 1: Write `css/style.css`**

```css
/* ---------- Palette & depth ---------- */
:root {
  --bg: #0e0e10;
  --ink: #f2f0e9;
  --red: #ff2a2a;
  --cyan: #00e5e5;
  --yellow: #ffd23f;
  --violet: #b14aed;
  --muted: #9a97a0;
}
/* --d multiplies every anaglyph offset. Body copy never uses it. */
body[data-3d="off"]   { --d: 0; }
body[data-3d="on"]    { --d: 1; }
body[data-3d="boost"] { --d: 2; }

/* ---------- Base ---------- */
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  * { transition: none !important; }
}
body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
}
a { color: var(--violet); }
main { max-width: 46rem; margin: 0 auto; padding: 0 1.25rem; }

/* ---------- Anaglyph ---------- */
.anaglyph {
  text-shadow: calc(var(--d) * -3px) 0 var(--red),
               calc(var(--d) *  3px) 0 var(--cyan);
}
.anaglyph-big {
  text-shadow: calc(var(--d) * -6px) 0 var(--red),
               calc(var(--d) *  6px) 0 var(--cyan);
}

/* ---------- Nav ---------- */
.site-nav {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center; gap: 1.25rem;
  padding: 0.75rem 1.25rem;
  background: rgba(14, 14, 16, 0.92);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid #26262b;
}
.brand { font-weight: 800; font-size: 1.2rem; color: var(--ink); text-decoration: none; }
.nav-links { display: flex; gap: 1rem; flex: 1; }
.nav-link { color: var(--muted); text-decoration: none; padding: 0.2rem 0.1rem; border-bottom: 2px solid transparent; }
.nav-link:hover { color: var(--ink); }
.nav-link.active { color: var(--yellow); border-bottom-color: var(--yellow); }
.toggle-3d {
  background: none; color: var(--ink); border: 1px solid #3a3a41;
  border-radius: 999px; padding: 0.3rem 0.8rem; font: inherit; cursor: pointer;
}
.toggle-3d:hover { border-color: var(--cyan); }

/* ---------- Sections ---------- */
.section { padding: 4.5rem 0 1.5rem; }
.section-title { font-size: 2rem; margin: 0 0 1rem; }
.subhead { color: var(--yellow); margin: 2.25rem 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.95rem; }

/* ---------- Hero ---------- */
.hero { padding-top: 5.5rem; }
.kicker { color: var(--cyan); text-transform: uppercase; letter-spacing: 0.15em; margin: 0; font-size: 0.85rem; }
.hero-name { font-size: clamp(2.4rem, 8vw, 4.2rem); margin: 0.2rem 0 0.6rem; line-height: 1.1; }
.tagline { font-size: 1.15rem; color: var(--muted); }
.tagline em { color: var(--ink); font-style: italic; }
.hero-links { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1.25rem; }

/* ---------- Buttons ---------- */
.btn {
  display: inline-block; padding: 0.45rem 1rem; border-radius: 6px;
  border: 1px solid #3a3a41; color: var(--ink); text-decoration: none;
  transition: transform 120ms ease, border-color 120ms ease;
}
.btn:hover { border-color: var(--cyan); transform: translateY(-2px); }
.btn-accent { border-color: var(--yellow); color: var(--yellow); }

/* ---------- Resume timeline ---------- */
.timeline { list-style: none; margin: 0; padding: 0; }
.entry { border-left: 2px solid #2c2c33; padding: 0 0 1.5rem 1.25rem; position: relative; }
.entry::before {
  content: ""; position: absolute; left: -6px; top: 0.5rem;
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--bg);
  box-shadow: calc(var(--d) * -2px) 0 0 var(--red), calc(var(--d) * 2px) 0 0 var(--cyan), 0 0 0 2px var(--yellow);
}
.entry-head { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; flex-wrap: wrap; }
.entry h4 { margin: 0; font-size: 1.05rem; }
.org { color: var(--violet); }
.dates { color: var(--muted); margin: 0; font-size: 0.9rem; white-space: nowrap; }
.entry ul { margin: 0.5rem 0 0; padding-left: 1.1rem; }
.entry li { margin: 0.25rem 0; }

/* ---------- Skills ---------- */
.skills { margin: 0; }
.skill-group { margin-bottom: 0.9rem; }
.skill-group dt { font-weight: 700; margin-bottom: 0.35rem; }
.skill-group dd { margin: 0; display: flex; flex-wrap: wrap; gap: 0.4rem; }
.tag {
  display: inline-block; padding: 0.1rem 0.6rem; border-radius: 999px;
  border: 1px solid #3a3a41; font-size: 0.85rem; color: var(--ink);
  box-shadow: calc(var(--d) * -1px) 0 0 var(--red), calc(var(--d) * 1px) 0 0 var(--cyan);
}

/* ---------- Project cards ---------- */
.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); gap: 1.25rem; }
.card {
  border: 1px solid #2c2c33; border-radius: 10px; padding: 1.25rem;
  display: flex; flex-direction: column; gap: 0.6rem;
  box-shadow: calc(var(--d) * -4px) 0 0 -1px var(--red), calc(var(--d) * 4px) 0 0 -1px var(--cyan);
  transition: transform 120ms ease;
}
.card:hover { transform: translateY(-4px); }
.card h3 { margin: 0; }
.card p { margin: 0; color: var(--muted); }
.card-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.card .btn-accent { margin-top: auto; align-self: flex-start; }

/* ---------- Footer ---------- */
.site-footer { text-align: center; color: var(--muted); padding: 3rem 1.25rem 2rem; font-size: 0.9rem; }

/* ---------- Small screens ---------- */
@media (max-width: 480px) {
  .site-nav { flex-wrap: wrap; gap: 0.5rem 1rem; }
  .nav-links { order: 3; width: 100%; justify-content: space-between; }
}
```

- [ ] **Step 2: Verify styling in a browser**

Run: `python3 -m http.server 8080 --directory . &` then open `http://localhost:8080`.
Expected: dark page, name "Steven Gandham" with red/cyan fringing, yellow subheads, timeline dots, tag pills with 1px fringes, three fringed project cards. No fringing on paragraph text.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add anaglyph-eclectic stylesheet with depth multiplier system"
```

---

### Task 3: Script — 3D-mode toggle and scroll-spy

**Files:**
- Create: `js/script.js`

**Interfaces:**
- Consumes: `#toggle-3d`, `body[data-3d]`, `.nav-link[href^="#"]`, section ids `about`/`resume`/`projects` (Task 1); `.nav-link.active` styling (Task 2).
- Produces: `localStorage.mode3d` ∈ {`on`, `boost`, `off`}.

- [ ] **Step 1: Write `js/script.js`**

```js
// 3D-mode toggle: on → boost → off → on. Persisted so a visitor's choice sticks.
(function () {
  var STATES = ["on", "boost", "off"];
  var btn = document.getElementById("toggle-3d");
  if (!btn) return;

  function apply(state) {
    document.body.setAttribute("data-3d", state);
    btn.textContent = "🕶 3D: " + state;
    try { localStorage.setItem("mode3d", state); } catch (e) { /* private mode */ }
  }

  var saved = null;
  try { saved = localStorage.getItem("mode3d"); } catch (e) { /* private mode */ }
  if (STATES.indexOf(saved) !== -1) apply(saved);

  btn.addEventListener("click", function () {
    var current = document.body.getAttribute("data-3d");
    var next = STATES[(STATES.indexOf(current) + 1) % STATES.length];
    apply(next);
  });
})();

// Scroll-spy: highlight the nav link of the section in view.
(function () {
  if (!("IntersectionObserver" in window)) return;
  var links = document.querySelectorAll('.nav-link[href^="#"]');
  var byId = {};
  links.forEach(function (link) { byId[link.getAttribute("href").slice(1)] = link; });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (l) { l.classList.remove("active"); });
      var link = byId[entry.target.id];
      if (link) link.classList.add("active");
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  ["about", "resume", "projects"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
```

- [ ] **Step 2: Syntax-check the script**

Run: `node --check js/script.js && echo OK`
Expected: `OK`

- [ ] **Step 3: Verify behavior in the browser**

With the Task 2 server still running, reload `http://localhost:8080`.
Expected: clicking 🕶 cycles on → boost (bigger fringes) → off (no fringes) and the label updates; reloading keeps the chosen state; scrolling moves the yellow highlight across About Me / Resume / Projects.

- [ ] **Step 4: Commit**

```bash
git add js/script.js
git commit -m "feat: add 3D-mode toggle with persistence and nav scroll-spy"
```

---

### Task 4: Assets, README, final verification

**Files:**
- Create: `assets/Steven-Gandham-Resume-2025.pdf` (copied from `~/Downloads`)
- Modify: `README.md`

**Interfaces:**
- Consumes: `assets/Steven-Gandham-Resume-2025.pdf` path referenced by the Resume download button (Task 1).

- [ ] **Step 1: Copy the resume PDF into the repo**

```bash
mkdir -p assets
cp ~/Downloads/Steven-Gandham-Resume-2025.pdf assets/Steven-Gandham-Resume-2025.pdf
```

- [ ] **Step 2: Replace README content**

```markdown
# this-is-my-life

Personal resume site for Steven Gandham — About Me, Resume, and Projects, with an anaglyph red/cyan 3D aesthetic (grab red/cyan glasses and hit the 🕶 toggle).

Plain HTML/CSS/JS, no build step. Serve locally with:

    python3 -m http.server 8080

Projects section contains `[TODO]` placeholder cards — edit `index.html` to wire live project links.
```

- [ ] **Step 3: Full manual verification pass**

With the local server running, check:
- Download PDF button downloads the resume.
- Nav smooth-scrolls to each section; active link highlights.
- 3D toggle cycles and persists across reload.
- Narrow the window to ~375px: nav wraps, cards stack, no horizontal scroll.
- Body paragraphs have no red/cyan fringing in every mode.

Expected: all pass.

- [ ] **Step 4: Commit**

```bash
git add assets/Steven-Gandham-Resume-2025.pdf README.md
git commit -m "feat: add resume PDF asset and project README"
```
