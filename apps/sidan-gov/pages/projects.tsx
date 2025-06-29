import { useData } from '../contexts/DataContext';
import styles from '../styles/Projects.module.css';
import PageHeader from '../components/PageHeader';
import Link from 'next/link';
import Image from 'next/image';
import config from '../config';

// Add this interface near the top with other interfaces
interface ShowcaseRepo {
    name: string;
    description: string;
    icon?: string;  // Make icon optional
    url: string;
}

// Showcase Repo Card
const ShowcaseRepoCard = ({ repo }: { repo: ShowcaseRepo }) => (
    <div className={styles.projectCard}>
        <div className={styles.projectHeader}>
            {repo.icon && (
                <div className={styles.projectIcon}>
                    <Image
                        src={repo.icon}
                        alt={`${repo.name} icon`}
                        width={40}
                        height={40}
                    />
                </div>
            )}
            <h3 className={styles.projectName}>{repo.name}</h3>
        </div>
        <p className={styles.projectDescription}>{repo.description}</p>
        <Link
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.projectLink}
        >
            View Repository
        </Link>
    </div>
);

// Cardano Bar Component Card
const CardanoBarCard = ({ mainRepo, childRepos }: { mainRepo: ShowcaseRepo, childRepos: ShowcaseRepo[] }) => (
    <div className={styles.cardanoBarContainer}>
        <div className={styles.mainProjectCard}>
            <div className={styles.projectHeader}>
                {mainRepo.icon && (
                    <div className={styles.projectIcon}>
                        <Image
                            src={mainRepo.icon}
                            alt={`${mainRepo.name} icon`}
                            width={40}
                            height={40}
                        />
                    </div>
                )}
                <h3 className={styles.projectName}>{mainRepo.name}</h3>
            </div>
            <p className={styles.projectDescription}>{mainRepo.description}</p>
            <Link
                href={mainRepo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
            >
                View Repository
            </Link>
        </div>
        
        <div className={styles.childProjectsContainer}>
            <div className={styles.connectionLine}></div>
            <div className={styles.childProjectsGrid}>
                {childRepos.map((repo) => (
                    <div key={repo.name} className={styles.childProjectCard}>
                        <div className={styles.projectHeader}>
                            {repo.icon && (
                                <div className={styles.projectIcon}>
                                    <Image
                                        src={repo.icon}
                                        alt={`${repo.name} icon`}
                                        width={32}
                                        height={32}
                                    />
                                </div>
                            )}
                            <h4 className={styles.childProjectName}>{repo.name}</h4>
                        </div>
                        <p className={styles.childProjectDescription}>{repo.description}</p>
                        <Link
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.childProjectLink}
                        >
                            View Repository
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default function Projects() {
    const { orgData, isLoading, error } = useData();

    // Extract repository name from dependents URL
    const getRepoNameFromUrl = (url: string): string => {
        const match = url.match(/github\.com\/[^\/]+\/([^\/]+)/);
        return match ? match[1] : config.organization.displayName;
    };

    // Construct the dependents URL using config values
    const dependentsUrl = `https://github.com/${config.organization.name}/${config.repositories.dependentsCountRepo}/network/dependents`;
    const repoName = getRepoNameFromUrl(dependentsUrl);

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>Error: {error}</div>
            </div>
        );
    }

    const githubUsage = orgData?.currentStats?.github?.core_in_repositories || 0;
    const totalReferences = orgData?.currentStats?.github?.core_in_any_file || 0;

    // Extract showcaseRepos from config and group them
    const showcaseRepos: ShowcaseRepo[] = (config as { showcaseRepos?: ShowcaseRepo[] }).showcaseRepos || [];
    
    // Separate cardano-bar and its child projects
    const cardanoBar = showcaseRepos.find(repo => repo.name === 'cardano-bar');
    const cardanoBarLibraries = showcaseRepos.filter(repo => 
        ['whisky', 'rum', 'gin', 'vodka'].includes(repo.name)
    );
    
    // Combine other repos with highlighted projects (like MeshJS mesh-core)
    const otherRepos = [
        ...showcaseRepos.filter(repo => 
            repo.name !== 'cardano-bar' && !['whisky', 'rum', 'gin', 'vodka'].includes(repo.name)
        ),
        ...config.highlightedProjects.map(project => ({
            name: project.name,
            description: project.description,
            icon: project.icon,
            url: project.url
        }))
    ];

    return (
        <div className={styles.container}>
            <PageHeader
                title={<>{config.organization.displayName} <span>Projects</span></>}
                subtitle={`Projects using ${config.organization.displayName} in their GitHub repositories`}
            />

            <div className={styles.stats}>
                <div className={styles.stat}>
                    <h3>Total Repos using {repoName}</h3>
                    <p>{githubUsage}</p>
                </div>
                <div className={styles.stat}>
                    <h3>Total References</h3>
                    <p>{totalReferences}</p>
                </div>
            </div>

            <div className={styles.moreSection} style={{ justifyContent: 'flex-start' }}>
                <a href={dependentsUrl} className={styles.moreButton} target="_blank" rel="noopener noreferrer">
                    View all Projects
                </a>
            </div>

            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>SIDAN Lab open source</h2>
                <p className={styles.sectionDescription}>our development & contributions to the cardano open source developer ecosystem</p>
            </div>

            <div className={styles.showcaseContainer}>
                {/* Cardano Bar with its libraries */}
                {cardanoBar && (
                    <CardanoBarCard 
                        mainRepo={cardanoBar} 
                        childRepos={cardanoBarLibraries}
                    />
                )}
                
                {/* Other standalone repositories */}
                {otherRepos.length > 0 && (
                    <div className={styles.otherProjectsGrid}>
                        {otherRepos.map((repo) => (
                            <ShowcaseRepoCard key={repo.name} repo={repo} />
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Products</h2>
                <p className={styles.sectionDescription}>Commercial products and services built by SIDAN Lab</p>
            </div>

            <div className={styles.productsGrid}>
                <div className={styles.productCard}>
                    <div className={styles.productLogoContainer}>
                        <Image
                            src="/deltadefi.png"
                            alt="DeltaDefi icon"
                            width={80}
                            height={80}
                        />
                    </div>
                    <div className={styles.productContent}>
                        <h3 className={styles.productName}>DeltaDefi</h3>
                        <p className={styles.productDescription}>High-Frequency Trading Gateway for Cardano</p>
                        <Link
                            href="https://github.com/deltadefi-protocol"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.projectLink}
                        >
                            View Repository
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
} 