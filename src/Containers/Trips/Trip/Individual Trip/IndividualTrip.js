import React, { Component } from 'react';
import classes from './IndividualTrip.css';
import TripOrigin from './TripOrigin/TripOrigin';
import Axios from 'axios';
import TripOriginMap from './TripOrigin/TripOriginMap/TripOriginMap';
import Backdrop from '../../../../Hoc/Backdrop/Backdrop';
import Backdrop1 from '../../../../Hoc/Backdrop/Backdrop1';
import TripAcessAndMode from './TripAcessAndMode/TripAcessAndMode';

class Trip extends Component{
    state={
        tripInformation:{
                originData:{originLat:"",originLng:"",originPlace:""},
                destinationData:{destinationLat:"",destinationLng:"",destinationPlace:""},
                accessModeData:{}
            },
        sendData:false
        // backdropShow:false,
        // commentModalShow:false,
        // commentModalShowDestination:false
    }
    // backdropShowHandler=(show)=>{
    //     this.setState({backdropShow:show},()=>{console.log(this.state.backdropShow,"dhtjd")})
    // }
    // hidebackdropHandler=(show,callback)=>{
    //     this.setState({backdropShow:show},()=>{console.log(this.state.backdropShow,"rhxf")})
    // }
    // showModalBackdropHandler=(show)=>{
    //     this.setState({commentModalShow:show})
    // }
    // showModalBackdropDesHandler=(show)=>{
    //     this.setState({commentModalShowDes:show})
    // }
    // hideModalBackdropHandler=(show)=>{
    //     this.setState({commentModalShow:show})
    // }
    // hideModalBackdropDesHandler=(show)=>{
    //     this.setState({commentModalShowDestination:show})
    // }
    // sideClickHandler=(truth)=>{
    //     this.setState({commentModalShow:truth})
    // }
    // sideClickDesHandler=(truth)=>{
    //     this.setState({commentModalShowDestination:truth})
    // }
    onSubmitHandler=()=>{
        
         this.setState({sendData:true},
        
        
        //     this.props.addTrip(this.props.idf);}
         )
    }
    tripAccessDataHandler=(dataObj)=>{
        console.log(dataObj);
        const tripInformationCopy={...this.state.tripInformation};
        //tripInformationCopy["accessModeData"]=dataObj;
        
        let accessModeDataCopy={...tripInformationCopy.accessModeData};
        accessModeDataCopy={...dataObj};
        console.log(accessModeDataCopy);
        tripInformationCopy.accessModeData={...accessModeDataCopy};
        console.log(tripInformationCopy,"fvssbs")
        this.setState({tripInformation:tripInformationCopy},()=>{console.log(this.state.tripInformation)
            
            console.log("heli",this.state.tripInformation)
            const dataCopy={...this.state.tripInformation};
            console.log(dataCopy,"uyyy")
            const originDestinationArray=[{...dataCopy.originData,...dataCopy.destinationData}];
            console.log(originDestinationArray);
            const updatedData={originDestination:originDestinationArray,accessModeData:dataCopy.accessModeData}
            console.log(updatedData,"huigy")
            
            Axios.post("http://18.220.237.87/api/transdb/",updatedData)
                .then((Response)=>{
                    console.log(Response);
                })
            }
            )
    }
    latLongHandler1=(lat,lng,originOrDestination)=>{
        const tripInformationCopy={...this.state.tripInformation};
        if(originOrDestination==="Origin")
        {
            const originDataCopy={...tripInformationCopy.originData}
            originDataCopy.originLat=lat;
            originDataCopy.originLng=lng;
            tripInformationCopy.originData=originDataCopy;
            this.setState({tripInformation:tripInformationCopy})
        }
        if(originOrDestination==="Destination"){
            const destinationDataCopy={...tripInformationCopy.destinationData}
            destinationDataCopy.destinationLat=lat;
            destinationDataCopy.destinationLng=lng;
            tripInformationCopy.destinationData=destinationDataCopy;
            this.setState({tripInformation:tripInformationCopy},()=>{
                // console.log(this.state.tripInformation);
            })
        }
    }
    originDataHandler=(place,originOrDestination)=>{
        const tripInformationCopy={...this.state.tripInformation};
        if(originOrDestination==="Origin"){
            const originDataCopy={...tripInformationCopy.originData}
            originDataCopy.originPlace=place;
            tripInformationCopy.originData=originDataCopy;
            this.setState({tripInformation:tripInformationCopy},()=>{
                // console.log(this.state.tripInformation);
            })
        }
        if(originOrDestination==="Destination"){
            const destinationDataCopy={...tripInformationCopy.destinationData}
            destinationDataCopy.destinationPlace=place;
            tripInformationCopy.destinationData=destinationDataCopy;
            this.setState({tripInformation:tripInformationCopy},()=>{
                // console.log(this.state.tripInformation);
            })
        }
    }
    render(){
        return(
            <div className={classes.Trip} >
                <div style={{display:"flex",justifyContent:"space-between"}}>
                <TripOrigin latLongHandler1={this.latLongHandler1} originDataHandler={this.originDataHandler} key={"g"} ifj={1+""+this.props.idf} sideClicked={this.sideClickHandler} modalShow={this.showModalBackdropHandler} show={this.state.commentModalShow} originOrDestination={"Origin"} ></TripOrigin>    
                <TripOrigin latLongHandler1={this.latLongHandler1} originDataHandler={this.originDataHandler} ifj={2+""+this.props.idf} key={"dhg"} sideClicked={this.sideClickDesHandler} modalShow={this.showModalBackdropHandler} show={this.state.commentModalShowDestination} originOrDestination={"Destination"}></TripOrigin>
                </div>
                
                
                <TripAcessAndMode sendData={this.state.sendData} 
                tripAccessDataHandler={this.tripAccessDataHandler}
                >
                </TripAcessAndMode>
                
                {/* <div
                   style={this.state.backdropShow?{
                   width:'100%',
                   position:"absolute",
                   height:'300px',
                   transition:'all ease-in 0.5s'
               }:null}> 
                    <TripOriginMap  ifj={2}backdropHidden={this.state.backdropShow} backdropShowed={this.backdropShowHandler}></TripOriginMap>
                </div> */}
                {/* <Backdrop show={this.state.backdropShow} 
                    hideBackdrop={this.hidebackdropHandler}></Backdrop>
                 <Backdrop1 hideModalBackdrop={this.hideModalBackdropHandler} show={this.state.commentModalShow}></Backdrop1>
                 <Backdrop1 hideModalBackdrop={this.hideModalBackdropHandler} show={this.state.commentModalShowDestination}></Backdrop1> */}
                {<button onClick={
                    this.onSubmitHandler
                    //  this.props.addTrip(this.props.idf)
                     } type="submit">Add Trip</button>}
            </div>
        )
    }  
}
export default Trip;