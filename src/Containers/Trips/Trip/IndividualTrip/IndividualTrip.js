import React, { Component } from 'react';
import classes from './IndividualTrip.css';
import TripOrigin from './TripOrigin/TripOrigin';
import Axios from 'axios';
import TripOriginMap from './TripOrigin/TripOriginMap/TripOriginMap';
import Backdrop from '../../../../Hoc/Backdrop/Backdrop';
import Backdrop1 from '../../../../Hoc/Backdrop/Backdrop1';
import TripAcessAndMode from './TripAcessAndMode/TripAcessAndMode';
import {withRouter} from 'react-router-dom';
class Trip extends Component{
    state={
        tripInformation:{
                originData:{originLat:null,originLng:null,originPlace:null,isValid:false},
                destinationData:{destinationLat:null,destinationLng:null,destinationPlace:null,isValid:false},
                accessModeData:{}
            },
        sendData:false,
        disableAdd:true,
        sendData1:false
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
            const validArr=updatedData.accessModeData.mode.filter(item=>{
            
                return !item.isValid 
            })
            
            console.log(updatedData,"huigy")
            if(validArr.length===0){
                //this.setState({sendData1:true})
                this.props.addTrip(this.props.idf)
                const data={memberID:this.props.match.params.id1};
                Axios.post("http://127.0.0.1:8000/api/trips/",data)
                .then(response=>{
                        
                        console.log(response.data)            
                         Axios.post("http://127.0.0.1:8000/api/od/",{tripID:response.data.tripID,...updatedData.originDestination[0]}
                         //{tripID:response.data.tripID,...updatedData.originDestination[0]}
                         ).then(response=>{})
                         updatedData.accessModeData.mode.forEach(element => {
                            console.log();
                            delete element.isValid;
                            Axios.post("http://127.0.0.1:8000/api/mode/",{tripID:response.data.tripID,...element}
                            //{tripID:response.data.tripID,...updatedData.originDestination[0]}
                            ).then(response=>{})    
                         });
                         
                        // response.data.tripID
                  
                    })
                
                
            }
            else{
                alert("Please fill all the fields before adding next trip")
                 this.setState({sendData:false})
            }
            

            
            // Axios.get("http://127.0.0.1:8000/api/trips/")
            //     .then((Response)=>{
                    
            //         console.log(Response);
            //         //this.props.history.push({pathname:this.props.match.url+Response.data.memberID+'/trip-info'})
            //     })
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
        const originData=this.state.tripInformation.originData;
        const destinationData=this.state.tripInformation.destinationData;
        let tripAcessAndModeData=null;
        let orValue=false;
        let drValue=false;
        if(originData.originLat&&originData.originLng&&originData.originPlace)
        {   orValue=true
             tripAcessAndModeData=<TripAcessAndMode sendData={this.state.sendData} 
            tripAccessDataHandler={this.tripAccessDataHandler}
            ></TripAcessAndMode>
        }
        if(destinationData.destinationLat&&destinationData.destinationLng&&destinationData.destinationPlace)
        {   drValue=true
        }
        return(
            <div className={classes.Trip} >
                <div className={classes.OriginDestinationWrapper} >
                <TripOrigin latLongHandler1={this.latLongHandler1} originDataHandler={this.originDataHandler} key={"g"} ifj={1+""+this.props.idf} sideClicked={this.sideClickHandler} modalShow={this.showModalBackdropHandler} show={this.state.commentModalShow} originOrDestination={"Origin"} ></TripOrigin>    
                <TripOrigin latLongHandler1={this.latLongHandler1} originDataHandler={this.originDataHandler} ifj={2+""+this.props.idf} key={"dhg"} sideClicked={this.sideClickDesHandler} modalShow={this.showModalBackdropHandler} show={this.state.commentModalShowDestination} originOrDestination={"Destination"}></TripOrigin>
                </div>
                
                {/* <TripAcessAndMode sendData={this.state.sendData} 
                tripAccessDataHandler={this.tripAccessDataHandler}
                >
                </TripAcessAndMode> */}
                {tripAcessAndModeData}
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
                {this.props.showAdd?<button onClick={
                     ()=>
                    {   orValue&&drValue?this.onSubmitHandler():alert('Please fill origin and destination values before proceeding')
                        
                    } 
                     } type="submit">Add Trip</button>:null}
            </div>
        )
    }  
}
export default withRouter(Trip);