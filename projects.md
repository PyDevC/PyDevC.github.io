---
layout: page
title: Projects
permalink: /projects/
---

A few things I've built. More on [GitHub](https://github.com/PyDevC).

## [kero](https://github.com/PyDevC/kero)

Kero-Sine is a SQL compiler built on MLIR. It compiles relational queries through
a custom `db` dialect, then lowers them to Tensor, Linalg, and SCF before LLVM.
Input is an Apache Arrow table.

**Status:** pre-release, in development. No GPU path yet, filter-focused query
scope, single-table input.

**Stack:** Python · MLIR · LLVM · Arrow

## [model-cmp.nvim](https://github.com/PyDevC/model-cmp.nvim)

AI autocomplete for Neovim. Predicts the current line using a Treesitter context
engine and few-shot prompting, with a local `llama.cpp` server or Gemini.

**Stack:** Lua · Treesitter · Neovim

## ImageCaptionv1

<!-- TODO: add the repo link and refine this description. -->

A model that writes a caption for an image. Repo and write-up coming soon.

**Stack:** Python · PyTorch

## Other projects

- [lua-compiled](https://github.com/PyDevC/lua-compiled) — a compiler for a
  Lua-like language written in C. In development.
- [model_server](https://github.com/PyDevC/model_server) — the model server that
  powers `model-cmp.nvim`. Point it at whichever LLM you want.

## Configs

- [nvim](https://github.com/PyDevC/nvim) — my Neovim configuration
- [.dot](https://github.com/PyDevC/.dot) — my dotfiles
- [tmux](https://github.com/PyDevC/tmux) — my tmux configuration
