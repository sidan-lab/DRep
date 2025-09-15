# Contribution Timeline Charts Implementation

This document describes the implementation of the two line chart components for visualizing contributor activity in the SIDAN Gov dashboard.

## Components Overview

1. **Small Timeline Chart** - Used in contributor cards (height: 60px)
2. **Large Timeline Chart** - Used in contributor modal (height: 200px)

Both use the same `ContributionTimeline` component with different configurations.

## Files Structure

```
apps/sidan-gov/
├── components/
│   ├── ContributionTimeline.tsx      # Main timeline component
│   ├── TimelineExamples.tsx          # Example usage component
│   └── ContributorModal.tsx          # Modal with large timeline
├── utils/
│   └── contributorMetrics.ts         # Utility functions for metrics
├── styles/
│   ├── contributorCard.module.css    # Small timeline styles
│   └── ContributorModal.module.css   # Large timeline styles
├── types/
│   └── contributor.ts                # Type definitions
└── pages/
    └── contributors.tsx              # Main contributors page
```

## Features Implemented

✅ **Global Timeline Alignment**: All charts start from the same global date  
✅ **Time Window Filtering**: Filter data by start and end dates  
✅ **Interactive Tooltips**: Show detailed information on hover  
✅ **Responsive Design**: Adapts to container width  
✅ **Smooth Animations**: Glow effects and smooth line rendering  
✅ **Dual Data Visualization**: Shows both commits and PRs in a single timeline  

## Usage Examples

### Small Timeline (Contributor Card)
```typescript
import ContributionTimeline from './components/ContributionTimeline';
import styles from './styles/contributorCard.module.css';

<div className={styles.timelineContainer}>
    <ContributionTimeline
        commitTimestamps={contributor.repositories.flatMap(repo => repo.commit_timestamps)}
        prTimestamps={contributor.repositories.flatMap(repo => repo.pr_timestamps)}
        globalStartDate={globalStartDate}
        globalEndDate={globalEndDate}
    />
</div>
```

### Large Timeline (Modal)
```typescript
import ContributionTimeline from './components/ContributionTimeline';
import styles from './styles/ContributorModal.module.css';

<div className={styles.timelineContainer}>
    <ContributionTimeline
        commitTimestamps={contributor.repositories.flatMap(repo => repo.commit_timestamps)}
        prTimestamps={contributor.repositories.flatMap(repo => repo.pr_timestamps)}
        height={200}
        showAxis={false}
        globalStartDate={globalStartDate}
        globalEndDate={globalEndDate}
    />
</div>
```

## API Reference

### ContributionTimeline Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `commitTimestamps` | `string[]` | Required | Array of commit timestamps |
| `prTimestamps` | `string[]` | Required | Array of PR timestamps |
| `height` | `number` | `60` | Chart height in pixels |
| `showAxis` | `boolean` | `false` | Show/hide chart axes |
| `globalStartDate` | `string` | `undefined` | Global start date for timeline alignment |
| `globalEndDate` | `string` | `undefined` | Global end date for time window filtering |

### Utility Functions

#### `getFilteredMetrics(contributor, startDate, endDate)`
Filter contributor metrics based on time window.

#### `getFilteredSummaryMetrics(contributors, startDate, endDate)`
Calculate summary metrics for all contributors within a time window.

## Integration Status

The timeline components are fully integrated into the existing SIDAN Gov dashboard:

- ✅ **Contributors Page**: Uses small timelines with global alignment
- ✅ **Contributor Modal**: Uses large timeline for detailed view
- ✅ **Type Definitions**: All types are properly defined
- ✅ **CSS Styles**: Styling is consistent with existing design
- ✅ **Utility Functions**: Metrics filtering is available

## Dependencies

- `recharts`: ^2.15.2 (already installed)
- `react`: ^19.0.0 (already installed)

## Customization

The components can be easily customized:

1. **Colors**: Modify the `stroke` prop in the `Line` component
2. **Tooltip Styling**: Update the tooltip content function
3. **Container Styles**: Modify the CSS module files
4. **Chart Margins**: Adjust the `margin` prop in `LineChart`

## Testing

To test the timeline components:

1. Navigate to `/contributors` page to see small timelines
2. Click on any contributor card to see the large timeline in modal
3. Use the `TimelineExamples` component for development testing

The timelines will automatically align to the earliest contribution date across all contributors, making it easy to compare activity patterns. 