/**
 * @file A parser for the 3rd version of the Cassandra query language
 * @author Muhammad Maher <blastclever@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "cql3",

  extras: ($) => [/\s/, $.comment],

  word: ($) => $.identifier,

  rules: {
    source_file: ($) => semicolonSep1($._statement),

    _statement: ($) => choice($.create_table_statement),

    create_table_statement: ($) =>
      seq(
        field("create", $.kw_create),
        field("table", $.kw_table),
        optional($.if_not_exists),
        field("table_name", $.table_name),
        optional($.column_definitions),
        optional($.with_clause),
      ),

    if_not_exists: ($) => seq($.kw_if, $.kw_not, $.kw_exists),

    table_name: ($) => seq(optional(seq($.identifier, ".")), $.identifier),

    column_definitions: ($) =>
      seq(
        "(",
        optional(commaSep1($.column_definition)),
        optional(seq(",", $.primary_key_definition)),
        optional(","),
        ")",
      ),

    column_definition: ($) =>
      seq(
        field("name", $.identifier),
        field("type", $.data_types),
        optional($.primary_key_inline),
      ),

    primary_key_definition: ($) =>
      seq(
        $.kw_primary,
        $.kw_key,
        "(",
        $.partition_keys_definition,
        optional(seq(",", $.clustering_keys_definition)),
        ")",
      ),

    partition_keys_definition: ($) =>
      choice(
        field("partition_key", $.identifier),
        seq("(", commaSep1(field("partition_key", $.identifier)), ")"),
      ),

    clustering_keys_definition: ($) =>
      commaSep1(field("clustering_key", $.identifier)),

    primary_key_inline: ($) => seq($.kw_primary, $.kw_key),

    data_types: (_) =>
      choice(kw("int"), kw("text"), kw("uuid"), kw("boolean"), kw("timestamp")),

    with_clause: ($) => seq($.kw_with, repeat1($.table_option)),

    table_option: ($) => seq($.identifier, "=", $.literal),

    literal: ($) => choice($.string, $.number),

    string: (_) => /'[^']*'/,

    number: (_) => /\d+/,

    comment: (_) =>
      token(
        choice(
          seq("--", /.*/),
          seq("//", /.*/),
          seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"),
        ),
      ),

    // keywords
    kw_create: (_) => token(kw("create")),
    kw_table: (_) => token(kw("table")),
    kw_if: (_) => token(kw("if")),
    kw_not: (_) => token(kw("not")),
    kw_exists: (_) => token(kw("exists")),
    kw_primary: (_) => token(kw("primary")),
    kw_key: (_) => token(kw("key")),
    kw_with: (_) => token(kw("with")),

    identifier: (_) => /[a-zA-Z_][a-zA-Z0-9_]*/,
  },
});

/**
 * Function for creating a set of rules separated by commas
 * @function
 * @param {RuleOrLiteral} rule - the rule
 */
function commaSep1(rule) {
  return seq(rule, repeat(seq(",", rule)));
}

/**
 * Function for creating a set of rules separated by semicolons
 * @function
 * @param {RuleOrLiteral} rule - the rule
 */
function semicolonSep1(rule) {
  return seq(optional(rule), repeat(seq(";", rule)));
}

/**
 * Function for creating case-insensitive keywords
 * @function
 * @param {string} word - the word
 */
function kw(word) {
  return new RegExp(
    word
      .split("")
      .map((c) => `[${c}${c.toUpperCase()}]`)
      .join(""),
  );
}
