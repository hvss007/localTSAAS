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
import TripOriginMap from '../TripOrigin/TripOriginMap/TripOriginMap';
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
            {id:6,src:Shopping,title:'Shopping',value:''},
            {id:7,src:School,title:'School',value:''},
            {id:8,src:Other,title:'Other',value:''},   
        ],
        modalShow:false,
        backdropShow:false,
        lat:"26.9124",
        lng:"75.7873",
    }
    onClickHandler=(title,id)=>{
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
        this.setState({originInfo:originInfoCopy},()=>{this.setState({modalShow:false})});
        console.log(selctedArr);
    }
    onChangeHandler=(event)=>{
        const originInfoCopy=[...this.state.originInfo];
        const inputArray={...originInfoCopy[7]};
        inputArray.value=event.target.value;
        originInfoCopy[7]=inputArray;
        this.setState({originInfo:originInfoCopy});
    }
     originItemSelectedHandler=(value,src)=>{
        this.setState({src:src,title:value},()=>{
        this.props.originDataHandler(this.state.title,this.props.originOrDestination);
        });
        
    }
     originClicked=()=>{
        this.setState({modalShow:true})
    }
    latLongHandler=(lat,lng)=>{
        this.props.latLongHandler1(lat,lng,this.props.originOrDestination);
    }
        render(){
            const inputElement=this.state.originInfo.map((item,index)=>{
                return <CommentModalInput changed={this.onChangeHandler} clicked={this.onClickHandler} key={item.title+this.props.ifj} id={item.id} title={item.title} source={item.src}>
                    </CommentModalInput>
            })
            const TripOriginWrapperClasses=[classes.TripOriginWrapper];
            if(this.props.originOrDestination==="Origin"){
                TripOriginWrapperClasses.push(classes.TripOriginWrapperLeft)
            }
            else if(this.props.originOrDestination==="Destination"){
                TripOriginWrapperClasses.push(classes.TripOriginWrapperRight)
            }
            return(
            <Aux>
                <div className={TripOriginWrapperClasses.join(" ")}>
                <div
                   style={this.state.backdropShow?{
                   width:"100vw",
                   position:"absolute",
                   height:'500px',
                   transition:'all ease-in 0.5s'
               }:{
                   width:'100px',
                   height:"100px",
                   position:'relative'
               }}> 
                <TripOriginMap ifj={this.props.ifj} originOrDestination={this.props.originOrDestination} latLong={this.latLongHandler} backdropHidden={this.state.backdropShow} backdropShowed={this.backdropShowHandler} ></TripOriginMap>
                </div>
                <CommentModal key={this.props.ifj} originOrDestination={this.props.originOrDestination} show={this.state.modalShow} >
                    {inputElement}
                </CommentModal>   
                {/* <div className={classes.OriginModal}></div> */}
                <div style={{display:'flex',flexDirection:"column",flexOrder:this.props.originOrDestination==="Origin"?'2':'1'}}>
                <img ifj={this.props.ifj} onClick={this.originClicked} className={classes.TripOriginIcon} src={this.state.src?this.state.src:OriginIcon}></img>
                <a ifj={this.props.ifj} onClick={this.originClicked} className={classes.TripOriginAnchor}>{this.state.title?this.state.title:this.props.originOrDestination}</a>
                </div>
                </div>
            </Aux>
        )}

}
export default TripOrigin;