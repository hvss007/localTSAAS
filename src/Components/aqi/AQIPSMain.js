
import React,{Component} from 'react';
import Input from '../Input/Input';
import classes from "../Members/Member/Member.css"
import axios from 'axios';
import MemberSubmitButton from '../Members/Member/MemberSubmitButton';
import {withRouter} from 'react-router-dom';
import Global from '../../assets/globalvaribles/GlobalVariables'
// import Backdrop from '../../Hoc/Backdrop/Backdrop1'
// import Alert from '../Alert/Alert'
import Aux from '../../Hoc/Aux'
var HostName=Global.hostName
var globalOptional=Global.optional
class AQIPSMain extends Component{
    constructor(props){
        super(props);
        this.state={
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
        // this.setState({familyId:this.props.familyId})
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });      
        axios.get(HostName+"college/").then(
            Response=>{
                const collegeIdNo=this.props.match.url.split('/')[2]
                const collegeArr= Response.data.filter(item=>{
                    return (
                        collegeIdNo===item.collegeURL  )
                })
                if(collegeArr.length===1){
                    var date=this.parseDate();
                    this.setState({collegeID:collegeArr[0].collegeID})
                    axios.defaults.xsrfCookieName = 'csrftoken'
                    axios.defaults.xsrfHeaderName = 'X-CSRFToken'
                    const url=this.props.match.url;
                    const fam=url.split('/')
                    const surveyID=fam[3]
                    this.setState({surveyID:surveyID})
                    axios.patch(HostName+'responseTime/'+surveyID,{
                        surveyStartTime:date,
                    })
                }
            }
        )
    }

    parseDate=()=> {
        
        let date = new Date();

        // In case its IOS, parse the fulldate parts and re-create the date object.
        if(Number.isNaN(date.getMonth())) {
        let arr = date.split(/[- :]/);
        date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
        }
        return date;
    }

    inputChangeHandler=(event,inputIdentifier)=>{
        const memberUpdated={...this.state.member};
        const updatedInputElement={...memberUpdated[inputIdentifier]} ;
        updatedInputElement.value=event.target.value;
        updatedInputElement.valid=this.validityHandler(updatedInputElement.value,updatedInputElement.validation);
        updatedInputElement.touched=true;
        memberUpdated[inputIdentifier]=updatedInputElement; 
        this.setState( {member:memberUpdated}, ()=>{
            // this.progressHandler()
            
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
        return isValid;
    }
    submitButtonHandler=(event)=>{
        event.preventDefault();
            const member=this.state.member;
            const post={
                surveyID: this.state.surveyID,
                collegeID: this.state.collegeID,
                gender:member.gender.value,
                age:member.age.value,
                educationalQualification:member.educationalQualification.value,
                monthlyIncome:member.monthlyIncome.value,
                maritialStatus:member.maritialStatus.value,
            }           
            
            axios.defaults.xsrfCookieName = 'csrftoken'
            axios.defaults.xsrfHeaderName = 'X-CSRFToken'
            axios.post(HostName+"aqips/",post)
                .then(
                    this.props.history.push({pathname:"/finishsurvey"})
                )
                .catch(err => 
                    console.error(err)
                    );
                
            var time = this.parseDate();
            const url = this.props.match.url;
            const survId = url.split("/")[3];

            axios.patch(HostName + "responseTime/" + survId, {
                surveyEndTime: time
            });
            
    }
    render(){
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
        </Aux>
    )}
}
export default withRouter(AQIPSMain);