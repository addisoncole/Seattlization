import axios from 'axios';
import React, { Component } from 'react';
import Tone from 'tone';



const GET_COUNTS = "http://localhost:8000/homelesscounts/";

class DataSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yearlyHomelessCount: [],
      statusText: '',
    }

  }

  componentDidMount() {
    this.setState({
      statusText: 'loading'
    });
    axios.get(GET_COUNTS)
    .then((response) => {
      this.setState({
        yearlyHomelessCount: response.data,
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
    const { yearlyHomelessCount } = this.state;
    const count =  (yearlyHomelessCount[1].total - yearlyHomelessCount[0].total) - 2100;
    var synth = new Tone.PolySynth(2, Tone.Synth).toMaster();
    console.log(count);
    const time = Tone.context.currentTime;
    for (var i = 0; i < count; i++) {
      const sound = synth.triggerAttackRelease(["F2", "Ab2"], "4n", (time + i) );
      console.log(sound);
    }
  }


  render() {
    const { yearlyHomelessCount } = this.state;
    const allCounts = yearlyHomelessCount;

    const displayCounts = allCounts.map((count, i) => {
      return (`${count.year}: ${count.total} `)
    });
    // const synth = new Tone.Synth().toMaster();
    // const sound = synth.triggerAttackRelease("G4", "8n");

    return (
      <div>
      {displayCounts}
      <button onClick = {this.playCount} >Play</button>
      </div>
    )
  }
}

export default DataSet;
