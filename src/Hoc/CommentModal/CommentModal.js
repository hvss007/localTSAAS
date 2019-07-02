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
  const tipClasses=[classes.Tip];
    const dialogboxClasses=[classes.Dialogbox];
    const bodyClasses=[classes.Body];
    let style={};
    console.log(window.innerWidth)
    if(props.originOrDestination==="Origin"){
      tipClasses.push(classes.TipLeft);
      if(window.innerWidth>=500){
        style={ 
          left:props.show?'100%':'-100%'}
      }
      else{
        props.show?bodyClasses.push(classes.BodyDisplay):null
        style={width:!props.show?'100%':'0%',height:!props.show?'100%':'0%',left:!props.show?'0%':'-100%', opacity:!props.show?'1':'0'}
      }
    }
    else if(props.originOrDestination==="Destination"){
      tipClasses.push(classes.TipRight); 
      if(window.innerWidth>=500){
        style={ right:props.show?'100%':'-100%'}
      }
      else{
        props.show?bodyClasses.push(classes.BodyDisplay):null
        style={width:!props.show?'100%':'0%',height:!props.show?'100%':'0%',left:!props.show?'0%':'-100%', opacity:!props.show?'1':'0'}
      } 
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
        <div  className={bodyClasses.join(' ')}>
          <span className={tipClasses.join(' ')}></span>
          {props.time}
          <div className={classes.Message}>
          {props.children}
          </div>   
          
        </div>
      </div>
    )
}
export default CommentModal