import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {firstBy} from "thenby";
import GraphItem from './GraphItem';
import './DataContainer.css';

const GET_COUNTS = "http://localhost:8000/homelesscounts/";
const GET_SURVEYS = "http://localhost:8000/communitysurveys/";
const GET_MARKETS = "http://localhost:8000/housingmarkets/";

const COUNT_YEARS = [2004, 2005, 2006, 2007, 2008, 2010, 2011, 2012, 2014, 2015, 2016, 2017, 2018];
const STACKED_LINE_GRAPH_YEARS = [2012, 2013, 2014, 2015, 2016, 2017];

class DataContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      yearlyHomelessCounts: [],
      communitySurveys: [],
      housingMarkets: [],
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

    const { yearlyHomelessCounts, communitySurveys, housingMarkets } = this.state;

    const sortedHomelessCounts = yearlyHomelessCounts.sort(function(a, b){return a.year - b.year})

    const sortedCommunitySurveys = communitySurveys.sort(function(a, b){return a.year - b.year})

    const sortedHousingMarkets= housingMarkets.sort(
      firstBy(function (a, b) { return a.year - b.year; })
      .thenBy("month")
    )

    console.log(sortedHousingMarkets)

    return (
      <div className="data-container">
        <GraphItem type="bar-stacked"
          dataSet={sortedHomelessCounts}
          years={COUNT_YEARS}
          xAxis="year"
          xAxisTitle="Years"
          yAxisTitle="# of Homeless in King County (in thousands)"
          datumOne="unsheltered"
          datumOneTitle="unsheltered"
          datumTwo="number_in_shelter_and_transitional_housing"
          datumTwoTitle="sheltered homeless"/>
        <GraphItem type="area-chart"
          dataSet={sortedCommunitySurveys}
          xAxis={"year"}
          yAxis={"gini_index"}
          xAxisTitle="Years"
          yAxisTitle="Gini Index"
          domain={[0.455, 0.475]}/>
      </div>
    )
  }
}

DataContainer.propTypes = {
  greet: PropTypes.string,
};

export default DataContainer;
