# Organization Stats Configuration

This document explains how to configure the organization stats scripts to work with different GitHub organizations and repositories.

## Configuration File

The main configuration file is `org-stats-config.json` located in the root of the repository. This file contains all the configurable values that the scripts use.

## Configuration Structure

### Organization Settings
```json
{
  "organization": {
    "name": "MeshJS",           // GitHub organization name (used in API calls)
    "displayName": "MeshJS"     // Display name (used in console logs)
  }
}
```

### Repository Settings
```json
{
  "repositories": {
    "main": "mesh",                    // Main repository name
    "governance": "governance",        // Governance repository name
    "dependentsCountRepo": "mesh"      // Repository used for dependents count
  }
}
```

### NPM Package Settings
```json
{
  "npmPackages": {
    "core": "@meshsdk/core",
    "react": "@meshsdk/react",
    "transaction": "@meshsdk/transaction",
    "wallet": "@meshsdk/wallet",
    "provider": "@meshsdk/provider",
    "coreCsl": "@meshsdk/core-csl",
    "coreCst": "@meshsdk/core-cst"
  }
}
```

### Output Path Settings
```json
{
  "outputPaths": {
    "baseDir": "mesh-gov-updates",
    "statsDir": "mesh-stats",
    "contributionsDir": "contributions",
    "drepVotingDir": "drep-voting",
    "catalystProposalsDir": "catalyst-proposals",
    "discordStatsDir": "discord-stats"
  }
}
```

### GitHub URL Settings
```json
{
  "githubUrls": {
    "dependentsUrl": "https://github.com/MeshJS/mesh/network/dependents?dependent_type=REPOSITORY&package_id=UGFja2FnZS0zNDczNjUyOTU4"
  }
}
```

## Usage

### For Different Organizations

To use these scripts with a different GitHub organization:

1. Update the `organization.name` and `organization.displayName` fields
2. Update the `repositories` section with the correct repository names
3. Update the `npmPackages` section with the correct package names
4. Update the `githubUrls.dependentsUrl` with the correct repository URL

### Example: For a Different Organization

```json
{
  "organization": {
    "name": "YourOrg",
    "displayName": "Your Organization"
  },
  "repositories": {
    "main": "your-main-repo",
    "governance": "your-governance-repo",
    "dependentsCountRepo": "your-main-repo"
  },
  "npmPackages": {
    "core": "@yourorg/core",
    "react": "@yourorg/react",
    "transaction": "@yourorg/transaction",
    "wallet": "@yourorg/wallet",
    "provider": "@yourorg/provider",
    "coreCsl": "@yourorg/core-csl",
    "coreCst": "@yourorg/core-cst"
  },
  "outputPaths": {
    "baseDir": "your-org-updates",
    "statsDir": "your-org-stats",
    "contributionsDir": "contributions",
    "drepVotingDir": "drep-voting",
    "catalystProposalsDir": "catalyst-proposals",
    "discordStatsDir": "discord-stats"
  },
  "githubUrls": {
    "dependentsUrl": "https://github.com/YourOrg/your-main-repo/network/dependents?dependent_type=REPOSITORY&package_id=YOUR_PACKAGE_ID"
  }
}
```

## Testing Configuration

You can test your configuration by running:

```bash
cd apps/sidan-gov
node scripts/org-stats/test-config.js
```

This will load and display the configuration to verify it's working correctly.

## GitHub Actions

The GitHub Actions workflow automatically copies the config file to the working directory before running the scripts. Make sure the config file is in the root of the repository.

## Scripts That Use This Config

The following scripts have been updated to use the configuration file:

- `fetch-org-stats-data.js` - Main data fetching script
- `fetch-yearly-contributors.js` - Yearly contributors data
- `generate-yearly-stats.js` - Yearly statistics generation
- `generate-org-stats.js` - Main stats generation script
- `generate-org-stats-json.js` - JSON output generation
- `generate-yearly-org-stats-json.js` - Yearly JSON output generation

All scripts now dynamically use the organization name, repository names, and npm package names from the configuration file instead of hardcoded values. 