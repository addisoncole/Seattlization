import React from 'react';
import PropTypes from 'prop-types';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryLabel, VictoryLegend, VictoryTheme, VictoryArea } from 'victory'
import './GraphItem.css';

// `${data.year.year}: Total:${data.year.total}, Unsheltered:${data.year.unsheltered} Sheltered:${data.year.sheltered} ;;  `
const GraphItem = ({type, dataSet, years, xAxis, xAxisTitle, yAxis, yAxisTitle, datumOne, datumOneTitle, datumTwo, datumTwoTitle, domain}) => {


  if (type === "bar-stacked"){
    const filteredDataSet =  dataSet.filter(f => years.includes(f.year));
    return (
      <div>
        <VictoryChart
          domainPadding={{ x: 4 }}
          theme={VictoryTheme.material}
          style={{ parent: { maxWidth: "60%" } }}>
          <VictoryLegend x={125} y={10}
            orientation="vertical"
            colorScale={[ "rgba(77,71,180,.7)", "rgba(154,49,164,.7)"]}
            data={[
              { name: `${datumOneTitle}` }, { name: `${datumTwoTitle}` }
            ]}
            />
          <VictoryAxis
            label= {xAxisTitle}
            style={{
              axisLabel: {padding: 30},
              tickLabels: {fontSize: 8, padding: 5}
            }}
            tickFormat={(x) => (`${x}`)}/>
          <VictoryAxis dependentAxis
            label={yAxisTitle}
            style={{
              axisLabel: {padding: 30},
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
    );
  } else if (type === "area-chart") {
    return (
      <VictoryChart
        theme={VictoryTheme.material}
        domain={{ y:domain }}
        style={{ parent: { maxWidth: "60%" } }}
        >
        <VictoryAxis
          label= {xAxisTitle}
          style={{
            axisLabel: {padding: 30},
            tickLabels: {fontSize: 8, padding: 5}
          }}
          tickFormat={(x) => (`${x}`)}/>
        <VictoryAxis dependentAxis
          label={yAxisTitle}
          style={{
            axisLabel: {padding: 35},
            tickLabels: {fontSize: 8, padding: 5}
          }}/>
        <VictoryArea
          style={{ data: { fill: "rgba(238, 110, 23, 0.6)" } }}
          data={dataSet}
          x={xAxis}
          y={yAxis}
          />
      </VictoryChart>
    )
  }
}

GraphItem.propTypes = {

};

export default GraphItem;
