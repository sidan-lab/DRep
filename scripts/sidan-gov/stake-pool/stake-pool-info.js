import 'dotenv/config';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { getConfig, getRepoRoot } from '../org-stats/config-loader.js';

// Load config using the config loader
const config = getConfig();
const repoRoot = getRepoRoot();
const poolId = config.poolId;

if (!poolId) {
    console.error('Pool ID not found in config');
    process.exit(1);
}

// Read missing rationales file
const missingRationalesPath = path.join(repoRoot, 'voting-history', 'missing-voting-rationales', 'rationales.json');
let missingRationales = {};
try {
    missingRationales = JSON.parse(fs.readFileSync(missingRationalesPath, 'utf8'));
} catch (error) {
    console.warn('Could not read missing rationales file:', error.message);
}

async function fetchMetadata(metaUrl) {
    try {
        // Handle IPFS URLs
        if (metaUrl.startsWith('ipfs://')) {
            const ipfsHash = metaUrl.replace('ipfs://', '');
            const response = await axios.get(`https://ipfs.io/ipfs/${ipfsHash}`);
            return response.data;
        }

        // Handle GitHub raw URLs
        if (metaUrl.includes('raw.githubusercontent.com')) {
            const response = await axios.get(metaUrl);
            return response.data;
        }

        // Handle regular URLs
        const response = await axios.get(metaUrl);
        return response.data;
    } catch (error) {
        console.error(`Error fetching metadata from ${metaUrl}:`, error.message);
        return null;
    }
}

async function getProposalDetails(poolId) {
    try {
        const apiKey = process.env.KOIOS_API_KEY;
        if (!apiKey) {
            throw new Error('KOIOS_API_KEY environment variable is not set');
        }

        const response = await axios.get(`https://api.koios.rest/api/v1/voter_proposal_list?_voter_id=${poolId}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'accept': 'application/json'
            }
        });

        if (!Array.isArray(response.data)) {
            throw new Error('Invalid response format: expected an array');
        }

        console.log(`Found ${response.data.length} proposals in voter_proposal_list for pool ${poolId}`);

        // Create a map of proposal details by proposal_id
        const proposalMap = response.data.reduce((acc, proposal) => {
            if (!proposal.proposal_id) {
                console.warn('Found proposal without proposal_id, skipping');
                return acc;
            }
            acc[proposal.proposal_id] = proposal;
            return acc;
        }, {});

        console.log(`Successfully mapped ${Object.keys(proposalMap).length} proposals`);
        return proposalMap;
    } catch (error) {
        console.error('Error fetching proposal details:', error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
        return {};
    }
}

// Function to fetch rationale from SIDAN Lab DRep repository
async function fetchGovernanceRationale(proposalId, year = null, epoch = null) {
    try {
        const baseUrl = `https://raw.githubusercontent.com/${config.organization.name}/${config.repositories.governance}/refs/heads/main/voting-history`;
        console.log(`\nFetching rationale for proposal ${proposalId} from SIDAN Lab DRep repository`);

        // Try to find the rationale by searching through ga folders
        // We'll search through a reasonable range of ga numbers (ga01 to ga50)
        for (let gaNumber = 1; gaNumber <= 50; gaNumber++) {
            const gaFolder = `ga${gaNumber.toString().padStart(2, '0')}`;
            const rationaleUrl = `${baseUrl}/${gaFolder}/${gaFolder}-rationale.md`;

            try {
                const response = await axios.get(rationaleUrl);
                if (response.data) {
                    const markdownContent = response.data;

                    // Parse the markdown table to extract information
                    const lines = markdownContent.split('\n');
                    let actionId = null;
                    let rationale = null;
                    let hash = null;

                    for (const line of lines) {
                        // Extract Action ID
                        if (line.includes('Action ID') && line.includes('gov_action')) {
                            const actionIdMatch = line.match(/gov_action[a-zA-Z0-9]+/);
                            if (actionIdMatch) {
                                actionId = actionIdMatch[0];
                            }
                        }

                        // Extract Rational - handle both spaced and non-spaced pipe characters
                        if (line.includes('Rational') && !line.includes('| Rational |')) {
                            // Try to match the rational content on the same line first
                            const rationalMatch = line.match(/\| Rational\s*\|\s*(.+?)\s*\|/);
                            if (rationalMatch) {
                                rationale = rationalMatch[1].trim();
                            } else {
                                // Try without spaces around pipe
                                const rationalMatch2 = line.match(/\|Rational\s*\|\s*(.+?)\s*\|/);
                                if (rationalMatch2) {
                                    rationale = rationalMatch2[1].trim();
                                } else {
                                    // Try pattern that doesn't require ending pipe
                                    const rationalMatch3 = line.match(/\| Rational\s*\|\s*(.+)$/);
                                    if (rationalMatch3) {
                                        rationale = rationalMatch3[1].trim();
                                    } else {
                                        const rationalMatch4 = line.match(/\|Rational\s*\|\s*(.+)$/);
                                        if (rationalMatch4) {
                                            rationale = rationalMatch4[1].trim();

                                            // Check if this is the start of multi-line content
                                            if (line.trim().endsWith(' ') || line.trim().endsWith('')) {
                                                let multiLineRational = rationale;
                                                let lineIndex = lines.indexOf(line) + 1;
                                                while (lineIndex < lines.length) {
                                                    const nextLine = lines[lineIndex];
                                                    // Stop if we hit another table row (starts and ends with |)
                                                    if (nextLine.trim().startsWith('|') && nextLine.trim().endsWith('|') && nextLine.includes('|')) {
                                                        break;
                                                    }
                                                    // Stop if we hit an empty line followed by a table row
                                                    if (nextLine.trim() === '' && lineIndex + 1 < lines.length) {
                                                        const nextNextLine = lines[lineIndex + 1];
                                                        if (nextNextLine.trim().startsWith('|') && nextNextLine.trim().endsWith('|')) {
                                                            break;
                                                        }
                                                    }
                                                    multiLineRational += ' ' + nextLine.trim();
                                                    lineIndex++;
                                                }
                                                rationale = multiLineRational.trim();
                                            }
                                        } else {
                                            // If no content on same line, look for multi-line content
                                            const rationalMatch5 = line.match(/\| Rational\s*\|\s*$/);
                                            const rationalMatch6 = line.match(/\|Rational\s*\|\s*$/);
                                            if (rationalMatch5 || rationalMatch6) {
                                                // Start collecting multi-line content
                                                let multiLineRational = '';
                                                let lineIndex = lines.indexOf(line) + 1;
                                                while (lineIndex < lines.length) {
                                                    const nextLine = lines[lineIndex];
                                                    if (nextLine.trim().startsWith('|') && nextLine.trim().endsWith('|')) {
                                                        // End of multi-line content
                                                        break;
                                                    }
                                                    multiLineRational += nextLine + '\n';
                                                    lineIndex++;
                                                }
                                                rationale = multiLineRational.trim();
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // Extract Hash for verification - handle both spaced and non-spaced pipe characters
                        if (line.includes('Hash') && !line.includes('| Hash |')) {
                            const hashMatch = line.match(/\| Hash\s*\|\s*([a-fA-F0-9]+)/);
                            if (hashMatch) {
                                hash = hashMatch[1];
                            } else {
                                // Try without spaces around pipe
                                const hashMatch2 = line.match(/\|Hash\s*\|\s*([a-fA-F0-9]+)/);
                                if (hashMatch2) {
                                    hash = hashMatch2[1];
                                }
                            }
                        }
                    }

                    // Check if this rationale matches our proposal
                    // We can match by action ID or by hash (removing the '00' suffix from proposal hash)
                    if (actionId && rationale) {
                        const proposalHashWithoutSuffix = proposalId.replace('00', '');

                        // Check if the action ID or hash matches our proposal
                        if (actionId === proposalId || (hash && hash.includes(proposalHashWithoutSuffix))) {
                            console.log(`Found matching rationale in ${gaFolder} for proposal ${proposalId}`);
                            return rationale;
                        }
                    }
                }
            } catch (error) {
                // Continue to next ga folder if this one doesn't exist or fails
                continue;
            }
        }

        console.log(`No matching rationale found for proposal ${proposalId}`);
        return null;
    } catch (error) {
        console.warn(`Could not fetch rationale from SIDAN Lab DRep repository for proposal ${proposalId}:`, error.message);
        return null;
    }
}

async function getStakePoolInfo(poolId) {
    try {
        const apiKey = process.env.KOIOS_API_KEY;
        if (!apiKey) {
            throw new Error('KOIOS_API_KEY environment variable is not set');
        }

        const response = await axios.post('https://api.koios.rest/api/v1/pool_info',
            { _pool_bech32_ids: [poolId] },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'accept': 'application/json',
                    'content-type': 'application/json'
                }
            }
        );

        if (!Array.isArray(response.data) || response.data.length === 0) {
            throw new Error('Invalid response format or pool not found');
        }

        const poolInfo = response.data[0];
        console.log(`Stake Pool Info for ${poolId}:`);
        console.log(`- Pool Name: ${poolInfo.meta_json?.name || 'N/A'}`);
        console.log(`- Ticker: ${poolInfo.meta_json?.ticker || 'N/A'}`);
        console.log(`- Status: ${poolInfo.pool_status}`);
        console.log(`- Active Stake: ${poolInfo.active_stake || 'N/A'}`);
        console.log(`- Live Stake: ${poolInfo.live_stake || 'N/A'}`);
        console.log(`- Live Delegators: ${poolInfo.live_delegators || 0}`);
        console.log(`- Block Count: ${poolInfo.block_count || 0}`);

        return poolInfo;
    } catch (error) {
        console.error('Error fetching stake pool info:', error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
        return null;
    }
}

async function getPoolHistory(poolId, epochNo = null) {
    try {
        const apiKey = process.env.KOIOS_API_KEY;
        if (!apiKey) {
            throw new Error('KOIOS_API_KEY environment variable is not set');
        }

        let url = `https://api.koios.rest/api/v1/pool_history?_pool_bech32=${poolId}`;
        if (epochNo) {
            url += `&_epoch_no=${epochNo}`;
        }

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'accept': 'application/json'
            }
        });

        if (!Array.isArray(response.data)) {
            throw new Error('Invalid response format for pool history');
        }

        console.log(`Pool History for ${poolId}:`);
        console.log(`- Retrieved ${response.data.length} epoch(s) of history data`);

        if (response.data.length > 0) {
            const latest = response.data[0];
            console.log(`- Latest epoch: ${latest.epoch_no}`);
            console.log(`- Latest active stake: ${latest.active_stake || 'N/A'}`);
            console.log(`- Latest block count: ${latest.block_cnt || 'N/A'}`);
            console.log(`- Latest delegator count: ${latest.delegator_cnt || 'N/A'}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching pool history:', error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
        return [];
    }
}

async function getPoolVotes(poolId) {
    try {
        const apiKey = process.env.KOIOS_API_KEY;
        if (!apiKey) {
            throw new Error('KOIOS_API_KEY environment variable is not set');
        }

        // Fetch proposal details first
        const proposalDetails = await getProposalDetails(poolId);

        const response = await axios.get(`https://api.koios.rest/api/v1/vote_list?voter_id=eq.${encodeURIComponent(poolId)}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'accept': 'application/json'
            }
        });

        // Validate response data
        if (!Array.isArray(response.data)) {
            throw new Error('Invalid response format: expected an array');
        }

        console.log(`Found ${response.data.length} votes for pool ${poolId}`);

        // Group votes by year
        const votesByYear = {};

        // Process and validate each vote
        for (const vote of response.data) {
            // Validate required fields
            if (!vote.proposal_id || !vote.vote || !vote.block_time) {
                console.error('Invalid vote data: missing required fields');
                continue;
            }

            // Validate vote enum value
            const validVotes = ['Yes', 'No', 'Abstain'];
            if (!validVotes.includes(vote.vote)) {
                console.error(`Invalid vote value: ${vote.vote}. Must be one of: ${validVotes.join(', ')}`);
                continue;
            }

            const processedVote = {
                proposalId: vote.proposal_id,
                proposalTxHash: vote.proposal_tx_hash + '00',
                proposalIndex: vote.proposal_index,
                voteTxHash: vote.vote_tx_hash,
                blockTime: new Date(vote.block_time * 1000).toISOString(),
                vote: vote.vote,
                metaUrl: vote.meta_url,
                metaHash: vote.meta_hash
            };

            // Fetch metadata if metaUrl is available
            let metadata = null;
            if (processedVote.metaUrl) {
                metadata = await fetchMetadata(processedVote.metaUrl);
            }

            // Get proposal details
            const proposal = proposalDetails[vote.proposal_id] || {};

            // Try to get rationale from multiple sources in order of preference
            let rationale = null;

            // Try metadata
            if (metadata?.body?.comment) {
                rationale = metadata.body.comment;
                console.log(`Fetching rationale from metadata: ${rationale}`);
            }
            // Finally try governance repository as last resort
            else {
                const year = new Date(processedVote.blockTime).getFullYear();
                const epoch = proposal.proposed_epoch;
                rationale = await fetchGovernanceRationale(vote.proposal_id, year, epoch);
                console.log(`Fetching rationale from SIDAN Lab DRep repository: ${rationale}`);
            }

            // Add proposal details to vote
            let proposalTitle = proposal.meta_json?.body?.title;

            // If title not found in meta_json, try fetching from meta_url
            if (!proposalTitle && processedVote.metaUrl) {
                const metadata = await fetchMetadata(processedVote.metaUrl);
                if (metadata?.body?.title) {
                    proposalTitle = metadata.body.title;
                }
            }

            processedVote.proposalTitle = proposalTitle || missingRationales[vote.proposal_id]?.title || 'Unknown Proposal';
            processedVote.proposalType = proposal.proposal_type || 'Unknown';
            processedVote.proposedEpoch = proposal.proposed_epoch || 'N/A';
            processedVote.expirationEpoch = proposal.expiration || 'N/A';
            processedVote.rationale = rationale || 'No rationale available';

            // Get year from blockTime
            const year = new Date(processedVote.blockTime).getFullYear();

            // Add to year group
            if (!votesByYear[year]) {
                votesByYear[year] = [];
            }
            votesByYear[year].push(processedVote);
        }

        console.log('All pool votes processed and organized by year successfully');
        return votesByYear;
    } catch (error) {
        console.error('Error fetching pool votes:', error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
        return {};
    }
}

async function getCurrentEpoch() {
    try {
        const apiKey = process.env.KOIOS_API_KEY;
        if (!apiKey) {
            throw new Error('KOIOS_API_KEY environment variable is not set');
        }

        const response = await axios.get('https://api.koios.rest/api/v1/tip', {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'accept': 'application/json'
            }
        });

        if (!Array.isArray(response.data) || response.data.length === 0) {
            throw new Error('Invalid response format from tip endpoint');
        }

        return response.data[0].epoch_no;
    } catch (error) {
        console.error('Error fetching current epoch:', error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
        return 0;
    }
}

async function main() {
    const poolInfo = await getStakePoolInfo(poolId);
    const currentEpoch = await getCurrentEpoch();
    const poolHistory = await getPoolHistory(poolId);
    const poolVotes = await getPoolVotes(poolId);

    // Read existing JSON file
    const outputPath = path.join(repoRoot, config.outputPaths.baseDir, config.outputPaths.stakePoolDir, 'stake-pool-info.json');
    let existingData = { poolInfo: null, poolHistory: [], poolVotes: {}, lastUpdated: null };
    try {
        if (fs.existsSync(outputPath)) {
            existingData = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
        }
    } catch (error) {
        console.error('Error reading existing JSON file:', error.message);
    }

    // Update pool info
    existingData.poolInfo = {
        pool_id_bech32: poolInfo?.pool_id_bech32 || poolId,
        pool_id_hex: poolInfo?.pool_id_hex || 'N/A',
        active_epoch_no: poolInfo?.active_epoch_no || null,
        vrf_key_hash: poolInfo?.vrf_key_hash || null,
        margin: poolInfo?.margin || null,
        fixed_cost: poolInfo?.fixed_cost || null,
        pledge: poolInfo?.pledge || null,
        deposit: poolInfo?.deposit || null,
        reward_addr: poolInfo?.reward_addr || null,
        reward_addr_delegated_drep: poolInfo?.reward_addr_delegated_drep || null,
        owners: poolInfo?.owners || null,
        relays: poolInfo?.relays || [],
        meta_url: poolInfo?.meta_url || null,
        meta_hash: poolInfo?.meta_hash || null,
        meta_json: poolInfo?.meta_json || null,
        pool_status: poolInfo?.pool_status || 'unknown',
        retiring_epoch: poolInfo?.retiring_epoch || null,
        op_cert: poolInfo?.op_cert || null,
        op_cert_counter: poolInfo?.op_cert_counter || null,
        active_stake: poolInfo?.active_stake || null,
        sigma: poolInfo?.sigma || null,
        block_count: poolInfo?.block_count || null,
        live_pledge: poolInfo?.live_pledge || null,
        live_stake: poolInfo?.live_stake || null,
        live_delegators: poolInfo?.live_delegators || 0,
        live_saturation: poolInfo?.live_saturation || null,
        voting_power: poolInfo?.voting_power || null
    };

    // Update pool history
    existingData.poolHistory = poolHistory;

    // Update pool votes
    existingData.poolVotes = poolVotes;

    existingData.lastUpdated = new Date().toISOString();
    existingData.currentEpoch = currentEpoch;

    // Ensure directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save to JSON file
    fs.writeFileSync(outputPath, JSON.stringify(existingData, null, 2));
    console.log(`\nStake pool information, history, and votes saved to ${outputPath}`);

    // Log summary
    console.log('\nStake Pool Summary:');
    console.log(`- Current Epoch: ${currentEpoch}`);
    console.log(`- Pool ID: ${poolId}`);
    console.log(`- Pool Name: ${poolInfo?.meta_json?.name || 'N/A'}`);
    console.log(`- Ticker: ${poolInfo?.meta_json?.ticker || 'N/A'}`);
    console.log(`- Status: ${poolInfo?.pool_status || 'N/A'}`);
    console.log(`- Active Stake: ${poolInfo?.active_stake || 'N/A'}`);
    console.log(`- Live Stake: ${poolInfo?.live_stake || 'N/A'}`);
    console.log(`- Live Delegators: ${poolInfo?.live_delegators || 0}`);
    console.log(`- Block Count: ${poolInfo?.block_count || 0}`);
    console.log(`- Live Saturation: ${poolInfo?.live_saturation || 'N/A'}`);
    console.log(`- Voting Power: ${poolInfo?.voting_power || 'N/A'}`);
    console.log(`- History Records: ${poolHistory.length}`);

    // Log voting summary
    const totalVotes = Object.values(poolVotes).reduce((sum, votes) => sum + votes.length, 0);
    console.log(`- Total Votes: ${totalVotes}`);
    Object.entries(poolVotes).forEach(([year, votes]) => {
        console.log(`  - ${year}: ${votes.length} votes`);
    });
}

main(); 