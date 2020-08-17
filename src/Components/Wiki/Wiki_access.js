import React, { Component } from 'react';
import Backdrop from '../../Hoc/Backdrop/Backdrop1';
import Aux from '../../Hoc/Aux';

import { Link } from 'react-router-dom/cjs/react-router-dom';
import classes from './Wiki.css';

class Wiki extends Component {
  state = {
    show: false,
    src: null
  };
  onClickHandler = src => {
    this.setState({ show: true, src: src });
  };
  hideModalBackdrop = value => {
    this.setState({ show: value });
  };
  render() {
    return (
      <Aux>
        <Backdrop
          show={this.state.show}
          src={this.state.src}
          hideModalBackdrop={this.hideModalBackdrop}
        ></Backdrop>
        <div className={classes.Wiki}>
          <h4>Aim:</h4>
          <p>
            The aim of this tool is to perform analysis of accessibility using the 
            real travel time information.
          </p>

          <h4> Privacy Policy:</h4>
          <p>
            The details of our privacy policy is available{' '}
            <Link to="/privacypolicy">here</Link>. If a file is uploaded to perform accessibility analysis for the given locations, the file is not stored anywhere.
          </p>
          <h4>Team Members:</h4>
          <ul>
            <li>
              <b>Front-end:</b> Harsh Vardhan 
            </li>
            <li>
              <b>Mentor / Supervisor:</b> Dr. Amit Agarwal{' '}
            </li>
          </ul>
        </div>
      </Aux>
    );
  }
}

export default Wiki;
