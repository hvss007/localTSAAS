import React,{Component} from 'react';
import Input from '../Input/Input';
import classes from './Family.css';
import axios from 'axios';
import MemberSubmitButton from '../Members/Member/MemberSubmitButton';
import {withRouter} from 'react-router-dom';
// import ProgressBar from '../ProgressBar/ProgressBar';
import BuildControls from './BuildControls/BuildControls';
// import Family1 from '../../assets/icons/family.png';
import MainMaps from '../../Containers/MainMaps/MainMaps'
import fs from '../../assets/jsonfile/stateAndDistricts.json'
import Aux from '../../Hoc/Aux';
import Global from '../../assets/globalvaribles/GlobalVariables';
import Backdrop from '../../Hoc/Backdrop/Backdrop1'
import Alert from '../Alert/Alert';
import Axios from 'axios';
var HostName=Global.hostName
var globalOptional=Global.optional
class Family extends Component{
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
        family:{
            familyIncome:{
                name:'familyIncome',
                label:'Monthly Income of Family',
                elementType:'select',
                elementConfig:{
                   options:[
                    {value:'',displayValue:"Choose Here", selected:true, disabled:true},
                        {value:'Nil',displayValue:'Nil'},
                        {value:'<5000',displayValue:'Below 5,000'},
                        {value:'5000-10000',displayValue:'5,000 - 10,000'},
                        {value:'10000-50000',displayValue:'10,000 - 50,000'},
                        {value:'50000-1lakh',displayValue:'50,000 - 1 lakh'},
                        {value:'1lakh-2lakh',displayValue:'1 lakh - 2 lakh'},
                        {value:'2lakh-5lakh',displayValue:'2 lakh - 5 lakh'},                        
                        {value:'>5lakh',displayValue:'Above 5 lakh'}
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
            country:{
                name:'country',
                label:'Country',
                elementType:'select',
                elementConfig:{
                   type:'text',
                   options:[
                   {value:'India',displayValue:"India", selected:true},
                   {value:'Others',displayValue:"Others"}  
                ] 
                },
                value:"India",
                show:true,
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                optional:globalOptional
            },
            
            homeState:{
                name:'homeState',
                label:'Home State',
                elementType:'select',
                elementConfig:{
                   type:'text',
                   options:[
                   {value:'',displayValue:"Select State", selected:true, disabled:true},
                   ...this.stateArray,
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
            nameOfDistrict:{
                name:'nameOfDistrict',
                label:'District',
                elementType:'select',
                elementConfig:{
                    type:'text',
                    options:[
                    {value:'',displayValue:"Select District", selected:true, disabled:true},
                    
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
            landmark:{
                name:'landmark',
                label:'Landmark/Address',
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
                touched:false,
                optional:false
            },
        },
        family1:{
            noOfCars:0,
            noOfCycles:0,
            noOfTwoWheelers:0,
            noOfMembers:1
        },
        qAnswered:0,
        autoCompleteShow:true,
       //copied from members
        landmarkString:"",
        autoCompleteArr:[],
        query:"",
        lat:null,
        lng:null,
        showMap:false,
        setMapSearchText:'',
        responseArray:[],
        centerLat:'',
        centerLng:'',
        markerLocationText:'',
        collegeID:'',
        show:false,
        time:null,
        surveyID:null
    }
}
 state={}
    mapShowHandler=(searchText)=>{
        this.setState({showMap:true,setMapSearchText:searchText})
    }
    landmarkHandler=(value)=>{
        this.setState({landmarkString:value},()=>{
        })
    }
    setMarkerQuery=(query)=>{
        this.setState({query:query})
    }
    dragLatHandler=(lat,lng)=>{
        this.setState({lat:lat,lng:lng})
    }
    autocompleteArrayHandler=(array)=>{
        this.setState({autoCompleteArr:[]})
        const displayArr=[...array];
        const displayUniqueArr=[];
        let count=0;
        let found=false; 
        let len=displayArr.length; 
        for(let i=0;i<len;i++){
            for(let j=0;j<displayUniqueArr;j++){
                if(displayArr[i]===displayUniqueArr[j])
                {
                    found=true
                }
            }
            count++;
            if(count===1&&found===false){
                displayUniqueArr.push(displayArr[i]);
            }
            count=0;
            found=false;
            
        }
        this.setState({autoCompleteArr:displayUniqueArr},()=>{
            // console.log(this.state.autoCompleteArr,"ugvytyryfrccyf")
        });
        
    }
     
  
    componentDidMount(){   
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
                    // new Date().toLocaleTimeString()
                    axios.defaults.xsrfCookieName = 'csrftoken'
                    axios.defaults.xsrfHeaderName = 'X-CSRFToken'
                    const url=this.props.match.url;
                    const fam=url.split('/')
                    const surveyID=fam[3]
                    this.setState({surveyID:surveyID})
                    Axios.patch(HostName+'responseTime/'+surveyID,{
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
      
      
    hideModalBackdrop=(value)=>{
        this.setState({show:value})
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
            if(inputIdentifier==="country" && updatedInputElement.value==="Others"){
                this.setState({show:true})
                
            }
            if(inputIdentifier==="homeState"&&updatedInputElement.valid){
                const newFamilyUpdated={...this.state.family};
                const newUpdatedInputElement={...newFamilyUpdated["nameOfDistrict"]} ;
                const newInputConfig={...newUpdatedInputElement.elementConfig}
                const newInputConfigOptions=[...newInputConfig.options];
                newInputConfigOptions.splice(1)
                let stateName=this.state.family.homeState.value;
                this.data[stateName].forEach(item=>{
                    const dataObj={value:item,displayValue:item}
                    newInputConfigOptions.push(dataObj);
                })
                newInputConfig.options=newInputConfigOptions;
                newUpdatedInputElement.elementConfig=newInputConfig;
                newFamilyUpdated["nameOfDistrict"]=newUpdatedInputElement;
                this.setState({family:newFamilyUpdated});
            }
            if(inputIdentifier==='nameOfDistrict'&&updatedInputElement.valid){
                    this.mapShowHandler(updatedInputElement.value+" "+this.state.family.homeState.value);
            }
            if(inputIdentifier==="landmark"&&updatedInputElement.valid){
                this.setState({autoCompleteShow:true})
                this.landmarkValueHandler();
                this.setMarkerQuery(null)
            }
        });
    }
    buttonClickHandler=(id)=>{
        if(id===1){
            const family=this.state.family;
                    const family1=this.state.family1;
                    const post1={
                        collegeID:this.state.collegeID,
                        noOfCars:family1.noOfCars,
                        noOfCycles:family1.noOfCycles,
                        noOfTwoWheelers:family1.noOfTwoWheelers,
                        noOfMembers:family1.noOfMembers,
                        country:family.country.value,
                        familyIncome:family.familyIncome.value,
                        homeState:family.homeState.value,
                        nameOfDistrict:family.nameOfDistrict.value,
                        landmark:this.state.markerLocationText,
                        lat:this.state.lat,
                        lng:this.state.lng,
                        time:this.state.time,
                        surveyID:this.state.surveyID
                    }
                    this.props.history.push({pathname:'/finishsurvey'})
                    axios.defaults.xsrfCookieName = 'csrftoken'
                    axios.defaults.xsrfHeaderName = 'X-CSRFToken'
                    axios.post(HostName+"family/",post1)
                    .then((Response)=>{
         
                    })
        }
        else if(id===2){
            const newFamilyUpdated = {...this.state.family};
                    const update_country={...newFamilyUpdated["country"]};
                    update_country.value="India";
                    newFamilyUpdated["country"]=update_country;
                    this.setState({family:newFamilyUpdated});  
        }
    }
    itemClickedHandler=(event,id,truth)=>{
        const familyUpdated={...this.state.family};
        const updatedInputElement={...familyUpdated["landmark"]} ;
        updatedInputElement.value=""+document.getElementById(id).innerHTML;
        familyUpdated["landmark"]=updatedInputElement; 
        this.setState({family:familyUpdated,autoCompleteShow:false},()=>{this.landmarkValueHandler()}
        )
        this.setMarkerQuery(""+updatedInputElement.value);
    }
    landmarkValueHandler=()=>{
        this.landmarkHandler(this.state.family.landmark.value);
    }
    dropdownArrayHandler=(array)=>{
        this.setState({responseArray:array})
    }
    validityHandler=(value,rules)=>{
        let isValid=true;
        if(rules.required&&isValid){
            isValid=value.trim()!=='';
        }
        if(rules.length&&isValid){
            isValid=value.length===rules.length;
        }
        return isValid;
    }
    addValueHandler=(type)=>{
        const oldCount=this.state.family1[type];
        const updatedCount=oldCount+1;
        const updatedFamily={
            ...this.state.family1
        }
        updatedFamily[type]=updatedCount;
        this.setState({family1:updatedFamily})
    }
    removeValueHandler=(type)=>{
        const oldCount=this.state.family1[type];
        let updatedCount=oldCount-1;
        if(updatedCount<=0){
            updatedCount=0
        }
        const updatedFamily={
            ...this.state.family1
        }
        updatedFamily[type]=updatedCount;
        this.setState({family1:updatedFamily})
    }
    progressHandler=()=>{
        var arr=Object.keys(this.state.family);
        var noOfTrue=0;
        var objLen=arr.length;
        for(let i=0;i<objLen;i++){
         if(this.state.family[arr[i]].valid&&!this.state.family[arr[i]].optional){
             noOfTrue++;
         }
        }
        this.setState({qAnswered:noOfTrue});
    } 
    mapCenterHandler=(lat,lng)=>{
        this.setState({centerLat:lat,centerLng:lng})
    }
    selectedOptionHandler=(value,lat,lng)=>{
        this.setState({markerLocationText:value,lat:lat,lng:lng})
    }
    submitButtonHandler=(event)=>{
        event.preventDefault();       
            const family=this.state.family;
            const family1=this.state.family1;
                const post={
                    collegeID:this.state.collegeID,
                    noOfCars:family1.noOfCars,
                    country:family.country.value,
                    noOfCycles:family1.noOfCycles,
                    noOfTwoWheelers:family1.noOfTwoWheelers,
                    noOfMembers:family1.noOfMembers,
                    familyIncome:family.familyIncome.value,
                    homeState:family.homeState.value,
                    nameOfDistrict:family.nameOfDistrict.value,
                    landmark:this.state.markerLocationText,
                    lat:this.state.lat,
                    lng:this.state.lng,
                    surveyID:this.state.surveyID
                }
                axios.defaults.xsrfCookieName = 'csrftoken'
                axios.defaults.xsrfHeaderName = 'X-CSRFToken'
                axios.post(HostName+"family/",post)
                    .then((Response)=>{
                        this.props.history.push({pathname:this.props.match.url+Response.data.familyID+'/member'})
                    })
                    .catch(
                        );
    }
    render(){
        const arrNew=[];
        const arr=[...this.state.autoCompleteArr];  
        for(let i=0;i<arr.length;i++){
            arrNew.push({backArr:arr[i],clicked:false});
        }
        let familyformArray=[];
        for (let key in this.state.family){
        familyformArray.push(
            {
               id:key,
               config:this.state.family[key]     
        })
    }
        return(
        <Aux>
            <div className={classes.MembersInner}
        >
        <div className={classes.MapFamilyWrapper}
        style={{boxShadow: 'rgba(0, 0, 0, 0.15) 0px 27px 51.33px 7.67px', borderRadius: '10px'}}>
        
        {this.state.showMap?
        <div style={{flex:'2'}} >
        <MainMaps mapCenter={this.mapCenterHandler} markerLocationText={this.state.markerLocationText} dropdownArrayHandler={this.dropdownArrayHandler} mapLocation={this.state.setMapSearchText} lat={this.state.lat} lng={this.state.lng} dragLatHandler={this.dragLatHandler} markerQuery={this.state.query} searchText={this.state.landmarkString}  autocompleteArrayHandler={this.autocompleteArrayHandler}></MainMaps>
        </div>:null}
        <div className={classes.FamilyWrapper}>
        <div className={classes.Family}>
            <div className={classes.Heading}><span>
                </span><p>Family Information</p></div>
            <BuildControls valueAdded={this.addValueHandler}
                valueRemoved={this.removeValueHandler}
                family={this.state.family1}></BuildControls>
            <form  className={classes.CustomForm} >
            {familyformArray.map((memFormElement)=>{return(
                memFormElement.config.show?
                <Input 
                    selectedOption={this.selectedOptionHandler}
                    centerLat={this.state.centerLat}
                    centerLng={this.state.centerLng}
                    responseArray={this.state.responseArray}
                    textAlign='center'
                    labelFontWeight='600'
                    autoCompleteShow={this.state.autoCompleteShow}
                    autoCompleteArr={arrNew}
                    style={{textAlignLast:'center'}}
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
                    id={memFormElement.id}
                >    
                </Input>:null
            )})}      
         <MemberSubmitButton clicked={this.submitButtonHandler} ></MemberSubmitButton> 
        </form>
        </div>
        </div>
        </div>
        </div>
        {/* </div> */}
        <Backdrop alert={true} hideModalBackdrop={this.hideModalBackdrop} show={this.state.show}>
            <Alert showButton={true} buttonClickHandler={this.buttonClickHandler} message="Sorry. Currently this survey is confined to residents of India. Click 'Yes' to finish the survey or 'No' to continue."></Alert>
        </Backdrop>
        </Aux>
    )}
}
export default withRouter(Family);