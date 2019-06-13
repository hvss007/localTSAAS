import React, { Component } from 'react';


class  HereMaps extends Component {
    constructor(props) {
        super(props);

        this.platform = null;
        this.map = null;

        this.state = {
            app_id: props.app_id,
            app_code: props.app_code,
            center: {
                lat: props.lat,
                lng: props.lng,
            },
            lat:props.lat,
            lng:props.lng,
            zoom: props.zoom,
            theme:props.theme,
            arr:[],
            count:0,
            displayText:[],
            finalPassArrat:[],
            searchText:props.searchArea
        }
    }

    // TODO: Add theme selection discussed later HERE

    componentDidMount() {
        this.platform = new window.H.service.Platform(this.state);

        this.layer = this.platform.createDefaultLayers();
        this.container = document.getElementById('here-map');
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
    }
    componentWillUnmount(){
        
    }
    shouldComponentUpdate(nextProps, nextState) {
        //this.changeTheme(props.theme, props.style);
        if(this.props.searchArea!==nextProps.searchArea){
          this.map.addObject(this.group);
          this.req(this.behavior);
          this.setState({count:this.state.count+1})
          this.setState({arr:[null]});
          return true
        }
        return false;
    }
    changeCoordinate=(event,map)=>{
        var x= event.nativeEvent.offsetX;
        var y= event.nativeEvent.offsetY
        var coord=map.screenToGeo(x,y)
    }
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
        placeMarker.draggable=true;
        let map=this.map;
        //let behavior=this.behavior;
        //map.removeObject(this.group);        
        this.group.addObject(placeMarker);
        this.dragEventHandler(map,behavior);
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
          this.setState({lat:x,lng:y},
          ()=>  console.log(this.props.searchArea));
        }
      }, false);
    }


     onResult = (result,behavior)=> {
       //if(result){
         try{
        var locations = result.Response.View[0].Result,
        position,
        marker;
        // Add a marker for each location found
        for (let i = 0;  i < locations.length; i++) {
          position = {
            lat: locations[i].Location.DisplayPosition.Latitude,
            lng: locations[i].Location.DisplayPosition.Longitude
          };
         // marker = new window.H.map.Marker(position);
          // if(marker){

          // }
          //this.map.removeObjects();
          //this.addMarkersToMap(position,behavior);
          // this.map.addObject(marker);
          let lat=position.lat;
          let lng=position.lng;
          this.reverseGeocode(lat,lng)
        }} catch (err) {console.log(err)} 
       //}
        
      };
       req=(behavior)=>{
        var geocoder = this.platform.getGeocodingService();
        let geocodingParams = {
          searchText:""+this.props.searchArea+" jaipur rajasthan india"
        };
        geocoder.geocode(geocodingParams,(result)=>{ this.onResult(result,behavior); }, function(e) {
          alert(e);

        });

       }

       reverseGeocode=(lat,lng)=> {
        var geocoder = this.platform.getGeocodingService(),
          reverseGeocodingParameters = {
            prox: ""+lat+","+lng, // Berlin
            mode: 'retrieveAddresses',
            jsonattributes : 1
          };
        geocoder.reverseGeocode(
          reverseGeocodingParameters,
          this.onSuccess,
          this.onError
        );
      }
      
      onSuccess=(result)=> {
        var locations = result.response.view[0].result;
       /*
        * The styling of the geocoding response on the map is entirely under the developer's control.
        * A representitive styling can be found the full JS + HTML code of this example
        * in the functions below:
        */
       const positionsArrayText=[];
      //  for (let i = 0;  i < locations.length; i++) {
      //   // let position = {
      //   //   positionEntry: locations[i].location.address.label
      //   // };
      //   positionsArrayText.push(locations[i].location.address.label);
      // }
      positionsArrayText.push(locations[0].location.address.label)
      let arr=[...this.state.arr];
      arr.push(positionsArrayText);
      this.setState({arr:arr},()=>{
          this.arrayTextHandler();
        });
        //addLocationsToMap(locations);
        //addLocationsToPanel(locations);
        // ... etc.
      }
      // /**
      //  * This function will be called if a communication error occurs during the JSON-P request
      //  * @param  {Object} error  The error message received.
      //  */
       onError=(error)=> {
        alert('Ooops!');
      }
      arrayTextHandler=()=>{
        const displayArr=[...this.state.arr];
        let len=displayArr.length;
        const finalArr=[...this.state.finalPassArrat];
        finalArr.splice(0,len);
        for(let i=1;i<len;i++){
          finalArr.push(displayArr[i][0]);
        }
        this.setState({finalPassArrat:finalArr},
          ()=>{
            this.props.autocompleteArrayHandler(this.state.finalPassArrat)
          });
        
      }
      onResult1 = (result,behavior)=> {
        //if(result){
          try{
         var locations = result.Response.View[0].Result,
         position,
         marker;
         // Add a marker for each location found
           position = {
             lat: locations[0].Location.DisplayPosition.Latitude,
             lng: locations[0].Location.DisplayPosition.Longitude
           };

          // marker = new window.H.map.Marker(position);
           // if(marker){
 
           // }
           console.log(position);
           //this.map.removeObjects();
           this.addMarkersToMap(position,behavior);
           // this.map.addObject(marker);
           let lat=position.lat;
           let lng=position.lng;
        } catch (err) {console.log(err)} 
        //}
         
       };
    render() {
        if(this.props.markerQuery){
          var geocoder = this.platform.getGeocodingService();
          let geocodingParams = {
            searchText:""+this.props.searchArea+" jaipur rajasthan india"
          };
          geocoder.geocode(geocodingParams,(result)=>{ this.onResult1(result,this.behavior); console.log(geocodingParams)}, function(e) {
            alert(e); 
        })
      }

        return (
            <div>
            <div id="here-map" onClick={(event)=>this.changeCoordinate(event,this.map)} style={{width: '100%', height: '400px', background: 'grey' }} />
            </div>
        );
    }
}
export default HereMaps;