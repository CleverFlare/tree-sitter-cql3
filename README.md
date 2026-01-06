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
- Error-tolerant parsing compatible for editors & LSPs
- Tree-sitter standard highlight captures for cross-editor compatibility
