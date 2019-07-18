import React from 'react';
import * as d3 from 'd3';

interface datum {
  d: number,
  date: Date
}

interface ChartConfig {
  width: number,
  height: number
}

interface ChargeChartState {
  carName: string,
  energyAdded?: number,
  durationMinutes?: number,
  data: datum[],
  config?: ChartConfig
}

const yDomain = [-200, 200];
const margin = {top: 20, bottom: 20, left: 100, right: 100};
const endDate: number = new Date().valueOf();
const startDate: number = endDate - 10000;

export const ChargeChart: React.SFC<ChargeChartState> = (props: ChargeChartState) => {
  const container = React.useRef(null);

  const colors = d3.scaleLinear()
                   .domain(yDomain)
                   .range(['#17a14e', '#ff5945'] as any[]);

  const xScale = d3.scaleTime()
                   .range([0, 600]);
  const yScale = d3.scaleLinear()
                   .domain(yDomain)
                   .range([300, 0]);


  React.useEffect(() => {

  }, []);


  React.useEffect(() => {
        if (props.data && container.current) {
          const svg = d3.select(container.current);

          const chart = svg
              .append('g')
              .attr('class', 'bars')
              .attr('transform', `translate(${margin.left}, ${margin.top})`);

          const xAxis = svg.append('g')
                           .attr('class', 'axis axis-x')
                           .attr('transform', `translate(${margin.left}, ${margin.top + 300})`);
          const yAxis = svg.append('g')
                           .attr('class', 'axis axis-y')
                           .attr('transform', `translate(${margin.left}, ${margin.top})`)
                           .call(d3.axisLeft(yScale));
          xScale.domain([endDate, startDate])
                .range([0, 600]);
          xAxis.transition()
               .call(d3.axisBottom(xScale)
                       .ticks(15))
               .selectAll('text')
               .style('text-anchor', 'end')
               .attr('dx', '-.8em')
               .attr('dy', '.15em')
               .attr('transform', 'rotate(-65)');
          yAxis.transition()
               .call(d3.axisLeft(yScale));
          const bars = chart.selectAll('.bar')
                            .data(props.data);
          bars.enter()
              .append('rect')
              .attr('class', 'bar')
              .attr('x', (d: datum) => xScale(d.date))
              .attr('y', yScale(0))
              .attr('width', 25)
              .attr('height', 0)
              .style('fill', (d: datum) => colors(d.d))
              .transition()
              .delay((d: datum, i: number) => i * 4)
              .attr('y', (d: datum) => yScale(d.d))
              .attr('height', (d: datum) => 300 - yScale(d.d));


          bars.exit()
              .remove();
        }
      },
      [props.data, props.config, container.current]);

  return (
      <div>
        <h3>Charging Session</h3>
        <svg
            className="d3-chart"
            width={600}
            height={300}
            ref={container}
        />
      </div>
  );
};



