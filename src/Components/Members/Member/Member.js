import React,{Component} from 'react';
import Input from '../../Input/Input';
import classes from './Member.css';
import axios from 'axios';
import MemberSubmitButton from './MemberSubmitButton';
import Autocomplete from '../../Input/Autocomplete';
import {withRouter} from 'react-router-dom';
class Member extends Component{
    state={
        familyId:null,
        member:{
            memberId:{
                title:'member_id',
                label:'Member ID',
                elementType:'input',
                elementConfig:{
                   type:'text',
                   placeholder:1 
                },
                value:1,
                show:true,
                validation:{
                    required:true
                },
                valid:true,
                touched:false
            },
            gender:{
                name:'gender',
                label:'Gender',
                elementType:'select',
                elementConfig:{
                   options:[
                    {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                       {value:'male',displayValue:'Male'},
                       {value:'female',displayValue:'Female'},
                       {value:'other',displayValue:'Other'
                       }
                   ]
                },
                value:'',
                show:true,
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            age:{
                name:'age',
                label:'Age',
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                        {value:'<4',displayValue:'Below 4'},
                        {value:'4-18',displayValue:'4-18'},
                        {value:'18-25',displayValue:'18-25'},
                        {value:'25-40',displayValue:'25-40'},
                        {value:'40-60',displayValue:'40-60'},
                        {value:'>60',displayValue:'Above 60'}
                    ]
                },
                value:'',
                show:true,
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            educationalQualification:{
                name:'educationalQualification',
                label:'Educational Qualification',
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                        {value:'passX',displayValue:'10th Pass'},
                        {value:'passXII',displayValue:'12th Pass'},
                        {value:'undergraduate',displayValue:'Undergraduate'},
                        {value:'postgraduate',displayValue:'Postgraduate'}
                    ] 
                },
                value:'',
                show:true,
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            monthlyIncome:{
                name:'monImonthlyIncomenc',
                label:'Monthly Income',
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
                value:'',
                validation:{
                    required:true
                },
                show:true,
                valid:false,
                touched:false
            },
            maritialStatus:{
                name:'mamaritialStatusrt',
                label:'Maritial Status',
                elementType:'select',
                elementConfig:{
                   type:'text',
                   options:[
                    {value:'',displayValue:"Choose Here", selected:true, disabled:true},    
                   {value:'married',displayValue:'Married'},
                   {value:'single',displayValue:'Single'},
                   {value:'engaged',displayValue:'Engaged'},
                   {value:'widow/widower',displayValue:'Widow/Widower'},
                   {value:'other',displayValue:"other"}
                ]
                },
                value:'',
                show:true,
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            differentlyAbled:{
                name:'differentlyAbled',
                label:'Differently Abled',
                elementType:'select',
                elementConfig:{
                   type:'text',
                   options:[
                       {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                       {value:'yes',displayValue:'Yes'},
                       {value:'no',displayValue:'No'}
                    ] 
                },
                value:'',
                validation:{
                    required:true
                },
                show:true,
                valid:false,
                touched:false
            },
            homeState:{
                name:'homeState',
                label:'Home State',
                elementType:'select',
                elementConfig:{
                   type:'text',
                   options:[
                   {value:'',displayValue:"Select State", selected:true, disabled:true},
                   {value:'Andaman and Nicobar Islands',displayValue:'Andaman and Nicobar Islands'},
                   {value:'Andhra Pradesh',displayValue:'Andhra Pradesh'},
                   {value:'Arunachal Pradesh',displayValue:'Arunachal Pradesh'},
                   {value:'Assam',displayValue:'Assam'},
                   {value:'Bihar',displayValue:'Bihar'},
                   {value:'Chandigarh',displayValue:'Chandigarh'},
                   {value:'Chhattisgarh',displayValue:'Chhattisgarh'},
                   {value:'Dadra and Nagar Haveli',displayValue:'Dadra and Nagar Haveli'},
                   {value:'Daman and Diu',displayValue:'Daman and Diu'},
                   {value:'Delhi',displayValue:'Delhi'},
                   {value:'Goa',displayValue:'Goa'},
                   {value:'Gujarat',displayValue:'Gujarat'},
                   {value:'Haryana',displayValue:'Haryana'},
                   {value:'Himachal Pradesh',displayValue:'Himachal Pradesh'},
                   {value:'Jammu and Kashmir',displayValue:'Jammu and Kashmir'},
                   {value:'Jharkhand',displayValue:'Jharkhand'},
                   {value:'Karnataka',displayValue:'Karnataka'},
                   {value:'Kerala',displayValue:'Kerala'},
                   {value:'Lakshadweep',displayValue:'Lakshadweep'},
                   {value:'Madhya Pradesh',displayValue:'Madhya Pradesh'},
                   {value:'Maharashtra',displayValue:'Maharashtra'},
                   {value:'Manipur',displayValue:'Manipur'},
                   {value:'Meghalaya',displayValue:'Meghalaya'},
                   {value:'Mizoram',displayValue:'Mizoram'},
                   {value:'Nagaland',displayValue:'Nagaland'},
                   {value:'Orissa',displayValue:'Orissa'},
                   {value:'Pondicherry',displayValue:'Pondicherry'},
                   {value:'Punjab',displayValue:'Punjab'},
                   {value:'Rajasthan',displayValue:'Rajasthan'},
                   {value:'Sikkim',displayValue:'Sikkim'},
                   {value:'Tamil Nadu',displayValue:'Tamil Nadu'},
                   {value:'Tripura',displayValue:'Tripura'},
                   {value:'Uttaranchal',displayValue:'Uttaranchal'},
                   {value:'Uttar Pradesh',displayValue:'Uttar Pradesh'},
                   {value:'West Bengal',displayValue:'West Benga'},
                ] 
                },
                value:'',
                show:true,
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            nameOfDistrict:{
                name:'nameOfDistrict',
                label:'Name of district',
                elementType:'input',
                elementConfig:{
                   type:'text',
                   placeholder:'' 
                },
                value:'',
                show:true,
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            landmark:{
                name:'landmark',
                label:'Landmark',
                elementType:'input',
                elementConfig:{
                   type:'text',
                   placeholder:'' 
                },
                value:'',
                show:true,
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            // wardNo:{
            //     label:'Ward Number',
            //     elementType:'input',
            //     elementConfig:{
            //        type:'number',
            //        placeholder:'' 
            //     },
            //     value:'',
            //     show:true,
            //     validation:{
            //         required:true
            //     },
            //     valid:false,
            //     touched:false
            // },
            pinCode:{
                name:'pinCode',
                label:'PIN Code',
                elementType:'input',
                elementConfig:{
                   type:'number',
                   placeholder:'' 
                },
                value:'',
                show:true,
                validation:{
                    required:true,
                    length:6,
                },
                valid:false,
                touched:false
            },
            principalSourceofIncome:{
                name:'principalSourceofIncome',
                label:'Principal Source Of Income',
                elementType:'select',
                elementConfig:{
                   options:[
                        {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                        {value:'governmentServices',displayValue:'Government Services'},
                        {value:'agriculture',displayValue:'Agriculture'},
                        {value:'organisedBusiness/Trade',displayValue:'Organised business/trade'},
                        {value:'shop',displayValue:'Shop'},
                        {value:'workshop',displayValue:'Workshop'},
                        {value:'others',displayValue:'Others'}
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
        totalQuestions:13,
        qAnswered:0,
        autoCompleteShow:false
    }
    componentDidMount(){
        this.setState({familyId:this.props.familyId})
    }
    inputChangeHandler=(event,inputIdentifier)=>{
        const memberUpdated={...this.state.member};
        const updatedInputElement={...memberUpdated[inputIdentifier]} ;
        updatedInputElement.value=event.target.value;
        updatedInputElement.valid=this.validityHandler(updatedInputElement.value,updatedInputElement.validation);
        updatedInputElement.touched=true;
        memberUpdated[inputIdentifier]=updatedInputElement; 
        this.setState({member:memberUpdated},()=>{
            this.progressHandler()
            if(inputIdentifier=="landmark"&&updatedInputElement.valid){
                this.landmarkValueHandler();
            }
        });
    }
    onFocusHandler=()=>{
        this.setState({autoCompleteShow:true})
    }
    onBlurHandler=()=>{
        this.setState({autoCompleteShow:false})
    }
    itemClickedHandler=(event,id,truth)=>{
        //let hed=this.state.member.landmark.value;
       // this.setState({hed:""},()=>{console.log(this.state.member.landmark.value)});
        const memberUpdated={...this.state.member};
        const updatedInputElement={...memberUpdated["landmark"]} ;
        updatedInputElement.value=""+document.getElementById(id).innerHTML;
        memberUpdated["landmark"]=updatedInputElement; 
        this.setState({member:memberUpdated},()=>{this.landmarkValueHandler()}
        )
        this.props.setMarkerQuery(""+updatedInputElement.value);
    }
    landmarkValueHandler=()=>{
        this.props.landmarkTransfer(this.state.member.landmark.value);
        //console.log(this.state.member.landmark.value);
    }
    progressHandler=()=>{
        var arr=Object.keys(this.state.member);
        var noOfTrue=0;
        var objLen=arr.length;
        for(let i=1;i<objLen;i++){
         if(this.state.member[arr[i]].valid){
             noOfTrue++;
         }
        }
        this.props.percentFind(noOfTrue);
        this.setState({qAnswered:noOfTrue});
        console.log(noOfTrue);    
    } 
    validityHandler=(value,rules)=>{
        let isValid=true;
        if(rules.required&&isValid){
            isValid=value.trim() !=='';
        }
        if(rules.length&&isValid){
            isValid=value.length===rules.length;
        }
        console.log(isValid);
        return isValid;
    }
    submitButtonHandler=(event)=>{
        console.log(this.state.qAnswered);
        event.preventDefault();
        if(this.state.qAnswered<=11){
            const member=this.state.member;
            const post={
                familyID:this.state.familyId,
                // memberId:member.memberId.value,
                gender:member.gender.value,
                age:member.age.value,
                educationalQualification:member.educationalQualification.value,
                monthlyIncome:member.monthlyIncome.value,
                maritialStatus:member.maritialStatus.value,
                differentlyAbled:member.differentlyAbled.value,
                homeState:member.homeState.value,
                nameOfDistrict:member.nameOfDistrict.value,
                landmark:member.landmark.value,
                pincode:member.pinCode.value,
                principalSourceofIncome:member.principalSourceofIncome.value

            }

            axios.post("http://127.0.0.1:8000/api/members/",post)
                .then((Response)=>{
                    
                    console.log(Response);
                    this.props.history.push({pathname:this.props.match.url+Response.data.memberID+'/trip-info'})
                })
                .catch(err => console.error(err));
        }
        else{
            alert("Please fill all the fields")
        }
    }
    render(){
        const arrNew=[];
        const arr=[...this.props.autoCompleteArr];  
        for(let i=0;i<arr.length;i++){
            arrNew.push({backArr:arr[i],clicked:false});
        }
        console.log(arrNew);
        
    let memberformArray=[];
    for (let key in this.state.member){
        memberformArray.push(
            {
               id:key,
               config:this.state.member[key]     
        })
    }
    return(
        <div className={classes.MemberData} >
        <form  >
        {memberformArray.map((memFormElement)=>{return(
            memFormElement.config.show?
            <Input 
                autoCompleteShow={this.state.autoCompleteShow}
                autoCompleteArr={arrNew}
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
                itemClicked={this.itemClickedHandler}
              //  outFocus={()=>this.onBlurHandler(memFormElement.id)}
            >    
            </Input>:null
        )})}
        <MemberSubmitButton clicked={this.submitButtonHandler} ></MemberSubmitButton>
        </form>
        </div>
    )}
}
export default withRouter(Member);