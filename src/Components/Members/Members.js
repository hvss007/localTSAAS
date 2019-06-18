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
        lng:null
    }
    // componentDidMount(){
    //     console.log(this.props.match.params.id)
    // }
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
        <div className={classes.Members}>
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
            landmarkTransfer={this.landmarkHandler}
        // membInfo={props.membInfo} changedMem={props.changedMems}
        >
        </Member>
        </div>
        <MainMaps dragLatHandler={this.dragLatHandler} markerQuery={this.state.query} searchText={this.state.landmarkString}  autocompleteArrayHandler={this.autocompleteArrayHandler}></MainMaps>
        </div>
    )
    }
}
export default Members;