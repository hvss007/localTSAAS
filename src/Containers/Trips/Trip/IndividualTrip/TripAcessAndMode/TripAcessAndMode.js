import React, { Component } from 'react';
import classes from './TripAcessAndMode.css';
import TripAccess from './TripAcess/TripAccess';
import Walk from '../../../../../assets/icons/modeIcons/Walk.png';
// import TripModal from '../../../../../Hoc/TripModal/TripModal';
//import CommentModal from '../../../../../Hoc/CommentModal/CommentModal';
import Aux from '../../../../../Hoc/Aux';
class TripAcessAndMode extends Component{
    state={
        // access:[{idi:1,showAdd:true,value:'',modeType:"access",inValue:{travelTime:'',travelDistance:'',fare:''},isValid:false}],
        // egress:[{idi:1,showAdd:true,value:'',modeType:"egress",inValue:{travelTime:'',travelDistance:'',fare:''},isValid:false}],
        mainMode:[
            {idi:1,showAdd:false, value:'Walk',
            // ,inValue:{travelTime:'',travelDistance:'',fare:''},
            isValid:false,
            // modeType:"mainMode"
            },
            {idi:2,showAdd:false,value:'',
            // inValue:{travelTime:'',travelDistance:'',fare:''},
            isValid:false,
            // modeType:"mainMode"
            },
            {idi:3,
                showAdd:true,
                value:'',
                // inValue:{travelTime:'',travelDistance:'',fare:''},
                isValid:false,
                // modeType:"mainMode"
            }
        ]
            
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.sendData===true&&nextProps.whichButtonClicked!==''){
            const arrId=[
                // this.state.access,
                // this.state.egress,
                this.state.mainMode
            ];
            const modeArr=[];
            arrId.forEach((mode)=>{
                const accessCopy=[...mode];
                const newAccessArray=[];
                accessCopy.forEach((item)=>{
                let newAccessObjectIn={modeName:item.value,...item.inValue,modeType:item.modeType,isValid:item.isValid};
                newAccessArray.push(newAccessObjectIn);
            })
                modeArr.push(newAccessArray);
            })
          const finalAccessObject={
             mode:[ ...modeArr[0]
            //  ,...modeArr[1],...modeArr[2]
            ]
            //   access:modeArr[0],
            //   egress:modeArr[1],
            //   mainMode:modeArr[2]
          }  
          this.props.tripAccessDataHandler(finalAccessObject,nextProps.whichButtonClicked);
          return true
        }
    }
    accessDataHandler=(name,value,idi)=>{
        // if(name==="Access Mode"){
        //     const accessCopy=[...this.state.access];
        //     const accessCopyElementOld={...accessCopy[idi-1]};
        //     accessCopyElementOld.value=value;
        //     accessCopy[idi-1]=accessCopyElementOld;
        //     this.setState({access:accessCopy})
        // }
        // else if(name==="Egress Mode"){
        //     const accessCopy=[...this.state.egress];
        //     const accessCopyElementOld={...accessCopy[idi-1]};
        //     accessCopyElementOld.value=value;
        //     accessCopy[idi-1]=accessCopyElementOld;
        //     this.setState({egress:accessCopy})
        // }
        // else 
        if(name==="Main Mode"){
            const accessCopy=[...this.state.mainMode];
            const accessCopyElementOld={...accessCopy[idi-1]};
            accessCopyElementOld.value=value;
            accessCopy[idi-1]=accessCopyElementOld;
            this.setState({mainMode:accessCopy})
        }
    }      
    accessDataInHandler=(name,valueType,value,idi,valid)=>{
        // if(name==="Access Mode"){
        //     const accessCopy=[...this.state.access];
        //     const accessCopyElementOld={...accessCopy[idi-1]};
        //     const accessInvalueCopy={...accessCopyElementOld.inValue};
        //     accessCopyElementOld.isValid=valid;
        //     if(valueType==="travelTime"){
        //         accessInvalueCopy.travelTime=value;
        //     }
        //     else if(valueType==="journeyLength"){
        //         accessInvalueCopy.travelDistance=value;
        //     }
        //     else if(valueType==="fare"){
        //         accessInvalueCopy.fare=value;
        //     }
        //     // else if(valueType==="Cost"){
        //     //     accessInvalueCopy.cost=value;
        //     // }
        //     accessCopyElementOld.inValue=accessInvalueCopy;
        //     accessCopy[idi-1]=accessCopyElementOld;
        //     this.setState({access:accessCopy})
        // }
        // else if(name==="Egress Mode"){
        //     const accessCopy=[...this.state.egress];
        //     const accessCopyElementOld={...accessCopy[idi-1]};
        //     const accessInvalueCopy={...accessCopyElementOld.inValue};
        //     accessCopyElementOld.isValid=valid;
        //     if(valueType==="travelTime"){
        //         accessInvalueCopy.travelTime=value;
        //     }
        //     else if(valueType==="journeyLength"){
        //         accessInvalueCopy.travelDistance=value;
        //     }
        //     else if(valueType==="fare"){
        //         accessInvalueCopy.fare=value;
        //     }
        //     // else if(valueType==="Cost"){
        //     //     accessInvalueCopy.cost=value;
        //     // }
        //     accessCopyElementOld.inValue=accessInvalueCopy;
        //     accessCopy[idi-1]=accessCopyElementOld;
        //     this.setState({egress:accessCopy})
        // }
        // else
         if(name==="Main Mode"){
            const accessCopy=[...this.state.mainMode];
            const accessCopyElementOld={...accessCopy[0]};
            const accessInvalueCopy={...accessCopyElementOld.inValue};
            accessCopyElementOld.isValid=valid;
            if(valueType==="travelTime"){
                accessInvalueCopy.travelTime=value;
            }
            else if(valueType==="journeyLength"){
                accessInvalueCopy.travelDistance=value;
            }
            else if(valueType==="fare"){
                accessInvalueCopy.fare=value;
            }
            // else if(valueType==="Cost"){
            //     accessInvalueCopy.cost=value;
            // }
            accessCopyElementOld.inValue=accessInvalueCopy;
            accessCopy[0]=accessCopyElementOld;
            this.setState({mainMode:accessCopy})
        }
    }
    addHandler=(idi,name)=>{
        if(name==="Main Mode"){   
            const accessElementNew={idi:idi+1,showAdd:true,modeType:'mainMode',value:'',inValue:{travelTime:'',travelDistance:'',fare:''},isValid:false};
            const accessCopy=[...this.state.mainMode];
            const accessCopyElementOld={...accessCopy[idi-1]};
            accessCopyElementOld.showAdd=false;
            accessCopy[idi-1]=accessCopyElementOld;
            accessCopy.push(accessElementNew);
            this.setState({mainMode:accessCopy})
        }
        // if(name==="Access Mode"){
            
        //     const accessElementNew={idi:idi+1,showAdd:true,modeType:'access'};
        //     const accessCopy=[...this.state.access];
        //     const accessCopyElementOld={...accessCopy[idi-1]};
        //     accessCopyElementOld.showAdd=false;
        //     accessCopy[idi-1]=accessCopyElementOld;
        //     accessCopy.push(accessElementNew);
        //     this.setState({access:accessCopy})
        // }
        // else if(name==="Egress Mode"){
            
        //      const accessElementNew={idi:idi+1,showAdd:true,modeType:'egress'};
        //      const accessCopy=[...this.state.egress];
        //      const accessCopyElementOld={...accessCopy[idi-1]};
        //      accessCopyElementOld.showAdd=false;
        //      accessCopy[idi-1]=accessCopyElementOld;
        //      accessCopy.push(accessElementNew);
        //      this.setState({egress:accessCopy})
        // }

    }
    render(){

        const tripMainMode=this.state.mainMode.map((mode,index)=>{
            return <TripAccess mainmodeValue={this.state.mainMode[0].value} mainMode={true} destinationPlace={this.props.destinationPlace} disabled={this.props.disabled} accessDataIn={this.accessDataInHandler} accessData={this.accessDataHandler} key={mode.idi} add={this.addHandler} accessName={"Main Mode"}  idi={mode.idi} showAdd={mode.showAdd}>
            </TripAccess>
        })


        // const tripAccess=this.state.access.map((acc,index)=>{
        //     return <TripAccess mainmodeValue={this.state.mainMode[0].value} disabled={this.props.disabled} accessDataIn={this.accessDataInHandler} accessData={this.accessDataHandler} key={acc.idi} add={this.addHandler} accessName={"Access Mode"}  idi={acc.idi} showAdd={acc.showAdd}>
        //     </TripAccess>
        // })
        // const tripEgress=this.state.egress.map((egr,index)=>{
        //     return <TripAccess disabled={this.props.disabled} mainmodeValue={this.state.mainMode[0].value} accessDataIn={this.accessDataInHandler} accessData={this.accessDataHandler} key={egr.idi} add={this.addHandler} accessName={"Egress Mode"}  idi={egr.idi} showAdd={egr.showAdd}>
        //     </TripAccess>
        // })
        return(
            <Aux>
                <h3>Mode Information</h3>
                <p style={{textAlign:'justify'}}> <b>Note:</b> Please add all travel modes in the order which the member uses them. Starting and ending with Walk.<span><img style={{width:'30px'}} src={Walk}></img></span></p>
            <div className={classes.TripAcessAndMode}>  
                {tripMainMode}
                {/* <TripAccess disabled={this.props.disabled} destinationPlace={this.props.destinationPlace} mainMode={true} accessName={"Main Mode"} accessDataIn={this.accessDataInHandler} accessData={this.accessDataHandler}></TripAccess> */}
                {/* {tripAccess}
                {tripEgress} */}
            </div>
            </Aux>
        )
    }
}

export default TripAcessAndMode;