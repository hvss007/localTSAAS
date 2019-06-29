import React, { Component } from 'react';
import classes from './TripOriginMap.css';
import FinalBackdrop from '../../../../../../Hoc/FinalBackdrop/FinalBackdrop';
import Aux from '../../../../../../Hoc/Aux';
//import Map from '../../../../../../assets/icons/Map.svg';
class TripOriginMap extends Component{
    constructor(props) {
        super(props);
        this.platform = null;
        this.map = null;
        this.state = {
            app_id: 'wvzQzqmPlU1T9tjf0YLU',
            app_code: 'b_is4SmSRfh8e0-Mr2-low',
            center: {
                lat: "26.9124",
                lng:"75.7873",
            },
            lat:"26.9124",
            lng:"75.7873",
            zoom: "12",
            theme:"normal.day",
            showFrontDrop:false,
            backdropShow:false,
            count:0
        }
    }
    
    componentDidMount() {
        this.platform = new window.H.service.Platform(this.state);

        this.layer = this.platform.createDefaultLayers();
        this.container = document.getElementById('originmap'+this.props.ifj);
        this.map = new window.H.Map(this.container, this.layer.normal.map, {
            center: this.state.center,
            zoom: this.state.zoom,
          })
          this.group = new window.H.map.Group();
        var events = new window.H.mapevents.MapEvents(this.map);
        // eslint-disable-next-line
        this. behavior = new window.H.mapevents.Behavior(events);
        // eslint-disable-next-line
        var ui = new window.H.ui.UI.createDefault(this.map,this. layer)
        //this.addMarkersToMap(this.map,behavior);
        //this.req(this.behavior);
        this.map.addObject(this.group);
        if(this.props.initLat&&this.props.initLng){
          let dataObj={lat:this.props.initLat,lng:this.props.initLng};
          this.addMarkersToMap(dataObj,this.behavior);  
        }else{
          this.addMarkersToMap(this.state.center,this.behavior);  
        }
        
    }
    shouldComponentUpdate(nextProps,nextState){
      // console.log(nextState.showFrontDrop);  
      // console.log(this.state.showFrontDrop);  
      // console.log(nextState.showFrontDrop!==this.state.showFrontDrop)
      
      if(nextState.showFrontDrop!==this.state.showFrontDrop){
          setTimeout(()=>{
            // document.getElementById("originmap").addEventListener('resize',  ()=> {
            //   console.log("Hello")
              this.map.getViewPort().resize(); 
            // });
          },2000)
          
          return true
          
      }
      
      else{
           return false
      }
      
      // if(nextProps.backdropHidden!==this.props.backdropHidden){
      //  this.setState(showFrontDrop:)
      //   return true 
      // }


      }

    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    // componentWillReceiveProps(nextProps) {
    //   if(nextProps.backdropHidden!==this.props.backdropHidden){
    //     this.setState({showFrontDrop:nextProps.backdropHidden})
    //     return true
    //   }
    //   else{
    //     return false
    //   }
    // }
  //   static getDerivedStateFromProps(nextProps, prevState){
  //     if(nextProps.backdropHidden!==prevState.showFrontDrop){
  //       return { someState: nextProps.someValue};
  //    }
  //    else return null;
  //  }
   
  //  componentDidUpdate(prevProps, prevState) {
  //    if(prevProps.someValue!==this.props.someValue){
  //      //Perform some operation here
  //      this.setState({someState: someValue});
  //      this.classMethod();
  //    }
  //  }
    // componentDidUpdate(prevState) {
    //   // Typical usage (don't forget to compare props):
    //   if (this.state.showFrontDrop !== prevState.showFrontDrop) {
    //     window.addEventListener('resize', function () {
    //               console.log("Hello")
    //               this.map.getViewPort().resize(); 
                
    //             });
    //   }
    // }


    addMarkersToMap=(position,behavior)=>{
        // if(this.props.initLat!==null&&this.props.initLng!==null)
        // {
        //   var placeMarker=new window.H.map.Marker({lat:this.props.initLat, lng:this.props.initLng})
        //   this.group.addObject(placeMarker);
        // }
        // else{
        var placeMarker=new window.H.map.Marker({lat:position.lat, lng:position.lng})
        placeMarker.draggable=true;
        let map=this.map;
        //let behavior=this.behavior;
        //map.removeObject(this.group);        
        this.group.addObject(placeMarker);
        
        this.dragEventHandler(map,behavior);
        // }
        
    }

    dragEventHandler=(map,behavior)=>{
      map.addEventListener('dragstart', function(ev) {
        var target = ev.target;
        if (target instanceof window.H.map.Marker) {
          behavior.disable();
        }
      }, false);
      // re-enable the default draggability of the underlying map
      // when dragging has completed
      map.addEventListener('dragend', function(ev) {
        var target = ev.target;
        if (target instanceof window.mapsjs.map.Marker) {
          behavior.enable();
        }
      }, false);
      // Listen to the drag event and move the position of the marker
      // as necessary
     map.addEventListener('drag', (ev)=> {
        var target = ev.target,
            pointer = ev.currentPointer;
        if (target instanceof window.mapsjs.map.Marker) {
          target.setPosition(map.screenToGeo(pointer.viewportX, pointer.viewportY));
          let loc=map.screenToGeo(pointer.viewportX, pointer.viewportY);
          let x=loc.lat;
          let y=loc.lng;
          this.setState({lat:x,lng:y},()=>{this.props.latLong(this.state.lat,this.state.lng)});
        }
      }, false);
    }
    onClickHandler=()=>{
      this.setState({showFrontDrop:true,count:this.state.count+1,backdropShow:true}
        );
    }
    
    backdropHideHandler=()=>{
        this.setState({backdropShow:false,showFrontDrop:false})
    }
    render(){
      const frontDropClasses=[classes.OriginMapFrontDrop];
      const originMapWrapperClasses=[classes.OriginMapWrapper];
      const originMapClasses =[classes.OriginMap];
      if(this.props.originOrDestination==="Origin"){
        originMapWrapperClasses.push(classes.Origin)
        if(this.state.showFrontDrop){
          originMapClasses.push(classes.OriginMapShow)
          frontDropClasses.push(classes.FrontDropVanish);
          originMapWrapperClasses.push(classes.OriginMapWrapperMoveLeft);
        }
        }else if(this.props.originOrDestination==="Destination"){
          
          originMapWrapperClasses.push(classes.Destination)

        if(this.state.showFrontDrop){
          originMapClasses.push(classes.OriginMapShow)
          frontDropClasses.push(classes.FrontDropVanish);
          originMapWrapperClasses.push(classes.OriginMapWrapperMoveRight);
        }
      }


      // let x=window.innerWidth/2-50;
      
      // const originMapStyle={
      //   transition:'all linear .5s',
      //   transform: 'translateX('+ x+'px)'
      // }
      
 //    const styleSmall={width: '100px', height: '100px', background: 'grey',position:"absolute",marginTop:"30px" };
    return(
      <Aux>
      <div  className={originMapWrapperClasses.join(" ")} >
        <div onClick={this.onClickHandler} style={{backgroundImage:'url('+Map+')'}} className={frontDropClasses.join(" ")}></div>
        <div id={"originmap"+this.props.ifj} className={originMapClasses.join(' ')}
        //style={this.state.showFrontDrop?originMapStyle:null}
        >

        </div>
        
        </div>
        <FinalBackdrop backdropHide={this.backdropHideHandler} backdropShow={this.state.backdropShow} ></FinalBackdrop>
        </Aux>    
    )

    }
}
export default TripOriginMap;