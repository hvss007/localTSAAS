import React, { Component } from 'react';
import classes from './IndividualTrip.css';
import TripOrigin from './TripOrigin/TripOrigin';
import Axios from 'axios';
import Input from '../../../../Components/Input/Input'
import TripAcessAndMode from './TripAcessAndMode/TripAcessAndMode';
// import Rupee from '../../../../assets/icons/rupee.png'
import {withRouter} from 'react-router-dom';
import Global from '../../../../assets/globalvaribles/GlobalVariables';
import Aux from '../../../../Hoc/AuxFile'
import Backdrop from '../../../../Hoc/Backdrop/Backdrop1' 
import Alert from'../../../../Components/Alert/Alert'
var HostName=Global.hostName
var globalOptional=Global.optional
class Trip extends Component{
    state={
        tripInformation:{
                originData:{originLat:this.props.initLat?this.props.initLat:null,originLng:this.props.initLng?this.props.initLng:null,originPlace:null,isValid:false,departureTime:'',originLandmark:this.props.initialLandmark?this.props.initialLandmark:''},
                destinationData:{destinationLat:null,destinationLng:null,destinationPlace:null,isValid:false,arrivalTime:'',destinationLandmark:''},
                accessModeData:{},
                accessInfoIn:{
                    // travelTime:{
                    //     name:'travelTime',
                    //     label:'How much time does the whole trip take?',
                    //     elementType:'select',
                    //     elementConfig:{
                    //        options:[
                    //         {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                    //            {value:'<5min',displayValue:'<5 min'},
                    //            {value:'5-15min',displayValue:'5 - 15 min'},
                    //            {value:'15-30min',displayValue:'15 - 30 min'},
                    //            {value:'30-60min',displayValue:'30 - 60 min'},
                    //            {value:'>1hour',displayValue:'> 1 hour'}
                    //        ]
                    //     },
                    //     value:'',
                    //     show:true,
                    //     validation:{
                    //         required:true
                    //     },
                    //     valid:false,
                    //     touched:false,
                    //     optional:globalOptional
                    // },
                    travelDistance:{
                        name:'travelDistance',
                        label:'How long is the whole trip?',
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
                        optional:globalOptional
                    },
                    fare:{
                        name:'fare',
                        label:'How much does the whole trip costs?',
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
                        optional:globalOptional
                    }
                }              
            },
        sendData:false,
        disableAdd:true,
        sendData1:false,
        showMid:false,
        showDes:false,
        whichButtonClicked:null,
        showCustomConfirmBox:false,
        message:'',
        question:'',
        showButton:true,
        updatedData:null,memberIDData:null
    }
    componentDidMount(){                
        Axios.defaults.xsrfCookieName = 'csrftoken'
                    Axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    }
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
    hideModalBackdrop=(value)=>{
        this.setState({showCustomConfirmBox:value})
    }
    buttonClickHandler=(id,question)=>{
        if(this.state.question==='q1')
        {if(id===1){
            this.nextButtonCustomDialogBoxHandler(this.state.updatedData,this.state.memberIDData)
        }
        else if(id===2){
            
        }}
        if(this.state.question==='q2'){
            setTimeout(()=>{
                if(id===1){
                    this.finishButtonCustomDialogBoxHandler(this.state.updatedData,this.state.memberIDData)
                }
                else if(id===2){
                    
                }
            },500)
            
        }
        if(this.state.question==="q3"){
            if(id===1){
                this.finishButtonCustomDialogBoxHandlerIn(this.state.updatedData,this.state.memberIDData)
            }
            else if(id===2){
                
            }
        }
    }
    finishButtonCustomDialogBoxHandler=(updatedData,data)=>{
        this.setState({showCustomConfirmBox:true,message:"Have you added information for all members of the family?",question:'q3',showButton:true},()=>{
        }) 
    }
    finishButtonCustomDialogBoxHandlerIn(updatedData,data){
        if(!this.props.disabled){
            Axios.defaults.xsrfCookieName = 'csrftoken'
             Axios.defaults.xsrfHeaderName = 'X-CSRFToken'
            Axios.post(HostName+"trips/",data)
            .then(response=>{
                     Axios.post(HostName+"od/",{tripID:response.data.tripID,...updatedData.originDestination[0]}
                     ).then(response=>{})
                     updatedData.accessModeData.mode.forEach((element,index) => {
                        delete element.isValid;
                        Axios.post(HostName+"mode/",{tripID:response.data.tripID,...element,modeIndex:index+1}
                        ).then(response=>{
                            this.props.history.push({pathname:'/finishsurvey'})
                            var time=new Date().toLocaleTimeString()                                
                            const url=this.props.match.url;
                            const fam=url.split('/')
                            const surveyId=fam[3]                
                            Axios.patch(HostName+'responseTime/'+surveyId,{
                                surveyEndTime:time,
                            })
                        })    
                     });
                }) 
        }
        else{
            
                            var time=new Date().toLocaleTimeString()                                
                            const url=this.props.match.url;
                            const fam=url.split('/')
                            const surveyId=fam[3]                
                            
                            
                            Axios.patch(HostName+'responseTime/'+surveyId,{
                            
                                surveyEndTime:time,
                                      
                            })
            this.props.history.push({pathname:'/finishsurvey'})
            
        }
    }
    nextButtonCustomDialogBoxHandler=(updatedData,data)=>{
        if(!this.props.disabled){
            Axios.defaults.xsrfCookieName = 'csrftoken'
            Axios.defaults.xsrfHeaderName = 'X-CSRFToken'
            Axios.post(HostName+"trips/",data)
            .then(response=>{
                     Axios.post(HostName+"od/",{tripID:response.data.tripID,...updatedData.originDestination[0]}
                     ).then(response=>{})
                     updatedData.accessModeData.mode.forEach((element,index) => {
                        delete element.isValid;
                        Axios.post(HostName+"mode/",{tripID:response.data.tripID,...element,modeIndex:index+1}
                        ).then(response=>{
                            this.props.history.push({pathname:this.stringSubtract(this.props.match.url,(this.props.match.params.id1+'/trip-info'))})                
                        })    
                     });
                }) 
        }
        else{
            this.props.history.push({pathname:this.stringSubtract(this.props.match.url,(this.props.match.params.id1+'/trip-info'))})
        }
    }
    tripAccessDataHandler=(dataObj,whichButton)=>{
        const tripInformationCopy={...this.state.tripInformation};
        let accessModeDataCopy={...tripInformationCopy.accessModeData};
        accessModeDataCopy={...dataObj};
        tripInformationCopy.accessModeData={...accessModeDataCopy};
        this.setState({tripInformation:tripInformationCopy,sendData:false},()=>{
            const dataCopy={...this.state.tripInformation};
            const originDestinationArray=[{...dataCopy.originData,...dataCopy.destinationData}];
            const updatedData={originDestination:originDestinationArray,accessModeData:dataCopy.accessModeData}
            // console.log(originDestinationArray)
            let valid=originDestinationArray[0].destinationPlace&&originDestinationArray[0].destinationLandmark?true:false
            let statement=''
            if(whichButton==='addTrip'){
                statement="before adding the next trip."
            }
            else if(whichButton==="nextMemberButton"){
                statement="before adding the next member."
            }
            else if(whichButton==="finishButton"){
                statement="before finishing the survey."
            }
            // console.log(valid)
            // console.log(validArr)
            if(valid){
                const data={memberID:this.props.match.params.id1};
                // updatedData.originDestination[0].travelTime=this.state.tripInformation.accessInfoIn["travelTime"].value
                updatedData.originDestination[0].travelDistance=this.state.tripInformation.accessInfoIn["travelDistance"].value
                updatedData.originDestination[0].fare=this.state.tripInformation.accessInfoIn["fare"].value
                delete updatedData.originDestination[0].isValid
                if(whichButton==='addTrip')
                {  
                    this.props.addTrip(this.props.idf,updatedData.originDestination[0].destinationPlace,updatedData.originDestination[0].destinationLat,updatedData.originDestination[0].destinationLng,updatedData.originDestination[0].destinationLandmark,true)
                    if(!this.props.disabled)
                    {Axios.defaults.xsrfCookieName = 'csrftoken'
                    Axios.defaults.xsrfHeaderName = 'X-CSRFToken'
                    Axios.post(HostName+"trips/",data)
                    .then(response=>{
                             Axios.post(HostName+"od/",{tripID:response.data.tripID,...updatedData.originDestination[0]}
                             ).then(response=>{

                             })
                            //  console.log(updatedData.accessModeData.mode)
                             updatedData.accessModeData.mode.forEach((element,index) => {
                                delete element.isValid;
                                Axios.post(HostName+"mode/",{tripID:response.data.tripID,...element,modeIndex:index+1}
                                ).then(response=>{
                                })    
                             });
                        })}
                }
                if(whichButton==='nextMemberButton'){
                    this.setState({showCustomConfirmBox:true,message:"Have you added all trips for this member?",updatedData:updatedData,memberIDData:data,question:'q1',showButton:true},()=>{
                    })
                }
                if(whichButton==='finishButton'){
                    this.setState({showCustomConfirmBox:true,message:"Have you added all trips for this member?",updatedData:updatedData,memberIDData:data,question:'q2',showButton:true},()=>{
                    })
                }
            }
            else{
                // alert("Please complete the origin, destination and travel mode information "+statement )
                 this.setState({sendData:false,showButton:false,message:"Please complete the origin, destination and travel mode information "+statement,showCustomConfirmBox:true})
            }
            }
            )

    }
    validityHandler=(value)=>{
        let isValid=true;
        if(isValid){
            isValid=value.trim() !=='';
        }
        return isValid;
    }
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
            })
        }
    }
    originDataHandler=(place,originOrDestination,time)=>{
        const tripInformationCopy={...this.state.tripInformation};
        if(originOrDestination==="Origin"){
            const originDataCopy={...tripInformationCopy.originData}
            originDataCopy.originPlace=place;
            // console.log(time)
            originDataCopy.departureTime=time;
            tripInformationCopy.originData=originDataCopy;
            this.setState({tripInformation:tripInformationCopy},()=>{
            })
        }
        if(originOrDestination==="Destination"){
            const destinationDataCopy={...tripInformationCopy.destinationData}
            destinationDataCopy.destinationPlace=place;
            destinationDataCopy.arrivalTime=time;
            tripInformationCopy.destinationData=destinationDataCopy;
            this.setState({tripInformation:tripInformationCopy},()=>{
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
        }
        if(destinationData.destinationLat&&destinationData.destinationLng&&destinationData.destinationPlace)
        {   drValue=true

        }
        const addTripClasses=[classes.AddTripButton,classes.AddTripButtonBorder]
        return(
            <Aux>
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
                {
                    this.props.showAdd?<button className={addTripClasses.join(' ')} onClick={
                     ()=>
                    {   orValue&&drValue?this.onSubmitHandler(true,"addTrip"):
                        this.setState({showCustomConfirmBox:true,message:'Please complete the origin, destination and travel mode information before moving forward.',showButton:false})
                    // alert('Please complete the origin, destination and travel mode information before moving forward.')
                    } 
                     } type="submit">Add Trip</button>:null
                     }
                {this.props.tripsLength>1&&this.props.showAdd?<div className={classes.NextMemberWrapper}>
                    <button onClick={this.removeCurrentTripHandler} className={classes.NextMemberButton+" "+ classes.NextMemberButtonBorder}>Remove Trip</button>
                </div>:null}
                {this.props.count>=1&&this.props.showAdd?<div>
                    <button  onClick={this.nextMemberClickHandler} className={classes.NextMemberButton+" "+ classes.NextMemberButtonBorder}>Proceed</button>
                    {/* <button onClick={this.finishClicked} className={classes.NextMemberButton+" "+ classes.NextMemberButtonBorder}> Finish Survey</button> */}
                    </div>:null}
            </div>
            <Backdrop  alert={true} hideModalBackdrop={this.hideModalBackdrop} show={this.state.showCustomConfirmBox}>
                <Alert showButton={this.state.showButton} buttonClickHandler={this.buttonClickHandler} question={this.state.question} message={this.state.message}></Alert>
            </Backdrop>
            </Aux>
        )
    }  
}
export default withRouter(Trip);