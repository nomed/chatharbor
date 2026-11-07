// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "ChatHarborCore",
    platforms: [.iOS(.v17), .macOS(.v14)],
    products: [.library(name: "ChatHarborCore", targets: ["ChatHarborCore"])],
    targets: [
        .target(name: "ChatHarborCore"),
        .testTarget(name: "ChatHarborCoreTests", dependencies: ["ChatHarborCore"])
    ]
)
