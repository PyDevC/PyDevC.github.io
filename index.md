---
layout: default
title: Home
---

<section class="hero">
  <img class="hero__avatar" src="{{ '/assets/avatar.png' | relative_url }}" alt="PyDevC avatar">
  <h1>Hey, I'm PyDevC.</h1>
  <p>I work where AI systems meet compilers. I spend most of my time in Linux, C++,
  and PyTorch, and I keep going deeper into all three. I like the work, and I like
  the workflow.</p>
  <div class="button-row">
    <a class="button button--solid" href="{{ '/projects/' | relative_url }}">See my work</a>
    <a class="button" href="{{ site.resume_url | default: '#' }}">Resume</a>
    <a class="button" href="{{ site.cv_url | default: '#' }}">CV</a>
    <a class="button" href="https://github.com/PyDevC">GitHub</a>
  </div>
</section>

## What I'm working on

- **Kero-Sine** is a SQL compiler built on MLIR.
- **Contributing to PyTorch** — learning the system and looking for issues I can
  solve.
