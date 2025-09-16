# [Proposal setup] Proposal title
Please provide your proposal title

**SIDAN - Vodka - Complete Aiken Dev Utils & Testing Framework**

---

# [Proposal Summary] Budget Information
Enter the amount of funding you are requesting in ADA

**100000**

---

# [Proposal Summary] Time
Please specify how many months you expect your project to last

**5**

---

# [Proposal Summary] Translation Information
Please indicate if your proposal has been auto-translated

**No**

Original Language

**en**

---

# [Proposal Summary] Problem Statement
What is the problem you want to solve?

Aiken devs lack consistent, well-tested on-chain utilities and a complete mock transaction builder. Fragmented APIs slow audits, hinder unit tests, and risk inefficiency on mainnet.

---

# [Proposal Summary] Supporting Documentation
Supporting links

- https://github.com/sidan-lab/vodka
- https://sidan-lab.github.io/vodka/cocktail.html
- https://sidan-lab.github.io/vodka/mocktail.html
- https://x.com/sidan_lab

---

# [Proposal Summary] Project Dependencies
Does your project have any dependencies on other organizations, technical or otherwise?

**No**

Describe any dependencies or write 'No dependencies'

**No dependencies**

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

- **Permissive & enterprise-friendly:** Allows commercial use, modification, and redistribution without copyleft—low friction for wallets/exchanges/dApps.  
- **Patent safety:** Explicit patent grant in Apache-2.0 reduces legal risk for adopters and contributors.  
- **Ecosystem alignment:** Matches licensing across other SIDAN Lab repos, simplifying reuse and contributions.  

### How do you make sure your source code is accessible to the public from project start, and people are informed?
- **Day-0 public repo:** github.com/sidan-lab/vodka (Apache-2.0); no private phase.  
- **Releases:** CHANGELOG; docs/examples auto-published (GitHub Pages).  
- **Transparency:** Public roadmap via GitHub Issues/Projects with milestones.  
- **Communications:** Release notes on GitHub; announcements on X/Discord with repo link.  

### How will you provide high quality documentation?
- **Where docs live:** README in repo + versioned API docs, including cocktail and mocktail pages.  
- **Structure:** Getting Started & naming convention in README; module-by-module API reference with constants/functions and examples on the docs pages.  
- **Standards & tooling:** Markdown README; API reference auto-generated and published via GitHub Pages.  
- **Feedback & transparency:** Issues enabled on GitHub for doc improvements.  

---

# [Your Project and Solution] Solution
Please describe your proposed solution and how it addresses the problem

**Cocktail: API coherence & DX upgrade**
- Define and publish naming convention; rename APIs; add deprecations with migration notes; refactor examples.  
- Add needed utils (e.g., datum/redeemer codecs, value arithmetic, policy/asset IDs, script-context helpers) with docs/examples.  

**Mocktail: feature-complete mock tx builder**
- Implement endpoints for all script purposes: spend, mint, withdraw, publish, vote, propose.  
- Test cases for mock transaction builders functions to ensure behaviour of mock utilities  

**Audit & performance optimization**
- Security review of on-chain utils.  
- Efficiency enhancement: refactor current onchain utilities into more efficient equivalents.  

---

# [Your Project and Solution] Impact
Please define the positive impact your project will have on the wider Cardano community

- Faster, safer Aiken development: Consistent on-chain utilities and a complete mock tx builder cut build/test cycles and catch bugs before mainnet.  
- Shared standards & reuse: Clear naming and well-documented helpers reduce “reinventing the wheel,” boosting interop across dApps.  
- Stronger security & audits: Audit notes improve review quality and reduce edge-case failures.  
- Lower user costs: Optimized encodings and smaller scripts reduce execution budgets (CPU/mem), making transactions cheaper.  
- Onboarding & education: Readable docs, examples, and templates help new teams ship faster and contribute back (Apache-2.0).  

---

# [Your Project and Solution] Capabilities & Feasibility
What is your capability to deliver your project with high levels of trust and accountability? How do you intend to validate if your approach is feasible?

**Capability & accountability:**
- **Track record & transparency:** Active OSS repo (vodka) with public API docs (Cocktail/Mocktail) and updates on X.  
- **Proven usefulness (downloads & adoption):**  
  - The “Vesting” example instructs adding sidan-lab/vodka as a dependency and uses key_signed/valid_after (https://aiken-lang.org/example--vesting/mesh).  
  - Listed in community’s curated catalog under Testing utilities (https://github.com/aiken-lang/awesome-aiken).  
- **Maintainers who ship:** 8 tagged releases in 2025, latest v0.1.16 (Aug 17, 2025). Active PRs from SIDAN Lab’s contributors.  
- **Ecosystem builders:** Team maintains related SDKs/tools (e.g., Gin for Python, Whisky for Rust, Mesh for typescript transaction builder), showing cross-stack capability.  
- **Recognized by ecosystem:** Cardano Foundation “Developer & Builder Delegations” (May 21, 2025) lists Sidan Lab among the seven DReps receiving 20M ADA delegations.  

**Feasibility & validation plan:**
- **Parity & correctness:** Tests against the Aiken standard library types for all script purposes (spend/mint/withdraw/publish/vote/propose).  
- **Benchmarks & efficiency:** Measure script size and execution budgets before/after; optimize encodings/strictness.  
- **Real-world use tests:** Example projects such as MeshJS (@meshsdk/contract), Andamio AikenPBL, Cardano Builder Asia course etc using Vodka.  
- **Backward compatibility:** Old APIs kept with warnings; automated deprecation checks in CI; rollback plan via SemVer tags.  
- **Success signals:** External PRs/issues, projects adopting Vodka modules, passing test suite, and improved budget metrics across releases.  

---

# [Milestones] Project Milestones

## Milestone Title
**Preparation and Organization Setup**

**Milestone Outputs**
- Team setup: maintainers/advisors confirmed with roles, responsibilities, and meeting/on-call cadence.  
- Communications: public announcement, community channel (Discord/Telegram), X/Twitter post, contributor guidelines.  
- Project planning: GitHub Projects roadmap with milestones, labeled issue/PR templates, initial delivery plan.  

**Acceptance Criteria**
- Maintainers/advisors listed with GitHub handles, roles in README/MAINTAINERS.md.  
- Repo: public repo live with LICENSE, CODE_OF_CONDUCT.md committed and visible.  
- Communications: announcement post published (link in repo), community channel invite in README.  
- Project planning: GitHub Projects board active with milestones and actionable issues linked to this milestone.  

**Evidence of Completion**
- Legal entity established and operational  
- Link to README/MAINTAINERS.md showing maintainers/advisors roles  
- Link to repo tree on main showing LICENSE, CODE_OF_CONDUCT.md.  
- Link to public announcement post on X/Twitter/Discord.  
- Link to GitHub Projects board with visible milestones and issues for this milestone.  

**Delivery Month:** 1  
**Cost:** 20000  
**Progress:** 20 %  

---

## Milestone Title
**Cocktail - onchain utilities functions revisit**

**Milestone Outputs**
- Revisit the naming convention, update and deprecating with devexp consideration: Apply updates across modules, mark legacy names as deprecated, and add short migration notes in README/examples to protect devexp and avoid breaking changes.  
- Add utilities functions as needed: Implement missing on-chain helpers requested by users (e.g., datum/redeemer codecs, value arithmetic, asset/policy IDs, script-context helpers) with runnable examples.  

**Acceptance Criteria**
- Naming & deprecation complete: Convention documented; APIs renamed; deprecation attributes and warnings added; examples refactored; README updated with migration notes; CI build/test/lint pass after the refactor to confirm stability and developer experience.  
- Utilities added & documented: Helpers implemented in Cocktail with inline docstrings, README notes, and runnable examples; docs published on GitHub Pages.  

**Evidence of Completion**
- Public link to the developed code on SIDAN Lab Github  
- Public link to post on Twitter/X to inform the Public  
- Link to SIDAN Lab discord on release announcement  

**Delivery Month:** 1  
**Cost:** 20000  
**Progress:** 40 %  

---

## Milestone Title
**Mocktail - feature complete development**

**Milestone Outputs**
- Develop and expose the remaining Mocktail endpoints needed to build mock transactions for all script purposes (spend, mint, withdraw, publish, vote, propose).  
- Add concise docstrings, show function signatures and minimal runnable examples on the Mocktail docs page, link from README, and publish via GitHub Pages.  

**Acceptance Criteria**
- The Mocktail tx builder module includes callable endpoints for spend, mint, withdraw, publish, vote, propose.  
- Each endpoint is documented with arguments and example usage on the Mocktail docs page; README links to Mocktail.  

**Evidence of Completion**
- Public link to the developed code on SIDAN Lab Github  
- Public link to post on Twitter/X to inform the Public  
- Link to SIDAN Lab discord on release announcement  

**Delivery Month:** 1  
**Cost:** 20000  
**Progress:** 60 %  

---

## Milestone Title
**Auditing and performance optimized for onchain utils**

**Milestone Outputs**
- Provide quality assurance of usage of the package with efficiency considered: Perform a focused review of onchain utils (Cocktail) to confirm intended usage and safe defaults; update README/examples where ambiguous; record efficiency observations for common paths and note simple, no-behaviour-change-refinements.  
- Produce a short QA/Audit note in the repository describing what was reviewed, any documentation clarifications made, and links to the related commits.  

**Acceptance Criteria**
- Conduct security auditing of onchain utility functions: An audit note is merged (e.g., AUDIT.md or docs page) listing functions reviewed, identified edge cases and preconditions, and any added clarifying comments or docstrings; non-urgent items are filed as GitHub issues.  
- Conduct efficiency auditing of onchain utility functions: An efficiency note is merged summarizing observations on typical call patterns and data handling; minor safe adjustments or documentation updates are committed; examples build; the release tag mentions the audit.  

**Evidence of Completion**
- Public link to the developed code on SIDAN Lab Github  
- Public link to post on Twitter/X to inform the Public  
- Link to SIDAN Lab discord on release announcement  

**Delivery Month:** 1  
**Cost:** 20000  
**Progress:** 80 %  

---

## Milestone Title
**Documentation and Closeout Report**

**Milestone Outputs**
- Publish Vodka docs: GitHub Pages for Cocktail and Mocktail with install, quickstart, on-chain utilities, and mock tx-builder guides; include minimal runnable examples; link prominently from the README.  
- Add contribution materials: CONTRIBUTING.md, CODE_OF_CONDUCT.md, issue/PR templates, and brief maintainer notes to support future collaboration.  
- Close-out materials: Public close-out report (scope, KPIs/adoption signals, lessons, next steps) and a short close-out video (demo + summary); announce links via README/X/Discord.  

**Acceptance Criteria**
- Docs site is live and linked from README; pages cover quickstart plus module references for Cocktail/Mocktail; examples compile in CI; Pages deployment succeeds.  
- CONTRIBUTING.md, CODE_OF_CONDUCT.md, and issue/PR templates are committed; CHANGELOG and a version tag updated to capture the documentation wrap-up.  
- Close-out report and video are publicly accessible; links added to README and posted on X/Discord.  

**Evidence of Completion**
- Documentation served at the public Github repository with link provided  
- Publicly accessible closeout report  
- Publicly accessible closeout video  

**Delivery Month:** 1  
**Cost:** 20000  
**Progress:** 100 %  

---

# [Final Pitch] Budget & Costs
Please provide a cost breakdown of the proposed work and resources

**Engineering (Aiken/Cardano) — 75,000 ADA (~75%)**  
Core work on Cocktail (naming/deprecations, new utilities with examples) and Mocktail (complete endpoints for spend/mint/withdraw/publish/vote/propose). Includes CI, basic tests, code review, and light efficiency checks.  

**Project management & QA — 8,000 ADA (~8%)**  
Roadmap planning, issue triage, release checklists, milestone acceptance, and sanity validation of Mocktail endpoints and Cocktail utilities across example flows.  

**Documentation & DevRel — 12,000 ADA (~12%)**  
README/quickstarts, module pages for Cocktail/Mocktail on GitHub Pages, minimal runnable examples, release notes, and launch threads on X/Discord.  

**Reporting & Closeout — 5,000 ADA (~5%)**  
Prepare and publish the fund closeout report and a short overview video (with captions), and link clearly from the repo and community channels.  

---

# [Final Pitch] Value for Money
How does the cost of the project represent value for the Cardano ecosystem?

- **High public-good ROI:** Vodka (Apache-2.0) is reusable by any Aiken team—wallets, dApps, auditors. A consistent utilities set plus a complete mock tx builder typically saves each team ~2–4 weeks versus building from scratch; a few adopters already exceed the grant in saved effort.  
- **Faster developer adoption:** Clear naming, documented helpers, and mock transactions reduce integration time and help teams catch issues off-chain before mainnet, improving reliability and time-to-market.  
- **Lower ecosystem risk:** Shared, maintained utilities prevent one-off implementations and fragmentation. Deprecation guidance stabilizes APIs across versions and reduces breakage.  
- **Quality you can audit:** Budget funds CI, runnable examples, public docs on GitHub Pages, and focused QA notes on on-chain utilities and efficiency. Everything is open and verifiable.  
- **Measured outcomes, not promises:** Public releases, docs live, endpoint coverage achieved, adoption signals (repos referencing Vodka), external PRs and issues closed, and a transparent close-out report and video.  

---

