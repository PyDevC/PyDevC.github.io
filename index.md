---
layout: default
title: Home
---

<section class="hero">
  <img class="hero__avatar" src="{{ '/assets/avatar.png' | relative_url }}" alt="PyDevC avatar">
  <h1>Hey, I'm PyDevC.</h1>
  <p>I work at the intersection of AI and compilers. I spend most of my time on Linux,
  C++, and PyTorch. I am keen to take challenges higher than my skills and complete
  them. I plan to be an AI Compiler Engineer at a hardware company like AMD or NVIDIA.
  </p>
  <div class="button-row">
    <a class="button button--solid" href="{{ '/projects/' | relative_url }}">See my work</a>
    <a class="button" href="{{ site.resume_url | default: '#' }}">Resume</a>
    <a class="button" href="{{ site.cv_url | default: '#' }}">CV</a>
    <a class="button" href="https://github.com/PyDevC">GitHub</a>
  </div>
</section>

## What I'm working on

- **Contributing to PyTorch:** the goal is to reach maintainer level understanding of codebase.
- **Kero-Sine:** making a SQL query engine to run sql as tensor computations.
- **gBite:** developing a PyTorch Backend with Triton Backend.
