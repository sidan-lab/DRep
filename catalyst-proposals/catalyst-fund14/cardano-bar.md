# Proposal: SIDAN - Cardano Bar - Aiken Blueprint Parser for VSCode

## Proposal Summary

- **Budget requested:** 100,000 ₳  
- **Duration:** 5 months  
- **Original language:** English (not auto-translated)  

### Problem Statement
Cardano developers currently hand-parse Aiken blueprints, remap types across TypeScript and Rust, and rewrite boilerplate for tests and transaction builders. This slows delivery and introduces errors.

### Supporting Links
- [GitHub – Cardano Bar](https://github.com/sidan-lab/cardano-bar)  
- [VSCode Marketplace extension](https://marketplace.visualstudio.com/items/?itemName=sidan-lab.cardano-bar-vscode)  
- [Mesh CLI reference](https://github.com/MeshJS/mesh/blob/main/scripts/mesh-cli/package.json#L35)  
- [SIDAN Lab on X](https://x.com/sidan_lab)  

### Dependencies
- **No dependencies**  

### Open Source
- **Yes** – Apache-2.0 license  

---

## Theme
**Developer Tools**

---

## Category Questions

### Open Source License Rationale
- **Permissive & enterprise-friendly:** Allows commercial use, modification, and redistribution without copyleft—low friction for wallets, exchanges, and dApps.  
- **Patent safety:** Explicit patent grant reduces legal risk for adopters and contributors.  
- **Ecosystem alignment:** Matches licensing across other SIDAN Lab repos.  

### Accessibility & Transparency
- Public repo live from Day 0 (Apache-2.0).  
- Weekly commits, CI checks, PR-only merges.  
- Docs/examples auto-published via GitHub Pages.  
- Public roadmap on GitHub Projects.  
- Announcements via X/Discord and monthly updates on GitHub/Catalyst.  

### Documentation Approach
- Quickstart in repo README.  
- Versioned docs site with API reference and examples.  
- Auto-generated API reference published to GitHub Pages.  
- Feedback loop via GitHub Issues.  

---

## Solution

### One-click parsing of Aiken blueprints
- Build **two parsers** (TS + Rust) that read an Aiken blueprint and generate typed code for **Mesh** (TS) or **whisky** (Rust).  
- Provide a **VSCode command** to insert generated types, helpers, and starter files into projects.  
- Validate reliability by running against at least one open-source Cardano project.  

### Snippets for rapid starts
- **Aiken snippets:** Scaffold validators (spend, mint, withdraw).  
- **vodka/mocktail snippets:** Prebuilt unit tests and mock transactions.  
- **Mesh & whisky snippets:** Prefilled TxBuilder flows (spend, mint, withdraw).  
- All snippets accessible through Cardano Bar in VSCode.  

### Smooth developer experience
- Clear docs and runnable examples.  
- Guidance on how generated types map to blueprints and schema changes.  

---

## Impact

- **Faster delivery, fewer mistakes:** Setup cut from days to minutes.  
- **Unify TS & Rust workflows:** One blueprint → consistent code across stacks.  
- **Raise code quality:** Standard scaffolds + test starters improve reviews and catch errors early.  
- **Lower barrier for newcomers:** VSCode commands and examples help first-time devs build validators and flows.  
- **Reusable building blocks:** Open-source snippets and parsers can be extended by others.  

---

## Capabilities & Feasibility

### Capability & Accountability
- **Proven delivery:** Cardano Bar already open-source, latest release v0.0.8 (Aug 12, 2025), on VSCode Marketplace.  
- **Battle-tested engine:** TS parser used by Mesh CLI.  
- **Cross-stack expertise:** Maintain whisky (Rust), vodka (Aiken testing), gin (Python).  
- **Ecosystem trust:** Selected as DRep by Cardano Foundation (20M ₳ delegation, May 21, 2025).  

### Feasibility & Validation
- **Standards-compliance:** Tests against CIP-57 blueprint spec with golden fixtures and parity tests.  
- **Real-project validation:** Run parsers on open-source Aiken projects and publish results.  
- **Release hygiene:** Semantic versioning, CHANGELOGs, rollbackable releases.  
- **Adoption signals:** Marketplace installs, command metrics, external PRs/issues.  

---

## Milestones

### 1. Preparation and Organization Setup
- **Outputs:** Team setup, communications, roadmap, repo setup.  
- **Acceptance:** Maintainers listed, repo public, announcement published, roadmap live.  
- **Evidence:** Links to README, repo tree, announcement, and GitHub Projects.  
- **Delivery:** Month 1  
- **Cost:** 20,000 ₳  
- **Progress:** 20%  

---

### 2. Feature complete TypeScript Aiken blueprint parser
- **Outputs:** VSCode command to parse blueprint into Mesh types.  
- **Acceptance:** Tested against at least 1 open-source blueprint; usage guide provided.  
- **Evidence:** Public repo link, X/Discord announcement.  
- **Delivery:** Month 1  
- **Cost:** 30,000 ₳  
- **Progress:** 50%  

---

### 3. Feature complete Rust Aiken blueprint parser
- **Outputs:** VSCode command to parse blueprint into whisky types.  
- **Acceptance:** Tested against at least 1 open-source blueprint; usage guide provided.  
- **Evidence:** Public repo link, X/Discord announcement.  
- **Delivery:** Month 1  
- **Cost:** 30,000 ₳  
- **Progress:** 80%  

---

### 4. Basic code snippets in Aiken, vodka, Mesh and whisky
- **Outputs:** Snippets for validators, tests, and tx builders across Aiken, vodka, Mesh, whisky.  
- **Acceptance:** All snippets integrated into Cardano Bar.  
- **Evidence:** Public repo link, X/Discord announcement.  
- **Delivery:** Month 1  
- **Cost:** 10,000 ₳  
- **Progress:** 90%  

---

### 5. Documentation and Closeout Report
- **Outputs:** Full docs site, contribution materials, closeout report and video.  
- **Acceptance:** Docs live, contributor materials committed, closeout published.  
- **Evidence:** Public docs, report, and video links.  
- **Delivery:** Month 1  
- **Cost:** 10,000 ₳  
- **Progress:** 100%  

---

## Budget & Costs

- **Engineering (Parsers, VSCode, Snippets):** 75,000 ₳ (~75%)  
- **Project management & QA:** 8,000 ₳ (~8%)  
- **Documentation & DevRel:** 12,000 ₳ (~12%)  
- **Reporting & Closeout:** 5,000 ₳ (~5%)  

---

## Value for Money

- **High ROI:** Replaces 2–4 weeks of manual setup per team.  
- **Cross-language leverage:** One blueprint → Mesh (TS) + whisky (Rust).  
- **Open & reusable:** Apache-2.0, zero lock-in.  
- **Quality reduces costs:** Typed codegen and snippets lower audit/review burden.  
- **Transparent outcomes:** Usage metrics, PRs/issues, and compatibility updates.  
