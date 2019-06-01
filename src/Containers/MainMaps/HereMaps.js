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
            zoom: props.zoom,
            theme:props.theme,
            style: props.style,
        }
    }

    // TODO: Add theme selection discussed later HERE

    componentDidMount() {
        this.platform = new window.H.service.Platform(this.state);

        var layer = this.platform.createDefaultLayers();
        var container = document.getElementById('here-map');

        this.map = new window.H.Map(container, layer.normal.map, {
            center: this.state.center,
            zoom: this.state.zoom,
          })

        var events = new window.H.mapevents.MapEvents(this.map);
        // eslint-disable-next-line
        var behavior = new window.H.mapevents.Behavior(events);
        // eslint-disable-next-line
        var ui = new window.H.ui.UI.createDefault(this.map, layer)
        this.addMarkersToMap(this.map,behavior);
        this.req();  
    }
    componentWillUnmount(){
        
    }
    shouldComponentUpdate(props, state) {
        this.changeTheme(props.theme, props.style);
        return false;
    }
    changeCoordinate=(event,map)=>{
        var x= event.nativeEvent.offsetX;
        var y= event.nativeEvent.offsetY
        var coord=map.screenToGeo(x,y)
        console.log(coord);
        
    }
    changeTheme(theme, style) {
        var tiles = this.platform.getMapTileService({'type': 'base'});
        var layer = tiles.createTileLayer(
            'maptile',
            theme,
            256,
            'png',
            {'style': style}
        );
        this.map.setBaseLayer(layer);
    }
    addMarkersToMap(map,behavior){
        var placeMarker=new window.H.map.Marker({lat:this.state.center.lat, lng:this.state.center.lng})
        placeMarker.draggable=true;
        map.addObject(placeMarker);
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
           map.addEventListener('drag', function(ev) {
            var target = ev.target,
                pointer = ev.currentPointer;
            if (target instanceof window.mapsjs.map.Marker) {
              target.setPosition(map.screenToGeo(pointer.viewportX, pointer.viewportY));
            }
          }, false);   
    }
     geocodingParams = {
        searchText: 'Jantar Mantar Jaipur India'
      };
     onResult = (result)=> {
        var locations = result.Response.View[0].Result,
          position,
          marker;
        // Add a marker for each location found
        var lat;
        var lng;
        for (let i = 0;  i < locations.length; i++) {
        position = {
          lat: locations[i].Location.DisplayPosition.Latitude,
          lng: locations[i].Location.DisplayPosition.Longitude
        };
        marker = new window.H.map.Marker(position);
        this.map.addObject(marker);
        console.log(lat,lng)
        }
      };
       req=()=>{
        var geocoder = this.platform.getGeocodingService();
       geocoder.geocode(this.geocodingParams, this.onResult, function(e) {
        alert(e);
      });
       }
    render() {
        return (
            <div>
            <div id="here-map" onClick={(event)=>this.changeCoordinate(event,this.map)} style={{width: '100%', height: '400px', background: 'grey' }} />
            <input type="text" value={this.props.value} onChange={()=>{
                let text=this.props.inputChange;
                // ()=>this.req();                
                }}></input>
            </div>
        );
    }
}
export default HereMaps;