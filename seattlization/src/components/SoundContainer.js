import axios from 'axios';
import React, { Component } from 'react';
import Tone from 'tone';

import './SoundContainer.css';

const GET_COUNTS = "http://localhost:8000/homelesscounts/";
const GET_SURVEYS = "http://localhost:8000/communitysurveys/";
const GET_LIH = "http://localhost:8000/lowincomehousing/";
const YEARS = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]

class SoundContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: 2010,
      yearlyHomelessCounts: [],
      communitySurveys: [],
      lowIncomeHousings: [],
      statusText: '',
    }
  }

  componentDidMount() {
    this.getHomelessCounts();
    this.getCommunitySurveys();
    this.getLowIncomeHousing();
  }

  getHomelessCounts(){
    axios.get(GET_COUNTS)
    .then((response) => {
      const homelessCounts = response.data;
      const filteredHomelessCounts=  homelessCounts.filter(f => YEARS.includes(f.year));
      const sortedHomelessCounts = filteredHomelessCounts.sort(function(a, b){return a.year - b.year});
      this.setState({
        yearlyHomelessCounts: sortedHomelessCounts,
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
      const communitySurveys = response.data;
      const filteredCommunitySurveys=  communitySurveys.filter(f => YEARS.includes(f.year));
      const sortedCommunitySurveys = filteredCommunitySurveys.sort(function(a, b){return a.year - b.year})
      this.setState({
        communitySurveys: sortedCommunitySurveys,
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

  getLowIncomeHousing(){
    axios.get(GET_LIH)
    .then((response) => {
      const lowIncomeHousing = response.data;
      const filteredLowIncomeHousings=  lowIncomeHousing.filter(f => YEARS.includes(f.year_placed_in_service));
      const sortedLowIncomeHousings = filteredLowIncomeHousings.sort(function(a, b){return a.year_placed_in_service - b.year_placed_in_service});
      this.setState({
        lowIncomeHousings: sortedLowIncomeHousings,
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

  playCount = () => {
    const { yearlyHomelessCounts, communitySurveys, lowIncomeHousings, currentYear} = this.state;
    const count =  (yearlyHomelessCounts[1].total - yearlyHomelessCounts[0].total) - 2100;
    var synth = new Tone.PolySynth(2, Tone.Synth).toMaster();
    console.log(count);
    const time = Tone.context.currentTime;
    for (var i = 0; i < count; i++) {
      const sound = synth.triggerAttackRelease(["F2", "Ab2"], "4n", (time + i) );
      console.log(sound);
    }
  }


  render() {
    const { yearlyHomelessCounts, communitySurveys, lowIncomeHousings} = this.state;

    console.log(yearlyHomelessCounts);
    console.log(communitySurveys);
    console.log(lowIncomeHousings);

    // const displayCounts = allCounts.map((count, i) => {
    //   return (`${count.year}: ${count.total} `)
    // });

    // console.log(displayCounts)
    // const synth = new Tone.Synth().toMaster();
    // const sound = synth.triggerAttackRelease("G4", "8n");

    return (
      <div>
      <button onClick = {this.playYear} >Play</button>
      </div>
    )
  }
}

export default SoundContainer;
