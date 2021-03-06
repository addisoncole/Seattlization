import React from 'react';
import PropTypes from 'prop-types';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryLabel, VictoryLegend, VictoryTheme, VictoryArea } from 'victory'
import './GraphItem.css';

// `${data.year.year}: Total:${data.year.total}, Unsheltered:${data.year.unsheltered} Sheltered:${data.year.sheltered} ;;  `
const GraphItem = ({type, dataSet, dataSetOne, dataSetTwo, years, xAxis, xAxisTitle, yAxis, yAxisTitle, yAxisTwo, datumOne, datumOneTitle, datumTwo, datumTwoTitle, domain}) => {


  if (type === "bar-stacked"){
    const filteredDataSet =  dataSet.filter(f => years.includes(f.year));
    return (
      <div>
        <div className="chart-shadow">
        </div>
        <div className="chart-wrapper">
          <div className="chart">
            <VictoryChart
              domainPadding={{ x: 4 }}
              theme={VictoryTheme.material}
              style={{ parent: { maxWidth: "100%" } }}>
              <VictoryLegend x={150} y={20}
                orientation="vertical"
                symbolSpacer={2}
                colorScale={[ "rgba(77,71,180,.7)", "rgba(154,49,164,.7)"]}
                style={{
                  labels: { fontSize: 8, padding: 10 }
                }}
                data={[
                  { name: `${datumOneTitle}` }, { name: `${datumTwoTitle}` }
                ]}
                />
              <VictoryAxis
                label= {xAxisTitle}
                style={{
                  axisLabel: {fontSize: 10, padding: 30},
                  tickLabels: {fontSize: 8, padding: 5}
                }}
                tickFormat={(x) => (`${x}`)}/>
              <VictoryAxis dependentAxis
                label={yAxisTitle}
                style={{
                  axisLabel: {fontSize: 10, padding: 30},
                  tickLabels: {fontSize: 8, padding: 5}
                }}
                tickFormat={(x) => (`${x / 1000}`)} />
              <VictoryStack colorScale={["rgba(77,71,180,.7)", "rgba(154,49,164,.7)"]}>
                <VictoryBar
                  data={filteredDataSet}
                  x={xAxis}
                  y={datumOne}/>
                <VictoryBar
                  data={filteredDataSet}
                  x={xAxis}
                  y={datumTwo}/>
              </VictoryStack>
            </VictoryChart>
          </div>
        </div>
      </div>
    );
  } else if (type === "area-chart") {
    return (
      <div>
        <div className="chart-shadow">
        </div>
        <div className = 'chart-wrapper'>
          <div className = 'chart'>
            <VictoryChart
              theme={VictoryTheme.material}
              domain={{ y:domain }}
              style={{ parent: { maxWidth: "100%" } }}
              >
              <VictoryAxis
                label= {xAxisTitle}
                style={{
                  axisLabel: {fontSize: 10, padding: 30},
                  tickLabels: {fontSize: 8, padding: 5}
                }}
                tickFormat={(x) => (`${x}`)}/>
              <VictoryAxis dependentAxis
                label={yAxisTitle}
                style={{
                  axisLabel: {fontSize: 10, padding: 35},
                  tickLabels: {fontSize: 6, padding: 5}
                }}/>
              <VictoryArea
                style={{ data: { fill: "rgba(238, 110, 23, 0.6)" } }}
                data={dataSet}
                x={xAxis}
                y={yAxis}
                />
            </VictoryChart>
          </div>
        </div>
      </div>
      )
    } else if (type === "bar-single-horizontal-large") {
      return (
        <div>
          <div className="chart-shadow-large">
          </div>
          <div className = 'chart-wrapper-large'>
            <div className = 'chart'>
              <VictoryChart
                domainPadding={{ y: 10 }}
                theme={VictoryTheme.material}
                style={{ parent: { maxWidth: "100%" } }}>
                <VictoryAxis
                  label= {xAxisTitle}
                  style={{
                    axisLabel: {fontSize: 8, padding: 20},
                    tickLabels: {fontSize: 6, padding: 5}
                  }}
                  tickFormat={(x) => (`${x}`)}/>
                <VictoryAxis dependentAxis
                  style={{
                    axisLabel: {fontSize: 8, padding: 50},
                    tickLabels: {fontSize: 3, padding: 5, angle: 30, }
                  }}/>
                <VictoryBar horizontal
                  data={dataSet}
                  y={yAxis}
                  x={xAxis}
                  style={{
                    data: { fill: (d) => d.numbers > 100 ? "rgba(238, 110, 23, 0.6)" : "rgba(77,71,180,.7)"}, labels: { fontSize: 8}}}
                  labels={(d) => `${d.numbers}`}
                  />
              </VictoryChart>
            </div>
          </div>
        </div>
      )
    } else if (type === "bar-single") {
      return (
        <div>
          <div className="chart-shadow">
          </div>
          <div className = 'chart-wrapper'>
            <div className = 'chart'>
              <VictoryChart
                domainPadding={{ y: 10 }}
                theme={VictoryTheme.material}
                style={{ parent: { maxWidth: "100%" } }}>
                <VictoryAxis
                  label= {xAxisTitle}
                  style={{
                    axisLabel: {fontSize: 8, padding: 20},
                    tickLabels: {fontSize: 6, padding: 5}
                  }}
                  tickFormat={(x) => (`${x}`)}/>
                <VictoryAxis dependentAxis
                  style={{
                    axisLabel: {fontSize: 8, padding: 50},
                    tickLabels: {fontSize: 3, padding: 5, angle: 30, }
                  }}/>
                <VictoryBar
                  data={dataSet}
                  y={yAxis}
                  x={xAxis}
                  style={{
                    data: { fill: (d) => d.numbers > 100 ? "rgba(238, 110, 23, 0.6)" : "rgba(77,71,180,.7)"}, labels: { fontSize: 8}}}
                  labels={(d) => `${d.numbers}`}
                  />
              </VictoryChart>
            </div>
          </div>
        </div>
      )
    } else if (type === "area-chart-large") {
      return (
        <div>
          <div className="chart-shadow-large">
          </div>
          <div className = 'chart-wrapper-large'>
            <div className = 'chart'>
              <VictoryChart
                theme={VictoryTheme.material}
                domain={{ y:domain }}
                style={{ parent: { maxWidth: "100%" } }}
                >
                <VictoryAxis
                  label= {xAxisTitle}
                  style={{
                    axisLabel: {fontSize: 10, padding: 30},
                    tickLabels: {fontSize: 6, padding: 10, marginLeft: 20, angle:45},
                  }}
                  />
                <VictoryAxis dependentAxis
                  label={yAxisTitle}
                  style={{
                    axisLabel: {fontSize: 10, padding: 35},
                    tickLabels: {fontSize: 6, padding: 5}

                  }}
                  tickFormat={(x) => (`$${x/1000}k`)}/>
                <VictoryArea
                  style={{ data: { fill: "rgba(154,49,164,.7)" } }}
                  data={dataSet}
                  x={xAxis}
                  y={yAxis}
                  />
              </VictoryChart>
            </div>
          </div>
        </div>
      )
    }
  }

  GraphItem.propTypes = {

  };

  export default GraphItem;
