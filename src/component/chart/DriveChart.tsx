import React from 'react';
import * as d3 from 'd3';
import './DriveChart.css';
import {IDriveSession} from '../../type/DriveSession';
import {IVehicle} from '../../type/Vehicle';
import {IDriveState} from '../../type/DriveState';


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

interface DriveChartState {
    vehicle: IVehicle;
    session: IDriveSession;
    states: Array<IDriveState>;
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

export const DriveChart: React.SFC<DriveChartState> = (props: DriveChartState) => {
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
            const yDomainRight = [0, 1000];
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


            const powerLine = d3.line()
            // @ts-ignore
                .x((d: IDriveState) => xScale(new Date(d.timestamp)))
                .y((d: IDriveState) => yScaleLeft(d.battery_level));
            svg.append('path')
                .datum(props.states)
                .attr('class', 'line battery_level')
                .attr('d', powerLine)
                .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);


            const rangeLine = d3.line()
                                // @ts-ignore
                                .x((d: IDriveState) => xScale(new Date(d.timestamp)))
                                .y((d: IDriveState) => yScaleRight(d.battery_range));
            svg.append('path')
               .datum(props.states)
               .attr('class', 'line battery_range')
               .attr('d', rangeLine)
               .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

            const estRangeLine = d3.line()
            // @ts-ignore
                .x((d: IDriveState) => xScale(new Date(d.timestamp)))
                .y((d: IDriveState) => yScaleRight(d.est_battery_range));
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
                className="d3-chart drive-chart"
                width={config.width}
                height={config.height}
                ref={container}
            />
        </div>
    );
};



