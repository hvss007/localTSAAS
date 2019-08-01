import React, { Component } from 'react';
import classes from './HereMaps.css'
var count=0;
class  HereMaps extends Component {
    constructor(props) {
        super(props);
        this.imp={
          useCIT:true,
          app_id: props.app_id,
          app_code:props.app_code,
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
          // console.log(result)
          // console.log(result.Response.View[0].Result[0].Location.DisplayPosition)
          if(result.Response.View.length>0) {
            // var loc=result.Response.View[0].Result[0].Location.DisplayPosition;  
          }
          else{
            // console.log('failed')
          }
          // console.log(result)
          
          var location=result.Response.View[0].Result[0].Location.DisplayPosition;
          
          //  console.log(location);
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
         }, function(e) {
          // alert(e);

        });
        // console.log(this.location)

    }
    componentWillReceiveProps(nextProps,nextState){
      
      // if(nextProps.searchArea!==this.props.searchArea){
      //   if(this.count>=3){
      //     Axios.get('https://places.cit.api.here.com/places/v1/autosuggest?at='+this.state.center.lat+','+this.state.center.lng+'&q='+nextProps.searchArea +'&app_id='+process.env.REACT_APP_PLACES_API_ID+'&app_code='+'b_is4SmSRfh8e0-Mr2-low')
      //   .then(Response=>{
      //     let ResponseArrayResponse=Response.data.results;
      //     let elementsArray=[];
      //     ResponseArrayResponse.forEach(element => {
      //       elementsArray.push(""+element.title+" "+element.vicinity);
      //     });
      //     this.props.dropdownArrayHandler(elementsArray)
      //     this.setState({ResponseArrayText:elementsArray},()=>{
            
      //     })
      //     console.log(Response);
      //     console.log(elementsArray)
      //   })
      //   }
      //   this.count++;
      //   return true
      // }
      if(this.props.mapLocation!==nextProps.mapLocation){
        
        this.setState({mapCentreText:nextProps.mapLocation})
         var geocoder = this.platform.getGeocodingService();
                  
         let geocodingParams = {
          searchText:nextProps.mapLocation+ " India"
        };
        if(geocodingParams.searchText.includes("East Delhi")){
          geocodingParams=" Delhi India"
        }
        geocoder.geocode(geocodingParams,(result)=>{ 
          // console.log(result)
          // console.log(result.Response.View[0].Result[0].Location.DisplayPosition)
          if(result.Response.View.length>0) {
            var location=result.Response.View[0].Result[0].Location.DisplayPosition;  
            const center={
              lat:location.Latitude,
              lng:location.Longitude
            }
            this.setState({center:center},()=>{

              // this.layer = this.platform.createDefaultLayers();
          // this.container = document.getElementById('here-map');
          // this.map = new window.H.Map(this.container, this.layer.normal.map, {
          //   center: this.state.center,
          //   zoom: this.state.zoom,
          // })
              // console.log(this.map)
             this.map.setCenter({lat:this.state.center.lat, lng:this.state.center.lng});
             this.props.mapCenter(this.state.center.lat,this.state.center.lng)
              // this.map.l.center=this.state.center
          // this.map.center=this.state.center
        //   this.group = new window.H.map.Group();  
        // var events = new window.H.mapevents.MapEvents(this.map);
        // // eslint-disable-next-line
        // this.behavior = new window.H.mapevents.Behavior(events);
        // // eslint-disable-next-line
        // var ui = new window.H.ui.UI.createDefault(this.map,this. layer)     
        //     //this.addMarkersToMap(this.map,behavior);
        //     //this.req(this.behavior);
        //     this.map.addObject(this.group);
            return true





            })
          }
          else{
            // console.log('failed')
          }
        },function(e){
          // alert
        })
        
        // console.log(this.state.mapLocation,nextState.mapLocation)
        return true;
      }
      // if(this.props.searchArea!==nextProps.searchArea){
      //   console.log(this.props.searchArea)
      //   this.group.removeObject(this.state.placeMarker);
      //   return true;
      // }
    }
    // TODO: Add theme selection discussed later HERE
    componentWillMount(){
      
    }
    componentDidMount(){

    }
    componentDidUpdate(prevProps,prevState) {
      // console.log("when it works")
        if(this.state.dataLoaded&&this.state.count===0){
          this.layer = this.platform.createDefaultLayers();
          this.container = document.getElementById('here-map');
          this.map = new window.H.Map(this.container, this.layer.normal.map, {
            center: this.state.center,
            zoom: this.state.zoom,
          })
          this.group = new window.H.map.Group();  
          var events = new window.H.mapevents.MapEvents(this.map);
        // eslint-disable-next-line
          this.behavior = new window.H.mapevents.Behavior(events);
        // eslint-disable-next-line
          var ui = new window.H.ui.UI.createDefault(this.map,this. layer)     
            //this.addMarkersToMap(this.map,behavior);
            
            
            //this.req(this.behavior);
            this.map.addObject(this.group);
               
            return true
          }
          
         
        //  console.log(this.props.markerLocationLat)
        //   if(this.props.markerLocationLat){
          
        //   return true
        // }
    }
    componentWillUnmount(){
        
    }
    


    shouldComponentUpdate(nextProps, nextState) {
        //this.changeTheme(props.theme, props.style);
        if(this.state.dataLoaded!==nextState.dataLoaded){
          this.setState({count:this.state.count+1})
          return true
        }else if(this.props.searchArea!==nextProps.searchArea){

          // this.req(this.behavior);
          this.setState({count:this.state.count+1})
          this.setState({arr:[null]});
          
          return true
        }else if(this.props.markerLocationText!==nextProps.markerLocationText){
          // console.log(count)
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
    // changeCoordinate=(event,map)=>{
    //     var x= event.nativeEvent.offsetX;
    //     var y= event.nativeEvent.offsetY
    //     var coord=map.screenToGeo(x,y)
    // }
    // changeTheme(theme, style) {
    //     var tiles = this.platform.getMapTileService({'type': 'base'});
    //     var layer = tiles.createTileLayer(
    //         'maptile',
    //         theme,
    //         256,
    //         'png',
    //         {'style': style}
    //     );
    //     this.map.setBaseLayer(layer);
    // }
    addMarkersToMap=(position,behavior)=>{
      
      var placeMarker=new window.H.map.Marker({lat:position.lat, lng:position.lng})
        this.setState({placeMarker:placeMarker});
        placeMarker.draggable=true;
        let map=this.map;
        this.map.setZoom("14",true)
        this.map.setCenter({lat:position.lat, lng:position.lng})      
        // console.log(placeMarker)
        //let behavior=this.behavior;
        //map.removeObject(this.group);        
        // console.log(this.group);
        this.group.addObject(placeMarker);
        // console.log(this.group);
        this.dragEventHandler(map,behavior);
       // console.log("working but marker")
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
          // this.setState({lat:x,lng:y},
          // ()=>
           this.props.dragLatHandler(x,y)
          //  );
        }
      }, false);
    }


    //  onResult = (result,behavior)=> {
    //    //if(result){
    //      try{
    //     var locations = result.Response.View[0].Result,
    //     position,
    //     marker;
    //     console.log(result)
    //     // Add a marker for each location found
          
    //     for (let i = 0;  i < locations.length; i++) {
    //       position = {
    //         lat: locations[i].Location.DisplayPosition.Latitude,
    //         lng: locations[i].Location.DisplayPosition.Longitude
    //       };
    //      // marker = new window.H.map.Marker(position);
    //       // if(marker){
    //       // }
    //       //this.map.removeObjects();
    //       //this.addMarkersToMap(position,behavior);
    //       // this.map.addObject(marker);
    //       let lat=position.lat;
    //       let lng=position.lng;
    //       this.reverseGeocode(lat,lng)
    //     }} catch (err) {console.log(err)} 
    //    //}
    //   };
    //    req=(behavior)=>{
    //     var geocoder = this.platform.getGeocodingService();
    //     let geocodingParams = {
    //       searchText:""+this.props.searchArea+this.mapCentreText
    //     };
    //     console.log(this.state.mapCentreText,"uvkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    //     geocoder.geocode(geocodingParams,(result)=>{ this.onResult(result,behavior); }, function(e) {
    //       alert(e);
    //     });
    //    }
    //    reverseGeocode=(lat,lng)=> {
    //     var geocoder = this.platform.getGeocodingService(),
    //       reverseGeocodingParameters = {
    //         prox: ""+lat+","+lng, // Berlin
    //         mode: 'retrieveAddresses',
    //         jsonattributes : 1
    //       };
    //     geocoder.reverseGeocode(
    //       reverseGeocodingParameters,
    //       this.onSuccess,
    //       this.onError
    //     );
    //   }
      
    //   onSuccess=(result)=> {
    //     var locations = result.response.view[0].result;
    //    /*
    //     * The styling of the geocoding response on the map is entirely under the developer's control.
    //     * A representitive styling can be found the full JS + HTML code of this example
    //     * in the functions below:
    //     */
    //    const positionsArrayText=[];
    //   //  for (let i = 0;  i < locations.length; i++) {
    //   //   // let position = {
    //   //   //   positionEntry: locations[i].location.address.label
    //   //   // };
    //   //   positionsArrayText.push(locations[i].location.address.label);
    //   // }
    //   positionsArrayText.push(locations[0].location.address.label)
    //   let arr=[...this.state.arr];
    //   arr.push(positionsArrayText);
    //   this.setState({arr:arr},()=>{
    //       this.arrayTextHandler();
    //     });
    //     //addLocationsToMap(locations);
    //     //addLocationsToPanel(locations);
    //     // ... etc.
    //   }
    //   // /**
    //   //  * This function will be called if a communication error occurs during the JSON-P request
    //   //  * @param  {Object} error  The error message received.
    //   //  */
    //    onError=(error)=> {
    //     alert('Ooops!');
    //   }
    //   arrayTextHandler=()=>{
    //     const displayArr=[...this.state.arr];
    //     let len=displayArr.length;
    //     const finalArr=[...this.state.finalPassArrat];
    //     finalArr.splice(0,len);
    //     for(let i=1;i<len;i++){
    //       finalArr.push(displayArr[i][0]);
    //     }
    //     this.setState({finalPassArrat:finalArr},
    //       ()=>{
    //         this.props.autocompleteArrayHandler(this.state.finalPassArrat)
    //       });
        
    //   }
    //   onResult1 = (result,behavior)=> {
    //     //if(result){
    //       try{
    //      var locations = result.Response.View[0].Result,
    //      position,
    //      marker;
    //      // Add a marker for each location found
    //        position = {
    //          lat: locations[0].Location.DisplayPosition.Latitude,
    //          lng: locations[0].Location.DisplayPosition.Longitude
    //        };

    //       // marker = new window.H.map.Marker(position);
    //        // if(marker){
 
    //        // }
    //       //  console.log(position);
    //        //this.map.removeObjects();
    //        this.addMarkersToMap(position,behavior);
    //        this.props.dragLatHandler(position.lat,position.lng)
    //        // this.map.addObject(marker);
    //        let lat=position.lat;
    //        let lng=position.lng;
    //     } catch (err) {console.log(err)} 
    //     //}
         
    //    };
    render() {
      //   if(this.props.markerQuery){
      //     var geocoder = this.platform.getGeocodingService();
      //     if(count>0){
      //       this.group.removeObject(this.state.placeMarker)
      //     }
      //     count++;
      //     let geocodingParams = {
      //       searchText:""+this.props.searchArea+" "+  this.state.mapCentreText
      //     };
      //     geocoder.geocode(geocodingParams,(result)=>{ this.onResult1(result,this.behavior); console.log(geocodingParams)}, function(e) {
      //       alert(e); 
      //   })
      // }

        return (
            <div style={{height:'95%'}}>
            <div id="here-map"
            className={classes.HereMaps} 
            //onClick={(event)=>this.changeCoordinate(event,this.map)}       
            >
                <div className={classes.Coordinates} ><p>{this.props.markerLocationLat?this.props.markerLocationLat.toPrecision(6):null} ,{this.props.markerLocationLng?this.props.markerLocationLng.toPrecision(6):null}</p> </div>
            </div>
            
            </div>
        );
    }
}
export default HereMaps;