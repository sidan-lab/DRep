import { useEffect, useRef, useState } from 'react';
import styles from '../styles/StakePoolGrowth.module.css';
import * as d3 from 'd3';
import { getEpochForDate } from '../utils/epochUtils';

interface StakePoolDataPoint {
    date: Date;
    liveStake: number;
    delegators: number;
}

interface StakePoolGrowthChartProps {
    data: StakePoolDataPoint[];
}

export default function StakePoolGrowthChart({ data }: StakePoolGrowthChartProps) {
    const chartRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState<'liveStake' | 'delegators' | null>(null);
    const [hoveredData, setHoveredData] = useState<StakePoolDataPoint | null>(null);
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        if (!chartRef.current || !data || data.length === 0) {
            return;
        }

        // Clear any existing SVG
        d3.select(chartRef.current).selectAll('*').remove();

        // Set up dimensions - remove top margin since we moved legend outside
        const margin = { top: 20, right: 60, bottom: 30, left: 60 };
        const width = chartRef.current.clientWidth - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        // Create SVG
        const svg = d3.select(chartRef.current)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Set up scales
        const xScale = d3.scaleTime()
            .domain(d3.extent(data, (d: StakePoolDataPoint) => d.date) as [Date, Date])
            .range([0, width]);

        const yScaleStake = d3.scaleLinear()
            .domain([0, d3.max(data, (d: StakePoolDataPoint) => d.liveStake) as number])
            .range([height, 0]);

        const yScaleDelegators = d3.scaleLinear()
            .domain([0, d3.max(data, (d: StakePoolDataPoint) => d.delegators) as number])
            .range([height, 0]);

        // Create line generators
        const lineLiveStake = d3.line<StakePoolDataPoint>()
            .x((d: StakePoolDataPoint) => xScale(d.date))
            .y((d: StakePoolDataPoint) => yScaleStake(d.liveStake))
            .curve(d3.curveMonotoneX);

        const lineDelegators = d3.line<StakePoolDataPoint>()
            .x((d: StakePoolDataPoint) => xScale(d.date))
            .y((d: StakePoolDataPoint) => yScaleDelegators(d.delegators))
            .curve(d3.curveMonotoneX);

        // Add axes
        svg.append('g')
            .attr('class', styles.xAxis)
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale));

        svg.append('g')
            .attr('class', styles.yAxisStake)
            .call(d3.axisLeft(yScaleStake)
                .tickFormat((d: d3.NumberValue) => `₳${d3.format('.2s')(d.valueOf())}`));

        svg.append('g')
            .attr('class', styles.yAxisDelegators)
            .attr('transform', `translate(${width},0)`)
            .call(d3.axisRight(yScaleDelegators)
                .tickFormat((d: d3.NumberValue) => d3.format('.0f')(d.valueOf())));

        // Add gradients - normal white gradients
        const gradientLiveStake = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'gradientLiveStake')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%');

        gradientLiveStake.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', 'rgba(255, 255, 255, 0.9)');

        gradientLiveStake.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', 'rgba(255, 255, 255, 0.7)');

        const gradientDelegators = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'gradientDelegators')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%');

        gradientDelegators.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', 'rgba(255, 255, 255, 0.8)');

        gradientDelegators.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', 'rgba(255, 255, 255, 0.6)');

        // Add hover gradients with teal color
        const gradientLiveStakeHover = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'gradientLiveStakeHover')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%');

        gradientLiveStakeHover.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', 'rgba(56, 232, 225, 0.9)');

        gradientLiveStakeHover.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', 'rgba(56, 232, 225, 0.7)');

        const gradientDelegatorsHover = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'gradientDelegatorsHover')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%');

        gradientDelegatorsHover.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', 'rgba(56, 232, 225, 0.8)');

        gradientDelegatorsHover.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', 'rgba(56, 232, 225, 0.6)');

        // Add the lines
        const liveStakeLine = svg.append('path')
            .datum(data)
            .attr('class', styles.lineLiveStake)
            .attr('d', lineLiveStake)
            .style('stroke', 'url(#gradientLiveStake)');

        const delegatorsLine = svg.append('path')
            .datum(data)
            .attr('class', styles.lineDelegators)
            .attr('d', lineDelegators)
            .style('stroke', 'url(#gradientDelegators)');

        // Add hover effects
        const focus = svg.append('g')
            .attr('class', styles.focus)
            .style('display', 'none');

        focus.append('circle')
            .attr('class', styles.focusCircleLiveStake)
            .attr('r', 4);

        focus.append('circle')
            .attr('class', styles.focusCircleDelegators)
            .attr('r', 4);

        const overlay = svg.append('rect')
            .attr('class', styles.overlay)
            .attr('width', width)
            .attr('height', height)
            .style('fill', 'none')
            .style('pointer-events', 'all');

        // Hover interaction
        overlay
            .on('mouseover', () => focus.style('display', null))
            .on('mouseout', () => {
                focus.style('display', 'none');
                
                // Reset line styles to default
                liveStakeLine
                    .style('stroke', 'url(#gradientLiveStake)')
                    .classed(styles.lineLiveStakeActive, false);
                delegatorsLine
                    .style('stroke', 'url(#gradientDelegators)')
                    .classed(styles.lineDelegatorsActive, false);
                
                setHovered(null);
                setHoveredData(null);
                setMousePosition(null);
            })
            .on('mousemove', (event: MouseEvent) => {
                const [mouseX, mouseY] = d3.pointer(event);
                const x0 = xScale.invert(mouseX);
                const bisectDate = d3.bisector<StakePoolDataPoint, Date>((d: StakePoolDataPoint) => d.date).left;
                const i = bisectDate(data, x0, 1);
                if (i >= data.length) return;

                const d0 = data[i - 1];
                const d1 = data[i];
                if (!d0 || !d1) return;

                const d = x0.getTime() - d0.date.getTime() > d1.date.getTime() - x0.getTime() ? d1 : d0;

                const x = xScale(d.date);
                const yLiveStake = yScaleStake(d.liveStake);
                const yDelegators = yScaleDelegators(d.delegators);

                // Determine which line is closer to the mouse
                const distanceToLiveStake = Math.abs(mouseY - yLiveStake);
                const distanceToDelegators = Math.abs(mouseY - yDelegators);
                const closestLine = distanceToLiveStake < distanceToDelegators ? 'liveStake' : 'delegators';

                // Update line styles directly with D3
                if (closestLine === 'liveStake') {
                    liveStakeLine
                        .style('stroke', 'url(#gradientLiveStakeHover)')
                        .classed(styles.lineLiveStakeActive, true);
                    delegatorsLine
                        .style('stroke', 'url(#gradientDelegators)')
                        .classed(styles.lineDelegatorsActive, false);
                } else {
                    delegatorsLine
                        .style('stroke', 'url(#gradientDelegatorsHover)')
                        .classed(styles.lineDelegatorsActive, true);
                    liveStakeLine
                        .style('stroke', 'url(#gradientLiveStake)')
                        .classed(styles.lineLiveStakeActive, false);
                }

                // Set hover state for tooltip
                setHovered(closestLine);

                focus.select(`.${styles.focusCircleLiveStake}`)
                    .attr('cx', x)
                    .attr('cy', yLiveStake);

                focus.select(`.${styles.focusCircleDelegators}`)
                    .attr('cx', x)
                    .attr('cy', yDelegators);

                setHoveredData(d);
                setMousePosition({ x: mouseX + margin.left, y: event.offsetY });
            });

    }, [data]);

    return (
        <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>Stake Pool Growth Over Time</h3>
                <div className={styles.legendContainer}>
                    <div className={styles.legendItem}>
                        <div className={styles.legendLine} style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}></div>
                        <span className={styles.legendLabel}>Live Stake</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={styles.legendLine} style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}></div>
                        <span className={styles.legendLabel}>Delegators</span>
                    </div>
                </div>
            </div>
            <div ref={chartRef} className={styles.chart} style={{ position: 'relative' }}>
                {hoveredData && mousePosition && (
                    <div
                        className={styles.tooltip}
                        style={{
                            position: 'absolute',
                            left: `${mousePosition.x + 10}px`,
                            top: `${mousePosition.y - 10}px`,
                            transform: 'translateY(-50%)',
                            zIndex: 1000,
                            pointerEvents: 'none'
                        }}
                    >
                        <div><strong>Date:</strong> {hoveredData.date.toLocaleDateString()}</div>
                        <div><strong>Epoch:</strong> {getEpochForDate(hoveredData.date)}</div>
                        <div><strong>Live Stake:</strong> ₳{hoveredData.liveStake.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                        <div><strong>Delegators:</strong> {hoveredData.delegators.toLocaleString()}</div>
                    </div>
                )}
            </div>
        </div>
    );
} 