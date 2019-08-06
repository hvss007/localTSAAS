import React, { Component } from 'react';
import classes from './TripOriginMap.css';
import FinalBackdrop from '../../../../../../Hoc/FinalBackdrop/FinalBackdrop';
import Aux from '../../../../../../Hoc/Aux';
import Map from '../../../../../../assets/icons/map.png';
class TripOriginMap extends Component{
    constructor(props) {
        super(props);
        this.state = {
          app_id: process.env.REACT_APP_PLACES_API_ID,
          app_code: process.env.REACT_APP_PLACES_APP_CODE,
          useCIT:true,
          useHTTPS:true,
            center: {
                lat: "26.9124",
                lng:"75.7873",
            },
            lat:null,
            lng:null,
            zoom: "12",
            theme:"normal.day",
            placeMarker:null,
            showFrontDrop:false,
            backdropShow:false,
            count:0,
            dataLoaded:false,
            mapCentreText:this.props.mapLocation,
            count1:0
        }
        this.platform = new window.H.service.Platform(this.state);
        this.map = null;
        this.mapCentreText=this.props.mapLocation;
        
        
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
        // if(this.props.initLat&&this.props.initLng){
        //   let dataObj={lat:this.props.initLat,lng:this.props.initLng};
        //   this.addMarkersToMap(dataObj,this.behavior);
        // }else{
        //   // this.addMarkersToMap(this.state.center,this.behavior);  
        // }
        if(this.props.ifj!=="11"||this.props.ifj!=="21"){
          this.setState({mapCentreText:this.props.mapLocation},()=>{
          var geocoder = this.platform.getGeocodingService();
          let geocodingParams = {
            searchText:this.state.mapCentreText+ " India"
          };
          geocoder.geocode(geocodingParams,(result)=>{ 
            if(result.Response.View.length>0) {
              var location=result.Response.View[0].Result[0].Location.DisplayPosition;
              let obj={
                 lat:location.Latitude,
                 lng:location.Longitude,
                 }
                  this.map.setCenter({lat:location.Latitude, lng:location.Longitude})      
                      this.setState({dataLoaded:true,center:obj},(
                        )=>{
                          this.props.centerLocationHandler(this.state.center.lat,this.state.center.lng)
                          if(this.props.initLat&&this.props.initLng){
                            let dataObj={lat:this.props.initLat,lng:this.props.initLng};
                            this.addMarkersToMap(dataObj,this.behavior);  
                            
                          }
                        })}
           else{
                          
               }
                      }, function(e) {
                        alert(e);
                      });
                    }) 
        
        }
        else{}
    }
    shouldComponentUpdate(nextProps,nextState){
      if(nextState.showFrontDrop!==this.state.showFrontDrop){
          setTimeout(()=>{
              this.map.getViewPort().resize(); 
          },2000)
          return true   
      }
      else{
           return false
      }
      }
    componentWillReceiveProps(nextProps) {
      if(!this.props.disabled){
      if(nextProps.mapLocation!==this.props.mapLocation){
        this.setState({mapCentreText:nextProps.mapLocation},()=>{
        var geocoder = this.platform.getGeocodingService();
        let geocodingParams = {
          searchText:this.state.mapCentreText+ " India"
        };
        geocoder.geocode(geocodingParams,(result)=>{ 
          if(result.Response.View.length>0) {
            var location=result.Response.View[0].Result[0].Location.DisplayPosition;
            let obj={
               lat:location.Latitude,
               lng:location.Longitude,
               }
               this.map.setCenter({lat:location.Latitude, lng:location.Longitude})      
            this.setState({dataLoaded:true,center:obj},()=>
            {
              this.props.centerLocationHandler(this.state.center.lat,this.state.center.lng)
             }
            );   
          }
          else{
          }         
          }, function(e) {
          alert(e);

        });


        })
        return true
      }
      if(this.props.markerLocationText!==nextProps.markerLocationText){
        if(this.state.count1>0){

        }
        this.setState({lat:nextProps.markerLat,lng:nextProps.markerLng,count1:this.state.count1+1,backdropShow:true,showFrontDrop:true},()=>{
          this.props.latLong(this.state.lat,this.state.lng)
        })
        
        this.addMarkersToMap({lat:nextProps.markerLat,lng:nextProps.markerLng},this.behavior);  
        return true
      }}
    }

    addMarkersToMap=(position,behavior)=>{

        this.map.setZoom("14",true)
        this.map.setCenter({lat:position.lat, lng:position.lng})      
        var placeMarker=new window.H.map.Marker({lat:position.lat, lng:position.lng})
        this.setState({placeMarker:placeMarker});
        placeMarker.draggable=true;
        let map=this.map;
        this.group.addObject(placeMarker);
        
        this.dragEventHandler(map,behavior);
        
    }

    dragEventHandler=(map,behavior)=>{
      if(!this.props.disabled)
      {
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
      }, false);}
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
    return(
      <Aux>
     <div style={{display:'flex',flexDirection:'column',marginBottom:'20px'}}>
     
     <div className={classes.WarningText} ><p  style={{fontSize:'14px' , textAlign:'center'}}> {"*Drag the marker nearest to your "+ this.props.originOrDestination + " location."}</p></div>  
     
      <div  className={originMapWrapperClasses.join(" ")} >
        <div onClick={this.onClickHandler} style={window.innerWidth>=0?{backgroundImage:'url('+Map+')'}:null} className={frontDropClasses.join(" ")}></div>
        <div id={"originmap"+this.props.ifj} className={originMapClasses.join(' ')}
        //style={this.state.showFrontDrop?originMapStyle:null}
        >
        <div className={classes.ConfirmButtonOuter+' '+classes.ConfirmButtonBorder}> 
            <button onClick={()=>{this.setState({backdropShow:false,showFrontDrop:false})}} className={classes.ConfirmButton}> Ok</button>
        </div>  

        </div>
        
        </div>


     </div>
    
        <FinalBackdrop backdropHide={this.backdropHideHandler} backdropShow={this.state.backdropShow} ></FinalBackdrop>
        </Aux>    
    )

    }
}
export default TripOriginMap;