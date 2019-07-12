import React, { Component } from 'react';
import HereMaps from './HereMaps';
import classes from './MainMaps.css'
class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
        theme: 'normal.day',
        // lat:"26.9124",
        // lng:"75.7873",
        value:null
      }
    this.onChange = this.onChange.bind(this);
}
// componentWillReceiveProps(nextProps,nextState){
//   if(this.props.mapLocation!==nextProps.mapLocation){
//     this.forceUpdate();
//     return true
//   }
// }
componentWillReceiveProps(nextProps){
  if(this.props.markerLocationLat!==nextProps.markerLocationLat){
    this.setState({lat:nextProps.markerLocationLat,lng:nextProps.markerLocationLng})
  }
}
inputHandler=(event)=>{
  this.setState({value:event.target.value});
  console.log(this.state.value);
  return this.state.value;
}
onChange(evt) {
    evt.preventDefault();
}
  render() {
    return (
      <div className={classes.MainMaps} >
        <div style={{fontSize:'12px',textAlign:'center'}} ><p>*You can drag the marker to your approximate new location</p></div>
        <div style={{textAlign:'right',position:'fixed', zIndex:'100'}}><p>{this.state.lat} ,{this.state.lng}</p> </div>
        <HereMaps
          markerLocationText={this.props.markerLocationText}
          mapLocation={this.props.mapLocation}
          app_id={process.env.REACT_APP_PLACES_API_ID}
          app_code={process.env.REACT_APP_PLACES_APP_CODE}
          lat={this.state.lat}
          lng={this.state.lng}
          markerLocationLat={this.props.lat}
          markerLocationLng={this.props.lng}
          zoom="12"
          theme={ this.state.theme}
          inputChange={(event)=>this.inputHandler(event)}
          dragLatHandler={this.props.dragLatHandler}
          dropdownArrayHandler={this.props.dropdownArrayHandler}
          searchArea={this.props.searchText}
          autocompleteArrayHandler={this.props.autocompleteArrayHandler}
          markerQuery={this.props.markerQuery}
          mapCenter={this.props.mapCenter}
        ></HereMaps>
        {/* <ThemeSelector changeTheme={ this.onChange } /> */}
      </div>
    );
  }
}
export default MainMap;
