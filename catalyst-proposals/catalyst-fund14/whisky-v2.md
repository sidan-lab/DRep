# [Proposal setup] Proposal title
Please provide your proposal title

**SIDAN - Whisky V2 - Cardano Rust SDK with Pallas**

---

# [Proposal Summary] Budget Information
Enter the amount of funding you are requesting in ADA

**100000**

---

# [Proposal Summary] Time
Please specify how many months you expect your project to last

**6**

---

# [Proposal Summary] Translation Information
Please indicate if your proposal has been auto-translated

**No**

Original Language: **en**

---

# [Proposal Summary] Problem Statement
What is the problem you want to solve?

Whisky’s CSL core limits maintainability and slows new-feature support. Moving to TxPipe’s pallas gives a Rust-native, community-maintained base with broader features and cleaner extensibility.

---

# [Proposal Summary] Supporting Documentation
Supporting links

- https://github.com/sidan-lab/whisky  
- https://crates.io/crates/whisky  
- https://whisky.sidan.io/  
- https://dashboard.sidan.io/org-stats  
- https://x.com/sidan_lab  

---

# [Proposal Summary] Project Dependencies
Does your project have any dependencies on other organizations, technical or otherwise?

**Yes**

Describe any dependencies or write 'No dependencies'

**Pallas from Txpipe**

---

# [Proposal Summary] Project Open Source
Will your project's outputs be fully open source?

**Yes**

License and Additional Information

**Apache-2.0 license**

---

# [Theme Selection] Theme
Please choose the most relevant theme and tag related to the outcomes of your proposal

**Developer Tools**

---

# [Campaign Category] Category Questions
### Mention your open source license and describe your open source license rationale.

We use Apache-2.0 due to below reasons:

- **Permissive + enterprise-friendly**: allows commercial/use/modification with attribution; minimal friction for wallets/exchanges.  
- **Patent grant & contribution clarity**: Apache-2.0’s explicit patent terms reduce legal risk for contributors and adopters.  
- **Ecosystem alignment**: matches TxPipe pallas (Apache-2.0), easing integration; also compatible with EMURGO CSL (MIT).  
- **Sustains adoption**: consistent with SIDAN Lab repos and broader Rust/Cardano tooling, encouraging forks, PRs, and reuse.  

---

### How do you make sure your source code is accessible to the public from project start, and people are informed?

- **Public from day 1**: All work in sidan-lab/whisky (Apache-2.0); no private mirrors; all changes via public PRs.  
- **Docs always live**: API docs on docs.rs (auto-built per release); guides/quickstarts on GitHub Pages & README.  
- **Transparent progress**: Public Issues/Milestones/Projects; CI (Actions) visible on every PR.  
- **Versioned releases**: GitHub Releases with changelogs; tags link to docs.rs and examples.  
- **Inform the public**: Announcements on SIDAN Lab’s X/Twitter with links to the repo and docs  

---

### How will you provide high quality documentation?

**Two-tier docs**

- **API reference** (https://sidan-lab.github.io/whisky/) and docs.rs/whisky auto-built on each crate release with rich rustdoc, examples, and feature flags documented.  
- **Guides site** (https://whisky.sidan.io/) Task-based docs (quickstart, tx-builder, tx-parser, era upgrades) on GitHub Pages, linked from README.  

**Quality gates (CI)**

- Build docs for all features; run doctests; check links; fail PRs on warnings/broken examples.  
- Versioned releases with changelog  

---

# [Your Project and Solution] Solution
Please describe your proposed solution and how it addresses the problem

**Phase 1 — Build transactions on Pallas**

- Refactor TxBuilder to take in an interface as serializer core so Whisky no longer has to depend on CSL.  
- Create the Pallas-based serializer core (WhiskyPallas) and connect it to the transaction builder.  
- Prove it works by building real example transactions, with automated tests and short docs.  

**Phase 2 — Parse transactions + remaining tools**

- Implement the transaction parser interface for whisky-pallas  
- Move the remaining helpers (addresses, scripts, datums, formats) over to Pallas.  
- Check everything end-to-end with build→read “round-trip” tests and extra stress tests.  

**Phase 3 — Finish migration & ship**

- Switch the whole SDK to the new dependency injection design and make Pallas the default.  
- Keep a CSL compatibility layer for a while and provide a brief migration guide for users.  

---

# [Your Project and Solution] Impact
Please define the positive impact your project will have on the wider Cardano community

- **Faster access to new protocol features**: A pallas-based core lets Rust devs adopt new eras/governance updates sooner (e.g., Conway/CIP-1694), reducing lag between node releases and SDK support  
- **Stronger Rust ecosystem & interoperability**: Aligning with pallas’ Rust-native primitives improves compatibility with TxPipe tooling (e.g., Oura, Scrolls), making it easier to build explorers, wallets, and data apps.  
- **Better developer experience**: Clear, versioned API docs (docs.rs) plus guides (GitHub Pages) and public CI lower onboarding friction and increase trust in releases.  
- **Resilience & community maintenance**: Reduces single-vendor dependency by leveraging an actively maintained, community-driven base, encouraging external contributions and shared standards.  

---

# [Your Project and Solution] Capabilities & Feasibility
What is your capability to deliver your project with high levels of trust and accountability? How do you intend to validate if your approach is feasible?

**Capability & accountability:**

- **Catalyst delivery (Rust libs/SDKs)**: Successfully completed F11 “Rust library for easy off-chain transaction building,” and the F12 “Advance Cardano SDK in Rust”. Both listed on our public proposals page.  
- **Proven usefulness (downloads & adoption)**: cardano-serialization-lib ≈ 250k all-time downloads; our related crates—sidan-csl-rs ≈ 100k and whisky ≈ 50k—total 150k+ lifetime downloads. That’s >50% of CSL’s volume, indicating broad, sustained use of our SDKs.  
- **Maintainers who ship**: 13 tagged releases in 2025; latest v1.0.10 (Aug 7, 2025). Active PRs from SIDAN Lab’s contributors.  
- **Ecosystem builders**: Team maintains related SDKs/tools (e.g., Gin for Python, Vodka for Aiken testing, Mesh for typescript transaction builder), showing cross-stack capability and reuse of Whisky cores. Our team includes an ex-CSL maintainer, bringing deep knowledge of CSL internals and compatibility edges—lowering migration risk and speeding up parity work.  
- **Recognized by ecosystem**: Cardano Foundation “Developer & Builder Delegations” (May 21, 2025) lists Sidan Lab among the seven DReps receiving 20M ADA delegations.  

**Feasibility & validation plan:**

- **Incremental migration**: Introduce a Serializer trait and implement a WhiskyPallas backend, keeping the current API stable—validated behind feature flags. (Parallels our existing builder/parser architecture already released.)  
- **Cross-implementation parity tests**: Golden-vector tests comparing CSL vs pallas outputs (CBOR, hashes, witnesses), plus round-trip build↔parse tests in CI.  
- **Ecosystem alignment**: Pallas is an actively maintained Rust-native base with regular releases, making the approach practical and sustainable.  
- **Release gating**: Ship as pre-releases on crates.io, with changelog, migration notes, and docs.rs builds; promoted to stable once CI, examples, and external PR reviews pass.  

---

# [Milestones] Project Milestones
## Milestone Title
**Preparation and Organization Setup**

... (continue with the same structure as above, using Markdown headings, bold for labels, bullet points for lists, etc.)  

---

# [Final Pitch] Budget & Costs
Please provide a cost breakdown of the proposed work and resources

- **Engineering (Rust/Cardano) — 75,000 ADA (~75%)**  
The bulk of the budget pays engineers to do the core work: build the Pallas-based tx-builder (Phase 1), add the tx-parser and remaining utilities (Phase 2), and complete the full migration/dependency injection (Phase 3). This also covers tests, CI fixes, code reviews, and basic performance/security checks.  

- **Project management & QA — 8,000 ADA (~8%)**  
Planning the roadmap, triaging issues, running release checklists, confirming milestone acceptance, and verifying parity/round-trip tests so what we ship is reliable.  

- **Documentation & DevRel — 12,000 ADA (~12%)**  
Writing quickstarts and task guides, the CSL→Pallas migration guide, runnable examples, and keeping docs.rs / GitHub Pages updated. Also includes launch threads, demo walkthroughs, and helping developers adopt the SDK.  

- **Reporting & Closeout — 5,000 ADA (~5%)**  
Preparing the fund closeout report and a short video (with captions), publishing everything, and linking it clearly from the repo and channels.  

---

# [Final Pitch] Value for Money
How does the cost of the project represent value for the Cardano ecosystem?

- **High public-good ROI**: Whisky V2 (Apache-2.0) is reusable by any team—wallets, DeFi, data tools. A pallas-based builder+parser saves each team ~2–4 weeks of integration vs. rolling their own. With only a handful of adopters, the ecosystem’s saved effort already exceeds this grant.  
- **Faster protocol adoption**: Aligning Whisky with pallas (active, Rust-native) shortens the lag between node/era updates and Rust SDK support, unblocking downstream builders sooner (more mainnet features, earlier).  
- **Lower ecosystem risk**: Moving off a single-maintainer dependency to a community-maintained base reduces bus-factor and fragmentation; DI keeps options open if future serializers emerge.  
- **Measured outcomes, not promises**: We’ll track releases aligned to node/era tags, docs completeness (guides + examples), downloads/reverse-deps, external PRs/issues closed, and adoption announcements—all publicly verifiable on GitHub, crates.io/docs.rs, and SIDAN channels.  

---


