import React, { Component } from 'react';
import classes from './Trips.css'
import Trip from './Trip/IndividualTrip/IndividualTrip'; 
// import Aux from '../../Hoc/Aux';
import fs from '../../assets/jsonfile/stateAndDistricts.json'
// import Backdrop from '../../Hoc/Backdrop/Backdrop';
import {withRouter} from 'react-router-dom';
import Input from '../../Components/Input/Input';
import axios from 'axios'
import HostName from '../../assets/globalvaribles/GlobalVariables'
import Aux from '../../Hoc/Aux'
import Backdrop from '../../Hoc/Backdrop/Backdrop1'
import Alert from '../../Components/Alert/Alert'
// import SingleDesktopMap from './DesktopMap/SingleDesktopMap';
class Trips extends Component{
    constructor(props){
        super(props);
        this.data=fs;
        const states=Object.keys(this.data);
        states.sort();
        this.stateArray=[];
        states.forEach(item=>{
            let dataObj={value:item,displayValue:item};
            this.stateArray.push(dataObj);
        })
    this.state={
        count:0,
        trips:[{idf:1,showAdd:true,origin:null,initLat:null,initLng:null,originLat:null,originLng:null,destinationLat:null,destinationLng:null,landmark:null,disabled:false,dataAreadySent:false}],
        tripLocation:{
            homeState:{
                name:'homeState',
                label:'State',
                elementType:'select',
                elementConfig:{
                    type:'text',
                    options:[
                    {value:'',displayValue:"Select State", selected:true, disabled:true},
                    ...this.stateArray,
                ] 
                },
                value:'',
                show:true,
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                optional:false
            },
            nameOfDistrict:{
                name:'nameOfDistrict',
                label:'District',
                elementType:'select',
                elementConfig:{
                    type:'text',
                    options:[
                    {value:'',displayValue:"Select District", selected:true, disabled:true},
                    
                ] 
                },
                value:'',
                show:true,
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                optional:false
            }
            
        }
        ,setMapSearchText:null,
        desktopMapShow:false,
        centerLat:'',
        centerLng:'',
        showTrips:false,
        showButton:true,
        familyId:null,
        constraintField:'',
        matched:null,
        showCustomConfirmBox:false,
        // message:
    }
}
    componentDidMount(){
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });
    }
    mapShowHandler=(searchText)=>{
        this.setState({setMapSearchText:searchText})
    }
    
    stringSubtract=(a,b)=>{
        return a.replace(b, '')
    }
    componentWillMount(){
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = 'X-CSRFToken'
        axios.get(HostName+"college/").then(
            Response=>{
                const collegeIdNo=this.props.match.url.split('/')[2]
                const collegeArr= Response.data.filter(item=>{
                    return (
                        collegeIdNo===item.collegeURL  )
                })
                // console.log(collegeArr)
                if(collegeArr.length===1){
                    // console.log("working")
                    this.setState({constraintField:collegeArr[0].constrainField})
                }
            }
        )
    }
    inputChangeHandler=(event,inputIdentifier)=>{
        const tripLocationUpdated={...this.state.tripLocation};
        const updatedInputElement={...tripLocationUpdated[inputIdentifier]} ;
        updatedInputElement.value=event.target.value;
        updatedInputElement.valid=this.validityHandler(updatedInputElement.value,updatedInputElement.validation);
        updatedInputElement.touched=true;
        tripLocationUpdated[inputIdentifier]=updatedInputElement; 
        this.setState({tripLocation:tripLocationUpdated},()=>{ 
            if(inputIdentifier==="homeState"&&updatedInputElement.valid){
                const newtripLocationUpdated={...this.state.tripLocation};
                const newUpdatedInputElement={...newtripLocationUpdated["nameOfDistrict"]} ;
                const newInputConfig={...newUpdatedInputElement.elementConfig}
                const newInputConfigOptions=[...newInputConfig.options];
                newInputConfigOptions.splice(1)
                let stateName=this.state.tripLocation.homeState.value;
                this.data[stateName].forEach(item=>{
                    const dataObj={value:item,displayValue:item}
                    newInputConfigOptions.push(dataObj);
                })
                newInputConfig.options=newInputConfigOptions;
                newUpdatedInputElement.elementConfig=newInputConfig;
                newtripLocationUpdated["nameOfDistrict"]=newUpdatedInputElement;
                this.setState({tripLocation:newtripLocationUpdated});
            }
            if(inputIdentifier==='nameOfDistrict'&&updatedInputElement.valid){
                    this.mapShowHandler(updatedInputElement.value+" "+this.state.tripLocation.homeState.value);
                    if(this.state.constraintField!==null)
                    {   
                        if(updatedInputElement.value===this.state.constraintField){
                            this.setState({matched:true})
                            console.log(updatedInputElement,"why")
                            //this.setState({showTrips:true})
                        
                        if(window.innerWidth>500){
                            this.setState({desktopMapShow:true})
                        } 
                        }
                    else{
                        this.setState({matched:false})
                        // alert("Your choosen area lies outside our survey area")
                    }}
                    else{
                        this.setState({showTrips:true})
                        if(window.innerWidth>500){
                            this.setState({desktopMapShow:true})
                        }
                    }
                                      
            }
        });
    }
    singleDesktopLandmarkLocationHandler=(lat,lng,originOrDestination,idf)=>{
        if(originOrDestination==="Origin"){
            const tripsCopy=[...this.state.trips];
        const tripsCopyElementOld={...tripsCopy[idf-1]};
        tripsCopyElementOld.originLat=lat;
        tripsCopyElementOld.originLng=lng;
        tripsCopy[idf-1]=tripsCopyElementOld;
        this.setState({trips:tripsCopy})
        }
        else{
            const tripsCopy=[...this.state.trips];
        const tripsCopyElementOld={...tripsCopy[idf-1]};
        tripsCopyElementOld.destinationLat=lat;
        tripsCopyElementOld.destinationLng=lng;
        tripsCopy[idf-1]=tripsCopyElementOld;
        this.setState({trips:tripsCopy})
        }
    }
    constraintFieldHandler=()=>{
        
        if(this.state.matched!==null){
            if(this.state.matched){
                this.setState({showTrips:true})
            }
           else{
               if(window.confirm("The trip made by this member is outside of survey zone,please proceed")){
                this.props.history.push({pathname:this.stringSubtract(this.props.match.url,(this.props.match.params.id1+'/trip-info'))})                
               }
               else{


               }
               // "The trip made by this member is outside of survey zone,please proceed"
           }
        }
        
    }
    mapCenterHandler=(lat,lng)=>{
        this.setState({centerLat:lat,centerLng:lng})
    }
    validityHandler=(value,rules)=>{
        let isValid=true;
        if(rules.required&&isValid){
            isValid=value.trim()!=='';
        }
        if(rules.length&&isValid){
            isValid=value.length===rules.length;
        }
        return isValid;
    }
    hideModalBackdrop=(value)=>{
        this.setState({showCustomConfirmBox:value})
    }
    addTrip=(idf,origin,lat ,lng,landmark,truth)=>{
        this.setState({count:this.state.count+1})
        const tripNew={idf:idf+1,showAdd:true,origin:origin,initLat:lat,initLng:lng,landmark:landmark,disabled:false,dataAreadySent:false,originLat:null,originLng:null,destinationLat:null,destinationLng:null};
        const tripsCopy=[...this.state.trips];
        const tripsCopyElementOld={...tripsCopy[idf-1]};
        tripsCopyElementOld.showAdd=false;
        tripsCopyElementOld.disabled=true;
        tripsCopyElementOld.dataAreadySent=truth;
        tripsCopy[idf-1]=tripsCopyElementOld;
        tripsCopy.push(tripNew);
        this.setState({trips:tripsCopy})
    }
    removeCurrentTripHandler=(idf)=>{
        const tripsCopy=[...this.state.trips];
        const tripsCopyElementOld={...tripsCopy[idf-2]};
        tripsCopyElementOld.showAdd=true;
        tripsCopy[idf-2]=tripsCopyElementOld;
        tripsCopy.splice(idf-1,1)
        this.setState({trips:tripsCopy})
    }
    render(){
        let tripLocationArray=[];
        for (let key in this.state.tripLocation){
        tripLocationArray.push(
            {
               id:key,
               config:this.state.tripLocation[key]     
        })
        }
        const tripElements=this.state.trips.map((item,index)=>{
            return <Trip familyId={this.state.familyId} singleDesktopLandmarkLocation={this.singleDesktopLandmarkLocationHandler} count={this.state.count} removeCurrentTripHandler={this.removeCurrentTripHandler} dataAreadySent={item.dataAreadySent} disabled={item.disabled} tripsLength={this.state.trips.length} mapLocation={this.state.setMapSearchText} idf={item.idf}  showAdd={item.showAdd} initialOrigin={item.origin} initLat={item.initLat} initLng={item.initLng} initialLandmark={item.landmark} endOriginHandler={this.endOriginHandler} key={item.idf} addTrip={this.addTrip}></Trip>
        })
        return(
            <Aux>
            <div className={classes.TripsAndMapWrapper}>
            <div className={classes.TripsWrapper}> 
                <div className={classes.TripInformation}><h1>Trips Information</h1></div>
                <div className={classes.InputTrip}>
                {tripLocationArray.map((tripLocationElement)=>{return(
                tripLocationElement.config.show?
                <Input 
                    responseArray={this.state.responseArray}
                    textAlign='center'
                    labelFontWeight='600'
                    style={{textAlignLast:'center'}}
                    key={tripLocationElement.id}
                    label={tripLocationElement.config.label}
                    name={tripLocationElement.config.name}
                    elementType={tripLocationElement.config.elementType}
                    elementconfig={tripLocationElement.config.elementConfig}
                    value={tripLocationElement.config.value}
                    invalid={!tripLocationElement.config.valid}
                    touched={tripLocationElement.config.touched}
                    changed={(event)=>this.inputChangeHandler(event,tripLocationElement.id)}
                    itemClicked={this.itemClickedHandler}
                    id={tripLocationElement.id}
                >    
                </Input>:null
            )})}           

                </div>
                <div style={{display:'flex'}}>
                {!this.state.showTrips?<button onClick={this.constraintFieldHandler} className={classes.NextMemberButton+" "+ classes.NextMemberButtonBorder} style={{margin:'auto',textAlign:'center'}}>Proceed</button>:null}
                </div>
                
                {this.state.showTrips?tripElements:null}
               
            </div>
            </div>
            {/* <Backdrop  alert={true} hideModalBackdrop={this.hideModalBackdrop} show={this.state.showCustomConfirmBox}>
            <Alert showButton={this.state.showButton} buttonClickHandler={this.buttonClickHandler} question={this.state.question} message={this.state.message}></Alert>
            </Backdrop> */}
            </Aux>
        )
    }
}
export default withRouter(Trips);
