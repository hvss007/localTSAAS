import React, { Component } from 'react';
import classes from './MapControls.css'
import {InputLabel,Select,MenuItem,TextField} from '@material-ui/core'
// import AutoComplete from './AutoComplete'
import Button from '@material-ui/core/Button';
import {primaryCategories} from './assets/categories'
import Axios from 'axios'

import eatAndDrink from './assets/eatAndDrink.json'
import goingOut from './assets/goingOut.json'
import accommodations from './assets/accommodations.json'
import shopping from './assets/shopping.json'
import facilities from './assets/facilities.json'
import areas from './assets/areasAndBuildings.json'
import business from './assets/businessAndServices.json'
import nature from './assets/naturalAndGeographical.json'
import transport from './assets/transport.json'
import sights from './assets/sightsAndMuseums.json'
import leisure from './assets/leisureAndOutdoor.json'
export default class MapControls extends Component{
    constructor(props) {
        super(props);
    this.state={
        suggestionsArray:[...primaryCategories],
        secArr:[]}
    this.importsObj={eatAndDrink,goingOut,accommodations,shopping,facilities,areas,business,nature,transport,sights,leisure}
    }
    categoriesHandler=()=>{
        Axios.get("https://places.ls.hereapi.com/places/v1/categories/places?at=28.7041,77.1025&apiKey=vBo8JW0978Qk77E-K2Jp3W9aB_4JyNesVps4r66ipNE+")
        .then(Response=>{
            const catArray=[]
            
            Response.data.items.forEach((el)=>{
                catArray.push({id:el.id,title:el.title,icon:el.icon})
            })

            this.setState({suggestionsArray:catArray})
        })
        .catch(e=>{
            console.log(e)
        })
    }
    newCategoriesHandler=(val)=>{
        const req_arr=primaryCategories.filter(el=>{
            return el.code==val 
        })
        //this.setState({suggestionsArray:eval(req_arr.arr)})
        console.log()
        console.log(this.importsObj[req_arr[0].arr])
        const newArr=this.importsObj[req_arr[0].arr]
        this.setState({secArr:newArr})
    }
    render(){   
       const  menuItems=this.state.suggestionsArray.map(element=>{
            // console.log(element)
            // console.log(eatAndDrink)
            return <MenuItem value={element.code?element.code:element.id}>{element.title}</MenuItem>
        })
        const  menuItems1=this.state.secArr.map(element=>{
            // console.log(element)
            // console.log(eatAndDrink)
            return <MenuItem value={element.Code}>{element.Title}</MenuItem>
        })
        return(
            <div className={classes.ControlsContainer}>
                <div className={classes.Heading}>
                    <h2>Configuration</h2>
                </div>
                <div className={classes.FormControls}>
                    <div className={classes.CityInput}>
                        <input type='text' name="city" defaultValue="New Delhi" onChange={(event)=>this.props.inputHandler(event)}/> 
                        <Button style={{fontSize:'12px',padding:'3px',borderRadius:'0px',backgroundColor:'#449DD1'}} color="primary" onClick={this.props.cityEnteredHandler} variant="contained"  component="span">Fetch City Map</Button>   
                        {/* <button onClick={this.props.cityEnteredHandler}>Fetch city map</button>     */}
                    </div>
                    <div className={classes.Pois}>
                        <InputLabel id='selectMode'> Select Travel Mode</InputLabel>
                        <Select name='modes' onChange={event=>this.props.inputHandler(event)} labelId='selectMode' id='selectm' value={this.props.mode}>
                                {/* {menuItems} */}
                                <MenuItem value="pedestrian">Walk</MenuItem>
                                <MenuItem value="car">Car</MenuItem>
                                {/* <MenuItem value="publicTransport">PT</MenuItem> */}
                                {/* <MenuItem value="carHOV">Car HOV</MenuItem> */}
                                {/* <MenuItem value="truck">Truck</MenuItem> */}
                                {/* <MenuItem value="bicycle">Bicycle</MenuItem> */}
                                {/* <MenuItem value="publicTransport">PT</MenuItem> */}
                        </Select>
                    </div>
                    
                    <div className={classes.Pois}>
                        <InputLabel id='selectModeTransition'> Select Route Preference</InputLabel>
                        <Select name='modePreference' onChange={event=>this.props.inputHandler(event)} labelId='selectModeTransition' id='selectmr'  value={this.props.modePreference}>
                                {/* {menuItems} */}
                                <MenuItem value="fastest">Fastest</MenuItem>
                                <MenuItem value="shortest">Shortest</MenuItem> 
                        </Select>
                    </div>
                    <div className={classes.Pois}>
                        <InputLabel id='selectTrafficState'> Select Traffic conditions on Roads</InputLabel>
                        <Select name='modeState' onChange={event=>this.props.inputHandler(event)} labelId='selectTrafficState' id='selectmr' value={this.props.modeState}>
                                {/* {menuItems} */}
                                <MenuItem value="enabled">Enabled</MenuItem>
                                <MenuItem value="disabled">Disabled</MenuItem>
                                
                        </Select>
                    </div>
                    <div className={classes.Pois}>
                        <InputLabel id='enterTimeBins'> Enter 'Comma-Seperated' Time Bins Values (min)</InputLabel>
                        {/* <Select name='pois' onChange={event=>this.props.inputHandler(event)} labelId='selectPois' id='selectp' value={this.props.pois}>
                                {menuItems}     
                        </Select> */}
                        <TextField name='timeBins' id=""  onChange={event=>this.props.inputHandler(event)} labelId="enterTimeBins" id='selecttb' value={this.props.timeBins}/>
                    </div>
                    <Button 
                        style={{fontSize:'12px',backgroundColor:'#449DD1'}}
                        variant="contained" color="primary" 
                        onClick={()=>{this.categoriesHandler()}} component="span">Request Available Categories</Button>
                    <div className={classes.Pois}>
                        <InputLabel id='selectPois'> Select Primary Category</InputLabel>
                        <Select name='pois' 
                            onChange={event=>{
                                this.props.inputHandler(event)
                                this.newCategoriesHandler(event.target.value)
                                
                            }} 
                            labelId='selectPois' id='selectp' value={this.props.pois}>
                                {menuItems}     
                        </Select>
                    </div>
                    {this.state.secArr.length>0?
                    <div className={classes.Pois}>
                        <InputLabel id='selectSecPois'> Select secondary category</InputLabel>
                        <Select name='secPois' 
                            onChange={event=>{
                                this.props.inputHandler(event)
                            }} 
                            labelId='selectSecPois' id='selectp' value={this.props.secPois}>
                                {menuItems1}     
                        </Select>
                    </div>:null}
                     {/* <div className={classes.Pois}>
                    <InputLabel id='selectPois'> Click to load more data</InputLabel>
                    <Button 
                        style={{fontSize:'12px',backgroundColor:'#449DD1'}}
                        variant="contained" color="primary" 
                        onClick={this.props.fetchHandler} component="span">Fetch More data</Button>
                        {/* <button style={{padding:'7px',backgroundColor: 'aqua',border:'none'}} onClick={this.props.fetchHandler}>Fetch more data</button> */}
                     {/* </div>  */} 
                    
                </div>
                
            </div>
        )
    }
}