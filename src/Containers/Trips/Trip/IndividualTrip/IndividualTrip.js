import React, { Component } from 'react';
import classes from './IndividualTrip.css';
import TripOrigin from './TripOrigin/TripOrigin';
import Axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
// import TripOriginMap from './TripOrigin/TripOriginMap/TripOriginMap';
// import Backdrop from '../../../../Hoc/Backdrop/Backdrop';
// import Backdrop1 from '../../../../Hoc/Backdrop/Backdrop1';
import TripAcessAndMode from './TripAcessAndMode/TripAcessAndMode';
import {withRouter} from 'react-router-dom';
import HostName from '../../../../assets/globalvaribles/GlobalVariables';
class Trip extends Component{
    state={
        tripInformation:{
                originData:{originLat:this.props.initLat?this.props.initLat:null,originLng:this.props.initLng?this.props.initLng:null,originPlace:null,isValid:false,originTime:'',originLandmark:this.props.initialLandmark?this.props.initialLandmark:''},
                destinationData:{destinationLat:null,destinationLng:null,destinationPlace:null,isValid:false,destinationTime:'',destinationLandmark:''},
                accessModeData:{}
            },
        sendData:false,
        disableAdd:true,
        sendData1:false,
        showMid:false,
        showDes:false,
        whichButtonClicked:null
        // backdropShow:false,
        // commentModalShow:false,
        // commentModalShowDestination:false
    }
    // backdropShowHandler=(show)=>{
    //     this.setState({backdropShow:show},()=>{//console.log(this.state.backdropShow,"dhtjd")})
    // }
    // hidebackdropHandler=(show,callback)=>{
    //     this.setState({backdropShow:show},()=>{//console.log(this.state.backdropShow,"rhxf")})
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
    submit = (display) => {
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => alert('Click Yes')
            },
            {
              label: 'No',
              onClick: () => alert('Click No')
            }
          ]
        });
      };
    onSubmitHandler=(value,button)=>{
         this.setState({sendData:value,whichButtonClicked:button},        
        //     this.props.addTrip(this.props.idf);}
         )
    }
    finishClicked=()=>{
        this.onSubmitHandler(true,'finishButton')
        
    }
    removeCurrentTripHandler=()=>{
        this.props.removeCurrentTripHandler(this.props.idf)
    }
    stringSubtract=(a,b)=>{
        return a.replace(b, '')
    }
    nextMemberClickHandler=()=>{
        this.onSubmitHandler(true,'nextMemberButton')
        // if (window.confirm("Have you added all trips?")) {
        //     if(!this.props.disabled){
                
        //         this.onSubmitHandler(true,'nextMemberButton')
        //     }
        //     else{
        //         this.props.history.push({pathname:this.stringSubtract(this.props.match.url,(this.props.match.params.id1+'/trip-info'))})
        //     }
            
        //   } else {
           
        //   }
    }
    tripAccessDataHandler=(dataObj,whichButton)=>{
        // //console.log(dataObj);
        const tripInformationCopy={...this.state.tripInformation};
        //tripInformationCopy["accessModeData"]=dataObj;
        let accessModeDataCopy={...tripInformationCopy.accessModeData};
        accessModeDataCopy={...dataObj};
        //  
        tripInformationCopy.accessModeData={...accessModeDataCopy};
        // //console.log(tripInformationCopy,"fvssbs")
        this.setState({tripInformation:tripInformationCopy,sendData:false},()=>{
            // //console.log(this.state.tripInformation)
            // //console.log("heli",this.state.tripInformation)
            const dataCopy={...this.state.tripInformation};
            // //console.log(dataCopy,"uyyy")
            const originDestinationArray=[{...dataCopy.originData,...dataCopy.destinationData}];
            // //console.log(originDestinationArray);
            const updatedData={originDestination:originDestinationArray,accessModeData:dataCopy.accessModeData}
            // //console.log(updatedData,'bivivdibbud')
            console.log(updatedData.accessModeData)
            const validArr=updatedData.accessModeData.mode.filter(item=>{
                return item.accessMode.length>0 
            })
            console.log(validArr)
            let statement=''
            if(whichButton==='addTrip'){
                statement="before adding next trip."
            }
            else if(whichButton==="nextMemberButton"){
                statement="before adding next member."
            }
            else if(whichButton==="finishButton"){
                statement="before finishing the survey."
            }

            if(validArr.length>=1){
                const data={memberID:this.props.match.params.id1};
                // //console.log(updatedData.originDestination)
                delete updatedData.originDestination[0].isValid
                //this.setState({sendData1:true})
                if(whichButton==='addTrip')
                {  
                     console.log('add')
                    this.props.addTrip(this.props.idf,updatedData.originDestination[0].destinationPlace,updatedData.originDestination[0].destinationLat,updatedData.originDestination[0].destinationLng,updatedData.originDestination[0].destinationLandmark,true)
                    if(!this.props.disabled)
                    {Axios.post(HostName+"trips/",data)
                    .then(response=>{
                            //console.log(response.data)            
                             Axios.post(HostName+"od/",{tripID:response.data.tripID,...updatedData.originDestination[0]}
                             //{tripID:response.data.tripID,...updatedData.originDestination[0]}
                             ).then(response=>{})
                             updatedData.accessModeData.mode.forEach(element => {
                                //console.log();
                                delete element.isValid;
                                Axios.post(HostName+"mode/",{tripID:response.data.tripID,...element}
                                //{tripID:response.data.tripID,...updatedData.originDestination[0]}
                                ).then(response=>{
                                    
                                })    
                             });
                            // response.data.tripID
                        })}
                }
                if(whichButton==='nextMemberButton'){
                    // console.log("next")
                    if (window.confirm("Have you added all trips?")) {
                        if(!this.props.disabled){
                            // console.log("Accepted ")
                            Axios.post(HostName+"trips/",data)
                            .then(response=>{
                                     Axios.post(HostName+"od/",{tripID:response.data.tripID,...updatedData.originDestination[0]}
                                     ).then(response=>{})
                                     updatedData.accessModeData.mode.forEach(element => {
                                        delete element.isValid;
                                        Axios.post(HostName+"mode/",{tripID:response.data.tripID,...element}
                                        ).then(response=>{
                                            this.props.history.push({pathname:this.stringSubtract(this.props.match.url,(this.props.match.params.id1+'/trip-info'))})                
                                        })    
                                     });
                                }) 
                        }
                        else{
                            this.props.history.push({pathname:this.stringSubtract(this.props.match.url,(this.props.match.params.id1+'/trip-info'))})
                        }
                        
                      } else {
                       
                      }
                }
                if(whichButton==='finishButton'){
                    if (window.confirm("Have you added all trips?")) {
                       if(window.confirm("Have you added all members?")){
                        if(!this.props.disabled){
                            Axios.post(HostName+"trips/",data)
                            .then(response=>{
                                     Axios.post(HostName+"od/",{tripID:response.data.tripID,...updatedData.originDestination[0]}
                                     ).then(response=>{})
                                     updatedData.accessModeData.mode.forEach(element => {
                                        delete element.isValid;
                                        Axios.post(HostName+"mode/",{tripID:response.data.tripID,...element}
                                        ).then(response=>{
                                            this.props.history.push({pathname:'/finishsurvey'})
                                        })    
                                     });
                                }) 
                        }
                        else{
                            this.props.history.push({pathname:'/finishsurvey'})
                        }
                       }else{

                       }
                       } else {
                       }
                }
            }
            else{
                alert("Please complete the fields "+statement )
                 this.setState({sendData:false})
            }
            

            
            // Axios.get(HostName+"trips/")
            //     .then((Response)=>{
                    
            //         //console.log(Response);
            //         //this.props.history.push({pathname:this.props.match.url+Response.data.memberID+'/trip-info'})
            //     })
            }
            )

    }
    latLongHandler1=(lat,lng,originOrDestination,value)=>{
        const tripInformationCopy={...this.state.tripInformation};
        if(originOrDestination==="Origin")
        {
            const originDataCopy={...tripInformationCopy.originData}
            originDataCopy.originLat=lat;
            originDataCopy.originLng=lng;
            originDataCopy.originLandmark=value;
            tripInformationCopy.originData=originDataCopy;
            this.setState({tripInformation:tripInformationCopy})
        }
        if(originOrDestination==="Destination"){
            const destinationDataCopy={...tripInformationCopy.destinationData}
            destinationDataCopy.destinationLat=lat;
            destinationDataCopy.destinationLng=lng;
            destinationDataCopy.destinationLandmark=value;
            tripInformationCopy.destinationData=destinationDataCopy;
            this.setState({tripInformation:tripInformationCopy},()=>{
                // //console.log(this.state.tripInformation);
            })
        }
    }
    originDataHandler=(place,originOrDestination,time)=>{
        const tripInformationCopy={...this.state.tripInformation};
        if(originOrDestination==="Origin"){
            const originDataCopy={...tripInformationCopy.originData}
            originDataCopy.originPlace=place;
            originDataCopy.originTime=time;
            tripInformationCopy.originData=originDataCopy;
            this.setState({tripInformation:tripInformationCopy},()=>{
                // //console.log(this.state.tripInformation);
            })
        }
        if(originOrDestination==="Destination"){
            const destinationDataCopy={...tripInformationCopy.destinationData}
            destinationDataCopy.destinationPlace=place;
            destinationDataCopy.destinationTime=time;
            tripInformationCopy.destinationData=destinationDataCopy;
            this.setState({tripInformation:tripInformationCopy},()=>{
                // //console.log(this.state.tripInformation);
            })
        }
    }
    render(){
        const originData=this.state.tripInformation.originData;
        const destinationData=this.state.tripInformation.destinationData;
        let tripAcessAndModeData=null;
        let orValue=false;
        let drValue=false;
        
        if((originData.originLat||this.props.initLat)&&(originData.originLng||this.props.initLng)&&(originData.originPlace||this.props.initialOrigin))
        {   orValue=true
             tripAcessAndModeData=<TripAcessAndMode destinationPlace={this.state.tripInformation.destinationData.destinationPlace} disabled={this.props.disabled} tripIdf={this.props.idf} sendData={this.state.sendData} whichButtonClicked={this.state.whichButtonClicked} 
            tripAccessDataHandler={this.tripAccessDataHandler}
            ></TripAcessAndMode>
            // this.setState({showDes:true})    
        }
        if(destinationData.destinationLat&&destinationData.destinationLng&&destinationData.destinationPlace)
        {   drValue=true

        }
        const addTripClasses=[classes.AddTripButton,classes.AddTripButtonBorder]
        return(
            <div className={classes.Trip} >
                <div className={classes.TripHeading}><p>{"Trip "+ this.props.idf}</p></div>
                <div className={classes.OriginDestinationWrapper} >
                <TripOrigin idf={this.props.idf} singleDesktopLandmarkLocation={this.props.singleDesktopLandmarkLocation} disabled={this.props.disabled} mapLocation={this.props.mapLocation} initialLandmark={this.props.initialLandmark}  initLat={this.props.initLat} initLng={this.props.initLng} initialOrigin={this.props.initialOrigin} latLongHandler1={this.latLongHandler1} originDataHandler={this.originDataHandler} key={"g"} ifj={1+""+this.props.idf} sideClicked={this.sideClickHandler} modalShow={this.showModalBackdropHandler} show={this.state.commentModalShow} originOrDestination={"Origin"} ></TripOrigin>    
                
                {orValue?<TripOrigin idf={this.props.idf} singleDesktopLandmarkLocation={this.props.singleDesktopLandmarkLocation} disabled={this.props.disabled} mapLocation={this.props.mapLocation} latLongHandler1={this.latLongHandler1} originDataHandler={this.originDataHandler} ifj={2+""+this.props.idf} key={"dhg"} sideClicked={this.sideClickDesHandler} modalShow={this.showModalBackdropHandler} show={this.state.commentModalShowDestination} originOrDestination={"Destination"}></TripOrigin>:null}
                {((orValue&&drValue)||this.props.tripsLength>1)?tripAcessAndModeData:null}
                </div>
                
                {/* <TripAcessAndMode sendData={this.state.sendData} 
                tripAccessDataHandler={this.tripAccessDataHandler}
                >
                </TripAcessAndMode> */}
                {/* {!this.state.showMid?tripAcessAndModeData:null} */}
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
                {   orValue&&drValue?
                    this.props.showAdd?<button className={addTripClasses.join(' ')} onClick={
                     ()=>
                    {   orValue&&drValue?this.onSubmitHandler(true,"addTrip"):alert('Please complete the origin and destination information before moving forward.')
                    } 
                     } type="submit">Add Trip</button>:null:null
                     }
                {this.props.tripsLength>1&&this.props.showAdd?<div className={classes.NextMemberWrapper}>
                    <button onClick={this.removeCurrentTripHandler} className={classes.NextMemberButton+" "+ classes.NextMemberButtonBorder}>Remove Trip</button>
                    
                    
                    {/* <Link className={classes.NextMemberButton+" "+ classes.NextMemberButtonBorder} to={this.stringSubtract(this.props.match.url,(this.props.match.params.id1+'/trip-info'))}>Next Member</Link> */}
                
                </div>:null}
                {this.props.count>=1&&this.props.showAdd?<div>
                    <button  onClick={this.nextMemberClickHandler} className={classes.NextMemberButton+" "+ classes.NextMemberButtonBorder}>Add Member</button>
                    <button onClick={this.finishClicked} className={classes.NextMemberButton+" "+ classes.NextMemberButtonBorder}> Finish Survey</button></div>:null}
            </div>
        )
    }  
}
export default withRouter(Trip);