import React from 'react';
import * as d3 from 'd3';
import './ChargeChart.css';
import {IChargeSession} from '../../type/ChargeSession';
import {IVehicle} from '../../type/Vehicle';
import {IChargeState} from '../../type/ChargeState';


interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

interface ChartConfig {
    width: number;
    height: number;
    barWidth: number;
    xAxisHeight: number;
    yAxisWidth: number;
    margin: Margin;
}

interface ChargeChartState {
    vehicle: IVehicle;
    session: IChargeSession;
    states: Array<IChargeState>;
    config?: ChartConfig;
}

const defaultConfig = {
    width: 1000,
    height: 600,
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
            const yDomainRight = [0, Math.max(props.session.last.est_battery_range, 320)];
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
            const endTime = new Date(props.session.last.timestamp);
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
                                // @ts-ignore
                                .x((d: IChargeState) => xScale(new Date(d.timestamp)))
                                .y((d: IChargeState) => yScaleLeft(props.session.charge_limit_soc || 80));
            svg.append('path')
               .datum(props.states)
               .attr('class', 'line charge_limit_soc')
               .attr('d', chargeLimitLine)
               .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

            const chargeMaxLimitLine = d3.line()
                                      // @ts-ignore
                                      .x((d: IChargeState) => xScale(new Date(d.timestamp)))
                                      .y((d: IChargeState) => yScaleLeft(props.session.charge_limit_soc_std || 80));
            svg.append('path')
               .datum(props.states)
               .attr('class', 'line charge_limit_soc_std')
               .attr('d', chargeMaxLimitLine)
               .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

            const chargeMinLimitLine = d3.line()
                                      // @ts-ignore
                                      .x((d: IChargeState) => xScale(new Date(d.timestamp)))
                                      .y((d: IChargeState) => yScaleLeft(props.session.charge_limit_soc_min || 20));
            svg.append('path')
               .datum(props.states)
               .attr('class', 'line charge_limit_soc_min')
               .attr('d', chargeMinLimitLine)
               .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);




            const batteryLevelLine = d3.line()
                                      // @ts-ignore
                                      .x((d: IChargeState) => xScale(new Date(d.timestamp)))
                                      .y((d: IChargeState) => yScaleLeft(d.battery_level));
            svg.append('path')
               .datum(props.states)
               .attr('class', 'line battery_level')
               .attr('d', batteryLevelLine)
               .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

            const powerLine = d3.line()
            // @ts-ignore
                .x((d: IChargeState) => xScale(new Date(d.timestamp)))
                .y((d: IChargeState) => yScaleRight(d.charger_power));
            svg.append('path')
                .datum(props.states)
                .attr('class', 'line charger_power')
                .attr('d', powerLine)
                .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

            const rangeLine = d3.line()
            // @ts-ignore
                .x((d: IChargeState) => xScale(new Date(d.timestamp)))
                .y((d: IChargeState) => yScaleRight(d.battery_range));
            svg.append('path')
                .datum(props.states)
                .attr('class', 'line battery_range')
                .attr('d', rangeLine)
                .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

            const estRangeLine = d3.line()
                                // @ts-ignore
                                .x((d: IChargeState) => xScale(new Date(d.timestamp)))
                                .y((d: IChargeState) => yScaleRight(d.est_battery_range));
            svg.append('path')
               .datum(props.states)
               .attr('class', 'line est_battery_range')
               .attr('d', estRangeLine)
               .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

        }
    },
    [props.states, config]);

    return (
        <div>
            <svg
                className="d3-chart"
                width={config.width}
                height={config.height}
                ref={container}
            />
        </div>
    );
};



