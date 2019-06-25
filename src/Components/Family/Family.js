import React,{Component} from 'react';
import Input from '../Input/Input';
import classes from './Family.css';
import axios from 'axios';
import MemberSubmitButton from '../Members/Member/MemberSubmitButton';
import {withRouter} from 'react-router-dom';

class Family extends Component{
    state={
        family:{
            noOfCars:{
                name:'noOfCars',
                label:'Number of Cars',
                elementType:'input',
                elementConfig:{
                    type:'number',
                    placeholder:''
                },
                validation:{
                    required:true
                },
                value:'',
                show:true,
                valid:false,
                touched:false
            },
            noOfCycles:{
                name:'noOfCycles',
                label:'Number of Cycles',
                elementType:'input',
                elementConfig:{
                    type:'number',
                    placeholder:''
                },
                validation:{
                    required:true
                },
                value:'',
                show:true,
                valid:false,
                touched:false
            },
            noOfTwoWheelers:{
                name:'noOfTwoWheelers',
                label:'Number of Motorcycles/Scooters',
                elementType:'input',
                elementConfig:{
                    type:'number',
                    placeholder:''
                },
                validation:{
                    required:true
                },
                value:'',
                show:true,
                valid:false,
                touched:false
            },
            familyIncome:{
                name:'familyIncome',
                label:'Family Income',
                elementType:'select',
                elementConfig:{
                   options:[
                    {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                    {value:'<5000',displayValue:'<5000'},
                    {value:'5000-10000',displayValue:'5000-10000'},
                    {value:'10000-100000',displayValue:'10000-100000'},
                    {value:'>100000',displayValue:'>100000'}
                   ]
                },
                validation:{
                    required:true
                },
                value:'',
                show:true,
                valid:false,
                touched:false
            }
        },
        qAnswered:0,
    }
    inputChangeHandler=(event,inputIdentifier)=>{
        const familyUpdated={...this.state.family};
        const updatedInputElement={...familyUpdated[inputIdentifier]} ;
        updatedInputElement.value=event.target.value;
        updatedInputElement.valid=this.validityHandler(updatedInputElement.value,updatedInputElement.validation);
        updatedInputElement.touched=true;
        familyUpdated[inputIdentifier]=updatedInputElement; 
        this.setState({family:familyUpdated},()=>{
            this.progressHandler()
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
    progressHandler=()=>{
        var arr=Object.keys(this.state.family);
        var noOfTrue=0;
        var objLen=arr.length;
        for(let i=0;i<objLen;i++){
         if(this.state.family[arr[i]].valid){
             noOfTrue++;
         }
        }
        this.setState({qAnswered:noOfTrue});
        console.log(noOfTrue);    
    } 
    submitButtonHandler=(event)=>{
        console.log(this.state.qAnswered);
        event.preventDefault();
        
        if(this.state.qAnswered===4){
            const family=this.state.family;
                const post={
                    noOfCars:family.noOfCars.value,
                    noOfCycles:family.noOfCycles.value,
                    noOfTwoWheelers:family.noOfTwoWheelers.value,
                    familyIncome:family.familyIncome.value,
                }
                axios.post("http://127.0.0.1:8000/api/family/",post)
                    .then((Response)=>{
                        console.log(Response);
                        this.props.history.push({pathname:this.props.match.url+Response.data.memberID+'/member'})
                    })
                    .catch(err => console.error(err));
            }
         
        
        else{
            alert("Please fill all the fields")
        }
    }
    render(){
        let familyformArray=[];
        for (let key in this.state.family){
        familyformArray.push(
            {
               id:key,
               config:this.state.family[key]     
        })
    }
        return(
        <div style={{display:'flex'}}>    
        <div className={classes.Family}>
            <form className={classes.CustomForm} >
            {familyformArray.map((memFormElement)=>{return(
                memFormElement.config.show?
                <Input 
                    key={memFormElement.id}
                    label={memFormElement.config.label}
                    name={memFormElement.config.name}
                    elementType={memFormElement.config.elementType}
                    elementconfig={memFormElement.config.elementConfig}
                    value={memFormElement.config.value}
                    invalid={!memFormElement.config.valid}
                    touched={memFormElement.config.touched}
                    changed={(event)=>this.inputChangeHandler(event,memFormElement.id)}
                    onFocusHandler={this.onFocusHandler}
                    blurred={this.onBlurHandler}
                //  outFocus={()=>this.onBlurHandler(memFormElement.id)}
                >    
                </Input>:null
            )})}
         <MemberSubmitButton clicked={this.submitButtonHandler} ></MemberSubmitButton> 
        </form>
        </div>
        </div>
    )}
}
export default withRouter(Family);