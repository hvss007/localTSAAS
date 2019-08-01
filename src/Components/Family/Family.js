import React,{Component} from 'react';
import Input from '../Input/Input';
import classes from './Family.css';
import axios from 'axios';
import MemberSubmitButton from '../Members/Member/MemberSubmitButton';
import {withRouter} from 'react-router-dom';
// import ProgressBar from '../ProgressBar/ProgressBar';
import BuildControls from './BuildControls/BuildControls';
import Family1 from '../../assets/icons/family.png';
import MainMaps from '../../Containers/MainMaps/MainMaps'
import fs from '../../assets/jsonfile/stateAndDistricts.json'
import Aux from '../../Hoc/Aux';
import HostName from '../../assets/globalvaribles/GlobalVariables';
class Family extends Component{
    constructor(props){
        super(props);
        this.data=fs;
        const states=Object.keys(this.data);
        states.sort();
        // console.log(states);
        // this.stateDataArray=[];

    //    let memberformArray=[];
        // for (let key in this.data){
        //     this.stateDataArray.push(
        //         {
        //         id:key,
        //         config:this.data[key]     
        //     })
        // }
        
        
        // console.log(this.stateDataArray)
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
                optional:true
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
                value:'',
                show:true,
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                optional:true
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
            noOfTwoWheelers:0
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
        collegeID:''
        //copied from members
    }
}
state={}
    //these functions imported from members
    mapShowHandler=(searchText)=>{
        this.setState({showMap:true,setMapSearchText:searchText})
    }
    landmarkHandler=(value)=>{
        this.setState({landmarkString:value},()=>{
            // console.log(this.state.landmarkString)
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
        // console.log(this.props.match.url)
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });      
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = 'X-CSRFToken'
        axios.get(HostName+"college/").then(
            Response=>{

                const collegeArr= Response.data.filter(item=>{
                    return ((item.collegeURL===this.props.match.params.id));
                }
                
                
                )
                if(collegeArr.length===1){
                    this.setState({collegeID:collegeArr[0].collegeID})
                }
                else{
     
                }
            }
        )
    }
    //these functions imported from members
    //these functions imported from member
    //these functions imported from member
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

                if(window.confirm("Sorry. Currently this survey is confined to residents of India. Press Ok to finish the survey")){
                    const family=this.state.family;
                    const family1=this.state.family1;
                    const post1={
                        collegeID:this.state.collegeID,
                        noOfCars:family1.noOfCars,
                        noOfCycles:family1.noOfCycles,
                        noOfTwoWheelers:family1.noOfTwoWheelers,
                        country:family.country.value,
                        familyIncome:family.familyIncome.value,
                        homeState:family.homeState.value,
                        nameOfDistrict:family.nameOfDistrict.value,
                        landmark:family.landmark.value,
                        lat:this.state.lat,
                        lng:this.state.lng
                    }
                    this.props.history.push({pathname:'/finishsurvey'})
                    axios.defaults.xsrfCookieName = 'csrftoken'
                    axios.defaults.xsrfHeaderName = 'X-CSRFToken'
                    axios.post(HostName+"family/",post1)
                    .then((Response)=>{
                        ////console.log(Response);
                    })
                    .catch(err => 
                        console.error(err)
                        );
                }
                else{
                    const newFamilyUpdated = {...this.state.family};
                    const update_country={...newFamilyUpdated["country"]};
                    update_country.value="India";
                    newFamilyUpdated["country"]=update_country;
                    this.setState({family:newFamilyUpdated});                    
                }
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
                //districtList.forEach(item=>{newInputConfigOptions.push(item)})
                //console.log(newInputConfigOptions)
                newInputConfig.options=newInputConfigOptions;
                newUpdatedInputElement.elementConfig=newInputConfig;
                newFamilyUpdated["nameOfDistrict"]=newUpdatedInputElement;
                this.setState({family:newFamilyUpdated});
            }
            if(inputIdentifier==='nameOfDistrict'&&updatedInputElement.valid){
                    this.mapShowHandler(updatedInputElement.value+" "+this.state.family.homeState.value);
                    //console.log(updatedInputElement.value,this.state.family.homeState.value)
            }
            if(inputIdentifier==="landmark"&&updatedInputElement.valid){
                this.setState({autoCompleteShow:true})
                this.landmarkValueHandler();
                this.setMarkerQuery(null)
            }
        });
    }
    itemClickedHandler=(event,id,truth)=>{
        //let hed=this.state.member.landmark.value;
       // this.setState({hed:""},()=>{console.log(this.state.member.landmark.value)});
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
        //console.log(this.state.member.landmark.value);
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
        //console.log(isValid);
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
        //console.log(noOfTrue);    
    } 
    mapCenterHandler=(lat,lng)=>{
        this.setState({centerLat:lat,centerLng:lng})
    }
    selectedOptionHandler=(value,lat,lng)=>{
        this.setState({markerLocationText:value,lat:lat,lng:lng})
    }
    submitButtonHandler=(event)=>{
        //console.log(this.state.qAnswered);
        event.preventDefault();
        // if(this.state.qAnswered===3||true){
            const family=this.state.family;
            const family1=this.state.family1;
                const post={
                    collegeID:this.state.collegeID,
                    noOfCars:family1.noOfCars,
                    country:family.country.value,
                    noOfCycles:family1.noOfCycles,
                    noOfTwoWheelers:family1.noOfTwoWheelers,
                    familyIncome:family.familyIncome.value,
                    homeState:family.homeState.value,
                    nameOfDistrict:family.nameOfDistrict.value,
                    landmark:family.landmark.value,
                    lat:this.state.lat,
                    lng:this.state.lng
                }
                axios.defaults.xsrfCookieName = 'csrftoken'
                axios.defaults.xsrfHeaderName = 'X-CSRFToken'
                axios.post(HostName+"family/",post)
                    .then((Response)=>{
                        //console.log(Response);
                        this.props.history.push({pathname:this.props.match.url+Response.data.familyID+'/member'})
                    })
                    .catch(
                        // err => 
                        // console.error(err)
                        );
            // }
        // else{
        //     alert("Please fill all the fields")
        // }
    }
    render(){
        const arrNew=[];
        const arr=[...this.state.autoCompleteArr];  
        for(let i=0;i<arr.length;i++){
            arrNew.push({backArr:arr[i],clicked:false});
        }
        // console.log(arrNew);
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
            {/* <div style={{width:'100%',boxSizing:'border-box',padding:'25px',fontSize:'32px',textAlign:'center',paddingBottom:'5px'}}><p style={{color:'rgb(41, 129, 185)'}}>Trip Information</p></div>     */}
            <div className={classes.MembersInner}
        // className="container-fluid my-5 mx-auto px-5" 
        >
        {/* <div style={{display:'flex' ,width:'100%',height:'100vh',flexDirection:'column',alignItems:'center'}}>     */}
        <div className={classes.MapFamilyWrapper}
        // className="row flex-column-reverse flex-md-row" 
        style={{boxShadow: 'rgba(0, 0, 0, 0.15) 0px 27px 51.33px 7.67px', borderRadius: '10px'}}>
        
        {this.state.showMap?
        <div style={{flex:'2'}} >
        <MainMaps mapCenter={this.mapCenterHandler} markerLocationText={this.state.markerLocationText} dropdownArrayHandler={this.dropdownArrayHandler} mapLocation={this.state.setMapSearchText} lat={this.state.lat} lng={this.state.lng} dragLatHandler={this.dragLatHandler} markerQuery={this.state.query} searchText={this.state.landmarkString}  autocompleteArrayHandler={this.autocompleteArrayHandler}></MainMaps>
        </div>:null}
        <div className={classes.FamilyWrapper}>
        <div className={classes.Family}>
            <div className={classes.Heading}><span><img style={{width:'40px'}} alt={"family"} src={Family1}></img></span><p>Family Information</p></div>
            {/*<ProgressBar total={3} transformValue={this.state.qAnswered}></ProgressBar>*/}
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
                //  outFocus={()=>this.onBlurHandler(memFormElement.id)}
                >    
                </Input>:null
            )})}

            {/* <div className={classes.LatitudeLongitude}>   
            <div><label><b>Coordinates</b></label><p>{this.state.lat?this.state.lat.toPrecision(6):null}, {this.state.lng?this.state.lng.toPrecision(6):null} </p></div>
            </div> */}
            
         <MemberSubmitButton clicked={this.submitButtonHandler} ></MemberSubmitButton> 
        </form>
        </div>
        </div>
        </div>
        </div>
        {/* </div> */}
        </Aux>
    )}
}
export default withRouter(Family);