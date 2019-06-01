import React,{Component} from 'react';
import Member from './Member/Member';
import Aux from '../../Hoc/Aux';
import ProgressBar from '../ProgressBar/ProgressBar'; 
import MainMaps from '../../Containers/MainMaps/MainMaps'; 
class Members extends Component{
    state={
        percent:null
    }
    percentageHandler=(value)=>{
        console.log(value);
        this.setState({percent:value});
    }
    render(){
    return(
        <Aux>
        <ProgressBar transformValue={this.state.percent}>
        </ProgressBar>
        <Member percentFind={this.percentageHandler}
        // membInfo={props.membInfo} changedMem={props.changedMems}
        >
        </Member>
        <MainMaps></MainMaps>
        </Aux>
    )
    }
}
export default Members;