import React, { useState } from 'react';
import Link from 'next/link';
import PageHeader from '../../components/PageHeader';
import styles from '../../styles/ProposalDetail.module.css';
import { FaArrowLeft, FaUsers, FaCalendarAlt, FaCoins, FaClock, FaMapMarkerAlt, FaGithub, FaExternalLinkAlt, FaCheckCircle, FaFileAlt, FaTimes } from 'react-icons/fa';
import { MdBusiness, MdGavel, MdEvent, MdCategory } from 'react-icons/md';

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
        title: "Cardano Hong Kong Member Annual Meetup",
        description: "Annual meetup with roadmap update, builder-user networking, and community strengthening activities.",
        outputs: [
            "Annual meetup with roadmap update",
            "Builder-user networking session",
            "Q&A with SIDAN Lab team"
        ],
        acceptanceCriteria: [
            "One offline meetup with SIDAN Lab sharing + Q&A",
            "Minimum 35 guests attendance",
            "2–3 Cardano community speakers"
        ],
        evidence: [
            "Registration records",
            "Participant list",
            "Posts on Twitter/LinkedIn",
            "Event photos and documentation"
        ],
        delivery: "Month 2",
        cost: "17,000 ADA",
        progress: 30,
        icon: <MdEvent />,
        color: "rgba(56, 232, 225, 0.15)"
    },
    {
        id: 2,
        title: "Startups & Enterprises Meet Cardano Networking",
        description: "Networking event connecting Cardano founders with local startups and enterprises to foster collaboration.",
        outputs: [
            "Networking event with founders and startups",
            "Cardano use case presentations",
            "Business collaboration opportunities"
        ],
        acceptanceCriteria: [
            "One offline networking event",
            "3–4 Cardano founders + 3–4 local founders",
            "Minimum 35 guests attendance"
        ],
        evidence: [
            "Registration records",
            "Participant list",
            "Social media posts",
            "Event photos and networking outcomes"
        ],
        delivery: "Month 2",
        cost: "17,000 ADA",
        progress: 60,
        icon: <MdBusiness />,
        color: "rgba(99, 102, 241, 0.15)"
    },
    {
        id: 3,
        title: "Governance for Everyone Workshop",
        description: "Comprehensive governance onboarding workshop covering wallet setup, delegation, DRep voting, and hands-on exercises.",
        outputs: [
            "Governance onboarding workshop",
            "Wallet setup guidance",
            "Delegation and DRep voting tutorials",
            "Live trial voting exercises"
        ],
        acceptanceCriteria: [
            "1–2 offline workshop events",
            "Showcase Cardano governance actions",
            "Guided hands-on exercises + live Q&A",
            "Minimum 30 guests attendance"
        ],
        evidence: [
            "Registration records",
            "Participant list",
            "Workshop materials and guides",
            "Event photos and feedback"
        ],
        delivery: "Month 2",
        cost: "16,000 ADA",
        progress: 90,
        icon: <MdGavel />,
        color: "rgba(34, 197, 94, 0.15)"
    },
    {
        id: 4,
        title: "Completion of Milestones",
        description: "Final project closeout with comprehensive reporting, video documentation, and community interviews.",
        outputs: [
            "Closeout video documentation",
            "Comprehensive final report",
            "Participant interviews",
            "Impact assessment"
        ],
        acceptanceCriteria: [
            "Final report per Catalyst guidelines",
            "Published closeout video",
            "2–3 community interviews conducted"
        ],
        evidence: [
            "Links to final report",
            "Published video content",
            "Interview recordings",
            "Social media posts and documentation"
        ],
        delivery: "Month 1",
        cost: "10,000 ADA",
        progress: 100,
        icon: <FaCheckCircle />,
        color: "rgba(168, 85, 247, 0.15)"
    }
];

const keyDeliverables = [
    {
        title: "Community Hub Establishment",
        description: "Create a sustainable Cardano community hub in Hong Kong connecting developers, enterprises, and enthusiasts",
        icon: <FaUsers />,
        color: "rgba(56, 232, 225, 0.15)"
    },
    {
        title: "Enterprise Networking",
        description: "Bridge local startups and enterprises with Cardano ecosystem opportunities and use cases",
        icon: <MdBusiness />,
        color: "rgba(99, 102, 241, 0.15)"
    },
    {
        title: "Governance Education",
        description: "Empower community members with governance knowledge and practical voting experience",
        icon: <MdGavel />,
        color: "rgba(34, 197, 94, 0.15)"
    },
    {
        title: "Regional Growth",
        description: "Position Hong Kong as a strategic Cardano hub for Asian market expansion",
        icon: <FaMapMarkerAlt />,
        color: "rgba(245, 101, 101, 0.15)"
    }
];

const fullProposalContent = `# Proposal Title
**SIDAN | Waffle - Hong Kong Cardano Community**

---

## Proposal Summary

**Budget Requested:** 60,000 ADA  
**Project Duration:** 7 months  
**Auto-Translated:** No  
**Original Language:** English  

### Problem Statement
Cardano is known in Hong Kong, but knowledge and adoption are fragmented. Newcomers lack clear, practical guidance on wallets, apps, and participation, limiting real-world use and community growth.

### Supporting Documentation
- https://x.com/sidan_lab  
- https://www.sidan.io  
- https://github.com/sidan-lab  
- https://x.com/Waffle_Capital  
- https://www.wafflecapital.xyz/  

### Project Dependencies
No dependencies  

### Open Source
**Outputs open source?** No  
**License:** Not Applicable  

### Theme
**Community**

---

## Campaign Category

### Target Audience & Relevance
Targeting Hong Kong's blockchain enthusiasts, ADA holders, developers, students, startups, and enterprises.  
We will reach them through SIDAN Lab's community channels (Discord, Telegram, Twitter), direct outreach to universities and startups, and partnerships with blockchain projects.  

**Why this matters:** Hong Kong is a leading financial hub in Asia. Building a strong local Cardano community bridges fragmented adoption, grows participation in governance, and opens enterprise pathways.

### Key Activities
- **Cardano HK Annual Meetup** — Share roadmap, updates, and Summit news.  
- **Startups & Enterprises Meet Cardano** — Showcase use cases, introduce business models, funding opportunities.  
- **Governance for Everyone Workshop** — Hands-on delegation, DRep voting, ecosystem onboarding.

### Success Metrics
- Formation of new meetups inspired by events.  
- Successful organization of offline events.  
- Strong attendance and retention across events and online engagement.  
- Positive participant feedback/testimonials.  
- Growth in SIDAN Lab's channels (Discord, Telegram, Twitter).  

---

## Solution

Building on **Fund 11** (mass retailers awareness) and **Fund 12** (institutional education by Waffle Capital), we now focus on **community, enterprise, and governance bridging**.  

### Planned Activities
- **Cardano HK Annual Meetup:** Share updates, highlight Cardano Summit, strengthen builder-user networks.  
- **Startups & Enterprises Meet Cardano:** Invite founders/projects, showcase products, inspire collaboration and adoption.  
- **Governance for Everyone:** Workshops on delegation, DRep voting, proposal review, with practical exercises.  

**Goal:** Build a cycle of learning, collaboration, and governance participation, positioning Hong Kong as a global Cardano hub.

---

## Impact

### Positive Effects
- **Consistent Onboarding:** Workshops/events expand local talent pool and empower contributions.  
- **Collaboration Hub:** Connects developers, startups, enterprises, and enthusiasts. Sparks projects and adoption.  
- **Expanded Visibility:** Elevates Cardano's presence in Hong Kong and Asia, supporting governance participation and enterprise adoption.  

---

## Capabilities & Feasibility

### Capability & Track Record
- Built blockchain dev tools (Vodka, Whisky, Mesh).  
- Collaborated with Gimbalabs & Waffle Capital.  
- Organized Cardano Summit 2024, Builder Fest, workshops, and community events.  
- Proven delivery of educational & technical events.  
- Open-source contributions:  
  - Whisky (Rust SDK) → https://github.com/sidan-lab/whisky  
  - Vodka (Gleam/Aiken utils) → https://github.com/sidan-lab/vodka  
  - Rum (Go SDK) → https://github.com/sidan-lab/rum  
  - Gin (Python SDK) → https://github.com/sidan-lab/gin  
  - Cardano Bar (Devkit + VSCode) → https://github.com/sidan-lab/cardano-bar  
  - Plutus cborHex Automation → https://github.com/sidan-lab/plutus-cborhex-automation  

### Trust & Accountability
- Multiple successful workshops and meetups.  
- Transparent management and reporting.  
- Recognized community organizers in Cardano.  

### Validation & Feasibility
- Phased project rollout with workshops, meetups, and governance training.  
- Events validated through community feedback.  
- Team has proven execution capacity.  
- Outputs: open reports, videos, recordings, and resources.  

---

## Milestones

### 1. Cardano Hong Kong Member Annual Meetup
- **Outputs:** Annual meetup with roadmap update, builder-user networking.  
- **Acceptance Criteria:**  
  - One offline meetup with SIDAN Lab sharing + Q&A.  
  - Guests: min. 35.  
  - Cardano community speakers: 2–3.  
- **Evidence:** Registration, participant list, posts on Twitter/LinkedIn, event photos.  
- **Delivery:** Month 2  
- **Cost:** 17,000 ADA  
- **Progress:** 30%  

---

### 2. Startups & Enterprises Meet Cardano Networking
- **Outputs:** Networking event with founders and startups.  
- **Acceptance Criteria:**  
  - One offline event.  
  - 3–4 Cardano founders + 3–4 local founders.  
  - Guests: min. 35.  
- **Evidence:** Registration, participant list, posts, event photos.  
- **Delivery:** Month 2  
- **Cost:** 17,000 ADA  
- **Progress:** 60%  

---

### 3. Governance for Everyone Workshop
- **Outputs:** Governance onboarding workshop. Wallet setup, delegation, DRep voting, trial voting.  
- **Acceptance Criteria:**  
  - 1–2 offline events.  
  - Showcase Cardano governance actions.  
  - Guided hands-on exercises + live Q&A.  
  - Guests: min. 30.  
- **Evidence:** Registration, participant list, posts, event photos.  
- **Delivery:** Month 2  
- **Cost:** 16,000 ADA  
- **Progress:** 90%  

---

### 4. Completion of Milestones
- **Outputs:** Closeout video + report, participant interviews.  
- **Acceptance Criteria:**  
  - Final report per Catalyst guidelines.  
  - Published closeout video.  
  - 2–3 community interviews.  
- **Evidence:** Links to report, video, and posts.  
- **Delivery:** Month 1  
- **Cost:** 10,000 ADA  
- **Progress:** 100%  

---

## Final Pitch

### Budget & Costs
- **Milestone 1:** 17,000 ADA — Annual Meetup  
- **Milestone 2:** 17,000 ADA — Startups & Enterprises Networking  
- **Milestone 3:** 16,000 ADA — Governance Workshop  
- **Milestone 4:** 10,000 ADA — Closeout report/video  

**Total:** 60,000 ADA  

### Value for Money
- **Community Growth:** Builds a strong, engaged Cardano hub in Hong Kong.  
- **Sustainability & Scalability:** Activities create long-term community value.  
- **Strategic Location:** Hong Kong as global finance/tech hub boosts Cardano in Asia.  
- **Direct Outcomes:** Budget prioritizes events & reports over admin.  
- **Governance Readiness:** Onboarding improves voter participation and community decision-making.`;

export default function HKCommunityProposal() {
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
                title={<>SIDAN | Waffle - <span>Hong Kong Cardano Community</span></>}
            />

            {/* Read Full Proposal Button */}
            <div className={styles.readFullProposalSection}>
                <button onClick={openModal} className={styles.readFullProposalButton}>
                    <FaFileAlt />
                    <span>Read Full Proposal</span>
                </button>
                <a 
                    href="https://projectcatalyst.io/funds/14/cardano-open-ecosystem/sidan-or-waffle-hong-kong-cardano-community"
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
                            <p>60,000 ADA</p>
                        </div>
                    </div>
                    <div className={styles.overviewCard}>
                        <div className={styles.overviewIcon}>
                            <FaClock />
                        </div>
                        <div className={styles.overviewContent}>
                            <h3>Duration</h3>
                            <p>7 months</p>
                        </div>
                    </div>
                    <div className={styles.overviewCard}>
                        <div className={styles.overviewIcon}>
                            <FaUsers />
                        </div>
                        <div className={styles.overviewContent}>
                            <h3>Theme</h3>
                            <p>Community</p>
                        </div>
                    </div>
                    <div className={styles.overviewCard}>
                        <div className={styles.overviewIcon}>
                            <MdCategory />
                        </div>
                        <div className={styles.overviewContent}>
                            <h3>Category</h3>
                            <p>Cardano Open: Ecosystem</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Problem Statement */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Problem Statement</h2>
                <div className={styles.problemCard}>
                    <p>
                        Cardano is known in Hong Kong, but knowledge and adoption are fragmented. 
                        Newcomers lack clear, practical guidance on wallets, apps, and participation, 
                        limiting real-world use and community growth.
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
                        <h3>Consistent Onboarding</h3>
                        <p>Workshops and events expand local talent pool and empower community contributions through structured learning paths.</p>
                    </div>
                    <div className={styles.impactCard}>
                        <h3>Collaboration Hub</h3>
                        <p>Connects developers, startups, enterprises, and enthusiasts, sparking new projects and accelerating adoption.</p>
                    </div>
                    <div className={styles.impactCard}>
                        <h3>Expanded Visibility</h3>
                        <p>Elevates Cardano&apos;s presence in Hong Kong and Asia, supporting governance participation and enterprise adoption.</p>
                    </div>
                </div>
            </div>

            {/* Supporting Links */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Supporting Documentation</h2>
                <div className={styles.linksGrid}>
                    <a href="https://x.com/sidan_lab" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaExternalLinkAlt />
                        <span>SIDAN Lab Twitter</span>
                    </a>
                    <a href="https://www.sidan.io" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaExternalLinkAlt />
                        <span>SIDAN.io</span>
                    </a>
                    <a href="https://github.com/sidan-lab" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaGithub />
                        <span>SIDAN Lab GitHub</span>
                    </a>
                    <a href="https://x.com/Waffle_Capital" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaExternalLinkAlt />
                        <span>Waffle Capital Twitter</span>
                    </a>
                    <a href="https://www.wafflecapital.xyz/" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                        <FaExternalLinkAlt />
                        <span>Waffle Capital</span>
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
                                    } else if (line.startsWith('  - ')) {
                                        return <li key={index} className={styles.modalSubListItem}>{line.substring(4)}</li>;
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