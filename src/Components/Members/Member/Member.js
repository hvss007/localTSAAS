import React,{Component} from 'react';
import Input from '../../Input/Input';
import classes from './Member.css';
import axios from 'axios';
import MemberSubmitButton from './MemberSubmitButton';
import {withRouter} from 'react-router-dom';
import fs from '../../../assets/jsonfile/stateAndDistricts.json'
import HostName from '../../../assets/globalvaribles/GlobalVariables'
class Member extends Component{
    constructor(props){
        super(props);
        this.data=fs;
        const states=Object.keys(this.data);
        console.log(states);
        this.stateDataArray=[];
    //    let memberformArray=[];
        for (let key in this.data){
            this.stateDataArray.push(
                {
                id:key,
                config:this.data[key]     
            })
        }
        
        
        console.log(this.stateDataArray)
        this.stateArray=[];
        this.stateDataArray.forEach(item=>{
            let dataObj={value:item.id,displayValue:item.id};
            this.stateArray.push(dataObj);
        })
        
        
        // states.forEach(item=>{
        //     let dataObj={value:item,displayValue:item};
        //     this.stateDataArray.push(dataObj);
        // })
        // console.log(...this.stateDataArray)
        this.state={
            familyId:null,
        member:{
            // memberId:{
            //     title:'member_id',
            //     label:'Member ID',
            //     elementType:'input',
            //     elementConfig:{
            //        type:'text',
            //        placeholder:1 
            //     },
            //     value:1,
            //     show:true,
            //     validation:{
            //         required:true
            //     },
            //     valid:true,
            //     touched:false
            // },
            householdHead:{
                name:'householdHead',
                label:'Are you the head of your family?',
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                       {value:'yes',displayValue:'Yes'},
                       {value:'no',displayValue:'No'},    
                    ]
                },
                value:'',
                show:true,
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                optional:false


            },
            respondent:{
                name:'respondent',
                label:'Are you respondent?',
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                       {value:'yes',displayValue:'Yes'},
                       {value:'no',displayValue:'No'},    
                    ]
                },
                value:'',
                show:true,
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                optional:false
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
                touched:false,
                optional:false
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
                touched:false,
                optional:false
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
                touched:false,
                optional:false
            },
            monthlyIncome:{
                name:'monthlyIncome',
                label:'Monthly Income',
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                        {value:'Nil',displayValue:'Nil'},
                        {value:'<5000',displayValue:'<5000'},
                        {value:'5000-10000',displayValue:'5000-10000'},
                        {value:'10000-50000',displayValue:'10000-50000'},
                        {value:'50000-1lakh',displayValue:'50000-1lakh'},
                        {value:'1lakh-2lakh',displayValue:'1lakh-2lakh'},
                        {value:'2lakh-5lakh',displayValue:'2lakh-5lakh'},                        
                        {value:'>5lakh',displayValue:'>5lakh'}
                    ]
                },
                value:'',
                validation:{
                    required:true
                },
                show:true,
                valid:false,
                touched:false,
                optional:true
            },
            twoWheelerLicense:{
                name:'twoWheelerLicense',
                label:'Do you have motorcycle license ?',
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                        {value:'Yes',displayValue:'Yes'},
                        {value:'No',displayValue:'No'},
                        
                    ]
                },
                value:'',
                validation:{
                    required:true
                },
                show:true,
                valid:false,
                touched:false,
                optional:false
            },
            fourWheelerLicense:{
                name:'fourWheelerLicense',
                label:'Do you have car license ?',
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                        {value:'Yes',displayValue:'Yes'},
                        {value:'No',displayValue:'No'},
                        
                    ]
                },
                value:'',
                validation:{
                    required:true
                },
                show:true,
                valid:false,
                touched:false,
                optional:false
            },
            simCards:{
                name:'simCards',
                label:'How many sim cards do you use ?',
                elementType:'input',
                elementConfig:{
                    type:'number',
                    placeholder:'' 
                 },
                value:0,
                validation:{
                    required:true,
                    notLess:true
                },
                show:true,
                valid:false,
                touched:false,
                optional:false
            },
            dataWhileDriving:{
                name:'dataWhileDrivning',
                label:'Do you call or use data while driving?',
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                        {value:'Yes',displayValue:'Yes'},
                        {value:'No',displayValue:'No'},
                    ]
                },
                value:'',
                validation:{
                    required:true
                },
                show:true,
                valid:false,
                touched:false,
                optional:false
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
                touched:false,
                optional:true
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
                touched:false,
                optional:true
            },
            // homeState:{
            //     name:'homeState',
            //     label:'Home State',
            //     elementType:'select',
            //     elementConfig:{
            //        type:'text',
            //        options:[
            //        {value:'',displayValue:"Select State", selected:true, disabled:true},
            //        ...this.stateArray,
            //     ] 
            //     },
            //     value:'',
            //     show:true,
            //     validation:{
            //         required:true
            //     },
            //     valid:false,
            //     touched:false
            // },
            // nameOfDistrict:{
            //     name:'nameOfDistrict',
            //     label:'Name of district',
            //     elementType:'select',
            //     elementConfig:{
            //         type:'text',
            //         options:[
            //         {value:'',displayValue:"Select District", selected:true, disabled:true},
                    
            //      ] 
            //      },
            //     value:'',
            //     show:true,
            //     validation:{
            //         required:true
            //     },
            //     valid:false,
            //     touched:false
            // },
            // landmark:{
            //     name:'landmark',
            //     label:'Landmark',
            //     elementType:'input',
            //     elementConfig:{
            //        type:'text',
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
            // pinCode:{
            //     name:'pinCode',
            //     label:'PIN Code',
            //     elementType:'input',
            //     elementConfig:{
            //        type:'number',
            //        placeholder:'' 
            //     },
            //     value:'',
            //     show:true,
            //     validation:{
            //         required:true,
            //         length:6,
            //     },
            //     valid:false,
            //     touched:false
            // },
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
                touched:false,
                optional:true
            },
            stayAtHome:{
                name:'stayAtHome',
                label:'Do you stay at home for the whole day?',
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                        {value:'no',displayValue:'No'},
                        {value:'yes',displayValue:'Yes'},
                    ]
                },
                validation:{
                    required:true
                },
                value:'',
                show:true,
                valid:false,
                touched:false,
                optional:false
            }
        },
        qAnswered:0,
        autoCompleteShow:true
        }
        // {value:'Andaman and Nicobar Islands',displayValue:'Andaman and Nicobar Islands'},
    }
    state={
        
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
            if(inputIdentifier==="homeState"&&updatedInputElement.valid){
                const newMemberUpdated={...this.state.member};
                const newUpdatedInputElement={...newMemberUpdated["nameOfDistrict"]} ;
                const newInputConfig={...newUpdatedInputElement.elementConfig}
                const newInputConfigOptions=[...newInputConfig.options];
                newInputConfigOptions.splice(1)
                let stateName=this.state.member.homeState.value;
                this.data[stateName].forEach(item=>{
                    const dataObj={value:item,displayValue:item}
                    newInputConfigOptions.push(dataObj);
                })

                //districtList.forEach(item=>{newInputConfigOptions.push(item)})
                console.log(newInputConfigOptions)
                newInputConfig.options=newInputConfigOptions;
                newUpdatedInputElement.elementConfig=newInputConfig;
                newMemberUpdated["nameOfDistrict"]=newUpdatedInputElement;
                this.setState({member:newMemberUpdated});
            }
            if(inputIdentifier==='nameOfDistrict'&&updatedInputElement.valid){
                    this.props.mapShow(updatedInputElement.value+" "+this.state.member.homeState.value);
                    console.log(updatedInputElement.value,this.state.member.homeState.value)
            }
            if(inputIdentifier==="landmark"&&updatedInputElement.valid){
                this.setState({autoCompleteShow:true})
                this.landmarkValueHandler();
                this.props.setMarkerQuery(null)
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
        this.setState({member:memberUpdated,autoCompleteShow:false},()=>{this.landmarkValueHandler()}
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
        for(let i=0;i<objLen;i++){
         if(this.state.member[arr[i]].valid&&!this.state.member[arr[i]].optional){
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

        if(rules.notLess&&isValid){
            console.log(value);
            isValid=(eval(value)>=0);
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
        
        if(this.state.qAnswered>=10){
            const member=this.state.member;
            if(member.stayAtHome.value==="yes"){
                const post={
                    familyID:this.state.familyId,
                    // memberId:member.memberId.value,
                    householdHead:member.householdHead.value,
                    respondent:member.respondent.value,
                    twoWheelerLicense:member.twoWheelerLicense.value,
                    simCards:member.simCards.value,
                    fourWheelerLicense:member.fourWheelerLicense,
                    dataWhileDriving:member.dataWhileDriving.value,
                    gender:member.gender.value,
                    age:member.age.value,
                    educationalQualification:member.educationalQualification.value,
                    monthlyIncome:member.monthlyIncome.value,
                    maritialStatus:member.maritialStatus.value,
                    differentlyAbled:member.differentlyAbled.value,
                    // homeState:member.homeState.value,
                    // nameOfDistrict:member.nameOfDistrict.value,
                    // landmark:member.landmark.value,
                    // pincode:member.pinCode.value,
                    principalSourceofIncome:member.principalSourceofIncome.value,
                    // lat:this.props.lat,
                    // lng:this.props.lng,
                    tripsMade:member.stayAtHome.value
                }
                axios.post(HostName+"members/",post)
                    .then((Response)=>{
                        // console.log(Response);
                      window.location.reload();  
                        // const current = this.props;
                        // console.log(current);
                        //  this.props.history.push({pathname:this.props.match.url});
                    })
                    .catch(err => console.error(err));
            }
            else{
                const post={
                    familyID:this.state.familyId,
                    // memberId:member.memberId.value,
                    gender:member.gender.value,
                    age:member.age.value,
                    educationalQualification:member.educationalQualification.value,
                    monthlyIncome:member.monthlyIncome.value,
                    maritialStatus:member.maritialStatus.value,
                    differentlyAbled:member.differentlyAbled.value,
                    // homeState:member.homeState.value,
                    // nameOfDistrict:member.nameOfDistrict.value,
                    // landmark:member.landmark.value,
                    // pincode:member.pinCode.value,
                    principalSourceofIncome:member.principalSourceofIncome.value,
                    // lat:this.props.lat,
                    // lng:this.props.lng,
                    tripsMade:member.stayAtHome.value
                }
    
                axios.post(HostName+"members/",post)
                    .then((Response)=>{
                        
                        console.log(Response);
                        this.props.history.push({pathname:this.props.match.url+Response.data.memberID+'/trip-info'})
                    })
                    .catch(err => console.error(err));
            }
         
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
        <form className={classes.CustomForm} >
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