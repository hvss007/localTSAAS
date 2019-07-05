import React, { Component } from 'react';
import classes from './Trips.css'
import Trip from './Trip/IndividualTrip/IndividualTrip'; 
import Aux from '../../Hoc/Aux';
// import Backdrop from '../../Hoc/Backdrop/Backdrop';
// import {Link} from 'react-router-dom';
class Trips extends Component{
    state={
        trips:[{idf:1,showAdd:true,origin:null,lat:null,lng:null}]
    }
    componentDidMount(){
        //console.log(this.props.match.params.id1);
        // console.log(this.props.match.url);
        // var a=this.props.match.url;
        // var b=(this.props.match.params.id1+'/trip-info');
        // var start = a.indexOf(b);
        // console.log(start);
        // var s = a.replace(b, '')
        // console.log(s)
        // var end = start + b.length;
        // var result= a.substring(0, start - 1) + a.substring(end);
        // //console.log(this.props.match.params.id1+'/trip-info')
        // //console.log(this.props.match.url-(this.props.match.params.id1+"/trip-info"))
        // console.log(result);
    }
    nextMemberClickHandler=()=>{
        if (window.confirm("Have you added all trips ?")) {
           this.props.history.push({pathname:this.stringSubtract(this.props.match.url,(this.props.match.params.id1+'/trip-info'))})
          } else {
           
          }
    }
    finishClicked=()=>{
        if (window.confirm("Have you added all members ?")) {
            this.props.history.push({pathname:'/finishsurvey'})
           } else {
            
           }
    }
    stringSubtract=(a,b)=>{
        return a.replace(b, '')
    }
    addTrip=(idf,origin,lat ,lng)=>{
        //,destination:this.state.trips[idf-1].destination
        const tripNew={idf:idf+1,showAdd:true,origin:origin,lat:lat,lng:lng};
        const tripsCopy=[...this.state.trips];
        const tripsCopyElementOld={...tripsCopy[idf-1]};
        tripsCopyElementOld.showAdd=false;
        tripsCopy[idf-1]=tripsCopyElementOld;
        tripsCopy.push(tripNew);
        this.setState({trips:tripsCopy})
    }
    render(){
        const tripElements=this.state.trips.map((item,index)=>{
            return <Trip idf={item.idf} showAdd={item.showAdd} initialOrigin={item.origin} initLat={item.lat} initLng={item.lng} endOriginHandler={this.endOriginHandler} key={item.idf} addTrip={this.addTrip}></Trip>
        })
        return(
            <Aux> 
                <div className={classes.TripInformation}><h1>Trips Information</h1></div>
                {tripElements}
               {this.state.trips.length>0?<div className={classes.NextMemberWrapper}>
                    
                    <button onClick={this.nextMemberClickHandler} className={classes.NextMemberButton+" "+ classes.NextMemberButtonBorder}>Add Member</button>
                    <button onClick={this.finishClicked} className={classes.NextMemberButton+" "+ classes.NextMemberButtonBorder}> Finish Survey</button>
                    {/* <Link className={classes.NextMemberButton+" "+ classes.NextMemberButtonBorder} to={this.stringSubtract(this.props.match.url,(this.props.match.params.id1+'/trip-info'))}>Next Member</Link> */}
                
                </div>:null}
            </Aux>
        )
    }
}
export default Trips;
// const tripAccess=this.state.access.map((acc,index)=>{
//     return <TripAccess accessDataIn={this.accessDataInHandler} accessData={this.accessDataHandler} key={acc.idi} add={this.addHandler} accessName={"Access"}  idi={acc.idi} showAdd={acc.showAdd}>
//     </TripAccess>
// })