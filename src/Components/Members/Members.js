import React,{Component} from 'react';
import Member from './Member/Member';
import Aux from '../../Hoc/Aux';
import ProgressBar from '../ProgressBar/ProgressBar'; 
import MainMaps from '../../Containers/MainMaps/MainMaps'; 
import classes from './Members.css';
class Members extends Component{
    state={
        percent:null,
        landmarkString:"",
        autoCompleteArr:[],
        query:"",
        lat:null,
        lng:null,
        showMap:false,
        setMapSearchText:''
    }
    // componentDidMount(){
    //     console.log(this.props.match.params.id)
    // }
    mapShowHandler=(searchText)=>{
        this.setState({showMap:true,setMapSearchText:searchText})
    }
    percentageHandler=(value)=>{
        console.log(value);
        this.setState({percent:value});
    }
    landmarkHandler=(value)=>{
        this.setState({landmarkString:value},()=>{console.log(this.state.landmarkString)})
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
                if(displayArr[i]==displayUniqueArr[j])
                {
                    found=true
                }
            }
            count++;
            if(count==1&&found==false){
                displayUniqueArr.push(displayArr[i]);
            }
            count=0;
            found=false;
            
        }
        this.setState({autoCompleteArr:displayUniqueArr},()=>{console.log(this.state.autoCompleteArr,"ugvytyryfrccyf")});
        
    }
    render(){
    return(
        <div 
        // className="container-fluid my-5 mx-auto px-5" 
        style={{height:'fit-content', boxSizing:'border-box',padding:'25px'}}>
        <div className={classes.MapMemberWrapper}
        // className="row flex-column-reverse flex-md-row" 
        style={{boxShadow: 'rgba(0, 0, 0, 0.15) 0px 27px 51.33px 7.67px', borderRadius: '10px'}}>
        {this.state.showMap?<div className="col-md-8 mr-0 pr-0">
        <MainMaps mapLocation={this.state.setMapSearchText} dragLatHandler={this.dragLatHandler} markerQuery={this.state.query} searchText={this.state.landmarkString}  autocompleteArrayHandler={this.autocompleteArrayHandler}></MainMaps>
        </div>:null}
        <div className={classes.MemberWrapper}>
        <ProgressBar transformValue={this.state.percent}>
        </ProgressBar>
        <Member
            lat={this.state.lat}
            lng={this.state.lng}
            familyId={this.props.match.params.id}
            setMarkerQuery={this.setMarkerQuery}
            autoCompleteArr={this.state.autoCompleteArr} 
            percentFind={this.percentageHandler}
            mapShow={this.mapShowHandler}
            landmarkTransfer={this.landmarkHandler}
        // membInfo={props.membInfo} changedMem={props.changedMems}
        >
        </Member>
        </div>
        </div>
        {/* </div> */}
        </div>
    )
    }
}
export default Members;