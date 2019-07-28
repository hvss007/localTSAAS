import React from 'react';
import classes from './CommentModal.css'
const CommentModal =props=>{  
  const tipClasses=[classes.Tip];
    const dialogboxClasses=[classes.Dialogbox];
    const bodyClasses=[classes.Body];
    let style={};
    // console.log(window.innerWidth)
    if(props.originOrDestination==="Origin"){
      tipClasses.push(classes.TipLeft);
      if(window.innerWidth>=500){
        // style={ 
        //   left:props.show?'100%':'-100%'}
          props.show ? bodyClasses.push(classes.BodyDisplay) : bodyClasses.push(null)
        if(props.ifj==="11"){
          style={width:!props.show?'360px':'0%',height:!props.show?'300px':'0px',left:!props.show?'0%':'-100%', opacity:!props.show?'1':'0'}
        }
        else{
          !props.show?bodyClasses.push(classes.BodyDisplay):bodyClasses.push(null)
          style={width:props.show?'360px':'0%',height:props.show?'300px':'0px',left:props.show?'0%':'-100%', opacity:props.show?'1':'0'}
        }
      }
      else{
        props.show?bodyClasses.push(classes.BodyDisplay):bodyClasses.push(null)
        if(props.ifj==="11"){
          style={width:!props.show?'100%':'0%',height:!props.show?'100%':'0px',left:!props.show?'0%':'-100%', opacity:!props.show?'1':'0'}
        }
        else{
          !props.show?bodyClasses.push(classes.BodyDisplay):bodyClasses.push(null)
          style={width:props.show?'100%':'0%',height:props.show?'100%':'0px',left:props.show?'0%':'-100%', opacity:props.show?'1':'0'}
        }
      }
    }
    else if(props.originOrDestination==="Destination"){
      tipClasses.push(classes.TipRight); 
      if(window.innerWidth>=500){
        // style={ right:props.show?'100%':'-100%'}
        props.show?bodyClasses.push(classes.BodyDisplay):bodyClasses.push(null)
        style={width:!props.show?'360px':'0%',height:!props.show?'300px':'0px',left:!props.show?'0%':'-100%', opacity:!props.show?'1':'0'}
      }
      else{
        props.show?bodyClasses.push(classes.BodyDisplay):bodyClasses.push(null)
        style={width:!props.show?'360px':'0%',height:!props.show?'300px':'0px',left:!props.show?'0%':'-100%', opacity:!props.show?'1':'0'}
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
          {!props.show?props.children:null}
          </div>   
          
        </div>
      </div>
    )
}
export default CommentModal