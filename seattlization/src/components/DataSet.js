import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';



const GET_COUNTS = "http://localhost:8000/homelesscounts/";

class NewComponent extends Component {
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
      console.log(response.data)
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

  render() {
    const { yearlyHomelessCount } = this.state;
    const allCounts = yearlyHomelessCount;

    const displayCounts = allCounts.map((count, i) => {
      return (`${count.year}: ${count.total} `)
    });

    return (
      <div>
        {displayCounts}
      </div>
    )
  }
}

NewComponent.propTypes = {

};

export default NewComponent;
