import React , { Component }  from 'react';
import classes from './Input.css';
// import LandmarkAutoComplete from './LandmarkAutoComplete';
import Coins from '../../assets/icons/coins.png'
import Autocomplete from '../../Containers/AutoComplete/AutoComplete1';

class Input extends Component {
    state={
    backArr1:[],
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.autoCompleteArr !== this.props.autoCompleteArr){
            this.setState({backArr1:[...nextProps.autoCompleteArr]});
        }
    }
    render(){           
    let inputElement=null;
    const inputClasses=[classes.InputElement];
    if(this.props.invalid&&this.props.touched){
        inputClasses.push(classes.Invalid)
    }
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
                    return (
                        <div className={classes.RadioWrapper}  key={index}>
                            <input name={this.props.label} type={this.props.elementconfig.type} {...checkedObject} onChange={this.props.changed} value={option.value} ></input>
                            <label name={this.props.label} > {option.displayValue}</label>
                        </div>)
                        }
                )
                inputElement= <div style={{display:'flex',justifyContent:'space-around'}}>{inputElement1}</div>
                
            }
            
    
    }else{         
         inputElement= 
                          <div  className={classes.Autocomplete} >
                            <Autocomplete selectedOption={this.props.selectedOption} centerLat={this.props.centerLat} centerLng={this.props.centerLng}></Autocomplete>
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
    <p  style={{fontWeight:'600',marginBottom:'1px',fontSize:'20px',borderBottom:'solid 1px rgba(200,200,200)'}}> Permanent Address (Hometown):</p>
    </div>
       
    )
    }
}
export default Input;