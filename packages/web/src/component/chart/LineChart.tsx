import React from 'react';
import * as d3 from 'd3';
import './LineChart.scss';
import { ChargeState, DriveState } from '@teslapp/common';

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

interface LineChartProps {
  datum: DriveState[] | ChargeState[];
  options?: ChartConfig;
}

const defaultConfig = {
  width: 900,
  height: 600,
  margin: { top: 40, bottom: 20, left: 40, right: 40 },
  barWidth: 25,
  xAxisHeight: 140,
  yAxisWidth: 25
};

export const LineChart: React.FC<LineChartProps> = (props: LineChartProps) => {
  const container = React.createRef<SVGSVGElement>();
  const [config, setConfig] = React.useState(props.options || defaultConfig);
  const [innerWidth, setInnerWidth] = React.useState(
    config.width - config.margin.left - config.margin.right
  );
  const [innerHeight, setInnerHeight] = React.useState(
    config.height - config.margin.top - config.margin.bottom
  );

  React.useLayoutEffect(() => {
    const svg = d3.select(container.current);

    // clean up existing x-axis or lines
    svg.selectAll('.axis').remove();
    svg.selectAll('path.line').remove();

    if (props.datum && config && container.current) {
      const yDomainLeft = [0, 100];
      const maxValRight = 300;

      const yDomainRight = d3.extent([0, maxValRight]) as number[];
      const xScale = d3.scaleTime().range([0, innerWidth]);
      const yScaleLeft = d3
        .scaleLinear()
        .domain(yDomainLeft)
        .range([innerHeight - config.xAxisHeight, 0]);
      const yScaleRight = d3
        .scaleLinear()
        .domain(yDomainRight)
        .range([innerHeight - config.xAxisHeight, 0]);
      const xAxis = svg
        .append('g')
        .attr('class', 'axis axis-x')
        .attr(
          'transform',
          `translate(${config.margin.left}, ${innerHeight +
            config.margin.top -
            config.xAxisHeight})`
        );
      const yAxisLeft = svg
        .append('g')
        .attr('class', 'axis axis-y')
        .attr(
          'transform',
          `translate(${config.margin.left}, ${config.margin.top})`
        )
        .call(d3.axisLeft(yScaleLeft));
      const yAxisRight = svg
        .append('g')
        .attr('class', 'axis axis-y right')
        .attr(
          'transform',
          `translate(${config.margin.left + innerWidth} , ${config.margin.top})`
        )
        .call(d3.axisRight(yScaleRight));
      xScale.domain(
        // eslint-disable-next-line
        // @ts-ignore
        d3.extent(props.datum, (data) => new Date(data.timestamp)) as [
          Date,
          Date
        ]
      );

      xAxis
        .transition()
        .call(
          d3.axisBottom(xScale)
          // .ticks(15)
        )
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-65)');
      yAxisLeft.transition().call(d3.axisLeft(yScaleLeft));

      yAxisRight.transition().call(d3.axisRight(yScaleRight));

      // const chargeLimitLine = d3.line()
      //                           .x((d: any) => xScale(new Date(d.timestamp)))
      //                           // @ts-ignore
      //                           .y(yScaleLeft(props.session.charge_limit_soc || 80));
      // svg.append('path')
      //    .datum(props.datum)
      //    .attr('class', 'line charge_limit_soc')
      //    // @ts-ignore
      //    .attr('d', chargeLimitLine)
      //    .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);
      //
      // const chargeMaxLimitLine = d3.line()
      //                              .x((d: any) => xScale(new Date(d.timestamp)))
      //                              // @ts-ignore
      //                              .y(yScaleLeft(props.session.charge_limit_soc_std || 80));
      // svg.append('path')
      //    .datum(props.datum)
      //    .attr('class', 'line charge_limit_soc_std')
      //    // @ts-ignore
      //    .attr('d', chargeMaxLimitLine)
      //    .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);
      //
      // const chargeMinLimitLine = d3.line()
      //                              .x((d: any) => xScale(new Date(d.timestamp)))
      //                              // @ts-ignore
      //                              .y(yScaleLeft(props.session.charge_limit_soc_min || 20));
      // svg.append('path')
      //    .datum(props.datum)
      //    .attr('class', 'line charge_limit_soc_min')
      //    // @ts-ignore
      //    .attr('d', chargeMinLimitLine)
      //    .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

      const batteryLevelLine = d3
        .line()
        .x((d: any) => xScale(new Date(d.timestamp)))
        .y((d: any) => yScaleLeft(d.battery_level));
      svg
        .append('path')
        .datum(props.datum)
        .attr('class', 'line battery_level')
        // eslint-disable-next-line
        // @ts-ignore
        .attr('d', batteryLevelLine)
        .attr(
          'transform',
          `translate(${config.margin.left}, ${config.margin.top})`
        );

      // TODO: this will cause console errors for now when showing a driving session,
      // rather than fix it here, the datum abstraction will solve it
      // default chargerpower to 0 for now :)
      const powerLine = d3
        .line()
        .x((d: any) => xScale(new Date(d.timestamp)))
        .y((d: any) => yScaleRight(d.charger_power || 0));
      svg
        .append('path')
        .datum(props.datum)
        .attr('class', 'line charger_power')
        // eslint-disable-next-line
        // @ts-ignore
        .attr('d', powerLine)
        .attr(
          'transform',
          `translate(${config.margin.left}, ${config.margin.top})`
        );
    }
  }, [props.datum, config]);

  return (
    <div>
      {props.datum && (
        <div className="chart-container">
          <svg
            className="d3-chart"
            width={config.width}
            height={config.height}
            ref={container}
          />
          <div className="chart-legend"></div>
        </div>
      )}
    </div>
  );
};
