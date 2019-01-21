import React from 'react';
import PropTypes from 'prop-types';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryLabel, VictoryLegend, VictoryTheme} from 'victory'
import './GraphItem.css';

// `${data.year.year}: Total:${data.year.total}, Unsheltered:${data.year.unsheltered} Sheltered:${data.year.sheltered} ;;  `
const GraphItem = ({type, dataSet, years, xAxis, xAxisTitle, yAxisTitle, datumOne, datumOneTitle, datumTwo, datumTwoTitle}) => {

  const filteredDataSet =  dataSet.filter(f => years.includes(f.year));

  if (type === "bar-stacked"){
    return (
      <div>
        <VictoryChart
          domainPadding={{ x: 4 }}
          theme={VictoryTheme.material}
          style={{ parent: { maxWidth: "60%" } }}>
          <VictoryLegend x={125} y={10}
            orientation="vertical"
            colorScale={[ "#4d47b4", "#9a31a4"]}
            data={[
              { name: `${datumOneTitle}` }, { name: `${datumTwoTitle}` }
            ]}
            />
          <VictoryAxis
              label= {xAxisTitle}
              style={ {axisLabel: {padding: 30}} }
              tickFormat={(x) => (`${x}`)}/>
            <VictoryAxis dependentAxis
              label={yAxisTitle}
              style={ {axisLabel: {padding: 30}} }
              tickFormat={(x) => (`${x / 1000}`)} />
            <VictoryStack colorScale={["#4d47b4", "#9a31a4"]}>
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
  }
}

GraphItem.propTypes = {

};

export default GraphItem;
