import axios from 'axios';
import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import Tone from 'tone';
import HeaderContainer from './HeaderContainer';

import './SoundContainer.css';

const GET_COUNTS = "http://localhost:8000/homelesscounts/";
const GET_SURVEYS = "http://localhost:8000/communitysurveys/";
const GET_LIH = "http://localhost:8000/lowincomehousing/";
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

  stopTransport(){
    Tone.Transport.pause();
  }

  playYear = () => {
    const { yearlyHomelessCounts, communitySurveys, lowIncomeHousings, currentYear} = this.state;

    const currentYearLowIncomeHousing = lowIncomeHousings.filter(f => currentYear === (f.year_placed_in_service));

    var synth = new Tone.PolySynth(3, Tone.Synth).toMaster();

    // scale: ["G3", "A3", "B3", "D3", "E3", "G4"]
    // minor: [Gb, Ab, Bb, Db, Eb, Gb]
    const scale = [["G3","B3","D3"], ["A3","C#3","E3"], ["B3","D#3","F#3"], ["D3","F#3","A3"], ["E3","G#3","B3"], ["G4","B4","D4"]];
    // const minor = [["Gb3", "Bb3", "Db3"], ["Ab3", "C3", "Eb3"], ["Bb3", "D3", "F3"], ["Db3", "F3", "Ab3"], ["Eb3", "G3", "Bb3"], ["Gb4", "Bb4", "Db4"]];

    let count = 0;
    let sequence = [];
    let time = 0;

    currentYearLowIncomeHousing.forEach(function(element) {
      // console.log(element);
      let chord = [];
      if (element.number_of_units > 50) {
        chord = scale[count];
      } else {
        chord = scale[count];
      }

      let chord_event = [(time + "i"), chord];

      sequence.push(chord_event);

      time += 10;
      if (count === scale.length - 1) {
        count = 0;
      } else {
        count += 1;
      };

    });

    console.log(sequence);

    let synthPart = new Tone.Part(function(time, note){
      synth.triggerAttackRelease(note, "1n", time);
    }, sequence ).start("0");

    synthPart.loop = false;

    Tone.Transport.bpm.value = 1;

    Tone.Transport.start("+0.1");
    Tone.Transport.stop(time);
  }


  render() {
    const { yearlyHomelessCounts, communitySurveys, lowIncomeHousings} = this.state;

    const play = `\u25b6`;
    const stop = `\u25fc`;

    return (
      <div className="container">
        <CSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
          <HeaderContainer />
          <div className="sound-container">
            <button onClick = {this.playYear} className='control-button'><span className="button-text">Play</span>{play}</button>
            <button onClick = {this.stopTransport} className='control-button'><span className="button-text">Stop</span>{stop}</button>
          </div>
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default SoundContainer;
