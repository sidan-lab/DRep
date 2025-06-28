|Project ID|1200201|
|-----------|-------------|
|Link|[Open full project](https://projectcatalyst.io/funds/12/f12-cardano-open-developers/sidan-or-meshjs-advance-cardano-sdk-in-rust)|
|Milestone|[Milestone 5](https://milestones.projectcatalyst.io/projects/1200201/milestones/5)
|Challenge|	F12: Cardano Open: Developerst|
|Milestone Budget|ADA 10,000.00|
|Milestone Delivered|		June 19, 2025|

# Milestone Report

	
Evidence of milestone completionNew features available with documentation available in published rust package in crates.io

Develop the backward transaction parser - getting the transaction hex and parsing back to rust object
- Implementation - https://github.com/sidan-lab/whisky/blob/master/packages/whisky/src/parser/mod.rs
- Documentation - https://whisky.sidan.io/tx-parser/parse-transaction-cbor

Develop the offchain code unit testing framework on top of the transaction parser, introducing a brand new developer experience on unit testing offchain code on Cardano
- Implementation - https://github.com/sidan-lab/whisky/blob/master/packages/whisky-common/src/tx_tester/mod.rs
- Documentation - https://whisky.sidan.io/tx-parser/unit-testing-transaction

New features available with documentation available in mesh core package
- The tx parser functionality is exported to Mesh through wasm
- https://github.com/MeshJS/mesh/blob/main/packages/mesh-core-csl/src/parser/index.ts

Documentation
- https://meshjs.dev/apis/txparser/basics
- https://meshjs.dev/apis/txparser/txtester

