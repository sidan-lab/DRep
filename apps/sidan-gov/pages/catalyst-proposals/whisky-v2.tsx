import React, { useState } from 'react';
import Link from 'next/link';
import PageHeader from '../../components/PageHeader';
import styles from '../../styles/ProposalDetail.module.css';
import { FaArrowLeft, FaCalendarAlt, FaCoins, FaClock, FaGithub, FaExternalLinkAlt, FaCheckCircle, FaFileAlt, FaTimes, FaRocket } from 'react-icons/fa';
import { MdEvent, MdIntegrationInstructions, MdBuild, MdArchitecture, MdCategory } from 'react-icons/md';
import { SiRust } from 'react-icons/si';

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
        description: "Initial project setup with team organization, repository structure, and comprehensive planning for the Pallas migration.",
        outputs: [
            "Team setup with defined roles and responsibilities",
            "Public announcement and communication channels",
            "GitHub Projects roadmap with migration plan",
            "Contributor guidelines and project structure"
        ],
        acceptanceCriteria: [
            "Maintainers and advisors listed with roles",
            "Public repository with legal documents committed",
            "Community announcement published with links",
            "GitHub Projects board active with migration milestones"
        ],
        evidence: [
            "README with team roles and responsibilities",
            "Repository tree showing legal compliance",
            "Public announcement on social media channels",
            "GitHub Projects board with detailed migration plan"
        ],
        delivery: "Month 1",
        cost: "20,000 ADA",
        progress: 20,
        icon: <MdEvent />,
        color: "rgba(56, 232, 225, 0.15)"
    },
    {
        id: 2,
        title: "Phase 1 - Build Transactions on Pallas",
        description: "Refactor TxBuilder with interface abstraction and create Pallas-based serializer core with automated testing.",
        outputs: [
            "Refactored TxBuilder with serializer interface",
            "Pallas-based serializer core (WhiskyPallas)",
            "Real example transactions with automated tests",
            "Initial documentation and migration notes"
        ],
        acceptanceCriteria: [
            "TxBuilder no longer depends directly on CSL",
            "WhiskyPallas serializer fully functional",
            "Example transactions build successfully",
            "Automated test suite passes with Pallas core"
        ],
        evidence: [
            "Public repository with refactored codebase",
            "Working example transactions and tests",
            "Documentation showing Pallas integration",
            "CI/CD pipeline validating new architecture"
        ],
        delivery: "Month 2",
        cost: "30,000 ADA",
        progress: 50,
        icon: <MdBuild />,
        color: "rgba(99, 102, 241, 0.15)"
    },
    {
        id: 3,
        title: "Phase 2 - Parse Transactions + Remaining Tools",
        description: "Implement transaction parser interface and migrate remaining utilities to Pallas with comprehensive testing.",
        outputs: [
            "Transaction parser interface for whisky-pallas",
            "Migrated utilities (addresses, scripts, datums, formats)",
            "End-to-end round-trip tests",
            "Comprehensive stress testing suite"
        ],
        acceptanceCriteria: [
            "Parser interface fully implemented and tested",
            "All utilities successfully migrated to Pallas",
            "Build→read round-trip tests pass",
            "Stress tests validate reliability and performance"
        ],
        evidence: [
            "Complete parser implementation in repository",
            "Migrated utilities with test coverage",
            "Round-trip test results and documentation",
            "Performance benchmarks and stress test reports"
        ],
        delivery: "Month 1",
        cost: "30,000 ADA",
        progress: 80,
        icon: <MdArchitecture />,
        color: "rgba(34, 197, 94, 0.15)"
    },
    {
        id: 4,
        title: "Phase 3 - Finish Migration & Ship",
        description: "Complete SDK migration to dependency injection design, implement CSL compatibility layer, and provide migration guide.",
        outputs: [
            "Complete SDK migration to dependency injection",
            "Pallas as default with CSL compatibility layer",
            "Comprehensive migration guide for users",
            "Final testing and validation suite"
        ],
        acceptanceCriteria: [
            "SDK fully migrated to new architecture",
            "Pallas set as default serializer",
            "CSL compatibility layer functional",
            "Migration guide complete with examples"
        ],
        evidence: [
            "Released SDK with new architecture",
            "Migration guide and compatibility documentation",
            "User testing feedback and adoption metrics",
            "Community announcements and adoption examples"
        ],
        delivery: "Month 1",
        cost: "10,000 ADA",
        progress: 90,
        icon: <FaRocket />,
        color: "rgba(168, 85, 247, 0.15)"
    },
    {
        id: 5,
        title: "Documentation and Closeout Report",
        description: "Comprehensive documentation update, community materials, and project closeout with detailed reporting.",
        outputs: [
            "Updated API documentation on docs.rs",
            "Task-based guides on GitHub Pages",
            "Comprehensive closeout report",
            "Project demonstration video"
        ],
        acceptanceCriteria: [
            "API docs auto-built and published",
            "Guides site updated with migration content",
            "Closeout report published with metrics",
            "Demonstration video completed and shared"
        ],
        evidence: [
            "Live documentation on docs.rs and GitHub Pages",
            "Published closeout report with adoption metrics",
            "Public demonstration video",
            "Community feedback and adoption examples"
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
        title: "Pallas Integration",
        description: "Complete migration from CSL to TxPipe's Pallas for a Rust-native, community-maintained foundation with broader features",
        icon: <SiRust />,
        color: "rgba(56, 232, 225, 0.15)"
    },
    {
        title: "Dependency Injection Architecture",
        description: "Flexible serializer interface allowing multiple backends while maintaining API stability and backward compatibility",
        icon: <MdArchitecture />,
        color: "rgba(99, 102, 241, 0.15)"
    },
    {
        title: "Enhanced Protocol Support",
        description: "Faster access to new protocol features and governance updates with reduced lag between node releases and SDK support",
        icon: <FaRocket />,
        color: "rgba(34, 197, 94, 0.15)"
    },
    {
        title: "Ecosystem Interoperability",
        description: "Improved compatibility with TxPipe tooling ecosystem including Oura, Scrolls, and other Rust-native Cardano tools",
        icon: <MdIntegrationInstructions />,
        color: "rgba(245, 101, 101, 0.15)"
    }
];

const fullProposalContent = `# SIDAN - Whisky V2 - Cardano Rust SDK with Pallas

## Proposal Summary

- **Budget requested:** 100,000 ADA  
- **Duration:** 6 months  
- **Original language:** English (not auto-translated)  

### Problem Statement
Whisky's CSL core limits maintainability and slows new-feature support. Moving to TxPipe's pallas gives a Rust-native, community-maintained base with broader features and cleaner extensibility.

### Supporting Documentation
- https://github.com/sidan-lab/whisky  
- https://crates.io/crates/whisky  
- https://whisky.sidan.io/  
- https://dashboard.sidan.io/org-stats  
- https://x.com/sidan_lab  

### Dependencies
- **Pallas from Txpipe**

### Open Source
- **Yes** – Apache-2.0 license

---

## Theme
**Developer Tools**

---

## Solution

**Phase 1 — Build transactions on Pallas**
- Refactor TxBuilder to take in an interface as serializer core so Whisky no longer has to depend on CSL.  
- Create the Pallas-based serializer core (WhiskyPallas) and connect it to the transaction builder.  
- Prove it works by building real example transactions, with automated tests and short docs.  

**Phase 2 — Parse transactions + remaining tools**
- Implement the transaction parser interface for whisky-pallas  
- Move the remaining helpers (addresses, scripts, datums, formats) over to Pallas.  
- Check everything end-to-end with build→read "round-trip" tests and extra stress tests.  

**Phase 3 — Finish migration & ship**
- Switch the whole SDK to the new dependency injection design and make Pallas the default.  
- Keep a CSL compatibility layer for a while and provide a brief migration guide for users.  

---

## Impact

- **Faster access to new protocol features**: A pallas-based core lets Rust devs adopt new eras/governance updates sooner (e.g., Conway/CIP-1694), reducing lag between node releases and SDK support  
- **Stronger Rust ecosystem & interoperability**: Aligning with pallas' Rust-native primitives improves compatibility with TxPipe tooling (e.g., Oura, Scrolls), making it easier to build explorers, wallets, and data apps.  
- **Better developer experience**: Clear, versioned API docs (docs.rs) plus guides (GitHub Pages) and public CI lower onboarding friction and increase trust in releases.  
- **Resilience & community maintenance**: Reduces single-vendor dependency by leveraging an actively maintained, community-driven base, encouraging external contributions and shared standards.  

---

## Capabilities & Feasibility

**Capability & accountability:**
- **Catalyst delivery (Rust libs/SDKs)**: Successfully completed F11 "Rust library for easy off-chain transaction building," and the F12 "Advance Cardano SDK in Rust". Both listed on our public proposals page.  
- **Proven usefulness (downloads & adoption)**: cardano-serialization-lib ≈ 250k all-time downloads; our related crates—sidan-csl-rs ≈ 100k and whisky ≈ 50k—total 150k+ lifetime downloads. That's >50% of CSL's volume, indicating broad, sustained use of our SDKs.  
- **Maintainers who ship**: 13 tagged releases in 2025; latest v1.0.10 (Aug 7, 2025). Active PRs from SIDAN Lab's contributors.  
- **Ecosystem builders**: Team maintains related SDKs/tools (e.g., Gin for Python, Vodka for Aiken testing, Mesh for typescript transaction builder), showing cross-stack capability and reuse of Whisky cores. Our team includes an ex-CSL maintainer, bringing deep knowledge of CSL internals and compatibility edges—lowering migration risk and speeding up parity work.  
- **Recognized by ecosystem**: Cardano Foundation "Developer & Builder Delegations" (May 21, 2025) lists Sidan Lab among the seven DReps receiving 20M ADA delegations.  

**Feasibility & validation plan:**
- **Incremental migration**: Introduce a Serializer trait and implement a WhiskyPallas backend, keeping the current API stable—validated behind feature flags. (Parallels our existing builder/parser architecture already released.)  
- **Cross-implementation parity tests**: Golden-vector tests comparing CSL vs pallas outputs (CBOR, hashes, witnesses), plus round-trip build↔parse tests in CI.  
- **Ecosystem alignment**: Pallas is an actively maintained Rust-native base with regular releases, making the approach practical and sustainable.  
- **Release gating**: Ship as pre-releases on crates.io, with changelog, migration notes, and docs.rs builds; promoted to stable once CI, examples, and external PR reviews pass.  

---

## Budget & Costs

- **Engineering (Rust/Cardano):** 75,000 ADA (~75%)  
- **Project management & QA:** 8,000 ADA (~8%)  
- **Documentation & DevRel:** 12,000 ADA (~12%)  
- **Reporting & Closeout:** 5,000 ADA (~5%)  

---

## Value for Money

- **High public-good ROI**: Whisky V2 (Apache-2.0) is reusable by any team—wallets, DeFi, data tools. A pallas-based builder+parser saves each team ~2–4 weeks of integration vs. rolling their own. With only a handful of adopters, the ecosystem's saved effort already exceeds this grant.  
- **Faster protocol adoption**: Aligning Whisky with pallas (active, Rust-native) shortens the lag between node/era updates and Rust SDK support, unblocking downstream builders sooner (more mainnet features, earlier).  
- **Lower ecosystem risk**: Moving off a single-maintainer dependency to a community-maintained base reduces bus-factor and fragmentation; DI keeps options open if future serializers emerge.  
- **Measured outcomes, not promises**: We'll track releases aligned to node/era tags, docs completeness (guides + examples), downloads/reverse-deps, external PRs/issues closed, and adoption announcements—all publicly verifiable on GitHub, crates.io/docs.rs, and SIDAN channels.`;

export default function WhiskyV2Proposal() {
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
                title={<>SIDAN - Whisky V2 - <span>Cardano Rust SDK with Pallas</span></>}
            />

            {/* Read Full Proposal Button */}
            <div className={styles.readFullProposalSection}>
                <button onClick={openModal} className={styles.readFullProposalButton}>
                    <FaFileAlt />
                    <span>Read Full Proposal</span>
                </button>
                <a 
                    href="https://projectcatalyst.io/funds/14/cardano-open-developers/sidan-whisky-v2-cardano-rust-sdk-with-pallas"
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
                            <p>6 months</p>
                        </div>
                    </div>
                    <div className={styles.overviewCard}>
                        <div className={styles.overviewIcon}>
                            <SiRust />
                        </div>
                        <div className={styles.overviewContent}>
                            <h3>Language</h3>
                            <p>Rust SDK</p>
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
                        Whisky&apos;s current CSL core limits maintainability and slows new-feature support. 
                        Moving to TxPipe&apos;s Pallas provides a Rust-native, community-maintained foundation 
                        with broader features and cleaner extensibility for faster protocol adoption.
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
                        <h3>Faster Protocol Adoption</h3>
                        <p>Pallas-based core enables faster access to new protocol features and governance updates, reducing lag between node releases and SDK support.</p>
                    </div>
                    <div className={styles.impactCard}>
                        <h3>Enhanced Interoperability</h3>
                        <p>Alignment with Pallas improves compatibility with TxPipe tooling ecosystem, making it easier to build explorers, wallets, and data applications.</p>
                    </div>
                    <div className={styles.impactCard}>
                        <h3>Community Resilience</h3>
                        <p>Reduces single-vendor dependency by leveraging actively maintained, community-driven base, encouraging external contributions and shared standards.</p>
                    </div>
                </div>
            </div>

            {/* Supporting Links */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Supporting Documentation</h2>
                <div className={styles.linksGrid}>
                    <a href="https://github.com/sidan-lab/whisky" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaGithub />
                        <span>Whisky GitHub Repository</span>
                    </a>
                    <a href="https://crates.io/crates/whisky" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <SiRust />
                        <span>Whisky on Crates.io</span>
                    </a>
                    <a href="https://whisky.sidan.io/" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaExternalLinkAlt />
                        <span>Whisky Documentation</span>
                    </a>
                    <a href="https://dashboard.sidan.io/org-stats" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaExternalLinkAlt />
                        <span>SIDAN Dashboard</span>
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