import React, { Component } from 'react';
import classes from './HereMaps.css'
var count=0;
class  HereMaps extends Component {
    constructor(props) {
        super(props);
        this.imp={
          useCIT:true,
          apikey:props.apikey,
          useHTTPS:true
        }
        this.count=0;
        this.state = {
          dataLoaded:false,count:0,mapCentreText:this.props.mapLocation,mainResponseArray:[]
        // center: {
        //     lat: this.props.lat,
        //     lng: this.props.lng,
        // },
        // lat:this.props.lat,
        // lng:this.props.lng,
        // zoom: props.zoom,
        // theme:props.theme,
        // arr:[],
        // count:0,
        // displayText:[],
        // finalPassArrat:[],
        // searchText:props.searchArea
    }        
        
        this.platform = new window.H.service.Platform(this.imp);
        this.map = null;
        this.mapCentreText=this.props.mapLocation;
        var geocoder = this.platform.getGeocodingService();
            
        let geocodingParams = {
          searchText:this.state.mapCentreText+ " India"
        };
        geocoder.geocode(geocodingParams,(result)=>{ 
          if(result.Response.View.length>0) {
            var location=result.Response.View[0].Result[0].Location.DisplayPosition;
            let obj={
              center: {
               lat: location.Latitude,
               lng: location.Longitude,
              },
               lat:location.Latitude,
               lng:location.Longitude,
               zoom: this.props.zoom,
               theme:this.props.theme,
               arr:[],
               count:0,
               placeMarker:null,
               displayText:[],
               finalPassArrat:[],
               searchText:props.searchArea}   
            this.setState({dataLoaded:true,...obj},()=>this.props.mapCenter(this.state.center.lat,this.state.center.lng));           
          }
          else{
            const text=this.state.mapCentreText;
            const newText= text.split(" ")
            let geocodingParams = {
              searchText:newText[newText.length-1]+ " India"
            };
            var geocoder1 = this.platform.getGeocodingService();
            geocoder1.geocode(geocodingParams,(result)=>{
             var location=result.Response.View[0].Result[0].Location.DisplayPosition;
             let obj={
              center: {
               lat: location.Latitude,
               lng: location.Longitude,
              },
               lat:location.Latitude,
               lng:location.Longitude,
               zoom: this.props.zoom,
               theme:this.props.theme,
               arr:[],
               count:0,
               placeMarker:null,
               displayText:[],
               finalPassArrat:[],
               searchText:props.searchArea}   
            this.setState({dataLoaded:true,...obj},()=>this.props.mapCenter(this.state.center.lat,this.state.center.lng));           
            },function(e){

            } )   
          }
         }, function(e) {
        });
    }
    componentWillReceiveProps(nextProps,nextState){
      if(this.props.mapLocation!==nextProps.mapLocation){      
        this.setState({mapCentreText:nextProps.mapLocation})
         var geocoder = this.platform.getGeocodingService();
                  
         let geocodingParams = {
          searchText:nextProps.mapLocation+ " India"
        };
        geocoder.geocode(geocodingParams,(result)=>{ 
          if(result.Response.View.length>0) {
            var location=result.Response.View[0].Result[0].Location.DisplayPosition;  
            const center={
              lat:location.Latitude,
              lng:location.Longitude
            }
            this.setState({center:center},()=>{
             this.map.setCenter({lat:this.state.center.lat, lng:this.state.center.lng});
             this.props.mapCenter(this.state.center.lat,this.state.center.lng)
            return true
           })
          }
          else{
            const text=this.state.mapCentreText;
            const newText= text.split(" ")
            let geocodingParams = {
              searchText:newText[newText.length-1]+ " India"
            };
            geocoder.geocode(geocodingParams,(result)=>{
              var location=result.Response.View[0].Result[0].Location.DisplayPosition;  
            const center={
              lat:location.Latitude,
              lng:location.Longitude
            }
            this.setState({center:center},()=>{
             this.map.setCenter({lat:this.state.center.lat, lng:this.state.center.lng});
             this.props.mapCenter(this.state.center.lat,this.state.center.lng)
            })
             },function(e){})
          }
        },function(e){
        })
        return true;
      }

    }
    componentDidUpdate(prevProps,prevState) {
        if(this.state.dataLoaded&&this.state.count===0){
          this.layer = this.platform.createDefaultLayers();
          this.container = document.getElementById('here-map');
          this.map = new window.H.Map(this.container,this.layer.vector.normal.map, {
            center: this.state.center,
            zoom: this.state.zoom,
          })
          this.group = new window.H.map.Group();  
          var events = new window.H.mapevents.MapEvents(this.map);
          this.behavior = new window.H.mapevents.Behavior(events);
          // var ui = new window.H.ui.UI.createDefault(this.map,this. layer)     
            this.map.addObject(this.group);
            return true
          }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.dataLoaded!==nextState.dataLoaded){
          this.setState({count:this.state.count+1})
          return true
        }else if(this.props.searchArea!==nextProps.searchArea){
          this.setState({count:this.state.count+1})
          this.setState({arr:[null]});
          
          return true
        }else if(this.props.markerLocationText!==nextProps.markerLocationText){
          if(count>0){
            this.group.removeObject(this.state.placeMarker)
           }
           count++     
          let position={
            lat:nextProps.markerLocationLat,
            lng:nextProps.markerLocationLng
          } 
          this.addMarkersToMap(position,this.behavior)
          return true
        }else if(this.props.markerLocationLat!==nextProps.markerLocationLat){
            return true
        }
        else{
          return false;
        }
    }
    addMarkersToMap=(position,behavior)=>{
      var placeMarker=new window.H.map.Marker({lat:position.lat, lng:position.lng},{volatility: true})
        this.setState({placeMarker:placeMarker});
        placeMarker.draggable=true;
        let map=this.map;
        this.map.setZoom("14",true)
        this.map.setCenter({lat:position.lat, lng:position.lng})      
        this.group.addObject(placeMarker);
        this.dragEventHandler(map,behavior);
    }

    dragEventHandler=(map,behavior)=>{
      map.addEventListener('dragstart', function(ev) {
        var target = ev.target,
        pointer = ev.currentPointer;
        if (target instanceof window.H.map.Marker) {
          var targetPosition = map.geoToScreen(target.getGeometry());
          target['offset'] = new window.H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
          behavior.disable();
        }
      }, false);
      // re-enable the default draggability of the underlying map
      // when dragging has completed
      map.addEventListener('dragend', function(ev) {
        var target = ev.target;
        if (target instanceof window.H.map.Marker) {
          behavior.enable();
        }
      }, false);
      // Listen to the drag event and move the position of the marker
      // as necessary
       map.addEventListener('drag', (ev)=> {
        var target = ev.target,
            pointer = ev.currentPointer;
        if (target instanceof window.H.map.Marker) {
          target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
          // target.setPosition(map.screenToGeo(pointer.viewportX, pointer.viewportY));
          let loc=map.screenToGeo(pointer.viewportX, pointer.viewportY);
          let x=loc.lat;
          let y=loc.lng;
           this.props.dragLatHandler(x,y)
        }
      }, false);
    }

    render() {
        return (
            <div style={{height:'95%'}}>
            <div id="here-map"
            className={classes.HereMaps} 
            >
                <div className={classes.Coordinates} ><p>{this.props.markerLocationLat?this.props.markerLocationLat.toPrecision(6):null} ,{this.props.markerLocationLng?this.props.markerLocationLng.toPrecision(6):null}</p> </div>
            </div>
            
            </div>
        );
    }
}
export default HereMaps;