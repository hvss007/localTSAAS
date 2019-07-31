import React, { Component } from 'react';
import classes from './IndividualTrip.css';
import TripOrigin from './TripOrigin/TripOrigin';
import Axios from 'axios';
import Input from '../../../../Components/Input/Input'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
// import TripOriginMap from './TripOrigin/TripOriginMap/TripOriginMap';
// import Backdrop from '../../../../Hoc/Backdrop/Backdrop';
// import Backdrop1 from '../../../../Hoc/Backdrop/Backdrop1';
import TripAcessAndMode from './TripAcessAndMode/TripAcessAndMode';
import Rupee from '../../../../assets/icons/rupee.png'
import {withRouter} from 'react-router-dom';
import HostName from '../../../../assets/globalvaribles/GlobalVariables';
import TripAccessIn from './TripAcessAndMode/TripAcess/TripAccessIn/TripAccessIn'
class Trip extends Component{
    state={
        tripInformation:{
                originData:{originLat:this.props.initLat?this.props.initLat:null,originLng:this.props.initLng?this.props.initLng:null,originPlace:null,isValid:false,originTime:'',originLandmark:this.props.initialLandmark?this.props.initialLandmark:''},
                destinationData:{destinationLat:null,destinationLng:null,destinationPlace:null,isValid:false,destinationTime:'',destinationLandmark:''},
                accessModeData:{},
                // accessInfoIn:[
                //     {id:1,displayValue:"How much time (hh:mm) does the whole trip take",title:"travelTime",value:'',valid:false,touched:false,type:'time',min:'00:00',max:'12:00'},
                //     {id:2,displayValue:"How long (km) is the whole trip", title:"journeyLength",value:'',valid:false,touched:false,type:'number',min:'0'},
                //     {id:3,displayValue:"How much does the whole trip costs ",title:"fare",value:'',valid:false,touched:false,src:Rupee,type:'number',min:'0'},
                //     // {id:4,title:"Cost",value:'',valid:false,touched:false}
                //     ],
                accessInfoIn:{
                    travelTime:{
                        name:'travelTime',
                        label:'How much time (hh:mm) does the whole trip take',
                        elementType:'select',
                        elementConfig:{
                           options:[
                            {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                               {value:'<5min',displayValue:'<5 min'},
                               {value:'5-15min',displayValue:'5 - 15 min'},
                               {value:'15-30min',displayValue:'15 - 30 min'},
                               {value:'30-60min',displayValue:'30 - 60 min'},
                               {value:'>1hour',displayValue:'> 1 hour'}
                           ]
                        },
                        value:'',
                        show:true,
                        validation:{
                            required:true
                        },
                        valid:false,
                        touched:false,
                        optional:true
                    },
                    travelDistance:{
                        name:'travelDistance',
                        label:'How long (km) is the whole trip ?',
                        elementType:'select',
                        elementConfig:{
                            options:[
                                {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                                {value:'<2km',displayValue:'<2 km'},
                                {value:'2-5km',displayValue:'2 - 5 km'},
                                {value:'5-10km',displayValue:'5 - 10km'},
                                {value:'10-20km',displayValue:'10 - 20 km'},
                                {value:'>20km',displayValue:'> 20 km'},
                            ]
                        },
                        value:'',
                        show:true,
                        validation:{
                            required:true
                        },
                        valid:false,
                        touched:false,
                        optional:true
                    },
                    fare:{
                        name:'fare',
                        label:'How much does the whole trip costs ?',
                        elementType:'select',
                        elementConfig:{
                            options:[
                                {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                                {value:'<10Rs',displayValue:'< 10 Rs'},
                                {value:'10-25Rs',displayValue:'10 -25 Rs'},
                                {value:'25-50Rs',displayValue:'25 -50 Rs'},
                                {value:'50-100Rs',displayValue:'50 -100 Rs'},
                                {value:'100-500Rs',displayValue:'100 -500 Rs'},
                                {value:'>500Rs',displayValue:'> 500 Rs'},
                            ]
                        },
                        value:'',
                        show:true,
                        validation:{
                            required:true
                        },
                        valid:false,
                        touched:false,
                        optional:true
                    }
                }              
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
    }
    tripAccessDataHandler=(dataObj,whichButton)=>{
        // //console.log(dataObj);
        const tripInformationCopy={...this  .state.tripInformation};
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
                return item.modeName.length>0 
            })
            // console.log(validArr)
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
                // console.log(updatedData)
                updatedData.originDestination[0].travelTime=this.state.tripInformation.accessInfoIn["travelTime"].value
                updatedData.originDestination[0].travelDistance=this.state.tripInformation.accessInfoIn["travelDistance"].value
                updatedData.originDestination[0].fare=this.state.tripInformation.accessInfoIn["fare"].value
                delete updatedData.originDestination[0].isValid
                //this.setState({sendData1:true})
                if(whichButton==='addTrip')
                {  
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
                            // console.log(updatedData)
                            Axios.post(HostName+"trips/",data)
                            .then(response=>{
                                     Axios.post(HostName+"od/",{tripID:response.data.tripID,...updatedData.originDestination[0]}
                                     ).then(response=>{})
                                    //  console.log(updatedData)
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
    validityHandler=(value)=>{
        let isValid=true;
        if(isValid){
            isValid=value.trim() !=='';
        }
        // console.log(isValid);
        return isValid;
    }
    // onChangeHandler1=(event,title,id)=>{
    //     if(!this.props.disabled)
    //     {
    //     const tripInformationCopy={...this.state.tripInformation}    
    //     const accessInfoCopyIn=[...tripInformationCopy.accessInfoIn];
    //     const selctedArr=accessInfoCopyIn.filter((item)=>{
    //             return item.title===title
             
    //     })    
    //     const selectedArrItems={...selctedArr[0]};
    //     const value=event.target.value;
    //     selectedArrItems.value=event.target.value;
    //     selectedArrItems.touched=true;
    //     selectedArrItems.valid=this.validityHandler(value);
    //     accessInfoCopyIn[id-1]=selectedArrItems;
    //     tripInformationCopy["accessInfoIn"]=accessInfoCopyIn
    //     //this.itemClicked(title,selectedArrItems.src);
    //     this.setState({tripInformation:tripInformationCopy},
    //         // ()=>{
    //         //     let valid=this.addShower();
    //         //     if(this.props.accessName==="Egress Mode"){
    //         //         this.props.accessDataIn("Main Mode",title,value,this.props.idi,valid)}
    //         //     }
    //         );
    //     }
    // }
    inputChangeHandler=(event,inputIdentifier)=>{
        const tripInformationCopy={...this.state.tripInformation}
        const memberUpdated={...tripInformationCopy.accessInfoIn};
        const updatedInputElement={...memberUpdated[inputIdentifier]} ;
        updatedInputElement.value=event.target.value;
        updatedInputElement.valid=this.validityHandler(updatedInputElement.value,updatedInputElement.validation);
        updatedInputElement.touched=true;
        memberUpdated[inputIdentifier]=updatedInputElement; 
        tripInformationCopy["accessInfoIn"]=memberUpdated
        this.setState( {tripInformation:tripInformationCopy});
    }
    validityHandler=(value,rules)=>{
        let isValid=true;
        if(rules.required&&isValid){
            isValid=value.trim() !=='';
        }

        if(rules.notLess&&isValid){
            isValid=(parseInt(value,10)>=0);
        }
        if(rules.length&&isValid){
            isValid=value.length===rules.length;
        }

        //consoleog(isValid);
        return isValid;
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
        let accessInformArray=[];
        for (let key in this.state.tripInformation.accessInfoIn){
            accessInformArray.push(
                {
                   id:key,
                   config:this.state.tripInformation.accessInfoIn[key]     
            })
        }
        
        // const inputElementIn=this.state.tripInformation.accessInfoIn.map((item)=>{
        //     return <TripAccessIn touched={item.touched} src={item.src} type={item.type} invalid={!item.valid} min={item.min?item.min:null} max={item.max?item.max:null} changed={this.onChangeHandler1}  key={item.title+this.props.idi} id={item.id} title={item.title}  displayValue={item.displayValue}></TripAccessIn>
        // })
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
                {accessInformArray.map((memFormElement)=>{return(
                    <Input 
                        key={memFormElement.id}
                        label={memFormElement.config.label}
                        name={memFormElement.config.name}
                        elementType={memFormElement.config.elementType}
                        elementconfig={memFormElement.config.elementConfig}
                        value={memFormElement.config.value}
                        invalid={!memFormElement.config.valid}
                        touched={memFormElement.config.touched}
                        changed={(event)=>this.inputChangeHandler(event,memFormElement.id)}
                        onFocusHandler={this.onFocusHandler}
                        blurred={this.onBlurHandler}
                        itemClicked={this.itemClickedHandler}
                    >    
                    </Input>
        )})}
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