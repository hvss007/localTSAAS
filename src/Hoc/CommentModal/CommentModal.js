import React, {Component} from 'react';
import classes from './CommentModal.css'
// import Home from '../../assets/icons/destinationIcons/Home.png';
// import Office from '../../assets/icons/destinationIcons/Office.png';
// import Leisure from '../../assets/icons/destinationIcons/Leisure.png';
// import Ground from '../../assets/icons/destinationIcons/Ground.png';
// import College from '../../assets/icons/destinationIcons/College.png';
// import Shopping from '../../assets/icons/destinationIcons/Shopping.png';
// import School from '../../assets/icons/destinationIcons/School.png';
// import Other from '../../assets/icons/destinationIcons/Other.png';
import CommentModalInput from './CommentModalInput/CommentModalInput';
const CommentModal =props=>{
    // state={
    //     originInfo:[
    //         {id:1,src:Home,title:'Home',value:''},
    //         {id:2,src:Office,title:'Office',value:''},
    //         {id:3,src:Leisure,title:'Leisure',value:''},
    //         {id:4,src:Ground,title:'Ground',value:''},
    //         {id:5,src:College,title:'College',value:''},
    //         {id:6,src:Shopping,title:'Shopping',value:''},
    //         {id:7,src:School,title:'School',value:''},
    //         {id:8,src:Other,title:'Other',value:''},   
    //     ]
    // }
   
    // onClickHandler=(title,id)=>{
    //     const originInfoCopy=[...this.state.originInfo];
    //     const selctedArr=originInfoCopy.filter((item)=>{
    //         if(item.title===title){
    //             return true
    //         } 
    //     })

    //     const selectedArrItems={...selctedArr[0]};
    //     selectedArrItems.value=title;
    //     originInfoCopy[id-1]=selectedArrItems;
    //     this.props.itemClicked(title,selectedArrItems.src);
    //     this.setState({originInfo:originInfoCopy},()=>{this.props.sideClicked(false)});
    //     console.log(selctedArr);
    // }
    // onChangeHandler=(event)=>{
    //     const originInfoCopy=[...this.state.originInfo];
    //     const inputArray={...originInfoCopy[7]};
    //     inputArray.value=event.target.value;
    //     originInfoCopy[7]=inputArray;
    //     this.setState({originInfo:originInfoCopy});
    // }
    
    const tipClasses=[classes.Tip];
    const dialogboxClasses=[classes.Dialogbox];
    let style={};
    if(props.originOrDestination==="Origin"){
      tipClasses.push(classes.TipLeft); 
      style={ 
         left:props.show?'100%':'-100%'}
    }
    else if(props.originOrDestination==="Destination"){
      tipClasses.push(classes.TipRight); 
      style={ right:props.show?'100%':'-100%'}
    }
    if(props.show){
      // if(props.originOrDestination==="Origin"){
      //   const style={left:'100'}
      // }      
      dialogboxClasses.push(classes.DisplayDialogBox);
    }
    return(
        <div className={dialogboxClasses.join(' ') }
            style={style}>
        <div className={classes.Body}>
          <span className={tipClasses.join(' ')}></span>
          <div className={classes.Message}>
          {props.children}  
            {/* <span>I just made a comment about this comment box which is purely made from CSS.</span> */}
          </div>   
        </div>
      </div>
    )
}
export default CommentModal