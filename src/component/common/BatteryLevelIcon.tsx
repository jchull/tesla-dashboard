import React from 'react';
import * as d3 from 'd3';
import './BatteryLevelIcon.css';

interface BatteryLevelState {
  battery_level: number,
  battery_range: number,
  charging_state: string
}


export const BatteryLevelIcon: React.SFC<BatteryLevelState> = (props: BatteryLevelState) => {
  const container = React.useRef(null);
  const svg = d3.select(container.current);

  React.useEffect(() => {
        svg.selectAll('path')
           .remove();

        // battery_level 0% - 100%
        const domain = [0, 100];
        const scale = d3.scaleLinear()
                        .domain(domain)
                        .range([0, 180]);

        let fillColor = '#00b32a';

        if (props.battery_level < 11) {
          fillColor = '#ff0000';
        } else if (props.battery_level < 21) {
          fillColor = '#ffae0c';
        } else if (props.battery_level > 89) {
          fillColor = '#3f6ae1';
        }

        const batteryLevelBar = svg.append('g')
                                   .attr('class', 'battery-level-bar')
                                   .append('rect')
                                   .attr('x', 0)
                                   .attr('y', 0)
                                   .attr('width', 0)
                                   .attr('height', 88)
                                   .style('fill', fillColor)
                                   .transition()
                                   .delay(300)
                                   .attr('width', d => scale(props.battery_level));

        const batteryOutline = svg.append('g')
                                  .attr('class', 'battery');

        batteryOutline.append('rect')
                      .attr('x', 4)
                      .attr('y', 4)
                      .attr('width', 180)
                      .attr('height', 90);

        batteryOutline.append('rect')
                      .attr('width', 20)
                      .attr('height', 40)
                      .attr('x', 186)
                      .attr('y', 28);
        if (props.charging_state === 'Charging') {
          const bolt = svg.append('path')
                          .attr('class', 'bolt')
                          .attr('fill', '#fff')
                          .attr('d', 'M 33.593226,39.265319 75.900912,39.265319 75.900912,23.880706 133.59323,54.649933 91.285531,54.649933 91.285531,70.034546 33.593226,39.265319 Z');
        }
      },
      [props]);

  return (
      <div className="battery-icon">
        <svg
            viewBox="0 0 210 100"
            ref={container}
        />
      </div>
  );
};



