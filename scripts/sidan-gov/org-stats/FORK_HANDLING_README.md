# Fork Handling in Contributor Scripts

This document explains how the contributor scripts handle forked repositories to ensure accurate contribution tracking.

## Overview

The scripts have been modified to properly handle forked repositories by distinguishing between:
- **Original repositories**: Repositories created by your organization
- **Forked repositories**: Repositories forked from other organizations

## Fork Handling Logic

### For Forked Repositories

When a repository is identified as a fork (`repo.fork === true`):

1. **Commits**: Only count commits made to your fork (in your organization)
   - Fetches commits from `your-org/forked-repo`
   - Does NOT count commits made to the upstream repository

2. **Pull Requests**: Only count pull requests made FROM your fork TO the upstream repository
   - Fetches PRs from the upstream repository (`upstream-org/original-repo`)
   - Filters to only include PRs where the head repository is your fork
   - Does NOT count other PRs made to the upstream repository

### For Original Repositories

When a repository is NOT a fork (`repo.fork === false`):

1. **Commits**: Count all commits made to your repository
   - Fetches commits from `your-org/your-repo`

2. **Pull Requests**: Count all pull requests made TO your repository
   - Fetches PRs from `your-org/your-repo`
   - Includes PRs from other forks of your repository
   - Includes PRs from any other source

## Example Scenarios

### Scenario 1: You fork a repository from MeshJS

**Repository**: `sidan-lab/mesh` (fork of `MeshJS/mesh`)

**What gets counted**:
- ✅ Commits made to `sidan-lab/mesh`
- ✅ Pull requests made from `sidan-lab/mesh` to `MeshJS/mesh`

**What does NOT get counted**:
- ❌ Commits made to `MeshJS/mesh`
- ❌ Pull requests made by others to `MeshJS/mesh`

### Scenario 2: Someone forks your repository

**Repository**: `sidan-lab/whisky` (original repository)
**Someone's fork**: `other-user/whisky` (fork of `sidan-lab/whisky`)

**What gets counted**:
- ✅ Commits made to `sidan-lab/whisky`
- ✅ Pull requests made from `other-user/whisky` to `sidan-lab/whisky`

**What does NOT get counted**:
- ❌ Commits made to `other-user/whisky`

## Implementation Details

### Repository Detection

The scripts detect forked repositories using:
```javascript
const isFork = repo.fork;
const upstreamOrg = repo.source?.owner?.login;
```

### Commit Filtering

For forked repositories, commits are only fetched if:
```javascript
if (!isFork || (isFork && repoOrgName === repo.owner?.login)) {
    // Fetch commits
}
```

### Pull Request Filtering

For forked repositories, PRs are filtered to only include those from your fork:
```javascript
const ourForkPRs = pullsResponse.data.filter(pr => {
    if (!pr.merged_at) return false;
    
    // Check if the PR head repo is our fork
    return pr.head?.repo?.owner?.login === repo.owner?.login &&
           pr.head?.repo?.name === repo.name;
});
```

## Configuration

The fork handling works automatically based on the repository metadata from GitHub's API. No additional configuration is required.

## Files Modified

- `fetch-yearly-contributors.js`: Updated to handle forks in yearly contributor data
- `fetch-org-stats-data.js`: Updated to handle forks in overall contributor data

## Testing

To test the fork handling:

1. Run the scripts with a GitHub token that has access to your repositories
2. Check the console output for messages indicating fork detection
3. Verify that only appropriate contributions are counted for each repository type

## Troubleshooting

### Common Issues

1. **Missing fork information**: Ensure your GitHub token has sufficient permissions to access repository metadata
2. **Incorrect PR filtering**: Check that the upstream organization and repository names are correctly identified
3. **Rate limiting**: The scripts include rate limit handling, but you may need to adjust API call frequency

### Debug Output

The scripts provide detailed console output showing:
- Whether each repository is identified as a fork
- The upstream repository for forked repos
- Number of commits and PRs found for each repository
- Filtering results for forked repositories 