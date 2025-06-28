|Project ID|1200201|
|-----------|-------------|
|Link|[Open full project](https://projectcatalyst.io/funds/12/f12-cardano-open-developers/sidan-or-meshjs-advance-cardano-sdk-in-rust)|
|Milestone|[Milestone 4](https://milestones.projectcatalyst.io/projects/1200201/milestones/4)
|Challenge|	F12: Cardano Open: Developerst|
|Milestone Budget|ADA 10,000.00|
|Milestone Delivered|April 11, 2025|

# Milestone Report

	
Develop the off-node transaction evaluation
- The core logic of offnode transaction evaluation is implemented
- https://github.com/sidan-lab/whisky/blob/master/packages/whisky-csl/src/utils/evaluator.rs

Develop blockchain provider implementation and integration with Maestro & Blockfrost
- Maestro provider: https://github.com/sidan-lab/whisky/tree/master/packages/whisky/src/providers/maestro
- Blockfrost provider: https://github.com/sidan-lab/whisky/tree/master/packages/whisky/src/providers/blockfrost

New features available with documentation available in published rust package in crates.io
- Rust package v1.0.0: https://crates.io/crates/whisky
- Provider documentation: https://whisky.sidan.io/services/providers

New features available with documentation available in mesh core package
- Mesh integration implementation: https://github.com/MeshJS/mesh/blob/main/packages/mesh-core-csl/src/offline-providers/offline-evaluator.ts
- Mesh offline evaluator integration documentation: https://meshjs.dev/providers/offline-evaluator


