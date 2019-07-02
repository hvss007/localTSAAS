import React, { Component } from 'react';
// import Aux from '../../../../../../Hoc/Aux'
import Aux from '../../../../../../Hoc/Aux';
import AcessIcon from '../../../../../../assets/icons/destination.png'; 
import classes from './TripAcess.css';
import TripModal from '../../../../../../Hoc/TripModal/TripModal';
import Walk from '../../../../../../assets/icons/modeIcons/Walk.png';
import Bicycle from '../../../../../../assets/icons/modeIcons/Bicycle.png';
import Motorcycle from '../../../../../../assets/icons/modeIcons/Motorcycle.png';
import Car from '../../../../../../assets/icons/modeIcons/Car.png';
import Taxi from '../../../../../../assets/icons/modeIcons/Taxi.png';
import Auto from '../../../../../../assets/icons/modeIcons/Auto.png';
import Bus from '../../../../../../assets/icons/modeIcons/Bus.png';
import Train from '../../../../../../assets/icons/modeIcons/Train.png';
import Others from '../../../../../../assets/icons/modeIcons/Others.png';
import CommentModalInput from '../../../../../../Hoc/CommentModal/CommentModalInput/CommentModalInput'
import Rupee from '../../../../../../assets/icons/rupee.png'
import TripAccessIn from './TripAccessIn/TripAccessIn';
//import Others from '../../../../../../assets/icons/Others.png';
class TripAccess extends Component{
    state={
        accessClicked:false,
        accessClickedIn:false,
        accessInfo:[
            {id:1,src:Walk,title:'Walk',value:''},
            {id:2,src:Bicycle,title:'Bicycle',value:''},
            {id:3,src:Motorcycle,title:'Motorcycle',value:''},
            {id:4,src:Car,title:'Car',value:''},
            {id:5,src:Taxi,title:'Taxi',value:''},
            {id:6,src:Auto,title:'Auto',value:''},
            {id:7,src:Bus,title:'Bus',value:''},
            {id:8,src:Train,title:'Metro',value:''},
            {id:9,src:Others,title:'Others',value:''},   
        ],
        accessInfoIn:[
            {id:1,title:"Travel Time (hh:mm)",value:'',valid:false,touched:false,type:'time'},
            {id:2,title:"Travel Distance (km)",value:'',valid:false,touched:false},
            {id:3,title:"Fare ",value:'',valid:false,touched:false,src:Rupee},
            // {id:4,title:"Cost",value:'',valid:false,touched:false}
        ],
        src:null,
        title:null,
        inValue:null,
        backdropShow:false,
        mainmode:false,
        activateAdd:false
    }
    componentDidMount(){
        this.mainModeHandler()
    }
    mainModeHandler=()=>{
        this.props.mainMode?this.setState({mainmode:true}):null
    }
    // backdropShowHandler=()=>{
    //     this.setState({backdropShow:true})
    // }
    backdropHideHandler=()=>{
        this.setState({backdropShow:false,accessClicked:false,accessClickedIn:false})
    }
    accessClicked=()=>{
        this.setState({accessClicked:true,backdropShow:true})
    }
    onClickHandler=(title,id)=>{
        const accessInfoCopy=[...this.state.accessInfo];
        const selctedArr=accessInfoCopy.filter((item)=>{
            if(item.title===title){
                return true
            } 
        })
        //console.log(selctedArr);
        const selectedArrItems={...selctedArr[0]};
        selectedArrItems.value=title;
        //console.log(selectedArrItems);
        accessInfoCopy[id-1]=selectedArrItems;
        //console.log(accessInfoCopy)
        this.dialogBoxShow();
        this.itemClicked(title,selectedArrItems.src);
        
        this.setState({accessInfo:accessInfoCopy},()=>{
            if(this.state.title.length>=0){
                this.setState({activateAdd:true})
            }
            else{
                this.setState({activateAdd:false})
            }
        }
            );
    }
    itemClicked=(title,src)=>{
        //document.querySelector('.'+classes.TripAccessAnchor).innerHTML=title;
        //document.querySelector('.'+classes.TripAccessIcon).src=src;
        this.setState({src:src,title:title},()=>{
        //   if(this.state.accessInfo.value.length){
        //     this.setState({activateAdd:true})
        //   }
        //   else{
        //     this.setState({activateAdd:false})
        //   }  
            this.props.accessData(this.props.accessName,title,this.props.idi)})
    }
    dialogBoxShow=()=>{
        this.setState({accessClickedIn:true});
    }
    onChangeHandler=(event)=>{
        const accessInfoCopy=[...this.state.originInfo];
        const inputArray={...accessInfoCopy[7]};
        inputArray.value=event.target.value;
        accessInfoCopy[7]=inputArray;
        this.setState({originInfo:accessInfoCopy});
    }
    addButtonHandler=()=>{
     this.props.add(this.props.idi,this.props.accessName);   
    }
    onChangeHandler1=(event,title,id)=>{
        const accessInfoCopyIn=[...this.state.accessInfoIn];
        const selctedArr=accessInfoCopyIn.filter((item)=>{
            if(item.title===title){
                return true
            } 
        })    
        const selectedArrItems={...selctedArr[0]};
        const value=event.target.value;
        selectedArrItems.value=event.target.value;
        selectedArrItems.touched=true;
        selectedArrItems.valid=this.validityHandler(value);
        accessInfoCopyIn[id-1]=selectedArrItems;
        //this.itemClicked(title,selectedArrItems.src);
        
        this.setState({accessInfoIn:accessInfoCopyIn},
            ()=>{let valid=this.addShower();
                console.log(valid)
                this.props.accessDataIn(this.props.accessName,title,value,this.props.idi,valid)}
            );
        
    }
    addShower=()=>{
     const validArr=[];
      this.state.accessInfoIn.forEach(item=>{
          validArr.push(item.valid)
      })
      const inValidArr=validArr.filter((item)=>{
          return !item
      })
      console.log(inValidArr)
      if(inValidArr.length>=0){
          
          return true 
      }else {
        
        return false
      }
    }
    validityHandler=(value)=>{
        let isValid=true;
        if(isValid){
            isValid=value.trim() !=='';
        }
        console.log(isValid);
        return isValid;
    }
    render(){
        const inputElement=this.state.accessInfo.map((item,index)=>{
            return <CommentModalInput changed={this.onChangeHandler} clicked={this.onClickHandler} key={item.title} id={item.id} title={item.title} source={item.src}>
                </CommentModalInput>
        })
       const inputElementIn=this.state.accessInfoIn.map((item)=>{
           return <TripAccessIn touched={item.touched} src={item.src} type={item.type} invalid={!item.valid} changed={this.onChangeHandler1} key={item.title+this.props.idi} id={item.id} title={item.title}></TripAccessIn>
       })   
        return(<Aux>
            <div className={classes.TripAccessWrapper}>
            {/* <CommentModal itemClicked={this.originItemSelectedHandler} sideClicked={this.props.sideClicked} show={this.state.commentModalShow} ></CommentModal>    */}
            <div style={{display:'flex'}}>
                <p style={{margin:'auto'}}>{this.props.accessName}</p>
            </div>
            <img key={this.props.idi+"s"} onClick={this.accessClicked} className={classes.TripAccessIcon} src={this.state.src?this.state.src:AcessIcon}></img>
            <div style={{display:'flex',flexFlow:'column'}}>
            <a key={this.props.idi+"a"} onClick={this.accessClicked} className={classes.TripAccessAnchor}>{this.state.title?this.state.title:"Choose Here"}</a>
            {/* this.props.accessName */}
            {this.props.showAdd&&this.state.activateAdd?<button className={classes.AddModeButton +" "+ classes.AddModeButtonBorder} onClick={this.addButtonHandler}>Add another {this.props.accessName}</button>:null}
            </div>
            </div>
            <TripModal 
                key={this.props.idi} 
                inputElementIn={inputElementIn} 
                clickedIn={this.state.accessClickedIn} 
                clicked={this.state.accessClicked} 
                className={classes.TripModal}
                backdropShow={this.state.backdropShow}
                backdropHide={this.backdropHideHandler}
                >
                    {inputElement}
            </TripModal>
        </Aux>)
    }
}
export default TripAccess;