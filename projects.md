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
