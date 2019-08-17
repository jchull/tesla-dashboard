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
                        .range([0, 690]);

        let fillColor = '#00b32a';

        if(props.battery_level < 11){
          fillColor = '#ff0000';
        } else if(props.battery_level < 21){
          fillColor = '#ffae0c';
        } else if(props.battery_level > 89){
          fillColor = '#3f6ae1';
        }

        const batteryLevelBar = svg.append('g')
                                   .attr('class', 'battery-level-bar')
                                   .append('rect')
                                   .attr('x', 0)
                                   .attr('y', 0)
                                   .attr('width', 0)
                                   .attr('height', 400)
                                   .style('fill', fillColor)
                                   .transition()
                                   .delay(200)
                                   .attr('width', d => scale(props.battery_level));

        const batteryOutline = svg.append('g')
                                  .attr('class', 'battery')
                                  .append('path')
                                  .attr('d', 'm690.1 99.7h76.2c6 0 11.2 2.4 15 6.2s6.2 9.2 6.2 15.2v208.2c0 5.8-2.4 11.2-6.2 15s-9.2 6.2-15 6.2h-76.2v62.4c0 10-4.2 19.2-10.8 26-6.6 6.6-15.8 10.8-26 10.8h-616.4c-10 0-19.2-4.2-26-10.8-6.6-6.6-10.8-15.8-10.8-26v-376c0-10.2 4.2-19.4 10.8-26s15.8-10.8 26-10.8h616.4c10.2 0 19.2 4.2 26 10.8 6.6 6.6 10.8 15.8 10.8 26v62.4zm61.2 36.2h-61.2v178.6h61.2zm-97.6 196.6v-295.4s0-0.2-0.2-0.4l-0.2-0.2h-616.4c-0.2 0-0.2 0-0.4 0.2-0.5 125.3-0.2 251-0.2 376.4 0 0 0 0.2 0.2 0.2 0.2 0.2 0.2 0.2 0.4 0.2h616.4s0.2 0 0.2-0.2l0.2-0.2z');
        if (props.charging_state === 'Charging') {
          const bolt = svg.append('path')
                          .attr('fill', '#fff')
                          .attr('d', 'M 510.93227,230.83773 230.84852,134.15943 267.72271,241.21694 48.539165,261.79066 349.03589,305.69022 316.94026,217.14431 Z');
        }

      },
      [props]);

  return (
      <div className="battery-icon">
        <svg
            viewBox="0 0 788 450"
            ref={container}
        />
      </div>
  );
};



