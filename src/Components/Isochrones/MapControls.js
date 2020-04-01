import React, { Component } from 'react';
import classes from './MapControls.css'
import {InputLabel,Select,MenuItem,TextField} from '@material-ui/core'
export default class MapControls extends Component{
    // componentWillReceiveProps(nextProps){
    //     if
    // }
   
    render(){
        const suggestionsArray=[
            "restaurant",
            "coffee-tea",
            'snacks-fast-food',
            'going-out',
            'sights-museums',
            "airport",
            'accommodation',
            'shopping',
            'leisure-outdoor',
            'administrative-areas-buildings',
            'natural-geographical',
            'petrol-station',
            'atm-bank-exchange',
            'toilet-rest-area',
            "hospital-health-care-facility"]
        const menuItems=suggestionsArray.map(element=>{
            //console.log(element)
            return <MenuItem value={element}>{element}</MenuItem>
        })
        return(
            <div className={classes.ControlsContainer}>
                <div className={classes.Heading}>
                    <h2>Map Controls</h2>
                </div>
                <div className={classes.FormControls}>
                    <div className={classes.CityInput}>
                        <input type='text' name="city" defaultValue="New Delhi" onChange={(event)=>this.props.inputHandler(event)}/> 
                        <button onClick={this.props.cityEnteredHandler}>Fetch city map</button>    
                    </div>
                    <div className={classes.Pois}>
                        <InputLabel id='selectMode'> Select Mode</InputLabel>
                        <Select name='modes' onChange={event=>this.props.inputHandler(event)} labelId='selectMode' id='selectm' value={this.props.mode}>
                                {/* {menuItems} */}
                                <MenuItem value="pedestrian">Walk</MenuItem>
                                <MenuItem value="car">Car</MenuItem>
                                <MenuItem value="publicTransport">PT</MenuItem>
                                <MenuItem value="carHOV">Car HOV</MenuItem>
                                <MenuItem value="truck">Truck</MenuItem>
                                <MenuItem value="bicycle">Bicycle</MenuItem>
                                <MenuItem value="publicTransport">PT</MenuItem>
                        </Select>
                    </div>
                    <div className={classes.Pois}>
                        <InputLabel id='selectModeTransition'> Select Mode Preference</InputLabel>
                        <Select name='modePreference' onChange={event=>this.props.inputHandler(event)} labelId='selectModeTransition' id='selectmr'  value={this.props.modePreference}>
                                {/* {menuItems} */}
                                <MenuItem value="fastest">Fastest</MenuItem>
                                <MenuItem value="shortest">Shortest</MenuItem> 
                        </Select>
                    </div>
                    <div className={classes.Pois}>
                        <InputLabel id='selectTrafficState'> Select Mode State</InputLabel>
                        <Select name='modeState' onChange={event=>this.props.inputHandler(event)} labelId='selectTrafficState' id='selectmr' value={this.props.modeState}>
                                {/* {menuItems} */}
                                <MenuItem value="enabled">Enabled</MenuItem>
                                <MenuItem value="disabled">Disabled</MenuItem>
                                
                        </Select>
                    </div>
                    <div className={classes.Pois}>
                        <InputLabel id='enterTimeBins'> Enter Time Bins Values</InputLabel>
                        {/* <Select name='pois' onChange={event=>this.props.inputHandler(event)} labelId='selectPois' id='selectp' value={this.props.pois}>
                                {menuItems}     
                        </Select> */}
                        <TextField name='timeBins' id=""  onChange={event=>this.props.inputHandler(event)} labelId="enterTimeBins" id='selecttb' value={this.props.timeBins}/>
                    </div>
                    <div className={classes.Pois}>
                        <InputLabel id='selectPois'> Select Positions of interest</InputLabel>
                        <Select name='pois' onChange={event=>this.props.inputHandler(event)} labelId='selectPois' id='selectp' value={this.props.pois}>
                                {menuItems}     
                        </Select>
                    </div>
                    
                    <div className={classes.Pois}>
                        <button onClick={this.props.fetchHandler}>Fetch more data</button>
                    </div>
                    
                </div>
                
            </div>
        )
    }
}