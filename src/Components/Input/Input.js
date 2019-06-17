import React , { Component }  from 'react';
import classes from './Input.css';
import LandmarkAutoComplete from './LandmarkAutoComplete';
import Axios from 'axios';
class Input extends Component {
    state={
    backArr1:[]    
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.autoCompleteArr !== this.props.autoCompleteArr){
            this.setState({backArr1:[...nextProps.autoCompleteArr]});
        }
    }
    render(){
    let Autocompleteitems;
    let show=this.props.autoCompleteShow;        
    let inputElement=null;
    const inputClasses=[classes.InputElement];
    if(this.props.invalid&&this.props.touched){
        inputClasses.push(classes.Invalid)
    }
    switch(this.props.elementType){
        case('input'):
        if(this.props.label!=="Landmark"){
        inputElement=<input onChange={this.props.changed} 
                        className={inputClasses.join(' ')}
                        {...this.props.elementconfig}>
                     </input>
        }else{      
            console.log(this.state.backArr1);
        Autocompleteitems=this.state.backArr1.length>0&&show? this.state.backArr1.map((items,index)=>{
            return <li 
            onClick={(event)=>
                {
                let tempArr=[...this.state.backArr1];
                let tempArrElement=[...tempArr[index]];
                console.log(tempArrElement)
                tempArrElement.clicked=true;
                tempArr[index]=tempArrElement;
                this.setState({backArr1:tempArr});                
                this.props.itemClicked(event,""+items.backArr+index,items.clicked)    
          
            }} id={""+items.backArr+index} key={items.backArr+index} style={{display:"block"}}>{items.backArr}</li>
        }):null;
         inputElement= 
                          <div  className={classes.Autocomplete} >
                            <input 
                                // onBlur={this.props.blurred} onFocus={this.props.onFocusHandler}
                                onChange={this.props.changed} 
                                className={inputClasses.join(' ')}
                                {...this.props.elementconfig} 
                                value={this.props.value}
                                id="myInput" 
                                >
                            </input>
                            {true?<LandmarkAutoComplete>
                                {Autocompleteitems}
                            </LandmarkAutoComplete>:null}              
                          </div>
        }
        break;
        case("select"):
        if(this.props.label==="Home State"){
            inputElement=
        (<select onChange={()=>{this.props.changed; 
            Axios.get("https://api.data.gov.in/resource/c756183a-2a66-4b80-bc56-06f60522f14a?api-key=579b464db66ec23bdd0000010d5809d2456648eb4ccbc49790b33c9f&format=json&offset=0&limit=100")
            .then(Response=>{
                console.log(Response)
            })
        }} className={inputClasses.join(' ')} 
            >
              {     
                  this.props.elementconfig.options.map((inOpt)=>
                  {
                  return(
                  <option selected={inOpt.selected} disabled={inOpt.disabled} key={inOpt.value} value={inOpt.value}  >{inOpt.displayValue}</option>
                  )})  
              }
        </select>)
        }
        else{
            inputElement=
        (<select onChange={()=>{this.props.changed}} className={inputClasses.join(' ')} 
            >
              {     
                  this.props.elementconfig.options.map((inOpt)=>
                  {
                  return(
                  <option selected={inOpt.selected} disabled={inOpt.disabled} key={inOpt.value} value={inOpt.value}  >{inOpt.displayValue}</option>
                  )})  
              }
        </select>)
        }
        break;
        default:
            inputElement=<input className={classes.InputElement} ></input>
    }
    return(
        <div className={classes.Input}> 
            <label className={classes.Label}>{this.props.label} </label>
            {inputElement}
        </div>
    )
    }
}


export default Input;