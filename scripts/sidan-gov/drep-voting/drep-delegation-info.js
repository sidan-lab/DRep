import 'dotenv/config';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { getConfig, getRepoRoot } from '../org-stats/config-loader.js';

// Load config using the config loader
const config = getConfig();
const repoRoot = getRepoRoot();
const drepId = config.drepId;

if (!drepId) {
    console.error('DRep ID not found in config');
    process.exit(1);
}

async function getDRepVotingPowerHistory(drepId) {
    try {
        const apiKey = process.env.KOIOS_API_KEY;
        if (!apiKey) {
            throw new Error('KOIOS_API_KEY environment variable is not set');
        }

        const response = await axios.get(`https://api.koios.rest/api/v1/drep_voting_power_history?_drep_id=${drepId}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'accept': 'application/json'
            }
        });

        if (!Array.isArray(response.data)) {
            throw new Error('Invalid response format: expected an array');
        }

        console.log(`Found voting power history for ${response.data.length} epochs`);
        return response.data;
    } catch (error) {
        console.error('Error fetching DRep voting power history:', error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
        return [];
    }
}

async function getDRepDelegators(drepId) {
    try {
        const apiKey = process.env.KOIOS_API_KEY;
        if (!apiKey) {
            throw new Error('KOIOS_API_KEY environment variable is not set');
        }

        const response = await axios.get(`https://api.koios.rest/api/v1/drep_delegators?_drep_id=${drepId}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'accept': 'application/json'
            }
        });

        if (!Array.isArray(response.data)) {
            throw new Error('Invalid response format: expected an array');
        }

        console.log(`Found ${response.data.length} current delegators for DRep ${drepId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching DRep delegators:', error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
        return [];
    }
}

async function getDRepInfo(drepId) {
    try {
        const apiKey = process.env.KOIOS_API_KEY;
        if (!apiKey) {
            throw new Error('KOIOS_API_KEY environment variable is not set');
        }

        const response = await axios.post('https://api.koios.rest/api/v1/drep_info',
            { _drep_ids: [drepId] },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'accept': 'application/json',
                    'content-type': 'application/json'
                }
            }
        );

        if (!Array.isArray(response.data) || response.data.length === 0) {
            throw new Error('Invalid response format or DRep not found');
        }

        const drepInfo = response.data[0];
        console.log(`DRep Info for ${drepId}:`);
        console.log(`- Total Amount Delegated to DRep: ${drepInfo.amount}`);
        console.log(`- Active: ${drepInfo.active}`);
        console.log(`- Registered: ${drepInfo.registered}`);
        console.log(`- Expires Epoch: ${drepInfo.expires_epoch_no}`);

        return drepInfo;
    } catch (error) {
        console.error('Error fetching DRep info:', error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
        return null;
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

async function getVoterProposalList(drepId) {
    try {
        const apiKey = process.env.KOIOS_API_KEY;
        if (!apiKey) {
            throw new Error('KOIOS_API_KEY environment variable is not set');
        }

        const response = await axios.get(`https://api.koios.rest/api/v1/voter_proposal_list?_voter_id=${drepId}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'accept': 'application/json'
            }
        });

        if (!Array.isArray(response.data)) {
            throw new Error('Invalid response format: expected an array');
        }

        console.log(`Found ${response.data.length} governance proposals for DRep ${drepId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching voter proposal list:', error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
        return [];
    }
}

async function main() {
    const votingPowerHistory = await getDRepVotingPowerHistory(drepId);
    const currentDelegators = await getDRepDelegators(drepId);
    const drepInfo = await getDRepInfo(drepId);
    const currentEpoch = await getCurrentEpoch();
    const voterProposals = await getVoterProposalList(drepId);

    // Read existing JSON file
    const outputPath = path.join(repoRoot, config.outputPaths.baseDir, config.outputPaths.drepVotingDir, 'drep-delegation-info.json');
    let existingData = { timeline: { epochs: {} }, drepInfo: null };
    try {
        if (fs.existsSync(outputPath)) {
            existingData = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
        }
    } catch (error) {
        console.error('Error reading existing JSON file:', error.message);
    }

    // Update timeline with voting power history
    votingPowerHistory.forEach(epochData => {
        const epochNo = epochData.epoch_no;
        existingData.timeline.epochs[epochNo] = {
            ...existingData.timeline.epochs[epochNo],
            voting_power_lovelace: epochData.amount,
            // Only update delegator count for current epoch
            total_delegators: epochNo === currentEpoch ? currentDelegators.length :
                (existingData.timeline.epochs[epochNo]?.total_delegators || 0)
        };
    });

    // Update current epoch with latest delegator count
    existingData.timeline.current_epoch = currentEpoch;
    existingData.timeline.total_delegators = currentDelegators.length;
    existingData.timeline.total_amount_ada = Number(votingPowerHistory[0]?.amount || 0) / 1000000;

    // Update DRep info
    existingData.drepInfo = {
        drepId: drepId,
        hex: drepInfo?.hex || 'N/A',
        has_script: drepInfo?.has_script || false,
        deposit: drepInfo?.deposit || 'N/A',
        amount: drepInfo?.amount || 'N/A',
        active: drepInfo?.active || false,
        registered: drepInfo?.registered || false,
        expires_epoch_no: drepInfo?.expires_epoch_no || 0,
        meta_url: drepInfo?.meta_url || 'N/A',
        meta_hash: drepInfo?.meta_hash || 'N/A',
        last_updated: new Date().toISOString(),
        total_drep_proposals: voterProposals.length
    };

    // Save to JSON file
    fs.writeFileSync(outputPath, JSON.stringify(existingData, null, 2));
    console.log(`\nDelegation information saved to ${outputPath}`);

    // Log summary
    console.log('\nDelegation Summary:');
    console.log(`- Current Epoch: ${currentEpoch}`);
    console.log(`- Total Delegators: ${currentDelegators.length}`);
    console.log(`- Current Voting Power: ${votingPowerHistory[0]?.amount || 0} lovelace`);
    console.log(`- Historical Epochs Tracked: ${votingPowerHistory.length}`);
    console.log('\nDRep Info:');
    console.log(`- DRep ID: ${drepId}`);
    console.log(`- Active: ${drepInfo?.active || false}`);
    console.log(`- Registered: ${drepInfo?.registered || false}`);
    console.log(`- Expires Epoch: ${drepInfo?.expires_epoch_no || 0}`);
    console.log(`- Total Proposals Available: ${voterProposals.length}`);
}

main(); 