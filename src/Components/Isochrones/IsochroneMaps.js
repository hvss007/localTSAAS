import React, { Component } from "react";
import classes from "./IsochroneMaps.css";
import HereMaps from "./HereMaps";
import MapControls from "./MapControls";
import Axios from 'axios'
class MAps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: null,
      pois: "",
      modes: "car",
      modeState: "enabled",
      modePreference: "fastest",
      updatedFetchCount: 0,
      theme: "normal.day",
      lat: "28.7041",
      lng: "77.1025",
      value: null,
      secPois: "",
      timeBins: "",
      noOfPoints: "",
      transparency: 50,
      boundingBox: null,
      fileInput: null,
      searchLat:"28.7041",
      searchLng:"77.1025",
      searchPosArr:[],
      searchValue:""
    };
    this.onChange = this.onChange.bind(this);
  }
  handleFileInput = (obj) => {
    this.setState({ fileInput: obj });
  };
  nosHandleChange = (event, newValue) => {
    this.setState({ noOfPoints: newValue });
  };
  transparencyChange = (event, newValue) => {
    this.setState({ transparency: newValue });
  };
  inputHandler = (event) => {
    var inputCopy = this.state[[event.target.name]];
    inputCopy = event.target.value;
    this.setState({ [[event.target.name]]: inputCopy });
  };
  fetchHandler = () => {
    this.setState({ updatedFetchCount: this.state.updatedFetchCount + 1 });
  };
  selectedOption=(value)=>{
    var query=value.split("- ")
    console.log(query)
    Axios.get('https://places.cit.api.here.com/places/v1/autosuggest?at='+this.state.searchLat+","+this.state.searchLng+'&q='+query[1] +'&app_id='+process.env.REACT_APP_PLACES_API_ID+'&app_code='+process.env.REACT_APP_PLACES_APP_CODE)
    .then(Response=>{

      if(Response.data.results.length>0){
        var posArray=Response.data.results.filter(el=>{
          return el.position
        })
        console.log(posArray)
        this.setState({searchValue:query,searchPosArr:posArray})
      }
    })
  }
  boundingBoxHandler = (bbox) => {
    this.setState({ boundingBox: bbox });
  };
  cityEnteredHandler = () => {
    var platform = new window.H.service.Platform({
      apikey: process.env.REACT_APP_PLACES_API_KEY,
    });
    this.getCityCoordinates(platform);
  };
  getCityCoordinates = (platform) => {
    var geocoder = platform.getGeocodingService();
    geocoder.geocode({ searchText: this.state.city }, this.onResult, function (
      e
    ) {
      alert(e);
    });
  };
  coordHandler=(lat,lng)=>{
    this.setState({searchLat:lat,searchLng:lng})
  }
  onResult = (result) => {
    var locations = result.Response.View[0].Result,
      position;
    position = {
      lat: locations[0].Location.DisplayPosition.Latitude,
      lng: locations[0].Location.DisplayPosition.Longitude,
    };
    this.setState({ lat: position.lat, lng: position.lng });
  };

  onChange(evt) {
    evt.preventDefault();

    var change = evt.target.id;
    this.setState({
      theme: change,
    });
  }
  render() {
    return (
      <div className={classes.MainContainer}>
        <MapControls
        selectedOption={this.selectedOption}
          handleFileInput={this.handleFileInput}
          bbox={this.state.boundingBox}
          nosHandleChange={this.nosHandleChange}
          transparencyChange={this.transparencyChange}
          fetchHandler={this.fetchHandler}
          pois={this.state.pois}
          secPois={this.state.secPois}
          mode={this.state.modes}
          modePreference={this.state.modePreference}
          timeBins={this.state.timeBins}
          modeState={this.state.modeState}
          cityEnteredHandler={this.cityEnteredHandler}
          inputHandler={this.inputHandler}
          searchLat={this.state.searchLat}
          searchLng={this.state.searchLng}
        ></MapControls>
        <HereMaps
        coordHandler={this.coordHandler}
          searchPosArr={this.state.searchPosArr}
          noOfPoints={this.state.noOfPoints}
          pois={this.state.pois}
          secPois={this.state.secPois}
          app_id={process.env.REACT_APP_PLACES_API_ID}
          app_code={process.env.REACT_APP_PLACES_APP_CODE}
          apikey={process.env.REACT_APP_PLACES_API_KEY}
          lat={this.state.lat}
          lng={this.state.lng}
          zoom="10"
          updatedFetchCount={this.state.updatedFetchCount}
          mode={this.state.modes}
          modeState={this.state.modeState}
          modePreference={this.state.modePreference}
          theme={this.state.theme}
          timeBins={this.state.timeBins}
          transparency={this.state.transparency}
          inputChange={(event) => this.inputHandler(event)}
          boundingBoxHandler={this.boundingBoxHandler}
          fileInput={this.state.fileInput}
          searchValue={this.state.searchValue}
        ></HereMaps>
      </div>
    );
  }
}

export default MAps;
