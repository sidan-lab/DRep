# Proposal: SIDAN - Delegator Feedback System for DRep Voting

## Proposal Summary

- **Budget requested:** 100,000 ₳  
- **Duration:** 5 months  
- **Original language:** English (not auto-translated)  

### Problem Statement
DRep–delegator communication is a core problem in Cardano governance. Delegators lack effective channels to provide feedback to their chosen DReps.

### Supporting Links
- [SIDAN Gov API](https://github.com/sidan-lab/sidan-gov-api)  
- [SIDAN Gov Discord Bot](https://github.com/sidan-lab/sidan-gov-discord-bot)  
- [SIDAN Gov Frontend Delegate](https://github.com/sidan-lab/sidan-gov-frontend-delegate)  
- [SIDAN Lab on X](https://x.com/sidan_lab)  
- [SIDAN Dashboard](https://dashboard.sidan.io/)  

### Dependencies
- **No dependencies**  

### Open Source
- **Yes** – Apache-2.0 license  

---

## Theme
**Governance**

---

## Category Questions

### Innovation
- **Discord-native input** linked to a DRep’s on-chain vote; verified delegators, no new app needed.  
- **Dual legitimacy:** tallies by both headcount and stake-weight, paired with published rationale.  
- **Transparency:** auto-posted decisions and rationale, with content-hash anchored on-chain.  
- **Reusable:** open API, self-hostable, and extensible.  

### Prototype / MVP
- End-to-end demo: verify in Discord → vote/comment → live web tallies → DRep finalizes.  
- Result auto-posted with rationale; content-hash generated for on-chain inclusion.  
- Deployed in SIDAN Lab Discord with real DRep voting.  

### Success Measures
- 100% on-chain proposals fetched and discussion forums auto-published in Discord.  
- 100% SIDAN Lab DRep votes enriched with metadata on community statistics (yes/no/abstain).  
- Verified delegator participation in SIDAN Lab Discord.  

---

## Solution

### DRep decision workspace (web)
- Clean pages to browse proposals, options, and rationale.  
- Click-through demo mode with sample data.  
- Basic roles (DRep/team) and activity log.  

### Discord-native input
- Delegators share opinions via commands or reactions.  
- Votes and comments mirrored on the web in near real time.  
- Results and rationale posted back into Discord automatically.  

### Transparency and helpful views
- Live turnout, option breakdown, sentiment snapshot.  
- Clear proposal context: summary, pros/cons, links.  
- Opt-in Discord notifications when results are published.  

---

## Impact

- **Higher participation:** lowers friction, supports multilingual and community-run servers.  
- **Transparency & accountability:** rationales + on-chain hashes; exportable headcount and stake-weighted tallies.  
- **Reusable rails:** Apache-2.0, open APIs, and self-hosting make it easy for wallets, SPOs, and communities to adopt.  

---

## Capabilities & Feasibility

### Capability & Accountability
- **Proven Catalyst delivery:** completed F11 & F12 Rust SDK proposals, tagged releases, closeout reports.  
- **Governance-native team:** active DRep with published workflow; experienced with CIP-1694/Conway.  
- **Transparency:** Apache-2.0, public repos, CI/tests, weekly notes, transparent milestones.  
- **Community insight:** active in regional governance discussions; validated demand for better DRep↔delegator tooling.  
- **Ecosystem recognition:** Cardano Foundation Developer & Builder Delegations (20M ₳, May 21, 2025).  

### Feasibility & Validation
- Early pilot deployed in SIDAN Lab Discord with delegator data collection.  
- Staged build:  
  1. Web MVP with mock data  
  2. SIDAN Lab DRep pilots  
  3. Real delegator input integration  
  4. Self-host guides for broader adoption  
- Ongoing validation with delegator community.  
- Pilot KPI: SIDAN Lab DRep posts on-chain vote referencing rationale.  

---

## Milestones

### 1. Preparation and Organization Setup
- **Outputs:** team setup, repo live, announcement, roadmap.  
- **Acceptance:** LICENSE committed, community channel invite, roadmap active.  
- **Evidence:** repo tree, announcement post, GitHub Projects board.  
- **Delivery:** Month 1  
- **Cost:** 20,000 ₳  
- **Progress:** 20%  

---

### 2. DRep management web platform
- **Outputs:** feature requirements, UI/UX design, voting platform, mock data visualization.  
- **Acceptance:** workable web platform with mock community sentiment displayed.  
- **Evidence:** repo link, announcement on X/Discord.  
- **Delivery:** Month 1  
- **Cost:** 20,000 ₳  
- **Progress:** 40%  

---

### 3. Web platform data integration
- **Outputs:** Discord bot voting, delegator stats collection, web integration, auto-publish to Discord.  
- **Acceptance:** working integration with real delegator votes mirrored on web and published with rationale.  
- **Evidence:** repo link, announcement on X/Discord.  
- **Delivery:** Month 1  
- **Cost:** 20,000 ₳  
- **Progress:** 60%  

---

### 4. Relevant Voting Information Integration
- **Outputs:** feedback from DReps, enhanced display of voting-relevant info, updated visualizations.  
- **Acceptance:** curated info list, updated UI, additional requested features integrated.  
- **Evidence:** repo link, announcement on X/Discord.  
- **Delivery:** Month 1  
- **Cost:** 20,000 ₳  
- **Progress:** 80%  

---

### 5. Documentation and Closeout Report
- **Outputs:** documentation, contribution guidelines, closeout report and video.  
- **Acceptance:** docs live, contributor guidelines committed, closeout published.  
- **Evidence:** docs repo link, public report, public video.  
- **Delivery:** Month 1  
- **Cost:** 20,000 ₳  
- **Progress:** 100%  

---

## Budget & Costs

- **Engineering (Web/Discord/API):** 75,000 ₳ (~75%)  
- **Project management & QA:** 8,000 ₳ (~8%)  
- **Documentation & DevRel:** 12,000 ₳ (~12%)  
- **Reporting & Closeout:** 5,000 ₳ (~5%)  

---

## Value for Money

- **Closes biggest gap:** first system focused on two-way DRep↔delegator communication.  
- **Treasury efficiency:** more informed DRep decisions → better use of multi-billion ₳ treasury.  
- **Reusable public good:** Apache-2.0, open APIs, no license cost; prevents tool fragmentation.  
- **Integrable:** open repos as references for community governance tooling.  
