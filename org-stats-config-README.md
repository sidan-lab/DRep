# Organization Stats Configuration

This document explains how to configure the organization stats scripts to work with different GitHub organizations and repositories.

## Configuration File

The main configuration file is `org-stats-config.json` located in the root of the repository. This file contains all the configurable values that the scripts use.

## How to Update the Configuration File

### Step 1: Basic Organization Information

Update the organization section with your GitHub organization details:

```json
{
  "organization": {
    "name": "your-github-org-name",     // GitHub organization name (used in API calls)
    "displayName": "Your Display Name", // Display name (used in console logs and UI)
    "logo": {
      "src": "/path-to-logo.png",       // Path to your organization logo
      "width": 40,                      // Logo width in pixels
      "height": 40                      // Logo height in pixels
    },
    "logoWithName": {
      "src": "/path-to-logo-with-name.png", // Path to logo with organization name
      "width": 120,                           // Logo width in pixels
      "height": 120                           // Logo height in pixels
    }
  }
}
```

**Example:**
```json
{
  "organization": {
    "name": "sidan-lab",
    "displayName": "Sidan",
    "logo": {
      "src": "/180250645.png",
      "width": 40,
      "height": 40
    },
    "logoWithName": {
      "src": "/sidan.png",
      "width": 120,
      "height": 120
    }
  }
}
```

### Step 2: Repository Configuration

Configure your repositories:

```json
{
  "repositories": {
    "governance": "your-governance-repo",        // Governance repository name
    "dependentsCountRepo": "your-main-repo"      // Repository used for dependents count
  }
}
```

**Example:**
```json
{
  "repositories": {
    "governance": "DRep",
    "dependentsCountRepo": "whisky"
  }
}
```

### Step 3: Stake Pool Configuration (Optional)

If you're tracking stake pool information, add your stake pool ID:

```json
{
  "poolId": "your-stake-pool-id-here"
}
```

**Example:**
```json
{
  "poolId": "pool1wnrrg33lw9fxcn0h3x3vexh78up660ajgk7pvrlrz5kkcgh9khs"
}
```

### Step 4: DRep Configuration (Optional)

If you're tracking DRep voting, add your DRep ID:

```json
{
  "drepId": "your-drep-id-here"
}
```

**Example:**
```json
{
  "drepId": "drep1yfjez5zup0gystdvc933w2mn8k64hcy3krvc2namluwjxdcfhm8wd"
}
```

### Step 5: NPM Package Configuration

Add your NPM packages that you want to track:

```json
{
  "npmPackages": {
    "package_key": "@your-org/package-name",
    "another_package": "@your-org/another-package"
  }
}
```

**Example:**
```json
{
  "npmPackages": {
    "csl_rs_browser": "@sidan-lab/sidan-csl-rs-browser",
    "csl_rs_nodejs": "@sidan-lab/sidan-csl-rs-nodejs",
    "whisky_js_browser": "@sidan-lab/whisky-js-browser",
    "whisky_js_nodejs": "@sidan-lab/whisky-js-nodejs"
  }
}
```

### Step 6: Output Directory Configuration

Configure where the generated files should be saved:

```json
{
  "outputPaths": {
    "baseDir": "your-org-updates",           // Base directory for all outputs
    "statsDir": "your-org-stats",            // Directory for statistics
    "contributionsDir": "contributions",     // Directory for contribution data
    "drepVotingDir": "drep-voting",         // Directory for DRep voting data
    "catalystProposalsDir": "catalyst-proposals", // Directory for Catalyst proposals
    "discordStatsDir": "discord-stats",      // Directory for Discord statistics
    "stakePoolDir": "stake-pool"             // Directory for stake pool data
  }
}
```

**Example:**
```json
{
  "outputPaths": {
    "baseDir": "sidan-gov-updates",
    "statsDir": "sidan-stats",
    "contributionsDir": "contributions",
    "drepVotingDir": "drep-voting",
    "catalystProposalsDir": "catalyst-proposals",
    "discordStatsDir": "discord-stats",
    "stakePoolDir": "stake-pool"
  }
}
```

### Step 7: Social Links Configuration (Optional)

Configure your organization's social media links:

```json
{
  "socialLinks": [
    {
      "name": "GitHub",
      "url": "https://github.com/your-org"
    },
    {
      "name": "Twitter",
      "url": "https://x.com/your-org"
    },
    {
      "name": "Discord",
      "url": "https://discord.gg/your-invite"
    }
  ]
}
```

**Example:**
```json
{
  "socialLinks": [
    {
      "name": "GitHub",
      "url": "https://github.com/sidan-lab"
    },
    {
      "name": "Twitter",
      "url": "https://x.com/sidan_lab"
    },
    {
      "name": "Discord",
      "url": "https://discord.gg/SN8EYZA8"
    }
  ]
}
```

### Step 8: Builder Projects (Optional)

Configure builder projects that will be displayed in the UI:

```json
{
  "builderProjects": [
    {
      "id": "unique_id",
      "icon": "/path-to-icon.png",
      "url": "https://project-website.com/"
    }
  ]
}
```

**Example:**
```json
{
  "builderProjects": [
    {
      "id": "b1",
      "icon": "/blink-labs.png",
      "url": "https://blinklabs.io/"
    },
    {
      "id": "b2",
      "icon": "/nmkr.png",
      "url": "https://www.nmkr.io/"
    },
    {
      "id": "b3",
      "icon": "/gimbalabs.png",
      "url": "https://www.gimbalabs.com/gimbalgrid"
    },
    {
      "id": "b4",
      "icon": "/aiken.png",
      "url": "https://aiken-lang.org/"
    },
    {
      "id": "b5",
      "icon": "/socious.png",
      "url": "https://socious.io/"
    },
    {
      "id": "b6",
      "icon": "/txpipe.png",
      "url": "https://txpipe.io/"
    },
    {
      "id": "b7",
      "icon": "/deltadefi.png",
      "url": "https://www.deltadefi.io/"
    },
    {
      "id": "b8",
      "icon": "/mesh-white-txt.png",
      "url": "https://meshjs.dev/"
    }
  ]
}
```

### Step 9: Highlighted Projects (Optional)

Configure projects you want to highlight:

```json
{
  "highlightedProjects": [
    {
      "id": "project-id",
      "name": "Project Name",
      "description": "Project description",
      "icon": "/path-to-icon.png",
      "url": "https://github.com/org/repo"
    }
  ]
}
```

**Example:**
```json
{
  "highlightedProjects": [
    {
      "id": "MeshJS mesh-core",
      "name": "MeshJS mesh-core",
      "description": "Collection of comprehensive TypeScript libraries for blockchain development on Cardano.",
      "icon": "/logo-mesh-white-512x512.png",
      "url": "https://github.com/MeshJS/mesh-core"
    }
  ]
}
```

### Step 10: Showcase Repositories (Optional)

Configure repositories to showcase:

```json
{
  "showcaseRepos": [
    {
      "name": "repo-name",
      "description": "Repository description",
      "icon": "/path-to-icon.png",
      "url": "https://github.com/org/repo"
    }
  ]
}
```

**Example:**
```json
{
  "showcaseRepos": [
    {
      "name": "cardano-bar",
      "description": "Cardano development tool set across frameworks & libraries.",
      "icon": "/180250645.png",
      "url": "https://github.com/sidan-lab/cardano-bar"
    },
    {
      "name": "whisky",
      "description": "An open-source Rust library for easy Cardano transaction building and unit testing.",
      "icon": "/180250645.png",
      "url": "https://github.com/sidan-lab/whisky"
    },
    {
      "name": "vodka",
      "description": "Provide utility function for aiken onchain validation and testing utility.",
      "icon": "/180250645.png",
      "url": "https://github.com/sidan-lab/vodka"
    },
    {
      "name": "rum",
      "description": "A golang library for Cardano development, compatible with Mesh and Whisky types.",
      "icon": "/180250645.png",
      "url": "https://github.com/sidan-lab/rum"
    },
    {
      "name": "gin",
      "description": "A python library for Cardano development, compatible with Mesh and Whisky types.",
      "icon": "/180250645.png",
      "url": "https://github.com/sidan-lab/gin"
    }
  ]
}
```

## Complete Configuration Example

Here's a complete example of how your configuration file should look:

```json
{
  "organization": {
    "name": "your-org",
    "displayName": "Your Organization",
    "logo": {
      "src": "/logo.png",
      "width": 40,
      "height": 40
    },
    "logoWithName": {
      "src": "/logo-with-name.png",
      "width": 120,
      "height": 120
    }
  },
  "repositories": {
    "governance": "your-governance-repo",
    "dependentsCountRepo": "your-main-repo"
  },
  "poolId": "your-stake-pool-id-if-applicable",
  "drepId": "your-drep-id-if-applicable",
  "npmPackages": {
    "core": "@yourorg/core",
    "react": "@yourorg/react",
    "utils": "@yourorg/utils"
  },
  "outputPaths": {
    "baseDir": "your-org-updates",
    "statsDir": "your-org-stats",
    "contributionsDir": "contributions",
    "drepVotingDir": "drep-voting",
    "catalystProposalsDir": "catalyst-proposals",
    "discordStatsDir": "discord-stats",
    "stakePoolDir": "stake-pool"
  },
  "socialLinks": [
    {
      "name": "GitHub",
      "url": "https://github.com/your-org"
    },
    {
      "name": "Twitter",
      "url": "https://x.com/your-org"
    }
  ],
  "builderProjects": [
    {
      "id": "b1",
      "icon": "/project1.png",
      "url": "https://project1.com/"
    }
  ],
  "highlightedProjects": [
    {
      "id": "main-project",
      "name": "Main Project",
      "description": "Your main project description",
      "icon": "/main-project.png",
      "url": "https://github.com/your-org/main-project"
    }
  ],
  "showcaseRepos": [
    {
      "name": "awesome-repo",
      "description": "An awesome repository",
      "icon": "/repo-icon.png",
      "url": "https://github.com/your-org/awesome-repo"
    }
  ]
}
```

## Testing Your Configuration

After updating the configuration file, you can test it by running:

```bash
cd scripts/sidan-gov
node org-stats/config-loader.js
```

This will load and display the configuration to verify it's working correctly.

## Important Notes

1. **File Location**: The configuration file must be in the root directory of the repository
2. **JSON Format**: Ensure the JSON is valid - use a JSON validator if needed
3. **GitHub Actions**: The GitHub Actions workflow automatically copies the config file to the working directory before running the scripts
4. **Icon Paths**: Icon paths should be relative to the public directory in your Next.js app
5. **URLs**: Make sure all URLs are accessible and correct
6. **Logo Images**: Ensure logo images exist in your public directory and match the specified dimensions
7. **Optional Fields**: Fields marked as "Optional" can be omitted if not needed for your use case

## Scripts That Use This Config

The following scripts have been updated to use the configuration file:

- `fetch-org-stats-data.js` - Main data fetching script
- `fetch-yearly-contributors.js` - Yearly contributors data
- `generate-yearly-stats.js` - Yearly statistics generation
- `generate-org-stats.js` - Main stats generation script
- `generate-org-stats-json.js` - JSON output generation
- `generate-yearly-org-stats-json.js` - Yearly JSON output generation

All scripts now dynamically use the organization name, repository names, and npm package names from the configuration file instead of hardcoded values. 