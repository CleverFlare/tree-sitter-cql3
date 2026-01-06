# tree-sitter-cql

A tree-sitter grammar for the Cassandra Query Language (CQL) v3 (the latest version), currently supports a big part of the `CREATE TABLE` statement.
This grammar is part of another project—[CQL Language Server](https://github.com/CleverFlare/cql-lsp)—built to support editor tooling, such as syntax highlighting and LSP features.

## Features

- Parses CQL v3 `CREATE TABLE` statements
- Supports:
  - `IF NOT EXISTS`
  - Qualified table names (`keyspace.table`)
  - Column definitions
  - Inline `PRIMARY KEY`
  - Basic data types (`int`, `text`, `uuid`, `boolean`, `timestamp`)
  - `WITH` table options
- Case-insensitive keywords (CQL-compliant)
- Error-tolerant parsing compatible with editors & LSPs
- Tree-sitter standard highlight captures for cross-editor compatibility, including NeoVim & VS Code

## Inteded Use

This grammar is intended for:

- Syntax highlighting
- Editor tooling
- LSP implementations

## Development

### Generate the parser

After modifying grammar.js, regenerate the parser:

```bash
tree-sitter generate
```

This will update:

```bash
src/parser.c
```

### Test the grammar

```bash
tree-sitter parse examples/example.cql
```

Or in Neovim:

```vim
:InspectTree
```

## NeoVim Testing Setup

Assuming you're using `nvim.treesitter`.

> [!CAUTION]
> `nvim.treesitter` has recently made a full incompatible rewrite of the entire plugin, basically making an entirely new plugin focusing more on parser management.
> Therefore, the following example code uses the new structure.

### Using the github repo

If you prefer testing using the github repo.

```LUA
vim.api.nvim_create_autocmd("User", {
  pattern = "TSUpdate",
  callback = function()
    require("nvim-treesitter.parsers").cql3 = {
      install_info = {
        url = "https://github.com/CleverFlare/tree-sitter-cql3",
        revision = "HEAD", -- commit hash for revision to check out; HEAD if missing
        queries = "queries", -- (optional) used to install queries from a given directory
      },
      tier = 1,
    }
  end,
})

vim.api.nvim_create_autocmd({ "FileType" }, {
  pattern = "cql3",
  callback = function(event)
    vim.treesitter.start(event.buf, "cql3")
  end,
})
```

### Using a local copy

If you prefer testing using a local copy.

```LUA
vim.api.nvim_create_autocmd("User", {
  pattern = "TSUpdate",
  callback = function()
    require("nvim-treesitter.parsers").cql3 = {
      install_info = {
        path = "/home/user/tree-sitter-cql3",
        queries = "queries",
      },
      tier = 1,
    }
  end,
})

vim.api.nvim_create_autocmd({ "FileType" }, {
  pattern = "cql3",
  callback = function(event)
    vim.treesitter.start(event.buf, "cql3")
  end,
})
```

### Important catch with NeoVim

I've experienced an odd problem where NeoVim detects a language called `cqlang` for `.cql` files. To fix that, you can easily override it by adding `filetype.lua` file in the root directory of your NeoVim config (besides `init.lua`):

```LUA
vim.filetype.add({
  extension = {
    cql = "cql3",
  },
})
```
