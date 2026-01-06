import XCTest
import SwiftTreeSitter
import TreeSitterCql3

final class TreeSitterCql3Tests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_cql3())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading CQL3 grammar")
    }
}
