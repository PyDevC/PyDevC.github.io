# Build Plan — PyDevC personal site (Jekyll + Minima on GitHub Pages)

This is the exact, step-by-step plan to build the site. Every file, every command,
every content line is specified. Nothing is deferred.

---

## 0. Decisions (locked)

| Item | Decision |
|---|---|
| Site generator | Jekyll + **Minima** theme |
| Host | GitHub Pages **user site** → `https://pydevc.github.io/` |
| Repo name | `PyDevC.github.io` |
| Lead name | **PyDevC** (real name "Anushk Sharma" only appears in the About prose) |
| Pages / nav | Home (site title link) · About · Projects · Blogs · Connect · Stuff |
| Home | Separate landing page (`index.md`), NOT the About page |
| Fonts | **Newsreader** (serif — headings + body) + **JetBrains Mono** (code). No Nerd Fonts. |
| Light/dark | Auto (follows OS `prefers-color-scheme`) **plus** a header toggle that persists in `localStorage`; no flash on load |
| Contact | GitHub only (`https://github.com/PyDevC`) |
| Voice | No hype; honest status lines; only strong projects |

### Verified facts about the toolchain (why the plan is shaped this way)
- GitHub Pages ships **Minima 2.5.1**.
- Minima 2.5.1's `_includes/head.html` has **no** custom-head hook, and
  `_sass/minima.scss` has **no** custom-variables hook. Therefore we **override**
  `_includes/head.html` and `_includes/header.html` wholesale, and ship our own
  plain `assets/css/custom.css`. This makes us version-independent.
- Minima 2.5.1's `_includes/social.html` reads individual keys
  (`site.github_username`), **not** `site.minima.social` — so config uses
  `github_username: PyDevC`.
- Minima 2.5.1 defines layouts: `default`, `page`, `home`, `post`.
- Markdown engine is **kramdown**.

---

## 1. Prerequisites (verify before writing files)

Run and confirm each:

```bash
ruby -v            # need Ruby >= 2.7 (3.x recommended)
gem -v
bundle -v          # if missing: gem install bundler
```

If `bundle` is missing:

```bash
gem install bundler
```

No Node/npm is needed.

---

## 2. Final file tree

Everything below is created under the current directory
`/home/pdev/personal/rant/Portfolio` (which will become the `PyDevC.github.io` repo).

```
Portfolio/
├── .gitignore
├── Gemfile
├── _config.yml
├── PLAN.md                 ← this file (excluded from the build, see _config.yml)
├── README.md               ← pre-existing; left as-is
├── index.md                Home landing
├── about.md                About
├── projects.md             Projects
├── blogs.md                Blogs index
├── connect.md              Connect
├── stuff.md                Stuff
├── _posts/
│   └── 2026-10-09-hello.md Placeholder post so Blogs isn't empty
├── _includes/
│   ├── head.html           OVERRIDE: fonts + custom.css + no-flash theme script
│   └── header.html         OVERRIDE: adds theme toggle button
└── assets/
    ├── avatar.png          downloaded from GitHub
    ├── css/
    │   └── custom.css      palette, fonts, dark mode, cards, toggle
    └── js/
        └── theme.js        toggle logic + persistence
```

---

## 3. Create each file (exact contents)

### 3.1 `.gitignore`

```gitignore
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata
.bundle/
vendor/
Gemfile.lock
```

### 3.2 `Gemfile`

```ruby
source "https://rubygems.org"

# Matches the GitHub Pages build exactly.
gem "github-pages", group: :jekyll_plugins

# Ruby 3.x no longer bundles webrick, needed for `jekyll serve`.
gem "webrick", "~> 1.8"
```

> `jekyll-feed` and `jekyll-seo-tag` come in transitively via `github-pages` and
> via Minima's own dependencies, so they are not listed separately.

### 3.3 `_config.yml`

```yaml
title: PyDevC
author: PyDevC
description: >-
  Compilers, MLIR, and developer tooling. I build things that turn
  high-level programs into fast, portable code.
url: "https://pydevc.github.io"
baseurl: ""
lang: en

theme: minima

# Minima 2.5.x social keys
github_username: PyDevC

# Order of links in the header. Home is reached via the site title.
header_pages:
  - about.md
  - projects.md
  - blogs.md
  - connect.md
  - stuff.md

show_excerpts: true

minima:
  date_format: "%b %-d, %Y"

plugins:
  - jekyll-feed
  - jekyll-seo-tag

# Keep planning notes and repo docs out of the built site.
exclude:
  - PLAN.md
  - README.md
  - Gemfile
  - Gemfile.lock
  - vendor/
```

### 3.4 `_includes/head.html`  (override — self-contained)

```html
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  {%- seo -%}

  <!-- Fonts: Newsreader (text) + JetBrains Mono (code) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=JetBrains+Mono:wght@400;500&display=swap">

  <link rel="stylesheet" href="{{ '/assets/main.css' | relative_url }}">
  <link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">

  <!-- Apply the saved/system theme before first paint (no flash) -->
  <script>
    (function () {
      try {
        var stored = localStorage.getItem('theme');
        var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {}
    })();
  </script>
  <script src="{{ '/assets/js/theme.js' | relative_url }}" defer></script>

  {%- feed_meta -%}
</head>
```

> Removed Minima's optional google-analytics include block on purpose (we don't
> use it, and this keeps the override self-contained).

### 3.5 `_includes/header.html` (override — Minima header + toggle)

```html
<header class="site-header" role="banner">

  <div class="wrapper">
    {%- assign default_paths = site.pages | map: "path" -%}
    {%- assign page_paths = site.header_pages | default: default_paths -%}
    <a class="site-title" rel="author" href="{{ "/" | relative_url }}">{{ site.title | escape }}</a>

    {%- if page_paths -%}
      <nav class="site-nav">
        <input type="checkbox" id="nav-trigger" class="nav-trigger" />
        <label for="nav-trigger">
          <span class="menu-icon">
            <svg viewBox="0 0 18 15" width="18px" height="15px">
              <path d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.032C17.335,0,18,0.665,18,1.484L18,1.484z M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.032C17.335,6.031,18,6.696,18,7.516L18,7.516z M18,13.516C18,14.335,17.335,15,16.516,15H1.484 C0.665,15,0,14.335,0,13.516l0,0c0-0.82,0.665-1.483,1.484-1.483h15.032C17.335,12.031,18,12.695,18,13.516L18,13.516z"/>
            </svg>
          </span>
        </label>

        <div class="trigger">
          {%- for path in page_paths -%}
            {%- assign my_page = site.pages | where: "path", path | first -%}
            {%- if my_page.title -%}
            <a class="page-link" href="{{ my_page.url | relative_url }}">{{ my_page.title | escape }}</a>
            {%- endif -%}
          {%- endfor -%}
        </div>

        <button id="theme-toggle" class="theme-toggle" type="button"
                aria-label="Switch between light and dark theme" title="Toggle theme">
          <span class="theme-toggle__sun" aria-hidden="true">☀</span>
          <span class="theme-toggle__moon" aria-hidden="true">☾</span>
        </button>
      </nav>
    {%- endif -%}
  </div>
</header>
```

### 3.6 `assets/js/theme.js`

```js
(function () {
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  if (!button) return;

  function current() {
    return root.getAttribute('data-theme') || 'light';
  }

  function apply(theme, persist) {
    root.setAttribute('data-theme', theme);
    button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    if (persist) {
      try { localStorage.setItem('theme', theme); } catch (e) {}
    }
  }

  button.addEventListener('click', function () {
    apply(current() === 'dark' ? 'light' : 'dark', true);
  });

  // Reflect the current theme on the button without locking the OS preference.
  apply(current(), false);
})();
```

### 3.7 `assets/css/custom.css`

```css
/* ==========================================================================
   PyDevC — Minima overrides
   Fonts: Newsreader (text) + JetBrains Mono (code)
   Theme: auto (system) + manual toggle via html[data-theme]
   ========================================================================== */

/* ---------- 1. Palette ---------- */
:root,
html[data-theme="light"] {
  --bg:          #fdfdfd;
  --bg-alt:      #f5f5f4;
  --surface:     #ffffff;
  --text:        #14161a;
  --text-muted:  #5b6068;
  --border:      #e6e6e4;
  --brand:       #2a6fdb;
  --brand-hover: #1c56b0;
  --code-bg:     #f5f5f4;
  --code-text:   #24292f;
  --shadow:      0 1px 2px rgba(0, 0, 0, .06);
}

html[data-theme="dark"] {
  /* compline palette */
  --bg:          #1a1d21;
  --bg-alt:      #22262b;
  --surface:     #1f2228;
  --text:        #f0efeb;
  --text-muted:  #8b919a;
  --border:      #3d424a;
  --brand:       #b4c0c8;
  --brand-hover: #d4ccb4;
  --code-bg:     #22262b;
  --code-text:   #e0dcd4;
  --shadow:      0 1px 2px rgba(0, 0, 0, .35);
}

/* ---------- 2. Typography ---------- */
:root {
  --font-text: "Newsreader", Georgia, "Times New Roman", serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

body {
  font-family: var(--font-text);
  background-color: var(--bg);
  color: var(--text);
  font-size: 18px;      /* Newsreader runs small; 18px reads like Minima's 16px sans */
  line-height: 1.65;
}

h1, h2, h3, h4, h5, h6,
.site-title,
.post-title,
.page-heading,
.footer-heading {
  font-family: var(--font-text);
  letter-spacing: -0.01em;
}
h1, h2 { font-weight: 600; }
h3     { font-weight: 500; }

a { color: var(--brand); }
a:hover { color: var(--brand-hover); }

code, pre, kbd, samp, .post-meta, .tags li, .button, .theme-toggle {
  font-family: var(--font-mono);
}

code {
  font-size: .85em;
  background: var(--code-bg);
  color: var(--code-text);
  padding: .15em .35em;
  border-radius: 4px;
}
pre {
  background: var(--code-bg);
  color: var(--code-text);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1em 1.1em;
  overflow-x: auto;
}
pre code { background: none; padding: 0; }

/* ---------- 3. Chrome: header / footer ---------- */
.site-header,
.site-footer {
  background-color: var(--bg-alt);
  border-color: var(--border);
}
.site-title,
.site-title:visited { color: var(--text); font-weight: 600; }
.site-nav .page-link { color: var(--text-muted); }
.site-nav .page-link:hover { color: var(--text); }

/* ---------- 4. Theme toggle ---------- */
.theme-toggle {
  display: inline-block;
  vertical-align: middle;
  margin-left: .6rem;
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-muted);
  cursor: pointer;
  font-size: .9rem;
  line-height: 1;
  padding: .35rem .5rem;
}
.theme-toggle:hover { color: var(--text); border-color: var(--text-muted); }
.theme-toggle__sun,
.theme-toggle__moon { display: none; }
html[data-theme="light"] .theme-toggle__sun  { display: inline; }
html[data-theme="dark"]  .theme-toggle__moon { display: inline; }

/* ---------- 5. Content ---------- */
hr { border-color: var(--border); }
blockquote {
  color: var(--text-muted);
  border-left: 3px solid var(--border);
  padding-left: 1rem;
  font-style: italic;
}
table, table th, table td { border-color: var(--border); }
.page-meta { color: var(--text-muted); }

/* ---------- 6. Home hero ---------- */
.hero { padding: 1.75rem 0 1rem; }
.hero__avatar {
  width: 120px; height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--border);
  margin-bottom: 1rem;
}
.hero h1 { margin-bottom: .35rem; }
.hero p  { color: var(--text-muted); }

.button-row { display: flex; flex-wrap: wrap; gap: .6rem; margin-top: 1rem; }
.button {
  display: inline-block;
  font-size: .85rem;
  text-decoration: none;
  border: 1px solid var(--brand);
  color: var(--brand);
  border-radius: 6px;
  padding: .45rem .9rem;
}
.button:hover { background: var(--brand); color: var(--bg); text-decoration: none; }
.button--solid { background: var(--brand); color: var(--bg); }
.button--solid:hover { background: var(--brand-hover); border-color: var(--brand-hover); }

/* ---------- 7. Project cards ---------- */
.projects {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
  margin: 1.5rem 0;
}
@media screen and (min-width: 700px) {
  .projects { grid-template-columns: 1fr 1fr; }
}
.project {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.1rem 1.25rem;
  background: var(--surface);
  box-shadow: var(--shadow);
}
.project h3 { margin-top: 0; margin-bottom: .35rem; }
.project p  { margin-bottom: .6rem; color: var(--text-muted); font-size: .95rem; }
.tags {
  display: flex; flex-wrap: wrap; gap: .4rem;
  margin: 0 0 .35rem; padding: 0; list-style: none;
}
.tags li {
  font-size: .72rem;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: .15rem .55rem;
}
```

> `custom.css` has **no** front matter, so Jekyll copies it as a static asset.

### 3.8 `index.md` (Home)

```markdown
---
layout: default
title: Home
---

<section class="hero">
  <img class="hero__avatar" src="{{ '/assets/avatar.png' | relative_url }}" alt="PyDevC avatar">
  <h1>Hey, I'm PyDevC.</h1>
  <p>Compiler engineer in the making. I build things that turn high-level
  programs into fast, portable code — and the occasional Neovim plugin.</p>
  <div class="button-row">
    <a class="button button--solid" href="{{ '/projects/' | relative_url }}">See my work</a>
    <a class="button" href="https://github.com/PyDevC">GitHub</a>
  </div>
</section>

## What I'm working on

- **Kero-Sine** — a SQL compiler built on MLIR. Pre-release, in development.
- **Contributing to PyTorch** — working toward the compiler stack and Torch-MLIR.
- **Neovim tooling** — `model-cmp.nvim`, plus my config and dotfiles.

## Elsewhere

- GitHub — [@PyDevC](https://github.com/PyDevC)
- [About](/about/) · [Projects](/projects/) · [Blogs](/blogs/) · [Connect](/connect/) · [Stuff](/stuff/)
```

### 3.9 `about.md`

```markdown
---
layout: page
title: About
permalink: /about/
---

<p class="page-meta"><em>Last updated: October 9, 2026</em></p>

My name is **Anushk Sharma**, and I go by **PyDevC** online. I write compilers
and developer tooling. My work sits in two places: MLIR-based compilation, and
Neovim tooling.

I care about open source that is actually open, and I'm working toward becoming
an **AI compiler framework engineer** — with an eye on backend and code-generation
roles at companies like AMD, NVIDIA, and Qualcomm.

## Current focus

- Building **Kero-Sine**, a SQL compiler on top of MLIR (pre-release, in development).
- Contributing to **PyTorch**.
- Learning MLIR dialects and lowering pipelines.

## Tools I use

Python · Lua · C · C++ · SQL · Shell · MLIR · LLVM · PyTorch · Apache Arrow ·
CMake · Ninja · Neovim · Treesitter

## Notes

- 2nd place, [PyTorch Docathon 2026](https://pytorch.org/blog/pytorch-docathon-2026-results/).

## Goals

- Land an AI / ML compiler internship.
- Build a custom PyTorch backend.
- Contribute to the PyTorch 2.0 compiler stack and Torch-MLIR.
```

### 3.10 `projects.md`

```markdown
---
layout: page
title: Projects
permalink: /projects/
---

A few things I've built. More on [GitHub](https://github.com/PyDevC).

<div class="projects">

  <div class="project">
    <h3><a href="https://github.com/PyDevC/kero">kero</a></h3>
    <p>Kero-Sine is a SQL compiler built on MLIR. It compiles relational queries
    through a custom <code>db</code> dialect, then lowers them to Tensor, Linalg,
    and SCF before LLVM. Input is an Apache Arrow table.</p>
    <p><strong>Status:</strong> pre-release, in development. No GPU path yet,
    filter-focused query scope, single-table input.</p>
    <ul class="tags"><li>Python</li><li>MLIR</li><li>LLVM</li><li>Arrow</li></ul>
  </div>

  <div class="project">
    <h3><a href="https://github.com/PyDevC/model-cmp.nvim">model-cmp.nvim</a></h3>
    <p>AI autocomplete for Neovim. Predicts the current line using a Treesitter
    context engine and few-shot prompting, with a local <code>llama.cpp</code>
    server or Gemini.</p>
    <ul class="tags"><li>Lua</li><li>Treesitter</li><li>Neovim</li></ul>
  </div>

  <div class="project">
    <h3><a href="https://github.com/PyDevC/lua-compiled">lua-compiled</a></h3>
    <p>A compiler for a Lua-like language written in C. In development.</p>
    <ul class="tags"><li>C</li></ul>
  </div>

  <div class="project">
    <h3><a href="https://github.com/PyDevC/model_server">model_server</a></h3>
    <p>The model server that powers <code>model-cmp.nvim</code>. Point it at
    whichever LLM you want.</p>
    <ul class="tags"><li>Python</li></ul>
  </div>

</div>

## Configs

- [nvim](https://github.com/PyDevC/nvim) — my Neovim configuration
- [.dot](https://github.com/PyDevC/.dot) — my dotfiles
- [tmux](https://github.com/PyDevC/tmux) — my tmux configuration
```

### 3.11 `blogs.md`

```markdown
---
layout: page
title: Blogs
permalink: /blogs/
---

Occasional notes on compilers, MLIR, and tooling.

{% if site.posts.size > 0 %}
<ul class="post-list">
  {% for post in site.posts %}
  <li>
    <span class="post-meta">{{ post.date | date: site.minima.date_format | default: "%b %-d, %Y" }}</span>
    <h3><a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h3>
    {% if post.excerpt %}<p>{{ post.excerpt | strip_html | truncate: 200 }}</p>{% endif %}
  </li>
  {% endfor %}
</ul>
{% else %}
<p>No posts yet — this is where they'll show up.</p>
{% endif %}
```

### 3.12 `connect.md`

```markdown
---
layout: page
title: Connect
permalink: /connect/
---

The best place to reach me is GitHub.

- GitHub — [@PyDevC](https://github.com/PyDevC)

Open to AI / ML compiler internships and open-source collaboration — reach out
on GitHub.
```

### 3.13 `stuff.md`

```markdown
---
layout: page
title: Stuff
permalink: /stuff/
---

A catch-all for things that don't fit elsewhere.

- [nvim](https://github.com/PyDevC/nvim) — my Neovim configuration
- [.dot](https://github.com/PyDevC/.dot) — my dotfiles
- [tmux](https://github.com/PyDevC/tmux) — my tmux configuration
- [PyTorch Docathon 2026 results](https://pytorch.org/blog/pytorch-docathon-2026-results/)

*(More to come.)*
```

### 3.14 `_posts/2026-10-09-hello.md`

```markdown
---
layout: post
title: "Hello"
date: 2026-10-09
categories: meta
---

First post. This site is a place to write about compilers, MLIR, and the tools
I use. More soon.
```

> This is a placeholder so the Blogs page isn't empty. It can be deleted later.

### 3.15 `assets/avatar.png` (downloaded)

```bash
mkdir -p assets
curl -L -o assets/avatar.png "https://avatars.githubusercontent.com/u/148413445?s=512&v=4"
```

### 3.16 `README.md`

Left exactly as-is (the pre-existing portfolio README). It is excluded from the
build via `_config.yml`.

---

## 4. Local build & verification

```bash
bundle install
bundle exec jekyll build       # compiles into ./_site
bundle exec jekyll serve       # http://127.0.0.1:4000
```

Then check, in the browser:

1. `/` — hero shows avatar, "Hey, I'm PyDevC.", two buttons; the "See my work"
   button goes to `/projects/`; the GitHub button opens the profile.
2. Header shows **PyDevC** + About, Projects, Blogs, Connect, Stuff. Clicking the
   title returns Home.
3. Toggle button switches light/dark and the icon flips (☀ / ☾).
4. Reload: chosen theme persists. Clear `localStorage`, set the OS to dark,
   reload: page starts dark with **no flash**.
5. Fonts: body text is serif (Newsreader); code/badges/buttons are JetBrains Mono.
   No Nerd Font glyphs anywhere.
6. `/about/`, `/projects/`, `/blogs/`, `/connect/`, `/stuff/` all render; Blogs
   lists the "Hello" post; project cards lay out in 2 columns on desktop, 1 on
   mobile.
7. Mobile width: hamburger menu opens/closes; toggle still reachable.
8. All external links open the correct GitHub / PyTorch URLs.
9. `_site/` does **not** contain `PLAN.md` or `README.md`.

If any check fails, fix the specific file and re-run `bundle exec jekyll serve`.

---

## 5. Git & deployment

```bash
git init
git add .
git commit -m "Initial PyDevC site (Jekyll + Minima)"
git branch -M main
git remote add origin https://github.com/PyDevC/PyDevC.github.io.git
git push -u origin main
```

Then:

1. Create the repo `PyDevC.github.io` on GitHub (public) if it doesn't exist.
2. For a `USERNAME.github.io` repo, GitHub Pages turns on automatically and builds
   from the default branch root. Confirm under **Settings → Pages**.
3. Wait for the first build (Actions/Pages), then open `https://pydevc.github.io/`.

Any later change: edit files → `git add -A && git commit -m "…" && git push`.
GitHub rebuilds automatically.

---

## 6. Risks & notes

- **Minima version drift.** We fully replace `head.html` and `header.html`, so a
  different Minima version won't break our markup. The only theme internals we
  rely on are the `default`/`page`/`post` layouts and `assets/main.css`, which
  are stable.
- **Fonts** load from Google Fonts. If we ever need offline/self-hosted, we add
  the `.woff2` files under `assets/fonts/` and change the `@font-face`/`<link>`.
- **`baseurl`** is empty because this is a user site at the domain root. If it
  ever moves to a project repo, set `baseurl: "/repo-name"`.
- **Content accuracy.** Kero status, the Docathon result, and "Contributing to
  PyTorch" are taken from the GitHub profile/READMEs. Adjust wording if any is
  stronger than reality.
- **PLAN.md / README.md** are listed in `exclude` so they are not published.

---

## 7. Definition of done

- [ ] All files in §3 exist with the exact contents shown.
- [ ] `bundle exec jekyll build` exits 0 with no errors.
- [ ] Every item in §4 passes.
- [ ] Pushed to `PyDevC.github.io` and live at `https://pydevc.github.io/`.
