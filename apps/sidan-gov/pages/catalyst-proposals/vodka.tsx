import React, { useState } from 'react';
import Link from 'next/link';
import PageHeader from '../../components/PageHeader';
import styles from '../../styles/ProposalDetail.module.css';
import { FaArrowLeft, FaCalendarAlt, FaCoins, FaClock, FaGithub, FaExternalLinkAlt, FaCheckCircle, FaFileAlt, FaTimes, FaFlask } from 'react-icons/fa';
import { MdEvent, MdDeveloperMode, MdSecurity, MdBuild, MdCategory } from 'react-icons/md';

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
        description: "Initial project setup with team organization, communications channels, and comprehensive project planning with GitHub roadmap.",
        outputs: [
            "Team setup with defined roles and responsibilities",
            "Public announcement and community channels",
            "GitHub Projects roadmap with milestones",
            "Contributor guidelines and project structure"
        ],
        acceptanceCriteria: [
            "Maintainers/advisors listed with roles in documentation",
            "Public repository with LICENSE and CODE_OF_CONDUCT",
            "Community announcement published with links",
            "GitHub Projects board active with actionable issues"
        ],
        evidence: [
            "README/MAINTAINERS.md with team roles",
            "Repository tree showing legal documents",
            "Public announcement on social media",
            "GitHub Projects board with milestones"
        ],
        delivery: "Month 1",
        cost: "20,000 ADA",
        progress: 20,
        icon: <MdEvent />,
        color: "rgba(56, 232, 225, 0.15)"
    },
    {
        id: 2,
        title: "Cocktail - Onchain Utilities Functions Revisit",
        description: "Comprehensive revision of naming conventions, API updates with deprecation handling, and addition of essential utility functions.",
        outputs: [
            "Updated naming convention with deprecation handling",
            "Enhanced onchain utility functions",
            "Comprehensive migration documentation",
            "Refactored examples with new APIs"
        ],
        acceptanceCriteria: [
            "Naming convention documented and APIs renamed",
            "Deprecation attributes and migration notes added",
            "New utilities implemented with documentation",
            "CI build/test/lint passes after refactor"
        ],
        evidence: [
            "Public GitHub repository with updates",
            "Twitter/X announcement post",
            "Discord release announcement",
            "Updated documentation on GitHub Pages"
        ],
        delivery: "Month 1",
        cost: "20,000 ADA",
        progress: 40,
        icon: <FaFlask />,
        color: "rgba(99, 102, 241, 0.15)"
    },
    {
        id: 3,
        title: "Mocktail - Feature Complete Development",
        description: "Development of complete Mocktail endpoints for all script purposes including spend, mint, withdraw, publish, vote, and propose.",
        outputs: [
            "Complete Mocktail endpoints for all script purposes",
            "Comprehensive documentation with examples",
            "Mock transaction builder functionality",
            "Published documentation on GitHub Pages"
        ],
        acceptanceCriteria: [
            "Mocktail includes endpoints for spend, mint, withdraw, publish, vote, propose",
            "Each endpoint documented with arguments and usage examples",
            "README links to Mocktail documentation",
            "All examples compile and run successfully"
        ],
        evidence: [
            "Public GitHub repository with Mocktail code",
            "Twitter/X announcement of completion",
            "Discord release announcement",
            "Live documentation on GitHub Pages"
        ],
        delivery: "Month 1",
        cost: "20,000 ADA",
        progress: 60,
        icon: <MdBuild />,
        color: "rgba(34, 197, 94, 0.15)"
    },
    {
        id: 4,
        title: "Auditing and Performance Optimization",
        description: "Comprehensive security and efficiency auditing of onchain utilities with performance optimizations and quality assurance.",
        outputs: [
            "Security audit of onchain utility functions",
            "Performance optimization recommendations",
            "Audit documentation and findings",
            "Efficiency improvements implementation"
        ],
        acceptanceCriteria: [
            "Security audit note merged with findings",
            "Efficiency audit completed with observations",
            "Documentation clarifications added where needed",
            "Performance optimizations implemented safely"
        ],
        evidence: [
            "AUDIT.md or audit documentation published",
            "GitHub repository with audit commits",
            "Twitter/X post on audit completion",
            "Discord announcement with audit results"
        ],
        delivery: "Month 1",
        cost: "20,000 ADA",
        progress: 80,
        icon: <MdSecurity />,
        color: "rgba(168, 85, 247, 0.15)"
    },
    {
        id: 5,
        title: "Documentation and Closeout Report",
        description: "Comprehensive documentation publication, contribution materials creation, and project closeout with detailed reporting.",
        outputs: [
            "Complete Vodka documentation on GitHub Pages",
            "Contribution guidelines and community materials",
            "Comprehensive closeout report",
            "Project demonstration and summary video"
        ],
        acceptanceCriteria: [
            "Documentation site live with Cocktail and Mocktail guides",
            "CONTRIBUTING.md and issue/PR templates committed",
            "Closeout report and video publicly accessible",
            "All documentation linked from README"
        ],
        evidence: [
            "Live documentation site with public access",
            "Published closeout report",
            "Public demonstration video",
            "Community announcements with links"
        ],
        delivery: "Month 1",
        cost: "20,000 ADA",
        progress: 100,
        icon: <FaCheckCircle />,
        color: "rgba(245, 101, 101, 0.15)"
    }
];

const keyDeliverables = [
    {
        title: "Cocktail API Coherence",
        description: "Comprehensive revision of naming conventions, API updates with deprecation handling, and essential onchain utility functions",
        icon: <FaFlask />,
        color: "rgba(56, 232, 225, 0.15)"
    },
    {
        title: "Mocktail Mock Transaction Builder",
        description: "Feature-complete mock transaction builder with endpoints for all script purposes: spend, mint, withdraw, publish, vote, propose",
        icon: <MdBuild />,
        color: "rgba(99, 102, 241, 0.15)"
    },
    {
        title: "Security & Performance Audit",
        description: "Comprehensive security review and performance optimization of onchain utilities with detailed audit documentation",
        icon: <MdSecurity />,
        color: "rgba(34, 197, 94, 0.15)"
    },
    {
        title: "Developer Experience Enhancement",
        description: "Improved documentation, examples, and developer tools to accelerate Aiken development and reduce integration time",
        icon: <MdDeveloperMode />,
        color: "rgba(245, 101, 101, 0.15)"
    }
];

const fullProposalContent = `# SIDAN - Vodka - Complete Aiken Dev Utils & Testing Framework

## Proposal Summary

- **Budget requested:** 100,000 ADA  
- **Duration:** 5 months  
- **Original language:** English (not auto-translated)  

### Problem Statement
Aiken devs lack consistent, well-tested on-chain utilities and a complete mock transaction builder. Fragmented APIs slow audits, hinder unit tests, and risk inefficiency on mainnet.

### Supporting Documentation
- https://github.com/sidan-lab/vodka
- https://sidan-lab.github.io/vodka/cocktail.html
- https://sidan-lab.github.io/vodka/mocktail.html
- https://x.com/sidan_lab

### Dependencies
- **No dependencies**

### Open Source
- **Yes** – Apache-2.0 license

---

## Theme
**Developer Tools**

---

## Solution

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

## Impact

- Faster, safer Aiken development: Consistent on-chain utilities and a complete mock tx builder cut build/test cycles and catch bugs before mainnet.  
- Shared standards & reuse: Clear naming and well-documented helpers reduce "reinventing the wheel," boosting interop across dApps.  
- Stronger security & audits: Audit notes improve review quality and reduce edge-case failures.  
- Lower user costs: Optimized encodings and smaller scripts reduce execution budgets (CPU/mem), making transactions cheaper.  
- Onboarding & education: Readable docs, examples, and templates help new teams ship faster and contribute back (Apache-2.0).  

---

## Capabilities & Feasibility

**Capability & accountability:**
- **Track record & transparency:** Active OSS repo (vodka) with public API docs (Cocktail/Mocktail) and updates on X.  
- **Proven usefulness (downloads & adoption):**  
  - The "Vesting" example instructs adding sidan-lab/vodka as a dependency and uses key_signed/valid_after.  
  - Listed in community's curated catalog under Testing utilities.  
- **Maintainers who ship:** 8 tagged releases in 2025, latest v0.1.16 (Aug 17, 2025). Active PRs from SIDAN Lab's contributors.  
- **Ecosystem builders:** Team maintains related SDKs/tools (e.g., Gin for Python, Whisky for Rust, Mesh for typescript transaction builder), showing cross-stack capability.  
- **Recognized by ecosystem:** Cardano Foundation "Developer & Builder Delegations" (May 21, 2025) lists Sidan Lab among the seven DReps receiving 20M ADA delegations.  

**Feasibility & validation plan:**
- **Parity & correctness:** Tests against the Aiken standard library types for all script purposes (spend/mint/withdraw/publish/vote/propose).  
- **Benchmarks & efficiency:** Measure script size and execution budgets before/after; optimize encodings/strictness.  
- **Real-world use tests:** Example projects such as MeshJS (@meshsdk/contract), Andamio AikenPBL, Cardano Builder Asia course etc using Vodka.  
- **Backward compatibility:** Old APIs kept with warnings; automated deprecation checks in CI; rollback plan via SemVer tags.  
- **Success signals:** External PRs/issues, projects adopting Vodka modules, passing test suite, and improved budget metrics across releases.  

---

## Budget & Costs

- **Engineering (Aiken/Cardano):** 75,000 ADA (~75%)  
- **Project management & QA:** 8,000 ADA (~8%)  
- **Documentation & DevRel:** 12,000 ADA (~12%)  
- **Reporting & Closeout:** 5,000 ADA (~5%)  

---

## Value for Money

- **High public-good ROI:** Vodka (Apache-2.0) is reusable by any Aiken team—wallets, dApps, auditors. A consistent utilities set plus a complete mock tx builder typically saves each team ~2–4 weeks versus building from scratch; a few adopters already exceed the grant in saved effort.  
- **Faster developer adoption:** Clear naming, documented helpers, and mock transactions reduce integration time and help teams catch issues off-chain before mainnet, improving reliability and time-to-market.  
- **Lower ecosystem risk:** Shared, maintained utilities prevent one-off implementations and fragmentation. Deprecation guidance stabilizes APIs across versions and reduces breakage.  
- **Quality you can audit:** Budget funds CI, runnable examples, public docs on GitHub Pages, and focused QA notes on on-chain utilities and efficiency. Everything is open and verifiable.  
- **Measured outcomes, not promises:** Public releases, docs live, endpoint coverage achieved, adoption signals (repos referencing Vodka), external PRs and issues closed, and a transparent close-out report and video.`;

export default function VodkaProposal() {
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
                title={<>SIDAN - Vodka - <span>Complete Aiken Dev Utils & Testing Framework</span></>}
            />

            {/* Read Full Proposal Button */}
            <div className={styles.readFullProposalSection}>
                <button onClick={openModal} className={styles.readFullProposalButton}>
                    <FaFileAlt />
                    <span>Read Full Proposal</span>
                </button>
                <a 
                    href="https://projectcatalyst.io/funds/14/cardano-open-developers/sidan-vodka-complete-aiken-dev-utils-and-testing-framework"
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
                        Aiken developers lack consistent, well-tested on-chain utilities and a complete mock transaction builder. 
                        Fragmented APIs slow audits, hinder unit tests, and risk inefficiency on mainnet, creating barriers 
                        for developers and increasing development time.
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
                        <h3>Faster & Safer Development</h3>
                        <p>Consistent on-chain utilities and complete mock transaction builder reduce build/test cycles and catch bugs before mainnet deployment.</p>
                    </div>
                    <div className={styles.impactCard}>
                        <h3>Shared Standards & Reuse</h3>
                        <p>Clear naming conventions and well-documented helpers reduce reinventing the wheel, boosting interoperability across dApps.</p>
                    </div>
                    <div className={styles.impactCard}>
                        <h3>Enhanced Security & Efficiency</h3>
                        <p>Audit notes improve review quality, optimized encodings reduce execution budgets, making transactions cheaper for users.</p>
                    </div>
                </div>
            </div>

            {/* Supporting Links */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Supporting Documentation</h2>
                <div className={styles.linksGrid}>
                    <a href="https://github.com/sidan-lab/vodka" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaGithub />
                        <span>Vodka GitHub Repository</span>
                    </a>
                    <a href="https://sidan-lab.github.io/vodka/cocktail.html" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaFlask />
                        <span>Cocktail Documentation</span>
                    </a>
                    <a href="https://sidan-lab.github.io/vodka/mocktail.html" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <MdBuild />
                        <span>Mocktail Documentation</span>
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