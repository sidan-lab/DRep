# Closeout Report: SIDAN | MeshJS – Advance Cardano SDK in Rust

- **Proposal Link**: [https://projectcatalyst.io/funds/12/cardano-open-developers/sidan-or-meshjs-advance-cardano-sdk-in-rust](https://projectcatalyst.io/funds/12/cardano-open-developers/sidan-or-meshjs-advance-cardano-sdk-in-rust)  
- **Fund**: Fund 12  
- **Proposal Number**: 1200201  
- **Project Manager**: Hinson Wong  
- **Proposer**: SIDAN Lab / MeshJS  
- **Challenge Setting**: Cardano Open: Developers  
- **Date Project Started**: August 12, 2024  
- **Date Project Completed**: June 19, 2025 (last relevant commit / PR closing)  
- **GitHub Repository**: [https://github.com/sidan-lab/whisky](https://github.com/sidan-lab/whisky)

---

## 1. What Was Funded?

Cardano lacks a complete, user-facing SDK in Rust for building dApps without needing to learn low-level protocol internals. This proposal funded the development and improvement of **whisky**, a Cardano SDK written in Rust.

The SDK enables:

- Native Rust development for Cardano.
- WebAssembly support for MeshJS and other TypeScript consumers.
- Integration with Aiken, Blockfrost, Maestro, and more.
- Rich documentation and examples.

---

## 2. What Has Been Delivered?

### Package Evolution

- Originated from the Fund 11 groundwork (`sidan-csl-rs`) as a proof-of-concept.
- Evolved into two crates:
  - `whisky`: Core SDK crate with advanced functionality.
  - `sidan-csl-rs`: WASM-compatible subset for MeshJS and frontend use.

This architecture provides Rust-native performance while preserving WASM support.

Repo: [https://github.com/sidan-lab/whisky](https://github.com/sidan-lab/whisky)

### Integration with MeshJS

- `mesh-core-csl` is now fully backed by `whisky`, improving support and performance.

### Offline Evaluation

- Integrated with **Aiken’s UPLC** engine.
- Exposed transaction evaluation features to MeshJS via `whisky`.

### Provider Implementations

- Implemented support for:
  - **Blockfrost**
  - **Maestro**
- Unified provider system for:
  - Fetching chain data
  - Transaction submission
  - Evaluation

### Transaction Parser

- Implemented a parser for converting transaction CBOR hex into native Rust types.
- Useful for debugging, rebuilding transactions, and unit testing.

### Documentation

- Hosted publicly at:  
  - [https://whisky.sidan.io](https://whisky.sidan.io)  
  - [https://sidan-lab.github.io/whisky](https://sidan-lab.github.io/whisky)

Includes API references, usage guides, and examples.

---

## 3. Key Achievements

| Metric                                     | Achieved         |
|-------------------------------------------|------------------|
| Active contributors                        | 4+               |
| GitHub commits (collaboration metric)      | 500+             |
| `crates.io` whisky all-time downloads      | 49,299           |
| `crates.io` sidan-csl-rs downloads         | 96,635           |
| npm dependents (whisky-based MeshJS lib)   | 236 projects     |

---

## 4. Achieved Challenge KPIs

| KPI                                                | Status               |
|----------------------------------------------------|----------------------|
| Source-available from day one                      | ✅ Yes               |
| Selected an open-source license                    | ✅ Apache 2.0        |
| Allow community collaboration                      | ✅ 4+ contributors   |
| High-quality documentation                         | ✅ whisky.sidan.io   |
| Ease of use for developers                         | ✅ MeshJS-compatible |
| Completed all committed features                   | ✅ Delivered         |

---

## 5. Key Learnings

### Consistent API Patterns

- Rust SDK (`whisky`) APIs mirror those of MeshJS.
- Results in faster onboarding and easier maintenance across both ecosystems.

### Tests as Examples

- Real-world test cases were added to serve as working usage examples.
- Helps developers learn by doing, not just reading.

### Cross-Team Collaboration

- Whisky development was tightly aligned with MeshJS work.
- Shared knowledge, design goals, and code reviews enhanced output quality.

---

## 6. Next Steps

- **Integration with TxPipe’s Pallas** for CBOR serialization (planned, unfunded).
- **FFI Bindings** to expose Rust logic to:
  - Python
  - Golang
- Continue open-sourcing real dApp implementations using whisky as references.
- Explore **blueprint parser** and **Cardano-native type system** as next features.

---

## 7. Final Thoughts

Community feedback emphasized the value of having more real-world examples.

In response, we plan to:

- Release more dApp implementations built on `whisky`.
- Add practical walkthroughs and end-to-end demos.

Whisky is already supporting hundreds of dependents via MeshJS and offers a mature, evolving foundation for developers who want to build on Cardano using Rust.

---

## 8. Links to Final Deliverables

- **GitHub Repository**: [https://github.com/sidan-lab/whisky](https://github.com/sidan-lab/whisky)  
- **Online Documentation**: [https://whisky.sidan.io](https://whisky.sidan.io)  
- **SIDAN Discord**: [https://discord.gg/55Z25r3QfC](https://discord.gg/55Z25r3QfC)  
- **Close-out Video**: *F12 Close Out Video – SIDAN | MeshJS – Advance Cardano SDK in Rust*  
