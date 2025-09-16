import React, { useState } from 'react';
import Link from 'next/link';
import PageHeader from '../../components/PageHeader';
import styles from '../../styles/ProposalDetail.module.css';
import { FaArrowLeft, FaCalendarAlt, FaCoins, FaClock, FaGithub, FaExternalLinkAlt, FaCheckCircle, FaFileAlt, FaTimes, FaCode } from 'react-icons/fa';
import { MdEvent, MdIntegrationInstructions, MdDeveloperMode, MdExtension, MdCategory } from 'react-icons/md';
import { SiTypescript, SiRust } from 'react-icons/si';

interface Milestone {
    id: number;
    title: string;
    description: string;
    outputs: string[];
    acceptanceCriteria: string[];
    evidence: string[];
    delivery: string;
    cost: string;
    progress: number;
    icon: React.ReactNode;
    color: string;
}

const milestones: Milestone[] = [
    {
        id: 1,
        title: "Preparation and Organization Setup",
        description: "Initial project setup with team organization, repository structure, communications setup, and detailed roadmap planning.",
        outputs: [
            "Team setup and role assignments",
            "Communications channels established",
            "Detailed project roadmap",
            "Repository structure and setup"
        ],
        acceptanceCriteria: [
            "Maintainers listed in documentation",
            "Repository made public",
            "Announcement published",
            "Roadmap live on GitHub Projects"
        ],
        evidence: [
            "Links to README documentation",
            "Repository tree structure",
            "Public announcement posts",
            "GitHub Projects roadmap"
        ],
        delivery: "Month 1",
        cost: "20,000 ADA",
        progress: 20,
        icon: <MdEvent />,
        color: "rgba(56, 232, 225, 0.15)"
    },
    {
        id: 2,
        title: "Feature Complete TypeScript Aiken Blueprint Parser",
        description: "Development of comprehensive TypeScript parser for Aiken blueprints with VSCode integration and Mesh type generation.",
        outputs: [
            "VSCode command for blueprint parsing",
            "Mesh types generation system",
            "TypeScript parser implementation",
            "Integration testing framework"
        ],
        acceptanceCriteria: [
            "Tested against at least 1 open-source blueprint",
            "Usage guide provided",
            "VSCode command fully functional",
            "Mesh types accurately generated"
        ],
        evidence: [
            "Public repository link",
            "Testing documentation",
            "X/Discord announcement",
            "Usage examples and guides"
        ],
        delivery: "Month 1",
        cost: "30,000 ADA",
        progress: 50,
        icon: <SiTypescript />,
        color: "rgba(99, 102, 241, 0.15)"
    },
    {
        id: 3,
        title: "Feature Complete Rust Aiken Blueprint Parser",
        description: "Development of comprehensive Rust parser for Aiken blueprints with VSCode integration and whisky type generation.",
        outputs: [
            "VSCode command for Rust parsing",
            "Whisky types generation system",
            "Rust parser implementation",
            "Cross-language compatibility testing"
        ],
        acceptanceCriteria: [
            "Tested against at least 1 open-source blueprint",
            "Usage guide provided",
            "VSCode command fully functional",
            "Whisky types accurately generated"
        ],
        evidence: [
            "Public repository link",
            "Cross-language testing results",
            "X/Discord announcement",
            "Rust implementation documentation"
        ],
        delivery: "Month 1",
        cost: "30,000 ADA",
        progress: 80,
        icon: <SiRust />,
        color: "rgba(34, 197, 94, 0.15)"
    },
    {
        id: 4,
        title: "Basic Code Snippets in Aiken, vodka, Mesh and whisky",
        description: "Creation of comprehensive code snippets for validators, tests, and transaction builders across all supported frameworks.",
        outputs: [
            "Aiken validator snippets",
            "vodka/mocktail test snippets",
            "Mesh TxBuilder snippets",
            "whisky transaction snippets"
        ],
        acceptanceCriteria: [
            "All snippets integrated into Cardano Bar",
            "Snippets cover spend, mint, withdraw patterns",
            "Documentation for all snippets",
            "VSCode integration complete"
        ],
        evidence: [
            "Public repository with snippets",
            "VSCode extension demonstration",
            "X/Discord announcement",
            "Snippet usage documentation"
        ],
        delivery: "Month 1",
        cost: "10,000 ADA",
        progress: 90,
        icon: <FaCode />,
        color: "rgba(168, 85, 247, 0.15)"
    },
    {
        id: 5,
        title: "Documentation and Closeout Report",
        description: "Comprehensive documentation creation, contribution materials, and final project closeout with detailed reporting.",
        outputs: [
            "Full documentation website",
            "Contribution guidelines and materials",
            "Comprehensive closeout report",
            "Project demonstration video"
        ],
        acceptanceCriteria: [
            "Documentation website live",
            "Contributor materials committed",
            "Closeout report published",
            "Demonstration video completed"
        ],
        evidence: [
            "Public documentation links",
            "Published closeout report",
            "Demonstration video",
            "Community feedback compilation"
        ],
        delivery: "Month 1",
        cost: "10,000 ADA",
        progress: 100,
        icon: <FaCheckCircle />,
        color: "rgba(245, 101, 101, 0.15)"
    }
];

const keyDeliverables = [
    {
        title: "One-Click Blueprint Parsing",
        description: "Automated parsing of Aiken blueprints with dual TypeScript and Rust parsers generating typed code for Mesh and whisky frameworks",
        icon: <MdDeveloperMode />,
        color: "rgba(56, 232, 225, 0.15)"
    },
    {
        title: "VSCode Integration",
        description: "Seamless VSCode extension with commands to insert generated types, helpers, and starter files directly into projects",
        icon: <MdExtension />,
        color: "rgba(99, 102, 241, 0.15)"
    },
    {
        title: "Code Snippets Library",
        description: "Comprehensive snippets for Aiken validators, vodka tests, and Mesh/whisky transaction builders to accelerate development",
        icon: <FaCode />,
        color: "rgba(34, 197, 94, 0.15)"
    },
    {
        title: "Cross-Stack Compatibility",
        description: "Unified workflow supporting both TypeScript (Mesh) and Rust (whisky) development stacks from single blueprint source",
        icon: <MdIntegrationInstructions />,
        color: "rgba(245, 101, 101, 0.15)"
    }
];

const fullProposalContent = `# Proposal: SIDAN - Cardano Bar - Aiken Blueprint Parser for VSCode

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
- **Transparent outcomes:** Usage metrics, PRs/issues, and compatibility updates.`;

export default function CardanoBarProposal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={styles.container}>
            <div className={styles.backNavigation}>
                <Link href="/catalyst-proposals/new-proposals" className={styles.backButton}>
                    <FaArrowLeft />
                    <span>Back to New Proposals</span>
                </Link>
            </div>

            <PageHeader
                title={<>SIDAN - Cardano Bar - <span>Aiken Blueprint Parser for VSCode</span></>}
            />

            {/* Read Full Proposal Button */}
            <div className={styles.readFullProposalSection}>
                <button onClick={openModal} className={styles.readFullProposalButton}>
                    <FaFileAlt />
                    <span>Read Full Proposal</span>
                </button>
                <a 
                    href="https://projectcatalyst.io/funds/14/cardano-open-developers/sidan-cardano-bar-aiken-blueprint-parser-for-vscode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.catalystButton}
                >
                    <FaExternalLinkAlt />
                    <span>Proposal on Catalyst</span>
                </a>
            </div>

            {/* Proposal Overview */}
            <div className={styles.proposalOverview}>
                <div className={styles.overviewGrid}>
                    <div className={styles.overviewCard}>
                        <div className={styles.overviewIcon}>
                            <FaCoins />
                        </div>
                        <div className={styles.overviewContent}>
                            <h3>Budget Requested</h3>
                            <p>100,000 ADA</p>
                        </div>
                    </div>
                    <div className={styles.overviewCard}>
                        <div className={styles.overviewIcon}>
                            <FaClock />
                        </div>
                        <div className={styles.overviewContent}>
                            <h3>Duration</h3>
                            <p>5 months</p>
                        </div>
                    </div>
                    <div className={styles.overviewCard}>
                        <div className={styles.overviewIcon}>
                            <MdDeveloperMode />
                        </div>
                        <div className={styles.overviewContent}>
                            <h3>Theme</h3>
                            <p>Developer Tools</p>
                        </div>
                    </div>
                    <div className={styles.overviewCard}>
                        <div className={styles.overviewIcon}>
                            <MdCategory />
                        </div>
                        <div className={styles.overviewContent}>
                            <h3>Category</h3>
                            <p>Cardano Open: Developers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Problem Statement */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Problem Statement</h2>
                <div className={styles.problemCard}>
                    <p>
                        Cardano developers currently hand-parse Aiken blueprints, remap types across TypeScript and Rust, 
                        and rewrite boilerplate for tests and transaction builders. This manual process slows delivery 
                        and introduces errors that could be avoided with automated tooling.
                    </p>
                </div>
            </div>

            {/* Key Deliverables */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Key Deliverables</h2>
                <div className={styles.deliverablesGrid}>
                    {keyDeliverables.map((deliverable, index) => (
                        <div 
                            key={index} 
                            className={styles.deliverableCard}
                            style={{ '--theme-color': deliverable.color } as React.CSSProperties}
                        >
                            <div className={styles.deliverableIcon}>
                                {deliverable.icon}
                            </div>
                            <div className={styles.deliverableContent}>
                                <h3>{deliverable.title}</h3>
                                <p>{deliverable.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Milestones */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Project Milestones</h2>
                <div className={styles.milestonesContainer}>
                    {milestones.map((milestone) => (
                        <div 
                            key={milestone.id} 
                            className={styles.milestoneCard}
                            style={{ '--theme-color': milestone.color } as React.CSSProperties}
                        >
                            <div className={styles.milestoneHeader}>
                                <div className={styles.milestoneIcon}>
                                    {milestone.icon}
                                </div>
                                <div className={styles.milestoneMeta}>
                                    <h3 className={styles.milestoneTitle}>
                                        Milestone {milestone.id}: {milestone.title}
                                    </h3>
                                    <div className={styles.milestoneInfo}>
                                        <span className={styles.milestoneDelivery}>
                                            <FaCalendarAlt /> {milestone.delivery}
                                        </span>
                                        <span className={styles.milestoneCost}>
                                            <FaCoins /> {milestone.cost}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.milestoneProgress}>
                                    <div className={styles.progressCircle}>
                                        <svg viewBox="0 0 36 36" className={styles.progressSvg}>
                                            <path
                                                className={styles.progressBackground}
                                                d="M18 2.0845
                                                   a 15.9155 15.9155 0 0 1 0 31.831
                                                   a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <path
                                                className={styles.progressBar}
                                                strokeDasharray={`${milestone.progress}, 100`}
                                                d="M18 2.0845
                                                   a 15.9155 15.9155 0 0 1 0 31.831
                                                   a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                        </svg>
                                        <div className={styles.progressText}>{milestone.progress}%</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.milestoneContent}>
                                <p className={styles.milestoneDescription}>{milestone.description}</p>

                                <div className={styles.milestoneDetails}>
                                    <div className={styles.detailSection}>
                                        <h4>Outputs</h4>
                                        <ul>
                                            {milestone.outputs.map((output, index) => (
                                                <li key={index}>{output}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={styles.detailSection}>
                                        <h4>Acceptance Criteria</h4>
                                        <ul>
                                            {milestone.acceptanceCriteria.map((criteria, index) => (
                                                <li key={index}>{criteria}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={styles.detailSection}>
                                        <h4>Evidence</h4>
                                        <ul>
                                            {milestone.evidence.map((evidence, index) => (
                                                <li key={index}>{evidence}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Impact & Value */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Expected Impact</h2>
                <div className={styles.impactGrid}>
                    <div className={styles.impactCard}>
                        <h3>Faster Development</h3>
                        <p>Reduces setup time from days to minutes with automated blueprint parsing and code generation for both TypeScript and Rust.</p>
                    </div>
                    <div className={styles.impactCard}>
                        <h3>Cross-Stack Unification</h3>
                        <p>Single blueprint generates consistent code across TypeScript (Mesh) and Rust (whisky) development stacks.</p>
                    </div>
                    <div className={styles.impactCard}>
                        <h3>Quality & Accessibility</h3>
                        <p>Standard scaffolds and test starters improve code quality while VSCode integration lowers barriers for newcomers.</p>
                    </div>
                </div>
            </div>

            {/* Supporting Links */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Supporting Documentation</h2>
                <div className={styles.linksGrid}>
                    <a href="https://github.com/sidan-lab/cardano-bar" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaGithub />
                        <span>Cardano Bar GitHub</span>
                    </a>
                    <a href="https://marketplace.visualstudio.com/items?itemName=sidan-lab.cardano-bar-vscode" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <MdExtension />
                        <span>VSCode Marketplace</span>
                    </a>
                    <a href="https://github.com/MeshJS/mesh/blob/main/scripts/mesh-cli/package.json#L35" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaGithub />
                        <span>Mesh CLI Reference</span>
                    </a>
                    <a href="https://x.com/sidan_lab" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaExternalLinkAlt />
                        <span>SIDAN Lab Twitter</span>
                    </a>
                </div>
            </div>

            {/* Full Proposal Modal */}
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>Full Proposal Document</h2>
                            <button onClick={closeModal} className={styles.modalCloseButton}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.proposalContent}>
                                {fullProposalContent.split('\n').map((line, index) => {
                                    if (line.startsWith('# ')) {
                                        return <h1 key={index} className={styles.modalH1}>{line.substring(2)}</h1>;
                                    } else if (line.startsWith('## ')) {
                                        return <h2 key={index} className={styles.modalH2}>{line.substring(3)}</h2>;
                                    } else if (line.startsWith('### ')) {
                                        return <h3 key={index} className={styles.modalH3}>{line.substring(4)}</h3>;
                                    } else if (line.startsWith('**') && line.endsWith('**')) {
                                        return <p key={index} className={styles.modalBold}>{line.slice(2, -2)}</p>;
                                    } else if (line.startsWith('- ')) {
                                        return <li key={index} className={styles.modalListItem}>{line.substring(2)}</li>;
                                    } else if (line.startsWith('  - ') || line.startsWith('    - ')) {
                                        return <li key={index} className={styles.modalSubListItem}>{line.trim().substring(2)}</li>;
                                    } else if (line.trim() === '---') {
                                        return <hr key={index} className={styles.modalDivider} />;
                                    } else if (line.trim() === '') {
                                        return <div key={index} className={styles.modalSpacing}></div>;
                                    } else {
                                        return <p key={index} className={styles.modalParagraph}>{line}</p>;
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 