import React from 'react';
import * as d3 from 'd3';
import {ProductType} from '../../type/ProductType';
import {ChargeDatum} from '../../type/Datum';


interface Margin {
  top: number,
  right: number,
  bottom: number,
  left: number
}

interface ChartConfig {
  width: number,
  height: number,
  barWidth: number,
  xAxisHeight: number,
  yAxisWidth: number,
  margin: Margin
}

type ChargeChartState = {
  product: ProductType,
  energyAdded?: number,
  durationMinutes?: number,
  data: ChargeDatum[],
  config?: ChartConfig
}

const defaultConfig = {
  width: 600,
  height: 300,
  margin: {top: 20, bottom: 20, left: 100, right: 100},
  barWidth: 25,
  xAxisHeight: 100,
  yAxisWidth: 25
};

export const ChargeChart: React.SFC<ChargeChartState> = (props: ChargeChartState) => {
  const container = React.useRef(null);
  const [config, setConfig] = React.useState(props.config || defaultConfig);
  const [innerWidth, setInnerWidth] = React.useState(config.width - config.margin.left - config.margin.right);
  const [innerHeight, setInnerHeight] = React.useState(config.height - config.margin.top - config.margin.bottom);
  const svg = d3.select(container.current);
  const chart = svg
      .append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

  const yDomain = [0, 100]; // TODO: scale for different y value source, configuration

  const colors = d3.scaleLinear()
                   .domain(yDomain)
                   .range(['#17a14e', '#ff5945'] as any[]);
  const timeExtents = d3.extent(props.data.map(d => d.timestamp));
  // @ts-ignore
  const xDomain = d3.extent(timeExtents);
  const xScale = d3.scaleTime()
                   .domain(xDomain)
                   .range([0, innerWidth]);
  const yScale = d3.scaleLinear()
                   .domain(yDomain)
                   .range([innerHeight - config.xAxisHeight, 0]);
  const xAxis = svg.append('g')
                   .attr('class', 'axis axis-x')
                   .attr('transform', `translate(${config.margin.left}, ${innerHeight + config.margin.top - config.xAxisHeight})`);
  const yAxis = svg.append('g')
                   .attr('class', 'axis axis-y')
                   .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`)
                   .call(d3.axisLeft(yScale));



  React.useEffect(() => {
    console.log('init chart');


  }, []);


  React.useEffect(() => {
    console.log('update chart');
        if (props.data && config && container.current) {


          xAxis.transition()
               .call(d3.axisBottom(xScale)
                       // .ticks(15)
               )
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
              .attr('x', (d: ChargeDatum) => xScale(d.timestamp))
              .attr('y', yScale(0))
              .attr('width', config.barWidth)
              .attr('height', 0)
              .style('fill', (d: ChargeDatum) => colors(d.chargerPower))
              .transition()
              .delay((d: ChargeDatum, i: number) => i * 4)
              .attr('y', (d: ChargeDatum) => yScale(d.chargeRate))
              .attr('height', (d: ChargeDatum) => innerHeight - config.xAxisHeight - yScale(d.chargeRate));

          bars.exit()
              .remove();
        }
      },
      [props.data, props.product, config, container.current]);

  return (
      <div>
        <h3>Charging Session</h3>
        <svg
            className="d3-chart"
            width={config.width}
            height={config.height}
            ref={container}
        />
      </div>
  );
};



