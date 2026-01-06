package tree_sitter_cql3_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_cql3 "github.com/cleverflare/tree-sitter-cql3.git/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_cql3.Language())
	if language == nil {
		t.Errorf("Error loading CQL3 grammar")
	}
}
