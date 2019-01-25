import axios from 'axios';
import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import Tone from 'tone';
import HeaderContainer from './HeaderContainer';

import './SoundContainer.css';

const GET_COUNTS = "http://localhost:8000/homelesscounts/";
const GET_SURVEYS = "http://localhost:8000/communitysurveys/";
const GET_LIH = "http://localhost:8000/lowincomehousing/";
const GET_MFTE = "http://localhost:8000/mfteprojects/";
const YEARS = [ 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]

class SoundContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compositionTime: 0,
      currentYear: 2010,
      yearlyHomelessCounts: [],
      communitySurveys: [],
      lowIncomeHousings: [],
      mfteProjects: [],
      statusText: '',
    }
  }

  componentDidMount() {
    this.getHomelessCounts();
    this.getCommunitySurveys();
    this.getLowIncomeHousing();
    this.getMFTEProjects();
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
      const filteredLowIncomeHousings = lowIncomeHousing.filter(f => YEARS.includes(f.year_placed_in_service));
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

  getMFTEProjects(){
    axios.get(GET_MFTE)
    .then((response) => {
      const MFTEProjects = response.data;
      const filteredMFTEProjects = MFTEProjects.filter(f => YEARS.includes(f.tax_exemption_start));
      const sortedMFTEProjects = filteredMFTEProjects.sort(function(a, b){return a.tax_exemption_start - b.tax_exemption_start});
      this.setState({
        mfteProjects: sortedMFTEProjects,
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

  stopTransport = () => {
    Tone.Transport.pause();
  }

  playYear = (year) => {
    const { lowIncomeHousings, mfteProjects } = this.state;

    const currentYearLowIncomeHousing = lowIncomeHousings.filter(f => year === (f.year_placed_in_service));

    const currentYearMFTEProjects = mfteProjects.filter(f => year === (f.tax_exemption_start));

    const style2 = {
      "oscillator": {
        // "volume": .5,
        "type": "fatsawtooth"
      },
      "envelope": {
          "attack": .5,
          "decay": 3,
          "sustain": 0.06,
          "releaseCurve" : "bounce",
          "release": 1.8
      }
    }

    const style1 = {
      "oscillator": {
        // "volume": .2,
        "type": "fattriangle"
      },
      "envelope": {
          "attack": 2,
          "decay": 6,
          "sustain": 0.06,
          "releaseCurve" : "bounce",
          "release": 1.8
      }
    }

    var synth = new Tone.PolySynth(1, Tone.Synth, style1).toMaster();
    var synth2 = new Tone.PolySynth(1, Tone.Synth, style2).toMaster();
    // scale: ["F2", "G#2", "C3", "C#3", "D#3", "F3", "G#3"]
    const enoScale = [["F3"], ["G#3"], ["C4"], ["C#4"], ["D#4"], ["F4"], ["G#4"]];

    let sequence = [];
    let sequence2 = [];
    let time = 0;
    let time2 = 1;

    currentYearLowIncomeHousing.forEach(function(element) {
      let chord = [];
      if (element.number_of_units <= 10) {
        chord = enoScale[0];
      } else if (element.number_of_units <= 25) {
        chord = enoScale[1];
      } else if (element.number_of_units <= 50) {
        chord = enoScale[2];
      } else if (element.number_of_units <= 75){
        chord = enoScale[3];
      } else if (element.number_of_units <= 100) {
        chord = enoScale[4];
      } else if (element.number_of_units <= 150) {
        chord = enoScale[5];
      } else if (element.number_of_units > 150) {
        chord = enoScale[6];
      }

      let chord_event = [(time + "i"), chord];

      sequence.push(chord_event);

      time += 10;
    });

    currentYearMFTEProjects.forEach(function(element) {
      let chord = [];
      if (((element.total_affordable_units / element.total_units) * 100) <= 16) {
        chord = enoScale[0];
      } else if (((element.total_affordable_units / element.total_units) * 100) <= 30) {
        chord = enoScale[1];
      } else if (((element.total_affordable_units / element.total_units) * 100) <= 44) {
        chord = enoScale[2];
      } else if (((element.total_affordable_units / element.total_units) * 100) <= 58){
        chord = enoScale[3];
      } else if (((element.total_affordable_units / element.total_units) * 100) <= 72) {
        chord = enoScale[4];
      } else if (((element.total_affordable_units / element.total_units) * 100) <= 86) {
        chord = enoScale[5];
      } else if (((element.total_affordable_units / element.total_units) * 100) > 86) {
        chord = enoScale[6];
      }

      let chord_event = [(time2 + "i"), chord];

      sequence2.push(chord_event);

      time2 += 7;
    });

    let synthPart = new Tone.Part(function(time, note){
      synth.triggerAttackRelease(note, "1n", time);
    }, sequence ).start("0");

    let synthPart2 = new Tone.Part(function(time, note){
      synth2.triggerAttackRelease(note, "1n", time);
    }, sequence2 ).start("0");

    synthPart.loop = false;
    synthPart2.loop = false;

    Tone.Transport.bpm.value = 1;

    Tone.Transport.start("+0.1");
    Tone.Transport.stop(time);
  }

  render() {

    const play = `\u25b6`;
    const stop = `\u25fc`;

    return (
      <div className="container">
        <HeaderContainer />
        <CSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
          <h2 className="sound-title-left">2010</h2>
          <div className="sound-container">
            <button onClick = {this.playYear.bind(this, 2010)} className='control-button'><span className="button-text">Play</span>{play}</button>
            <button onClick = {this.stopTransport} className='control-button'><span className="button-text">Stop</span>{stop}</button>
          </div>
          <h2 className="sound-title-right">2012</h2>
          <div className="sound-container">
            <button onClick = {this.playYear.bind(this, 2012)} className='control-button'><span className="button-text">Play</span>{play}</button>
            <button onClick = {this.stopTransport} className='control-button'><span className="button-text">Stop</span>{stop}</button>
          </div>
          <h2 className="sound-title-left">2014</h2>
          <div className="sound-container">
            <button onClick = {this.playYear.bind(this, 2014)} className='control-button'><span className="button-text">Play</span>{play}</button>
            <button onClick = {this.stopTransport} className='control-button'><span className="button-text">Stop</span>{stop}</button>
          </div>
          <h2 className="sound-title-right">2016</h2>
          <div className="sound-container">
            <button onClick = {this.playYear.bind(this, 2016)} className='control-button'><span className="button-text">Play</span>{play}</button>
            <button onClick = {this.stopTransport} className='control-button'><span className="button-text">Stop</span>{stop}</button>
          </div>
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default SoundContainer;
