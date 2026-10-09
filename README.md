# Anushk Sharma

I write compilers and tooling. Currently focused on MLIR and the PyTorch compiler stack.

Open to AI / ML compiler internships.

---

## Projects

### [kero](https://github.com/PyDevC/kero) — SQL compiler on MLIR
`Python` · `MLIR` · `LLVM`

Compiles SQL queries through a custom `db` dialect, then lowers them to Tensor, Linalg, and SCF before LLVM. Input is an Apache Arrow table.

Pipeline: SQL → SQLGlot parse → typed `db` AST → MLIR codegen → lower `db` to Tensor/Linalg/SCF → LLVM.

**Status:** pre-release, in development. No GPU path yet, limited query scope (filter-focused), single-table input.

### [model-cmp.nvim](https://github.com/PyDevC/model-cmp.nvim) — AI autocomplete for Neovim
`Lua`

Predicts the current line using a Treesitter context engine and few-shot prompting. Works with a local `llama.cpp` server or Gemini.

### [lua-compiled](https://github.com/PyDevC/lua-compiled) — compiler in C
`C`

A compiler for a Lua-like language. In development.

### [model_server](https://github.com/PyDevC/model_server) — inference backend
`Python`

The model server used by model-cmp.nvim.

---

Also maintain [nvim](https://github.com/PyDevC/nvim), [.dot](https://github.com/PyDevC/.dot), and [tmux](https://github.com/PyDevC/tmux) configs.

---

## Tools

Python, Lua, C, C++, SQL, Shell · MLIR, LLVM · PyTorch, Apache Arrow · CMake, Ninja · Neovim, Treesitter

---

## Notes

- 2nd place, [PyTorch Docathon 2026](https://pytorch.org/blog/pytorch-docathon-2026-results/)
- Contributing to PyTorch.
- Working toward: a custom PyTorch backend, Torch-MLIR, and GPU lowering in kero.

[@PyDevC](https://github.com/PyDevC)
