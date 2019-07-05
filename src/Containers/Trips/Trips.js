import React, { Component } from 'react';
import classes from './Trips.css'
import Trip from './Trip/IndividualTrip/IndividualTrip'; 
import Aux from '../../Hoc/Aux';
import fs from '../../assets/jsonfile/stateAndDistricts.json'
// import Backdrop from '../../Hoc/Backdrop/Backdrop';
// import {Link} from 'react-router-dom';
import Input from '../../Components/Input/Input';
class Trips extends Component{
    constructor(props){
        super(props);
        this.data=fs;
        const states=Object.keys(this.data);
        states.sort();
        // console.log(states);
        // this.stateDataArray=[];

    //    let memberformArray=[];
        // for (let key in this.data){
        //     this.stateDataArray.push(
        //         {
        //         id:key,
        //         config:this.data[key]     
        //     })
        // }
        
        
        // console.log(this.stateDataArray)
        this.stateArray=[];
        states.forEach(item=>{
            let dataObj={value:item,displayValue:item};
            this.stateArray.push(dataObj);
        })
    
    
    
    
    
    
    
    this.state={
        trips:[{idf:1,showAdd:true,origin:null,lat:null,lng:null}],
        tripLocation:{
            homeState:{
                name:'homeState',
                label:'Home State',
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
        }}
    }
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
    inputChangeHandler=(event,inputIdentifier)=>{
        const tripLocationUpdated={...this.state.tripLocation};
        const updatedInputElement={...tripLocationUpdated[inputIdentifier]} ;
        updatedInputElement.value=event.target.value;
        updatedInputElement.valid=this.validityHandler(updatedInputElement.value,updatedInputElement.validation);
        updatedInputElement.touched=true;
        tripLocationUpdated[inputIdentifier]=updatedInputElement; 
        this.setState({tripLocation:tripLocationUpdated},()=>{
           // this.progressHandler()
            
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
                //districtList.forEach(item=>{newInputConfigOptions.push(item)})
                console.log(newInputConfigOptions)
                newInputConfig.options=newInputConfigOptions;
                newUpdatedInputElement.elementConfig=newInputConfig;
                newtripLocationUpdated["nameOfDistrict"]=newUpdatedInputElement;
                this.setState({tripLocation:newtripLocationUpdated});
            }
            if(inputIdentifier==='nameOfDistrict'&&updatedInputElement.valid){
                    //this.mapShowHandler(updatedInputElement.value+" "+this.state.tripLocation.homeState.value);
                    console.log(updatedInputElement.value,this.state.tripLocation.homeState.value)
            }
        });
    }
    validityHandler=(value,rules)=>{
        let isValid=true;
        if(rules.required&&isValid){
            isValid=value.trim()!=='';
        }
        if(rules.length&&isValid){
            isValid=value.length===rules.length;
        }
        console.log(isValid);
        return isValid;
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
        let tripLocationArray=[];
        for (let key in this.state.tripLocation){
        tripLocationArray.push(
            {
               id:key,
               config:this.state.tripLocation[key]     
        })
        }
        const tripElements=this.state.trips.map((item,index)=>{
            return <Trip idf={item.idf} showAdd={item.showAdd} initialOrigin={item.origin} initLat={item.lat} initLng={item.lng} endOriginHandler={this.endOriginHandler} key={item.idf} addTrip={this.addTrip}></Trip>
        })
        return(
            <Aux> 
                <div className={classes.TripInformation}><h1>Trips Information</h1></div>
                <div className={classes.InputTrip}>
                {tripLocationArray.map((tripLocationElement)=>{return(
                tripLocationElement.config.show?
                <Input 
                    // selectedOption={this.selectedOptionHandler}
                    // centerLat={this.state.centerLat}
                    // centerLng={this.state.centerLng}
                    responseArray={this.state.responseArray}
                    textAlign='center'
                    labelFontWeight='600'
                    // autoCompleteShow={this.state.autoCompleteShow}
                    // autoCompleteArr={arrNew}
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
                    // onFocusHandler={this.onFocusHandler}
                    // blurred={this.onBlurHandler}
                    itemClicked={this.itemClickedHandler}
                    id={tripLocationElement.id}
                //  outFocus={()=>this.onBlurHandler(tripLocationElement.id)}
                >    
                </Input>:null
            )})}           
                </div>
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