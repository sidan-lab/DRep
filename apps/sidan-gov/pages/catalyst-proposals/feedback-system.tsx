import React, { useState } from 'react';
import Link from 'next/link';
import PageHeader from '../../components/PageHeader';
import styles from '../../styles/ProposalDetail.module.css';
import { FaArrowLeft, FaUsers, FaCalendarAlt, FaCoins, FaClock, FaGithub, FaExternalLinkAlt, FaCheckCircle, FaFileAlt, FaTimes } from 'react-icons/fa';
import { MdGavel, MdEvent, MdIntegrationInstructions, MdWeb, MdCategory } from 'react-icons/md';

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
        description: "Initial project setup with team organization, repository creation, community announcements, and detailed roadmap planning.",
        outputs: [
            "Team setup and role assignments",
            "Live repository with initial structure",
            "Public announcement and community engagement",
            "Detailed project roadmap"
        ],
        acceptanceCriteria: [
            "LICENSE committed to repository",
            "Community channel invite available",
            "Active roadmap published",
            "Team structure documented"
        ],
        evidence: [
            "Repository tree structure",
            "Announcement posts on social media",
            "GitHub Projects board setup",
            "Community channel documentation"
        ],
        delivery: "Month 1",
        cost: "20,000 ADA",
        progress: 20,
        icon: <MdEvent />,
        color: "rgba(56, 232, 225, 0.15)"
    },
    {
        id: 2,
        title: "DRep Management Web Platform",
        description: "Development of the core web platform for DRep decision-making with feature requirements, UI/UX design, and mock data visualization.",
        outputs: [
            "Feature requirements documentation",
            "UI/UX design system",
            "Functional voting platform",
            "Mock data visualization system"
        ],
        acceptanceCriteria: [
            "Workable web platform deployed",
            "Mock community sentiment displayed",
            "User interface fully functional",
            "Basic voting mechanics implemented"
        ],
        evidence: [
            "Live repository link",
            "Platform demo video",
            "Announcement on X/Discord",
            "User testing feedback"
        ],
        delivery: "Month 1",
        cost: "20,000 ADA",
        progress: 40,
        icon: <MdWeb />,
        color: "rgba(99, 102, 241, 0.15)"
    },
    {
        id: 3,
        title: "Web Platform Data Integration",
        description: "Integration of Discord bot voting system with delegator statistics collection, web platform integration, and automatic publishing to Discord.",
        outputs: [
            "Discord bot voting system",
            "Delegator statistics collection",
            "Real-time web integration",
            "Auto-publish functionality to Discord"
        ],
        acceptanceCriteria: [
            "Working integration with real delegator votes",
            "Votes mirrored on web platform",
            "Rationale publishing system functional",
            "Real-time data synchronization"
        ],
        evidence: [
            "Live integration demo",
            "Repository documentation",
            "Discord bot functionality proof",
            "Web platform integration screenshots"
        ],
        delivery: "Month 1",
        cost: "20,000 ADA",
        progress: 60,
        icon: <MdIntegrationInstructions />,
        color: "rgba(34, 197, 94, 0.15)"
    },
    {
        id: 4,
        title: "Relevant Voting Information Integration",
        description: "Enhanced display of voting-relevant information based on DRep feedback, with updated visualizations and additional requested features.",
        outputs: [
            "DRep feedback collection and analysis",
            "Enhanced voting information display",
            "Updated data visualizations",
            "Additional feature integrations"
        ],
        acceptanceCriteria: [
            "Curated information list created",
            "Updated UI with enhanced features",
            "Additional requested features integrated",
            "DRep feedback incorporated"
        ],
        evidence: [
            "Feature update documentation",
            "UI/UX improvement screenshots",
            "DRep feedback compilation",
            "Updated platform announcement"
        ],
        delivery: "Month 1",
        cost: "20,000 ADA",
        progress: 80,
        icon: <MdGavel />,
        color: "rgba(168, 85, 247, 0.15)"
    },
    {
        id: 5,
        title: "Documentation and Closeout Report",
        description: "Comprehensive documentation creation, contribution guidelines, and final project closeout with detailed reporting and video documentation.",
        outputs: [
            "Complete project documentation",
            "Contribution guidelines for developers",
            "Comprehensive closeout report",
            "Project summary video"
        ],
        acceptanceCriteria: [
            "Documentation website live",
            "Contributor guidelines committed",
            "Closeout report published",
            "Summary video completed"
        ],
        evidence: [
            "Documentation repository link",
            "Public closeout report",
            "Published summary video",
            "Community feedback compilation"
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
        title: "Discord-Native Integration",
        description: "Seamless Discord bot integration for delegator feedback collection with verified delegator participation and real-time synchronization",
        icon: <FaUsers />,
        color: "rgba(56, 232, 225, 0.15)"
    },
    {
        title: "Web Management Platform",
        description: "Comprehensive web platform for DReps to manage proposals, view community sentiment, and publish rationale with transparency",
        icon: <MdWeb />,
        color: "rgba(99, 102, 241, 0.15)"
    },
    {
        title: "Dual Legitimacy System",
        description: "Advanced tallying system supporting both headcount and stake-weight calculations with published rationale and on-chain anchoring",
        icon: <MdGavel />,
        color: "rgba(34, 197, 94, 0.15)"
    },
    {
        title: "Open Source Infrastructure",
        description: "Apache-2.0 licensed platform with open APIs, self-hosting capabilities, and reusable components for the broader ecosystem",
        icon: <FaGithub />,
        color: "rgba(245, 101, 101, 0.15)"
    }
];

const fullProposalContent = `# Proposal: SIDAN - Delegator Feedback System for DRep Voting

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
- **Discord-native input** linked to a DRep's on-chain vote; verified delegators, no new app needed.  
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
- **Integrable:** open repos as references for community governance tooling.`;

export default function FeedbackSystemProposal() {
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
                title={<>SIDAN - <span>Delegator Feedback System for DRep Voting</span></>}
            />

            {/* Read Full Proposal Button */}
            <div className={styles.readFullProposalSection}>
                <button onClick={openModal} className={styles.readFullProposalButton}>
                    <FaFileAlt />
                    <span>Read Full Proposal</span>
                </button>
                <a 
                    href="https://projectcatalyst.io/funds/14/cardano-use-cases-concepts/sidan-delegator-feedback-system-for-drep-voting"
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
                            <MdGavel />
                        </div>
                        <div className={styles.overviewContent}>
                            <h3>Theme</h3>
                            <p>Governance</p>
                        </div>
                    </div>
                    <div className={styles.overviewCard}>
                        <div className={styles.overviewIcon}>
                            <MdCategory />
                        </div>
                        <div className={styles.overviewContent}>
                            <h3>Category</h3>
                            <p>Cardano Use Cases: Concepts</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Problem Statement */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Problem Statement</h2>
                <div className={styles.problemCard}>
                    <p>
                        DRep–delegator communication is a core problem in Cardano governance. 
                        Delegators lack effective channels to provide feedback to their chosen DReps, 
                        creating a disconnect between community sentiment and governance decisions.
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
                        <h3>Higher Participation</h3>
                        <p>Lowers friction for delegator engagement, supports multilingual communities and community-run Discord servers.</p>
                    </div>
                    <div className={styles.impactCard}>
                        <h3>Transparency & Accountability</h3>
                        <p>Published rationales with on-chain hashes, exportable headcount and stake-weighted tallies for complete transparency.</p>
                    </div>
                    <div className={styles.impactCard}>
                        <h3>Reusable Infrastructure</h3>
                        <p>Apache-2.0 license with open APIs and self-hosting capabilities make it easy for wallets, SPOs, and communities to adopt.</p>
                    </div>
                </div>
            </div>

            {/* Supporting Links */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Supporting Documentation</h2>
                <div className={styles.linksGrid}>
                    <a href="https://github.com/sidan-lab/sidan-gov-api" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaGithub />
                        <span>SIDAN Gov API</span>
                    </a>
                    <a href="https://github.com/sidan-lab/sidan-gov-discord-bot" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaGithub />
                        <span>Discord Bot</span>
                    </a>
                    <a href="https://github.com/sidan-lab/sidan-gov-frontend-delegate" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaGithub />
                        <span>Frontend Delegate</span>
                    </a>
                    <a href="https://x.com/sidan_lab" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaExternalLinkAlt />
                        <span>SIDAN Lab Twitter</span>
                    </a>
                    <a href="https://dashboard.sidan.io/" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaExternalLinkAlt />
                        <span>SIDAN Dashboard</span>
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