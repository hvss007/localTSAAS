import React, { Component } from 'react';
import OriginIcon from '../../../../../assets/icons/OriginIcon.png';
import classes from './TripOrigin.css';
import CommentModal from '../../../../../Hoc/CommentModal/CommentModal';
import Aux from '../../../../../Hoc/Aux';
import Home from '../../../../../assets/icons/destinationIcons/Home.png';
import Office from '../../../../../assets/icons/destinationIcons/Office.png';
import Leisure from '../../../../../assets/icons/destinationIcons/Leisure.png';
import Ground from '../../../../../assets/icons/destinationIcons/Ground.png';
import College from '../../../../../assets/icons/destinationIcons/College.png';
import Shopping from '../../../../../assets/icons/destinationIcons/Shopping.png';
import School from '../../../../../assets/icons/destinationIcons/School.png';
import Other from '../../../../../assets/icons/destinationIcons/Other.png';
import CommentModalInput from '../../../../../Hoc/CommentModal/CommentModalInput/CommentModalInput';
import TripOriginMap from './TripOriginMap/TripOriginMap';
import Autocomplete from '../../../../AutoComplete/AutoComplete1';
class TripOrigin extends Component{
    state={
        src:null,
        title:null,
        originInfo:[
            {id:1,src:Home,title:'Home',value:''},
            {id:2,src:Office,title:'Office',value:''},
            {id:3,src:Leisure,title:'Leisure',value:''},
            {id:4,src:Ground,title:'Ground',value:''},
            {id:5,src:College,title:'College',value:''},
            {id:6,src:Shopping,title:'Market',value:''},
            {id:7,src:School,title:'School',value:''},
            {id:8,src:Other,title:'Other',value:''},   
        ],
        modalShow:false,
        backdropShow:false,
        lat:"26.9124",
        lng:"75.7873",
        time:'',
        centerLat:null,
        centerLng:null,
        markerLocationText:''
    }
    selectedOptionHandler=(value,lat,lng)=>{
        this.setState({markerLocationText:value,lat:lat,lng:lng})
        if(window.innerWidth>=500){
            this.props.singleDesktopLandmarkLocation(lat,lng,this.props.originOrDestination,this.props.idf,value)
        }
    }
    centerLocationHandler=(lat,lng)=>{
        this.setState({centerLat:lat,centerLng:lng})
    }
    onClickHandler=(title,id)=>{
        if(!this.props.disabled){
        const originInfoCopy=[...this.state.originInfo];
        const selctedArr=originInfoCopy.filter((item)=>{
            if(item.title===title){
                return true
            }
        })
        const selectedArrItems={...selctedArr[0]};
        selectedArrItems.value=title;
        originInfoCopy[id-1]=selectedArrItems;
        this.originItemSelectedHandler(title,selectedArrItems.src);
        this.setState({originInfo:originInfoCopy},()=>{
            if(window.innerWidth>=0){
                this.setState({modalShow:true,backdropShow:false})
            }
            else{
                this.setState({modalShow:false,backdropShow:false})
            }
            });
        //console.log(selctedArr);
    }
    }
    backdropClickedHandler=()=>{
        if(window.innerWidth>0){
            this.setState({modalShow:true,backdropShow:false});
        }
        else{
            this.setState({modalShow:false,backdropShow:false});
        }
    }
    onChangeHandler=(event)=>{
       if(!this.props.disabled){
        const originInfoCopy=[...this.state.originInfo];
        const inputArray={...originInfoCopy[7]};
        inputArray.value=event.target.value;
        originInfoCopy[7]=inputArray;
        this.setState({originInfo:originInfoCopy,title:event.target.value,src:Other});}
    }
     originItemSelectedHandler=(value,src)=>{
        if(!this.props.disabled){
        this.setState({src:src,title:value},()=>{
        this.props.originDataHandler(this.state.title,this.props.originOrDestination,this.state.time);
        });}
        
    }
     originClicked=()=>{
        if(window.innerWidth>0){
            this.setState({modalShow:false,backdropShow:false})
        }
        else{
            this.setState({modalShow:true,backdropShow:true})
        }
    }
    keyPressHandler=(event)=>{
        
        if(event.keyCode==="13"){
            
            this.setState({modalShow:true,title:event.target.value},()=>{
                this.props.originDataHandler(this.state.title,this.props.originOrDestination,this.state.time);    
            })
        }
    }
    latLongHandler=(lat,lng,value)=>{
        this.props.latLongHandler1(lat,lng,this.props.originOrDestination,this.state.markerLocationText);
    }
    onChangeTime = event => {
        if(!this.props.disabled)
        {this.setState({ time:event.target.value })}}
        render(){
            const inputElement=this.state.originInfo.map((item,index)=>{
                return <CommentModalInput keyPress={this.keyPressHandler} changed={this.onChangeHandler} clicked={this.onClickHandler} key={item.title+this.props.ifj} id={item.id} title={item.title} source={item.src}>
                    </CommentModalInput>
            })
            let timeLabel="";
            let tripLocationQuestionHeading=''
            const TripOriginWrapperClasses=[classes.TripOriginWrapper];
            const landmarkWrapperClasses=[classes.LandmarkWrapper]
            if(this.props.originOrDestination==="Origin"){
                tripLocationQuestionHeading=' Where does the member start his/her trip ?'
                TripOriginWrapperClasses.push(classes.TripOriginWrapperLeft)
                timeLabel="When does the member depart (hh:mm)?";
                landmarkWrapperClasses.push(classes.LandmarkWrapperLeft)
            }
            else if(this.props.originOrDestination==="Destination"){
                tripLocationQuestionHeading=" Where does the member terminate his/her trip ?"
                TripOriginWrapperClasses.push(classes.TripOriginWrapperRight)
                timeLabel=" When does the member arrive (hh:mm)?"
                landmarkWrapperClasses.push(classes.LandmarkWrapperRight)
            }
            const time=<div style={{display:'flex',justifyContent:'space-between',whiteSpace:'nowrap',order:'4',flexDirection:'column',alignItems:'start',margin:'10px 0 10px'}}>
                <p style={{margin:'0px'}}>{timeLabel}</p>
                {/* <p style={{margin:'0px'}}></p> */}
                <input defaultValue="00:00" style={{textAlign:'center',appearance:'none',margin:'0 auto',border:'none' ,borderBottom:'2px solid rgba(41, 128, 185,0.4)'}} onChange={(event)=>this.onChangeTime(event)} type="time"></input>
            </div>
            return(
            <div  style={{display:'flex',flexFlow:'column',width:'100%',marginBottom:'20px'}}>
                {window.innerWidth>='0px'?<div onClick={this.backdropClickedHandler} style={this.state.backdropShow?{position:'fixed',width:'100vw',top:'0px',left:'0px',height:'100vh',zIndex:'1',background:'rgba(0,0,0,.2'}:{width:'0vw',height:'0vh',display:'none'}}></div>:<div onClick={this.backdropClickedHandler} style={this.state.backdropShow?{position:'fixed',width:'100vw',top:'0px',left:'0px',height:'100vh',zIndex:'1',background:'rgba(0,0,0,.2'}:{width:'0vw',height:'0vh',display:'none'}}></div>}
                <h3 className={classes.OriginHeading}>Trip {this.props.originOrDestination}</h3>
                <div className={landmarkWrapperClasses.join(' ')} >
                <label>{tripLocationQuestionHeading}</label>    
                <Autocomplete disabled={this.props.disabled} initialLandmark={this.props.initialLandmark} centerLat={this.state.centerLat} centerLng={this.state.centerLng} selectedOption={this.selectedOptionHandler}></Autocomplete>
                </div>
                
                <div className={TripOriginWrapperClasses.join(" ")}>
                
                <div className={classes.Hidden}
               ></div> 
               {/* <label>2) Where does the member begin his journey</label> */}
                <TripOriginMap disabled={this.props.disabled} markerLat={this.state.lat} markerLng={this.state.lng} markerLocationText={this.state.markerLocationText}  mapLocation={this.props.mapLocation} centerLocationHandler={this.centerLocationHandler}  initLat={this.props.initLat} initLng={this.props.initLng} ifj={this.props.ifj} originOrDestination={this.props.originOrDestination} latLong={this.latLongHandler} backdropHidden={this.state.backdropShow} backdropShowed={this.backdropShowHandler} ></TripOriginMap>
                {this.state.markerLocationText?<CommentModal
                // time={<TimePicker value={this.state.time} 
                // onChange={this.onChangeTime}></TimePicker>}
                 key={this.props.ifj} ifj={this.props.ifj} originOrDestination={this.props.originOrDestination} show={this.state.modalShow} >
                    {inputElement}
                </CommentModal>:null   }
                {this.props.idf===1?
                    this.state.markerLocationText?
                    <div className={classes.AnchorImagerapper} style={{display:'flex',marginTop:'15px',flexDirection:"column",flexOrder:this.props.originOrDestination==="Origin"?'2':'1'}}>
                    <p onClick={this.originClicked} style={{margin:'0'}}> What is the type of location?</p>
                    <img ifj={this.props.ifj} onClick={this.originClicked} className={classes.TripOriginIcon} alt={"origin"} src={this.props.initialOrigin?this.state.originInfo.filter(item=>item.title===this.props.initialOrigin)[0].src:this.state.src?this.state.src:OriginIcon}></img>
                    {/* <a ifj={this.props.ifj} onClick={this.originClicked} className={classes.TripOriginAnchor}>{this.props.initialOrigin?this.props.initialOrigin:this.state.title?this.state.title:"Choose Below"}</a> */}
                </div>:null:
                <div className={classes.AnchorImagerapper} style={{display:'flex',marginTop:'15px',flexDirection:"column",flexOrder:this.props.originOrDestination==="Origin"?'2':'1'}}>
                    <p onClick={this.originClicked} style={{margin:'0'}}> What is the type of location?</p>
                    <img ifj={this.props.ifj} onClick={this.originClicked} className={classes.TripOriginIcon} alt={"origin"} src={this.props.initialOrigin?this.state.originInfo.filter(item=>item.title===this.props.initialOrigin)[0].src:this.state.src?this.state.src:OriginIcon}></img>
                    </div>
                }
                {time}    
                </div>
            </div>
        )}
}
export default TripOrigin;