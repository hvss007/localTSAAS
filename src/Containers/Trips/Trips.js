import React, { Component } from 'react';
import classes from './Trips.css'
import Trip from './Trip/Individual Trip/IndividualTrip'; 
import Aux from '../../Hoc/Aux';
import Backdrop from '../../Hoc/Backdrop/Backdrop';
import {Link} from 'react-router-dom';
class Trips extends Component{
    state={
        trips:[{idf:1,showAdd:true}]
    }
    addTrip=(idf)=>{
        const tripNew={idf:idf+1,showAdd:true};
        const tripsCopy=[...this.state.trips];
        const tripsCopyElementOld={...tripsCopy[idf-1]};
        tripsCopyElementOld.showAdd=false;
        tripsCopy[idf-1]=tripsCopyElementOld;
        tripsCopy.push(tripNew);
        this.setState({trips:tripsCopy})
    }
    render(){
        const tripElements=this.state.trips.map((item,index)=>{
            return <Trip idf={item.idf} showAdd={item.showAdd} key={item.idf} addTrip={this.addTrip}></Trip>
        })
        return(
            <Aux> 
                <div className={classes.TripInformation}><h1>Trips Information</h1></div>
                {tripElements}
                <Link to="/">Next Member</Link>
            </Aux>
        )
    }
}
export default Trips;
// const tripAccess=this.state.access.map((acc,index)=>{
//     return <TripAccess accessDataIn={this.accessDataInHandler} accessData={this.accessDataHandler} key={acc.idi} add={this.addHandler} accessName={"Access"}  idi={acc.idi} showAdd={acc.showAdd}>
//     </TripAccess>
// })