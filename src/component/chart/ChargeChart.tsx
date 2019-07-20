import React from 'react';
import * as d3 from 'd3';
import './ChargeChart.css';
import {ProductType} from '../../type/ProductType';
import {ChargeDatum} from '../../type/Datum';


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
    product: ProductType;
    energyAdded?: number;
    durationMinutes?: number;
    data: ChargeDatum[];
    config?: ChartConfig;
}

const defaultConfig = {
    width: 800,
    height: 500,
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

    const yDomainLeft = [0, 250];
    const yDomainRight = [0, 310];
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

    React.useEffect(() => {
        console.log('init chart');


    }, []);


    React.useEffect(() => {
        console.log('update chart');
        if (props.data && config && container.current) {

            const xDomain = d3.extent(props.data, (d: ChargeDatum) => d.timestamp);
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
                .x((d: ChargeDatum) => xScale(d.timestamp))
                .y((d: ChargeDatum) => yScaleLeft(d.chargerPower));
            svg.append('path')
                .datum(props.data)
                .attr('class', 'line charge-power')
                .attr('d', powerLine)
                .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);


            const rangeLine = d3.line()
            // @ts-ignore
                .x((d: ChargeDatum) => xScale(d.timestamp))
                .y((d: ChargeDatum) => yScaleRight(d.batteryRangeEst));
            svg.append('path')
                .datum(props.data)
                .attr('class', 'line battery-range')
                .attr('d', rangeLine)
                .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

        }
    },
    [props.data, config]);

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



