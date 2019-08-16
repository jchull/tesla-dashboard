import React from 'react';
import * as d3 from 'd3';
import './LineChart.css';
import {IVehicle} from '../../type/Vehicle';
import {IVehicleSession} from '../../type/VehicleSession';
import {IVehicleState} from '../../type/VehicleState';


interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface ChartConfig {
  width: number;
  height: number;
  xAxisHeight: number;
  yAxisWidth: number;
  margin: Margin;
}

interface LineChartState {
  vehicle: IVehicle;
  session: IVehicleSession;
  states: Array<IVehicleState>;
  config?: ChartConfig;
}

const defaultConfig = {
  width: 900,
  height: 600,
  margin: {top: 40, bottom: 20, left: 40, right: 40},
  barWidth: 25,
  xAxisHeight: 140,
  yAxisWidth: 25
};

export const LineChart: React.SFC<LineChartState> = (props: LineChartState) => {
  const container = React.useRef(null);
  const [config, setConfig] = React.useState(props.config || defaultConfig);
  const [innerWidth, setInnerWidth] = React.useState(config.width - config.margin.left - config.margin.right);
  const [innerHeight, setInnerHeight] = React.useState(config.height - config.margin.top - config.margin.bottom);
  const svg = d3.select(container.current);


  React.useEffect(() => {
    console.log('init chart');


  }, []);


  React.useEffect(() => {
        console.log('update chart');
        // clean up existing x-axis or lines
        svg.selectAll('.axis')
           .remove();
        svg.selectAll('path.line')
           .remove();


        if (props.states && config && container.current) {
          const yDomainLeft = [0, 100];
          const yDomainRight = d3.extent(props.states.map(vehicleState => vehicleState.est_battery_range)
                                              .concat([0, 320])) as Array<number>;
          const xScale = d3.scaleTime()
                           .range([0, innerWidth]);
          const yScaleLeft = d3.scaleLinear()
                               .domain(yDomainLeft)
                               .range([innerHeight - config.xAxisHeight, 0]);
          const yScaleRight = d3.scaleLinear()
                                .domain(yDomainRight)
                                .range([innerHeight - config.xAxisHeight, 0]);
          const xAxis = svg.append('g')
                           .attr('class', 'axis axis-x')
                           .attr('transform', `translate(${config.margin.left}, ${innerHeight + config.margin.top - config.xAxisHeight})`);
          const yAxisLeft = svg.append('g')
                               .attr('class', 'axis axis-y')
                               .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`)
                               .call(d3.axisLeft(yScaleLeft));
          const yAxisRight = svg.append('g')
                                .attr('class', 'axis axis-y right')
                                .attr('transform', `translate(${config.margin.left + innerWidth} , ${config.margin.top})`)
                                .call(d3.axisRight(yScaleRight));

          const startTime = new Date(props.session.first.timestamp);
          const endTime = new Date(props.session.last && props.session.last.timestamp || Date.now());
          const xDomain = [startTime, endTime];
          // @ts-ignore
          xScale.domain(xDomain);


          xAxis.transition()
               .call(d3.axisBottom(xScale)
                   // .ticks(15)
               )
               .selectAll('text')
               .style('text-anchor', 'end')
               .attr('dx', '-.8em')
               .attr('dy', '.15em')
               .attr('transform', 'rotate(-65)');
          yAxisLeft.transition()
                   .call(d3.axisLeft(yScaleLeft));

          yAxisRight.transition()
                    .call(d3.axisRight(yScaleRight));

          const chargeLimitLine = d3.line()
                                    .x((d: any) => xScale(new Date(d.timestamp)))
                                    // @ts-ignore
                                    .y((d: any) => yScaleLeft(props.session.charge_limit_soc || 80));
          svg.append('path')
             .datum(props.states)
             .attr('class', 'line charge_limit_soc')
             // @ts-ignore
             .attr('d', chargeLimitLine)
             .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

          const chargeMaxLimitLine = d3.line()
                                       .x((d: any) => xScale(new Date(d.timestamp)))
                                       // @ts-ignore
                                       .y((d: any) => yScaleLeft(props.session.charge_limit_soc_std || 80));
          svg.append('path')
             .datum(props.states)
             .attr('class', 'line charge_limit_soc_std')
             // @ts-ignore
             .attr('d', chargeMaxLimitLine)
             .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

          const chargeMinLimitLine = d3.line()
                                       .x((d: any) => xScale(new Date(d.timestamp)))
                                       // @ts-ignore
                                       .y((d: any) => yScaleLeft(props.session.charge_limit_soc_min || 20));
          svg.append('path')
             .datum(props.states)
             .attr('class', 'line charge_limit_soc_min')
             // @ts-ignore
             .attr('d', chargeMinLimitLine)
             .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);


          const batteryLevelLine = d3.line()
                                     // @ts-ignore
                                     .x((d: any) => xScale(new Date(d.timestamp)))
                                     .y((d: any) => yScaleLeft(d.battery_level));
          svg.append('path')
             .datum(props.states)
             .attr('class', 'line battery_level')
             // @ts-ignore
             .attr('d', batteryLevelLine)
             .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

          const powerLine = d3.line()
                              .x((d: any) => xScale(new Date(d.timestamp)))
                              .y((d: any) => yScaleRight(d.charger_power));
          svg.append('path')
             .datum(props.states)
             .attr('class', 'line charger_power')
             // @ts-ignore
             .attr('d', powerLine)
             .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

          const rangeLine = d3.line()
                              .x((d: any) => xScale(new Date(d.timestamp)))
                              .y((d: any) => yScaleRight(d.battery_range));
          svg.append('path')
             .datum(props.states)
             .attr('class', 'line battery_range')
             // @ts-ignore
             .attr('d', rangeLine)
             .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

          const estRangeLine = d3.line()
                                 .x((d: any) => xScale(new Date(d.timestamp)))
                                 .y((d: any) => yScaleRight(d.est_battery_range));
          svg.append('path')
             .datum(props.states)
             .attr('class', 'line est_battery_range')
             // @ts-ignore
             .attr('d', estRangeLine)
             .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

        }
      },
      [props.states, config]);

  return (
      <div>
        <div className="chart-container">
          <svg
              className="d3-chart"
              width={config.width}
              height={config.height}
              ref={container}
          />
        </div>
        <div className="chart-legend">
        </div>
      </div>
  );
};



