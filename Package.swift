// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterCql3",
    products: [
        .library(name: "TreeSitterCql3", targets: ["TreeSitterCql3"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterCql3",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterCql3Tests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterCql3",
            ],
            path: "bindings/swift/TreeSitterCql3Tests"
        )
    ],
    cLanguageStandard: .c11
)
