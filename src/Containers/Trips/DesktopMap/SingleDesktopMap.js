import React, { Component } from 'react';

 var count=0
class SingleDesktopMap extends Component{
    constructor(props) {
        super(props);
        this.imp={
          app_id: process.env.REACT_APP_PLACES_API_ID,
         app_code:process.env.REACT_APP_PLACES_APP_CODE,
        }
        this.count=0;
        this.state = {
          dataLoaded:false,count:0,
          mapCentreText:this.props.setMapSearchText,
          tripElements:this.props.tripElements
        //   trips:[...this.props.tripElements]
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
        this.mapCentreText=this.props.setMapSearchText;
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
          var location=result.Response.View[0].Result[0].Location.DisplayPosition;
          //  console.log(location);
           let obj={
             center: {
              lat: location.Latitude,
              lng: location.Longitude,
             },
            
              lat:location.Latitude,
              lng:location.Longitude,
              zoom: 14,
              theme:'normal.day',
              arr:[],
              count:0,
              placeMarker:null,
              displayText:[],
              finalPassArrat:[],
              searchText:props.searchArea,
              
            }   
           this.setState({dataLoaded:true,...obj},()=>{
          this.props.mapCenter(this.state.center.lat,this.state.center.lng)
        });           
         }, function(e) {
          alert(e);

        });
        // console.log(this.location)

    }
    componentWillReceiveProps(nextProps,nextState){
        const tripElementsCopy=[...this.state.tripElements]
        const newTripElementsCopy=[...nextProps.tripElements]
        const differentElements= newTripElementsCopy.filter((item,index)=>{
            return item.originLat!==tripElementsCopy[index].originLat
        })
        //  console.log(differentElements)
        // if(nextProps.tripElements!==this.props.tripElements){
        //     this.setState({trips:[...nextProps.tripElements]},()=>{
        //         this.state.trips.map((item,index)=>{
        //             if(item.originLat!==null){
        //                 this.addMarkersToMap({lat:item.originLat,lng:item.originLng},this.behavior)
        //             }
        //         })
        //     })
        //     return true
        // }
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
        if(this.props.setMapSearchText!==nextProps.setMapSearchText){
          
            // console.log(nextProps.setMapSearchText)
          this.setState({mapCentreText:nextProps.setMapSearchText})
           var geocoder = this.platform.getGeocodingService();
          let geocodingParams = {
            searchText:nextProps.setMapSearchText+ " India"
          };
          geocoder.geocode(geocodingParams,(result)=>{ 
            // console.log(result)
            // console.log(result.Response.View[0].Result[0].Location.DisplayPosition)
            if(result.Response.View.length>0) {
              var location=result.Response.View[0].Result[0].Location.DisplayPosition;  
              const center={
                lat:location.Latitude,
                lng:location.Longitude
              }
              // console.log(center);
              this.map.setCenter({lat:center.lat, lng:center.lng});
              this.setState({center:center},()=>{
  
                // this.layer = this.platform.createDefaultLayers();
            // this.container = document.getElementById('singleDesktopMap');
            // this.map = new window.H.Map(this.container, this.layer.normal.map, {
            //   center: this.state.center,
            //   zoom: this.state.zoom,
            // })
                //  console.log(this.state.center)
                //  console.log(this.map)
               
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
            }},function(e){alert})
          return true;
        }
        
        // if(this.props.searchArea!==nextProps.searchArea){
        //   console.log(this.props.searchArea)
        //   this.group.removeObject(this.state.placeMarker);
        //   return true;
        // }
      }
      componentDidUpdate(prevProps,prevState) {
        // console.log("when it works")
          if(this.state.dataLoaded&&this.state.count===0){
            this.layer = this.platform.createDefaultLayers();
            this.container = document.getElementById('singleDesktopMap');
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
              <div id="singleDesktopMap" 
              //onClick={(event)=>this.changeCoordinate(event,this.map)} 
              style={{width: '100%', height:'100%', background: 'grey' }} />
              </div>
          );
      }
}
export default SingleDesktopMap;