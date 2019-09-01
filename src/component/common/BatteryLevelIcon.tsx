import React from 'react';
import * as d3 from 'd3';
import './BatteryLevelIcon.scss';

interface BatteryLevelState {
    battery_level: number;
    width: number;
    battery_range?: number;
    charge_limit?: number;
    charge_limit_low?: number;
    charging_state?: string;
}

const sizeFactor = 10;
const strokeWidth = 2 * sizeFactor;



export const BatteryLevelIcon: React.FC<BatteryLevelState> = (props: BatteryLevelState) => {
    const container = React.useRef(null);
    const svg = d3.select(container.current);

    // css style to scale it down to the proper size
    const batteryStyle = {width: props.width};
    const outerHeight = props.width * sizeFactor / 2;
    const outerWidth = props.width * sizeFactor;
    const viewBox = `0 0 ${outerWidth} ${outerHeight}`;

    const terminalHeight = outerHeight / 4;
    const terminalWidth = 2 * sizeFactor;

    const innerHeight = outerHeight - (strokeWidth * 2);
    const innerWidth = outerWidth - (strokeWidth * 2) - terminalWidth;

    React.useEffect(() => {
        svg.selectAll('svg>*')
            .remove();

        // battery_level 0% - 100%
        const domain = [0, 100];
        const scale = d3.scaleLinear()
            .domain(domain)
            .range([0, innerWidth]);

        let fillColor = '#00dc31';

        const low_charge = 20;

        if (props.battery_level < low_charge) {
            fillColor = '#ffa748';
            // } else if (props.battery_level < 21) {
            //   fillColor = '#ffae0c';
        } else if (props.battery_level > 89) {
            fillColor = '#4370f8';
        }

        const batteryOutline = svg.append('g')
            .attr('class', 'battery');

        // first draw the charge limit, so the battery level fill will draw on top
        if (props.charge_limit) {
            batteryOutline.append('rect')
                .attr('class', 'charge_limit')
                .attr('x', scale(low_charge))
                .attr('y', 0)
                .attr('aria-label', 'Battery Level')
                .attr('width', scale(props.charge_limit - low_charge))
                .attr('height', outerHeight);
        }

        // the stroke width of the battery outline needs to be taken into account
        const batteryLevelBar = svg.append('g')
            .attr('class', 'battery-level-bar')
            .append('rect')
            .attr('x', strokeWidth)
            .attr('y', strokeWidth)
            .attr('width', scale(props.battery_level))
            .attr('height', innerHeight)
            .style('fill', fillColor);


        // main battery body
        batteryOutline.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', outerWidth - terminalWidth)
            .attr('height', outerHeight)
            .attr('stroke-width', strokeWidth);

        // positive terminal
        batteryOutline.append('rect')
            .attr('width', 2)
            .attr('height', terminalHeight)
            .attr('x', outerWidth - terminalWidth)
            .attr('y', (outerHeight - terminalHeight) / 2)
            .attr('stroke-width', strokeWidth);


        if (props.charging_state === 'Charging') {
            const bolt = svg.append('path')
                .attr('class', 'bolt')
                .attr('fill', '#fff')
                .attr('stroke-width', strokeWidth/2)
                .attr('stroke-miterlimit', 150)
                .attr('d', 'M 13.722257,5.6956486 26.264654,10.530665 16.343495,9.5419236 16.58168,13.957745 6.6609412,9.1667774 14.221217,10.580474 Z');
        }
    },
    [props]);

    return (
        <div className="battery-icon"
            style={batteryStyle}>
            <svg
                viewBox={viewBox}
                ref={container}
            />
        </div>
    );
};



