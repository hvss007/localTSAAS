import React , { Component }  from 'react';
import classes from './Input.css';
// import LandmarkAutoComplete from './LandmarkAutoComplete';
import Coins from '../../assets/icons/coins.png'
import Autocomplete from '../../Containers/AutoComplete/AutoComplete1';

class Input extends Component {
    state={
    backArr1:[]    ,
    // responseArray:this.props.responseArray
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.autoCompleteArr !== this.props.autoCompleteArr){
            this.setState({backArr1:[...nextProps.autoCompleteArr]});
        }
    }
    render(){    
    // let Autocompleteitems;
    // let show=this.props.autoCompleteShow;        
    let inputElement=null;
    const inputClasses=[classes.InputElement];
    if(this.props.invalid&&this.props.touched){
        inputClasses.push(classes.Invalid)
    }
    // if(this.props.elementType==='select'){
    //     if(this.props.elementconfig.options[0].disabled)
    //     {console.log(this.props.elementconfig.options[0].disabled)
    //         inputClasses.push(classes.DisabledText);}
    //     else{
    //         inputClasses.push(classes.EnabledText);
    //     }
    // }
    switch(this.props.elementType){
        case('input'):
        if(this.props.id!=="landmark"){
            if(this.props.elementconfig.type!=="radio"){
                inputElement=<input value={this.props.value} onChange={this.props.changed} 
                        className={inputClasses.join(' ')}
                        {...this.props.elementconfig}>
                     </input>
            }
            else{
                let checkedObject=null
                let inputElement1=this.props.elementconfig.options.map((option,index)=>{
                    if(option.value!==undefined){
                      let checked1=option.value===this.props.value?true:false
                      checkedObject={checked:checked1}
                    }
                    // else{
                    //     checked:false
                    // }
                    return (
                        <div className={classes.RadioWrapper}  key={index}>
                            <input name={this.props.label} type={this.props.elementconfig.type} {...checkedObject} onChange={this.props.changed} value={option.value} ></input>
                            <label name={this.props.label} > {option.displayValue}</label>
                        </div>)
                        }
                )
                inputElement= <div style={{display:'flex',justifyContent:'space-around'}}>{inputElement1}</div>
                // inputElement=<input onChange={this.props.changed} 
                // className={inputClasses.join(' ')}
                // {...this.props.elementconfig}>
                // </input>
                // inputElement=<input onChange={this.props.changed} 
                //         className={inputClasses.join(' ')}
                //         {...this.props.elementconfig}>
                //      </input>
            }
            
    
    }else{         
            // console.log(this.state.backArr1);
            
        //     Autocompleteitems=this.state.backArr1.length>0&&show? this.state.backArr1.map((items,index)=>{
        //     return <li  
        //     onClick={(event)=>
        //         {
                    
        //         let tempArr=[...this.state.backArr1];
        //         let tempArrElement=[...tempArr[index]];
        //         console.log(tempArrElement)
        //         tempArrElement.clicked=true;
        //         tempArr[index]=tempArrElement;
        //         this.setState({backArr1:tempArr});                
        //         this.props.itemClicked(event,""+items.backArr+index,items.clicked)    
          
        //     }} id={""+items.backArr+index} key={items.backArr+index} style={{display:"block"}}>{items.backArr}</li>
        // }):null;
         inputElement= 
                          <div  className={classes.Autocomplete} >
                            {/* <input 
                                // onBlur={this.props.blurred} onFocus={this.props.onFocusHandler}
                                onChange={this.props.changed} 
                                className={inputClasses.join(' ')}
                                {...this.props.elementconfig} 
                                value={this.props.value}
                                id="myInput" 
                                style={this.props.style}
                                >
                            </input> */}
                            <Autocomplete selectedOption={this.props.selectedOption} centerLat={this.props.centerLat} centerLng={this.props.centerLng}></Autocomplete>
                            {/* {true?<LandmarkAutoComplete>
                                {Autocompleteitems}
                            </LandmarkAutoComplete>:null}           */}
                            <p style={{textAlign:'center',fontSize:'11px'}}>Drag the marker nearest to your permanent address.</p>    
                          </div>
        }
        break;
        case("select"):
        inputElement=
        (<select style={this.props.style} value={this.props.value} onChange={this.props.changed} className={inputClasses.join(' ')} 
            >
              {     
                  this.props.elementconfig.options.map((inOpt)=>
                  {
                  return(
                  <option selected={inOpt.selected} disabled={inOpt.disabled} key={inOpt.value} value={inOpt.value}  >{inOpt.displayValue}</option>
                  )})  
              }
        </select>)
        
        break;
        default:
            inputElement=<input className={classes.InputElement}></input>
    }
    return(
        this.props.id!=='familyIncome'? 
        <div className={classes.Input}> 
        <label  style={{textAlign:this.props.textAlign,fontWeight:this.props.labelFontWeight}} className={classes.Label}>{this.props.label} </label>
        {inputElement}
    </div>:
    <div>
       
    <div style={{marginBottom:'15px'}} className={classes.Input}> 
        <img style={{margin:'auto',width:'50px'}} alt={"income"} src={Coins}></img>
        <label  style={{textAlign:this.props.textAlign,fontWeight:this.props.labelFontWeight}} className={classes.Label}>{this.props.label} </label>
        {inputElement}
    </div>
    <p  style={{fontWeight:'600',marginBottom:'1px',fontSize:'20px',borderBottom:'solid 1px rgba(200,200,200)'}}> Permanent Address:</p>
    </div>
       
    )
    }
}
export default Input;