import React from 'react';
import Link from 'next/link';
import PageHeader from '../../components/PageHeader';
import styles from '../../styles/Proposals.module.css';
import { FaGithub, FaExternalLinkAlt, FaClock, FaCoins, FaUsers, FaCode, FaPlay } from 'react-icons/fa';
import { MdDeveloperMode, MdGavel, MdBuild } from 'react-icons/md';

interface Proposal {
    id: string;
    title: string;
    budget: string;
    duration: string;
    theme: string;
    category: string;
    problemStatement: string;
    description: string;
    links: string[];
    icon: React.ReactNode;
    themeColor: string;
}

interface VideoData {
    id: string;
    title: string;
    url: string;
    embedId: string;
    category: string;
}

const proposals: Proposal[] = [
    {
        id: 'hk-community',
        title: 'SIDAN | Waffle - Hong Kong Cardano Community',
        budget: '60,000 ADA',
        duration: '7 months',
        theme: 'Community',
        category: 'Cardano Open: Ecosystem',
        problemStatement: 'Cardano is known in Hong Kong, but knowledge and adoption are fragmented. Newcomers lack clear, practical guidance on wallets, apps, and participation, limiting real-world use and community growth.',
        description: 'Building a strong local Cardano community in Hong Kong through meetups, workshops, and enterprise outreach. Targeting blockchain enthusiasts, developers, students, and enterprises.',
        links: [
            'https://x.com/sidan_lab',
            'https://www.sidan.io',
            'https://github.com/sidan-lab',
            'https://x.com/Waffle_Capital',
            'https://www.wafflecapital.xyz/'
        ],
        icon: <FaUsers />,
        themeColor: 'rgba(56, 232, 225, 0.15)'
    },
    {
        id: 'feedback-system',
        title: 'SIDAN - Delegator Feedback System for DRep Voting',
        budget: '100,000 ADA',
        duration: '5 months',
        theme: 'Governance',
        category: 'Cardano Use Cases: Concepts',
        problemStatement: 'DRep–delegator communication is a core problem in Cardano governance. Delegators lack effective channels to provide feedback to their chosen DReps.',
        description: 'A comprehensive feedback system enabling delegators to communicate effectively with their DReps, enhancing governance participation and transparency.',
        links: [
            'https://github.com/sidan-lab/sidan-gov-api',
            'https://github.com/sidan-lab/sidan-gov-discord-bot',
            'https://github.com/sidan-lab/sidan-gov-frontend-delegate',
            'https://x.com/sidan_lab',
            'https://dashboard.sidan.io/'
        ],
        icon: <MdGavel />,
        themeColor: 'rgba(99, 102, 241, 0.15)'
    },
    {
        id: 'cardano-bar',
        title: 'SIDAN - Cardano Bar - Aiken Blueprint Parser for VSCode',
        budget: '100,000 ADA',
        duration: '5 months',
        theme: 'Developer Tools',
        category: 'Cardano Open: Developers',
        problemStatement: 'Cardano developers currently hand-parse Aiken blueprints, remap types across TypeScript and Rust, and rewrite boilerplate for tests and transaction builders. This slows delivery and introduces errors.',
        description: 'VSCode extension that automates Aiken blueprint parsing, type mapping, and boilerplate generation, accelerating Cardano development workflows.',
        links: [
            'https://github.com/sidan-lab/cardano-bar',
            'https://marketplace.visualstudio.com/items/?itemName=sidan-lab.cardano-bar-vscode',
            'https://github.com/MeshJS/mesh/blob/main/scripts/mesh-cli/package.json#L35',
            'https://x.com/sidan_lab'
        ],
        icon: <FaCode />,
        themeColor: 'rgba(34, 197, 94, 0.15)'
    },
    {
        id: 'vodka',
        title: 'SIDAN - Vodka - Complete Aiken Dev Utils & Testing Framework',
        budget: '100,000 ADA',
        duration: '5 months',
        theme: 'Developer Tools',
        category: 'Cardano Open: Developers',
        problemStatement: 'Aiken developers lack comprehensive testing utilities and development tools, making smart contract development and testing inefficient and error-prone.',
        description: 'A complete development utilities suite and testing framework for Aiken, providing developers with essential tools for efficient smart contract development.',
        links: [
            'https://github.com/sidan-lab',
            'https://x.com/sidan_lab',
            'https://www.sidan.io'
        ],
        icon: <MdBuild />,
        themeColor: 'rgba(168, 85, 247, 0.15)'
    },
    {
        id: 'whisky-v2',
        title: 'SIDAN - Whisky V2 - Cardano Rust SDK with Pallas',
        budget: '100,000 ADA',
        duration: '6 months',
        theme: 'Developer Tools',
        category: 'Cardano Open: Developers',
        problemStatement: 'Rust developers need a comprehensive, modern SDK for Cardano development that leverages the latest Pallas libraries and provides seamless integration.',
        description: 'Next-generation Rust SDK for Cardano development, built with Pallas integration, offering developers powerful tools for blockchain interaction and development.',
        links: [
            'https://github.com/sidan-lab',
            'https://x.com/sidan_lab',
            'https://www.sidan.io'
        ],
        icon: <MdDeveloperMode />,
        themeColor: 'rgba(245, 101, 101, 0.15)'
    }
];

const videos: VideoData[] = [
    {
        id: 'overview',
        title: 'Overview Video',
        url: 'https://youtu.be/4El0zHV87Iw',
        embedId: '4El0zHV87Iw',
        category: 'Overview'
    },
    {
        id: 'toolings',
        title: 'Toolings Video',
        url: 'https://youtu.be/wWvCqVuh7kg',
        embedId: 'wWvCqVuh7kg',
        category: 'Developer Tools'
    },
    {
        id: 'events',
        title: 'Events Video',
        url: 'https://youtu.be/Yps64eBf0l0',
        embedId: 'Yps64eBf0l0',
        category: 'Community'
    },
    {
        id: 'governance',
        title: 'Governance Video',
        url: 'https://youtu.be/VZqPd3tGxj0',
        embedId: 'VZqPd3tGxj0',
        category: 'Governance'
    }
];

const getThemeIcon = (theme: string) => {
    switch (theme) {
        case 'Community':
            return <FaUsers className={styles.themeIcon} />;
        case 'Governance':
            return <MdGavel className={styles.themeIcon} />;
        case 'Developer Tools':
            return <MdDeveloperMode className={styles.themeIcon} />;
        default:
            return <MdBuild className={styles.themeIcon} />;
    }
};

export default function NewProposals() {
    const [activeVideo, setActiveVideo] = React.useState(videos[0]);

    const handleVideoSelect = (video: VideoData) => {
        setActiveVideo(video);
    };

    return (
        <div className={styles.container}>
            <PageHeader
                title={<>New <span>Proposals</span></>}
            />
            
            <div className={styles.proposalDescription}>
                <p>Explore SIDAN Lab&apos;s latest Catalyst Fund 14 proposals, spanning community building, governance tools, and developer utilities to strengthen the Cardano ecosystem.</p>
            </div>

            {/* YouTube Videos Section */}
            <div className={styles.videosSection}>
                <div className={styles.videoPlayerSection}>
                    {/* Main Video Player */}
                    <div className={styles.mainVideoContainer}>
                        <div className={styles.mainVideoHeader}>
                            <h3 className={styles.mainVideoTitle}>{activeVideo.title}</h3>
                            <span className={styles.mainVideoCategory}>
                                {activeVideo.category}
                            </span>
                        </div>
                        <div className={styles.mainVideoPlayer}>
                            <iframe
                                src={`https://www.youtube.com/embed/${activeVideo.embedId}?rel=0&modestbranding=1`}
                                title={activeVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className={styles.mainVideoIframe}
                            />
                        </div>
                    </div>

                    {/* Video Playlist */}
                    <div className={styles.videoPlaylist}>
                        <h4 className={styles.playlistTitle}>Video Playlist</h4>
                        <div className={styles.playlistItems}>
                            {videos.map((video) => (
                                <div 
                                    key={video.id}
                                    className={`${styles.playlistItem} ${activeVideo.id === video.id ? styles.playlistItemActive : ''}`}
                                    onClick={() => handleVideoSelect(video)}
                                >
                                    <div className={styles.playlistThumbnail}>
                                        <img
                                            src={`https://img.youtube.com/vi/${video.embedId}/mqdefault.jpg`}
                                            alt={video.title}
                                            className={styles.thumbnailImage}
                                            loading="lazy"
                                        />
                                        <div className={styles.playOverlay}>
                                            <FaPlay />
                                        </div>
                                    </div>
                                    <div className={styles.playlistItemInfo}>
                                        <h5 className={styles.playlistItemTitle}>{video.title}</h5>
                                        <span className={styles.playlistItemCategory}>{video.category}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.proposalGrid}>
                {proposals.map((proposal) => (
                    <Link 
                        key={proposal.id} 
                        href={`/catalyst-proposals/${proposal.id}`}
                        className={styles.proposalCard}
                        style={{ '--theme-color': proposal.themeColor } as React.CSSProperties}
                    >
                        <div className={styles.proposalHeader}>
                            <div className={styles.proposalIcon}>
                                {proposal.icon}
                            </div>
                            <div className={styles.proposalMeta}>
                                <div className={styles.proposalTheme}>
                                    {getThemeIcon(proposal.theme)}
                                    <span>{proposal.theme}</span>
                                </div>
                                <div className={styles.proposalCategory}>{proposal.category}</div>
                            </div>
                        </div>

                        <div className={styles.proposalContent}>
                            <h3 className={styles.proposalTitle}>{proposal.title}</h3>
                            <p className={styles.proposalProblem}>{proposal.problemStatement}</p>
                            <p className={styles.proposalDesc}>{proposal.description}</p>
                        </div>

                        <div className={styles.proposalStats}>
                            <div className={styles.proposalStat}>
                                <FaCoins className={styles.statIcon} />
                                <div className={styles.statContent}>
                                    <span className={styles.statLabel}>Budget</span>
                                    <span className={styles.statValue}>{proposal.budget}</span>
                                </div>
                            </div>
                            <div className={styles.proposalStat}>
                                <FaClock className={styles.statIcon} />
                                <div className={styles.statContent}>
                                    <span className={styles.statLabel}>Duration</span>
                                    <span className={styles.statValue}>{proposal.duration}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.proposalLinks}>
                            <div className={styles.linksHeader}>
                                <span>Supporting Links</span>
                            </div>
                            <div className={styles.linksList}>
                                {proposal.links.slice(0, 3).map((link, index) => (
                                    <a 
                                        key={index}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.proposalLink}
                                    >
                                        {link.includes('github.com') ? <FaGithub /> : <FaExternalLinkAlt />}
                                        <span>{link.replace(/^https?:\/\//, '').split('/')[0]}</span>
                                    </a>
                                ))}
                                {proposal.links.length > 3 && (
                                    <div className={styles.moreLinks}>
                                        +{proposal.links.length - 3} more
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
} 