import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {firstBy} from "thenby";
import GraphItem from './GraphItem';
import sleeper from './Sleeper.jpg';
import HeaderContainer from './HeaderContainer';
import './DataContainer.css';

const GET_COUNTS = "http://localhost:8000/homelesscounts/";
const GET_SURVEYS = "http://localhost:8000/communitysurveys/";
const GET_MARKETS = "http://localhost:8000/housingmarkets/";
const GET_REMOVALS = "http://localhost:8000/encampmentremovals/";

const COUNT_YEARS = [2004, 2005, 2006, 2007, 2008, 2010, 2011, 2012, 2014, 2015, 2016, 2017, 2018];
const STACKED_LINE_GRAPH_YEARS = [2012, 2013, 2014, 2015, 2016, 2017];

class DataContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      yearlyHomelessCounts: [],
      communitySurveys: [],
      housingMarkets: [],
      encampmentRemovals: [],
      statusText: '',
    }
  }

  componentDidMount() {
    this.setState({
      statusText: 'loading'
    });
    this.getHomelessCounts();
    this.getCommunitySurveys();
    this.getHousingMarkets();
    this.getEncampmentRemovals();
  }

  getHomelessCounts(){
    axios.get(GET_COUNTS)
    .then((response) => {
      this.setState({
        yearlyHomelessCounts: response.data,
        statusText: 'success',
      });
    })
    .catch((error) => {
      console.log(error.response);
      this.setState({
        statusText: `${error.response}`
      });
    });
  }

  getCommunitySurveys(){
    axios.get(GET_SURVEYS)
    .then((response) => {
      this.setState({
        communitySurveys: response.data,
        statusText: 'success',
      });
    })
    .catch((error) => {
      console.log(error.response);
      this.setState({
        statusText: `${error.response}`
      });
    });
  }

  getHousingMarkets(){
    axios.get(GET_MARKETS)
    .then((response) => {
      this.setState({
        housingMarkets: response.data,
        statusText: 'success',
      });
    })
    .catch((error) => {
      console.log(error.response);
      this.setState({
        statusText: `${error.response}`
      });
    });
  }

  getEncampmentRemovals(){
    axios.get(GET_REMOVALS)
    .then((response) => {
      console.log(response.data);
      this.setState({
        encampmentRemovals: response.data,
        statusText: 'success',
      });
    })
    .catch((error) => {
      console.log(error.response);
      this.setState({
        statusText: `${error.response}`
      });
    });
  }

  countReasonsForRemoval(encampmentDataSet){
    let counts = [{"reason": "found on city property", "numbers": 0}, {"reason": "vehicle hazard", "numbers": 0}, {"reason": "criminal activity beyond drug use", "numbers": 0}, {"reason": "waste and debris", "numbers": 0}, {"reason": "health hazard to neighborhood", "numbers": 0}, {"reason": "limited emergency services", "numbers": 0}, {"reason": "scheduled worksite", "numbers": 0}, {"reason": "damage to environment", "numbers": 0}, {"reason": "proximity to school or elderly", "numbers": 0}]

    encampmentDataSet.forEach(function(removal) {
      if (removal.found_on_city_property === true){
        counts[0]["numbers"] += 1;
      }
      if (removal.vehicle_hazard === true) {
        counts[1]["numbers"] += 1;
      }
      if (removal.criminal_activity_beyond_drug_use === true) {
        counts[2]["numbers"] += 1;
      }
      if (removal.waste_and_debris === true) {
        counts[3]["numbers"] += 1;
      }
      if (removal.health_hazard_to_neighborhood === true) {
        counts[4]["numbers"] += 1;
      }
      if (removal.limited_emergency_services === true) {
        counts[5]["numbers"] += 1;
      }
      if (removal.scheduled_worksite === true) {
        counts[6]["numbers"] += 1;
      }
      if (removal.damage_to_environment === true) {
        counts[7]["numbers"] += 1;
      }
      if (removal.proximity_to_school_or_elderly === true) {
        counts[8]["numbers"] += 1;
      }
    });
    return counts
  }

  formatHousingMarket(housingMarketData){
    let data = []

    housingMarketData.forEach(function(year) {
      const data_point = {
        "date": `${year.month}-${year.year}`,
        "median sale price": ((year.median_sale_price.slice(1,-1))* 1000)
      }
      data.push(data_point)
    });
    return data
  }

  convertMonthToNumber(month){
    let day = 1;
    switch (month) {
      case "January":
      day = 1;
      break;
      case "February":
      day = 2;
      break;
      case "March":
      day = 3;
      break;
      case "April":
      day = 4;
      break;
      case "May":
      day = 5;
      break;
      case "June":
      day = 6;
      break;
      case "July":
      day = 7;
      break;
      case "August":
      day = 8;
      break;
      case "September":
      day = 9;
      break;
      case "October":
      day = 10;
      break;
      case "November":
      day = 11;
      break;
      case "December":
      day = 12;
      break;
    }
  }

  render() {

    const { yearlyHomelessCounts, communitySurveys, housingMarkets, encampmentRemovals } = this.state;

    const sortedHomelessCounts = yearlyHomelessCounts.sort(function(a, b){return a.year - b.year})

    const sortedCommunitySurveys = communitySurveys.sort(function(a, b){return a.year - b.year})

    const sortedHousingMarkets= housingMarkets.sort(
      firstBy(function (a, b) { return a.year - b.year; })
      .thenBy("month")
    )

    const countedDataPointsForRemovals = this.countReasonsForRemoval(encampmentRemovals);

    const medianSalePrice = this.formatHousingMarket(sortedHousingMarkets);

    return (
      <div>
        <HeaderContainer />
        <h2 className="article-title">Point In Time Count
          of Homeless in King County</h2>
        <div className="data-container">
          <div className="graph-container">
            <GraphItem
              className="graph"
              type="bar-stacked"
              dataSet={sortedHomelessCounts}
              years={COUNT_YEARS}
              xAxis="year"
              xAxisTitle="Years"
              yAxisTitle="# of Homeless in King County (in thousands)"
              datumOne="unsheltered"
              datumOneTitle="unsheltered"
              datumTwo="number_in_shelter_and_transitional_housing"
              datumTwoTitle="sheltered homeless"/>
            <span className="span-highlight">It is estimated that <span className="span-highlight-focus">3 times as many people experience homeless</span> each year in Seattle than is counted during the Point In Time Count</span>
          </div>
          <div className="data-container-large">
            <h2 className="article-title">Encampment Removals 2018</h2>
            <p className="article">Between January and August, <span className="text-emphasis">152 encampment</span> sites were removed by Seattle governmental agencies. </p>
            <div className="graph-container-large">
              <GraphItem type="bar-single-horizontal-large"
                dataSet={countedDataPointsForRemovals}
                yAxisTitle="Reason(s) for removal"
                xAxisTitle="Number of times given as reason for removal"
                yAxis="numbers"
                xAxis="reason"
                />
            </div>
            <div className="article-and-picture">
              <img alt="Person sleeping on park bench" className="sleeper-image" src={sleeper} />
              <p className="text-block">If you have no home, where can you sleep? Loitering laws prevent homeless persons from getting rest during the day, and nights can be unsafe. Though <span className="paragraph-emphasis">it is not illegal to be homeless</span>, how long can you stay in a public place in a tent before it is deemed illegal? What do you do if shelters are closed, full, or you do not fit the many requirements and rules?</p>
            </div>
          </div>
          <div className="data-container">
            <h2 className="article-title">Gini Coefficient: Seattle, WA</h2>
            <div className="graph-container">
              <span className="span-article">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque suscipit ornare ligula vel lacinia. Suspendisse potenti. Sed semper felis neque, vel blandit mauris interdum ac. Duis accumsan metus a lacus faucibus, vitae ornare ex imperdiet. Cras tempus augue vitae ante faucibus, eget posuere dolor consequat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ut orci at erat tincidunt lacinia. Curabitur rutrum interdum lacus at blandit. Curabitur sit amet egestas ligula. Fusce pellentesque eleifend lectus ut feugiat. Quisque ac tortor velit. Vivamus placerat urna at consequat maximus. Suspendisse sit amet fermentum ligula. Donec libero nisl, tristique id risus et, imperdiet tempus quam. </span>
              <GraphItem type="area-chart"
                dataSet={sortedCommunitySurveys}
                xAxis={"year"}
                yAxis={"gini_index"}
                xAxisTitle="Years"
                yAxisTitle="Gini Index"
                domain={[0.455, 0.475]}/>
            </div>
          </div>
          <div className="data-container">
            <h2 className="article-title">Median Income Seattle, WA 2010 - 2017</h2>
            <div className="graph-container">
              <GraphItem type="area-chart"
                dataSet={sortedCommunitySurveys}
                xAxis={"year"}
                yAxis={"median_income"}
                xAxisTitle="Years"
                yAxisTitle="Median Income"
                domain={[40000, 100000]}
                />
              <span className="span-highlight">Over the 7 years that this data was collected, the median income in Seattle rose <span className="span-highlight-focus">over 35%</span></span>
            </div>
          </div>
          <div className="data-container-large">
            <h2 className="article-title">Median Home Sale Price, 2012 - 2018</h2>
            <div className="graph-container-large">
              <GraphItem type="area-chart-large"
                dataSet={medianSalePrice}
                xAxis={"date"}
                yAxis={"median sale price"}
                xAxisTitle="Month-Year"
                yAxisTitle="Median Sale Price"
                domain={[275000, 800000]}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DataContainer.propTypes = {
  greet: PropTypes.string,
};

export default DataContainer;
