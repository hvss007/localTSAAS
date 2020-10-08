
import React,{Component} from 'react';
import Input from '../../Input/Input';
import classes from './Member.css';
import axios from 'axios';
import MemberSubmitButton from './MemberSubmitButton';
import {withRouter} from 'react-router-dom';
import fs from '../../../assets/jsonfile/stateAndDistricts.json'
import Global from '../../../assets/globalvaribles/GlobalVariables'
import Backdrop from '../../../Hoc/Backdrop/Backdrop1'
import Alert from '../../Alert/Alert'
import Aux from '../../../Hoc/AuxFile'
var HostName=Global.hostName
var globalOptional=Global.optional
class Member extends Component{
    constructor(props){
        super(props);
        this.data=fs;
        const states=Object.keys(this.data);
        states.sort();
        this.stateArray=[];
        states.forEach(item=>{
            let dataObj={value:item,displayValue:item};
            this.stateArray.push(dataObj);
        })
        this.state={
            familyId:null,
        member:{
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
                optional:globalOptional
            },
            age:{
                name:'age',
                label:'Age',
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                        {value:'<4',displayValue:'Below 4'},
                        {value:'4-18',displayValue:'4  - 18'},
                        {value:'18-25',displayValue:'18 - 25'},
                        {value:'25-40',displayValue:'25 - 40'},
                        {value:'40-60',displayValue:'40 - 60'},
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
                optional:globalOptional
            },
            educationalQualification:{
                name:'educationalQualification',
                label:'Educational Qualification',
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                        {value:'notApplicable',displayValue:'Not applicable'},
                        {value:'primary',displayValue:'Primary'},
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
                optional:globalOptional
            },
            maritialStatus:{
                name:'maritialStatus',
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
                optional:globalOptional
            },
            monthlyIncome:{
                name:'monthlyIncome',
                label:'Monthly Income',
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                        {value:'nil',displayValue:'Nil'},
                        {value:'<5000',displayValue:'Below 5,000'},
                        {value:'5000-10000',displayValue:'5,000 - 10,000'},
                        {value:'10000-50000',displayValue:'10,000 - 50,000'},
                        {value:'50000-1lakh',displayValue:'50,000 - 1 lakh'},
                        {value:'1lakh-2lakh',displayValue:'1 lakh - 2 lakh'},
                        {value:'2lakh-5lakh',displayValue:'2 lakh - 5 lakh'},                        
                        {value:'>5lakh',displayValue:'Above 5 lakh'}
                    ]
                },
                value:'',
                validation:{
                    required:true
                },
                show:true,
                valid:false,
                touched:false,
                optional:globalOptional
            },
            principalSourceofIncome:{
                name:'principalSourceofIncome',
                label:'Principal Source of Income',
                elementType:'select',
                elementConfig:{
                   options:[
                        {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                        {value:'notApplicable',displayValue:'Not Applicable'},
                        {value:'governmentServices',displayValue:'Government Services'},
                        {value:'privateServices',displayValue:'Private Service'},
                        {value:'agriculture',displayValue:'Agriculture'},
                        {value:'organisedBusiness/Trade',displayValue:'Organised business / trade / shop'},
                        {value:'pensionRent',displayValue:'Pension / Rent'},
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
                optional:globalOptional
            },
             simCards:{
                name:'simCards',
                label:'How many sim cards do the member use?',
                elementType:'input',
                elementConfig:{
                    type:'number',
                    placeholder:'Enter the number of sim cards here.' 
                 },
                value:'Enter the number of sim cards here.',
                validation:{
                    required:true,
                    notLess:true
            },
                show:true,
                valid:false,
                touched:false,
                optional:globalOptional
            }, 
            
             dataWhileDriving:{
                name:'dataWhileDrivning',
                label:'Does the member call or use mobile internet while driving/traveling?',
                elementType:'input',
                elementConfig:{
                    type:'radio',
                    options:[
                        {value:'yes',displayValue:'Yes'},
                        {value:'no',displayValue:'No'},
                        {value:'dontknow',displayValue:'Don\'t know'},
                    ]
                },
                value:'',
                validation:{
                    required:true
                },
                show:true,
                valid:false,
                touched:false,
                optional:globalOptional
            },
            bluetooth:{
                name:'bluetooth',
                label:'Is bluetooth activated mostly on member\'s phone?',
                elementType:'input',
                elementConfig:{
                    type:'radio',
                    options:[
                        {value:'yes',displayValue:'Yes'},
                        {value:'no',displayValue:'No'},
                        {value:'dontknow',displayValue:'Don\'t know'},
                    ]
                },
                value:'',
                validation:{
                    required:true
                },
                show:true,
                valid:false,
                touched:false,
                optional:globalOptional
            },
            wifi:{
                name:'wifi',
                label:'Is WiFi activated mostly on member\'s phone?',
                elementType:'input',
                elementConfig:{
                    type:'radio',
                    options:[
                        {value:'yes',displayValue:'Yes'},
                        {value:'no',displayValue:'No'},
                        {value:'dontknow',displayValue:'Don\'t know'},
                    ]
                },
                value:'',
                validation:{
                    required:true
                },
                show:true,
                valid:false,
                touched:false,
                optional:globalOptional
            },
            twoWheelerLicense:{
                name:'twoWheelerLicense',
                label:'Does the member have a motorcycle license?',
                elementType:'input',
                elementConfig:{
                    type:'radio',
                    options:[
                       {value:'yes',displayValue:'Yes'},
                       {value:'no',displayValue:'No'},    
                    ]
                },
                value:'',
                validation:{
                    required:true
                },
                show:true,
                valid:false,
                touched:false,
                optional:globalOptional
            },
            fourWheelerLicense:{
                name:'fourWheelerLicense',
                label:'Does the member have a car license?',
                elementType:'input',
                elementConfig:{
                    type:'radio',
                    options:[
                       {value:'yes',displayValue:'Yes'},
                       {value:'no',displayValue:'No'},    
                    ]
                },
                value:'',
                validation:{
                    required:true
                },
                show:true,
                valid:false,
                touched:false,
                optional:globalOptional
            },           
            differentlyAbled:{
                name:'differentlyAbled',
                label:'Is the member differently abled?',
                elementType:'input',
                elementConfig:{
                    type:'radio',
                    options:[
                        {value:'yes',displayValue:'Yes'},
                        {value:'no',displayValue:'No'},
                    ]
                },
                value:'',
                validation:{
                    required:true
                },
                show:true,
                valid:false,
                touched:false,
                optional:globalOptional
            },
            householdHead:{
                name:'householdHead',
                label:'Is the member head of your family?',
                elementType:'input',
                elementConfig:{
                    type:'radio',
                    options:[
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
                optional:globalOptional
            },
            respondent:{
                name:'respondent',
                label:'Is this your information?',
                elementType:'input',
                elementConfig:{
                    type:'radio',
                    options:[
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
                optional:globalOptional
            },
            stayAtHome:{
                name:'stayAtHome',
                label:'Does the member stay at home for the whole day?',
                elementType:'input',
                elementConfig:{
                    type:'radio',
                    options:[
                        {value:'yes',displayValue:'Yes'},
                        {value:'no',displayValue:'No'},
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
        show:false,
        message:'',
        autoCompleteShow:true,
        showButton:true
        }
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
        this.setState( {member:memberUpdated}, ()=>{
            this.progressHandler()
            
            if(inputIdentifier==="age" && updatedInputElement.valid){

                if (updatedInputElement.value === "<4") {
                    const newMemberUpdated = {...this.state.member};
                    //update education
                    const update_educationalQualification={...newMemberUpdated["educationalQualification"]};
                    update_educationalQualification.value="notApplicable";
                    newMemberUpdated["educationalQualification"]=update_educationalQualification;

                    //maritial status
                    const update_maritalStatus={...newMemberUpdated["maritialStatus"]} ;
                    update_maritalStatus.value="single";
                    newMemberUpdated["maritialStatus"]=update_maritalStatus;
                    
                    //monthlyIncome
                    const update_monthlyIncome={...newMemberUpdated["monthlyIncome"]} ;
                    update_monthlyIncome.value="nil";
                    newMemberUpdated["monthlyIncome"]=update_monthlyIncome;

                    //update principalSourceofIncome
                    const update_principalSourceofIncome={...newMemberUpdated["principalSourceofIncome"]};
                    update_principalSourceofIncome.value="notApplicable";
                    newMemberUpdated["principalSourceofIncome"]=update_principalSourceofIncome;

                    //household head
                    const update_householdHead={...newMemberUpdated["householdHead"]} ;
                    update_householdHead.value="no";
                    newMemberUpdated["householdHead"]=update_householdHead;

                    // respondent
                    const update_respondent={...newMemberUpdated["respondent"]} ;
                    update_respondent.value="no";
                    newMemberUpdated["respondent"]=update_respondent;

                    // motorcycle license
                    const update_twoWheelerLicense={...newMemberUpdated["twoWheelerLicense"]} ;
                    update_twoWheelerLicense.value="no";
                    newMemberUpdated["twoWheelerLicense"]=update_twoWheelerLicense;

                    // car license
                    const update_fourWheelerLicense={...newMemberUpdated["fourWheelerLicense"]} ;
                    update_fourWheelerLicense.value="no";
                    newMemberUpdated["fourWheelerLicense"]=update_fourWheelerLicense;

                    //simCards
                    const update_simCards={...newMemberUpdated["simCards"]} ;
                    update_simCards.value=0;
                    newMemberUpdated["simCards"]=update_simCards;

                    //data
                    const update_dataWhileDriving={...newMemberUpdated["dataWhileDriving"]};
                    update_dataWhileDriving.value="no";
                    newMemberUpdated["dataWhileDriving"]=update_dataWhileDriving;

                    //bluetooth
                    const update_bluetooth={...newMemberUpdated["bluetooth"]};
                    update_bluetooth.value="no";
                    newMemberUpdated["bluetooth"]=update_bluetooth;

                    //wifi
                    const update_wifi={...newMemberUpdated["wifi"]};
                    update_wifi.value="no";
                    newMemberUpdated["wifi"]=update_wifi;

                    this.setState({member:newMemberUpdated});
                }
            }

            if(inputIdentifier==="monthlyIncome" && updatedInputElement.valid){

                if (updatedInputElement.value === "nil") {
                    const newMemberUpdated = {...this.state.member};
                    //update principalSourceofIncome
                    const update_principalSourceofIncome={...newMemberUpdated["principalSourceofIncome"]};
                    update_principalSourceofIncome.value="notApplicable";
                    newMemberUpdated["principalSourceofIncome"]=update_principalSourceofIncome;
                    
                    this.setState({member:newMemberUpdated});
                }
            }

            if(inputIdentifier==="simCards" && updatedInputElement.valid){
                if (updatedInputElement.value === '0') {
                    const newMemberUpdated = {...this.state.member};
                    //update principalSourceofIncome
                    const update_dataWhileDriving={...newMemberUpdated["dataWhileDriving"]};
                    update_dataWhileDriving.value="no";
                    newMemberUpdated["dataWhileDriving"]=update_dataWhileDriving;

                    //bluetooth
                    const update_bluetooth={...newMemberUpdated["bluetooth"]};
                    update_bluetooth.value="no";
                    newMemberUpdated["bluetooth"]=update_bluetooth;

                    //wifi
                    const update_wifi={...newMemberUpdated["wifi"]};
                    update_wifi.value="no";
                    newMemberUpdated["wifi"]=update_wifi;
                    
                    this.setState({member:newMemberUpdated});
                }
            }

        });
    }
    onFocusHandler=()=>{
        this.setState({autoCompleteShow:true})
    }
    onBlurHandler=()=>{
        this.setState({autoCompleteShow:false})
    }
    buttonClickHandler=(id)=>{
        if(id===1){
            // const familyId=this.props.familyId
            var time=new Date().toLocaleTimeString()                                
            const url=this.props.match.url;
            const fam=url.split('/')
            const surveyId=fam[3]  
               // this.setState({surveyID:hhsId})
                      
            axios.patch(HostName+'responseTime/'+surveyId,{
                                // surveyStartTimeID:hhsId,
                                surveyEndTime:time,
                            //    surveyID:hhsId           
                            })
            this.props.history.push({pathname:'/finishsurvey'})    
        }
        else if(id===2){
            const memberCopy={...this.state.member};
            const arr=Object.keys(memberCopy);
            arr.forEach(item=>{
              let updatedElementCopy={...memberCopy[item]};
                  if(item==='simCards'){
                      updatedElementCopy.value='Enter the number of sim cards here.';
                  }
                  else{
                      updatedElementCopy.value='';
                  }
                  
                  memberCopy[item]=updatedElementCopy;
            })  
            this.setState({member:memberCopy})
        }
    }
    hideModalBackdrop=(value)=>{
        this.setState({show:value})
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
        //consoleog(noOfTrue);    
    } 
    validityHandler=(value,rules)=>{
        let isValid=true;
        if(rules.required&&isValid){
            isValid=value.trim() !=='';
        }

        if(rules.notLess&&isValid){
            isValid=(parseInt(value,10)>=0);
        }
        if(rules.length&&isValid){
            isValid=value.length===rules.length;
        }

        //consoleog(isValid);
        return isValid;
    }
    submitButtonHandler=(event)=>{
        event.preventDefault();
            const member=this.state.member;
            const post={
                familyID:this.state.familyId,
                householdHead:member.householdHead.value,
                respondent:member.respondent.value,
                twoWheelerLicense:member.twoWheelerLicense.value,
                simCards:member.simCards.value,
                fourWheelerLicense:member.fourWheelerLicense.value,
                dataWhileDriving:member.dataWhileDriving.value,
                bluetooth:member.bluetooth.value,
                wifi:member.wifi.value,
                gender:member.gender.value,
                age:member.age.value,
                educationalQualification:member.educationalQualification.value,
                monthlyIncome:member.monthlyIncome.value,
                maritialStatus:member.maritialStatus.value,
                differentlyAbled:member.differentlyAbled.value,
                principalSourceofIncome:member.principalSourceofIncome.value,
                stayAtHome:member.stayAtHome.value
            }           
            if(member.stayAtHome.value==="") {
                // alert("Please state whether the member is staying at home for the whole day.")
                this.setState({show:true,showButton:false,message:"Please state whether the member is staying at home for the whole day."})
            }
            else if(member.stayAtHome.value==="yes"){
                axios.defaults.xsrfCookieName = 'csrftoken'
                axios.defaults.xsrfHeaderName = 'X-CSRFToken'
                axios.post(HostName+"members/",post)
                    .then((Response)=>{
                        const familyID=this.props.match.params.id
                         axios.defaults.xsrfCookieName = 'csrftoken'
                        axios.defaults.xsrfHeaderName = 'X-CSRFToken'
                        axios.get(HostName+"family/"+familyID+"/")
                    .then((response)=>{
                        if(response.data[0].currentCount===response.data[0].noOfMembers){
                            var time=new Date().toLocaleTimeString()                                
                            const url=this.props.match.url;
                            const fam=url.split('/')
                            const surveyId=fam[3]                                        
                            axios.patch(HostName+'responseTime/'+surveyId,{
                                                surveyEndTime:time,
                                            })
                            this.props.history.push({pathname:'/finishsurvey'})
                        }
                        else{
                            const memberCopy={...this.state.member};
                        const arr=Object.keys(memberCopy);
                        arr.forEach(item=>{
                        let updatedElementCopy={...memberCopy[item]};
                        if(item==='simCards'){
                            updatedElementCopy.value='Enter the number of sim cards here.';
                        }
                        else{
                            updatedElementCopy.value='';
                        }
                         memberCopy[item]=updatedElementCopy;
             })  
            this.setState({member:memberCopy})
            this.props.memberIndexUpdate(response.data[0].currentCount+1)  
            window.scrollTo(0, 0)  
                        }                
                    })
                    .catch(err =>{} 
                        );
                    })
                    .catch(err => console.error(err));
            }
            else{
                axios.defaults.xsrfCookieName = 'csrftoken'
                axios.defaults.xsrfHeaderName = 'X-CSRFToken'
                axios.post(HostName+"members/",post)
                    .then((Response)=>{
                        this.props.history.push({pathname:this.props.match.url+Response.data.memberID+'/trip-info'})
                    })
                    .catch(err => 
                        console.error(err)
                        );
            }
    }
    render(){
        const arrNew=[];
        const arr=[...this.props.autoCompleteArr];  
        for(let i=0;i<arr.length;i++){
            arrNew.push({backArr:arr[i],clicked:false});
        }
    let memberformArray=[];
    for (let key in this.state.member){
        memberformArray.push(
            {
               id:key,
               config:this.state.member[key]     
        })
    }
    return(
        <Aux>
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
                >    
                </Input>:null
            )})}
            <MemberSubmitButton clicked={this.submitButtonHandler} ></MemberSubmitButton>
            </form>
            </div>
            <Backdrop hideModalBackdrop={this.hideModalBackdrop} alert={true} show={this.state.show}>
                <Alert showButton={this.state.showButton} buttonClickHandler={this.buttonClickHandler} message={this.state.message}>
                </Alert>
            </Backdrop>
        </Aux>
    )}
}
export default withRouter(Member);