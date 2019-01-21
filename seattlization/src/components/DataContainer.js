import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GraphItem from './GraphItem';
import './DataContainer.css';

const GET_COUNTS = "http://localhost:8000/homelesscounts/";
const GET_SURVEYS = "http://localhost:8000/communitysurveys/";

const COUNT_YEARS = [2004, 2005, 2006, 2007, 2008, 2010, 2011, 2012, 2014, 2015, 2016, 2017, 2018]
const SURVEY_YEARS = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]

class DataContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      yearlyHomelessCounts: [],
      communitySurveys: [],
      statusText: '',
    }
  }

  componentDidMount() {
    this.setState({
      statusText: 'loading'
    });
    this.getHomelessCounts()
    this.getCommunitySurveys()
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

  render() {

    const { yearlyHomelessCounts, communitySurveys } = this.state;

    const sortedHomelessCounts = yearlyHomelessCounts.sort(function(a, b){return a.year - b.year})

    const sortedCommunitySurveys = communitySurveys.sort(function(a, b){return a.year - b.year})

    return (
      <div className="data-container">
        <GraphItem type="bar-stacked" dataSet={sortedHomelessCounts} years={COUNT_YEARS} xAxis="year" xAxisTitle="Years" yAxisTitle="# of Homeless in King County (in thousands)" datumOne="unsheltered" datumOneTitle="unsheltered" datumTwo="number_in_shelter_and_transitional_housing" datumTwoTitle="sheltered homeless"/>
        <GraphItem type="area-chart" dataSet={sortedCommunitySurveys} xAxis={"year"} yAxis={"gini_index"} xAxisTitle="Years" yAxisTitle="Gini Index" domain={[0.455, 0.475]}/>
      </div>
    )
  }
}

DataContainer.propTypes = {
  greet: PropTypes.string,
};

export default DataContainer;
