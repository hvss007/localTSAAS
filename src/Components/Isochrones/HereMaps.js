import Axios from 'axios'
import React, { Component } from 'react';
import classes from './HereMaps.css'
import {Slider,Typography} from '@material-ui/core'
import axios from 'axios'
import AutoComplete from './AutoComplete'
import Button from '@material-ui/core/Button';
import colorsArray from './assets/colors'
class  HereMaps extends Component {
    constructor(props) {
        super(props);
        this.colorsArray=[...colorsArray]
        //this.colorsArray=['rgb(255,0,0)','rgb(255,255,0)','rgb(0,255,0)'],
        //this.configArray=[{time:30,color:'rgba(255,0,0,.4)'},{time:15,color:'rgba(255,255,0,0.5)'},{time:5,color:'rgba(0,255,0,0.6)'}]
        this.platform = null;
        this.map = null;
        // this.imp={
        //   useCIT:true,
        //   app_id: props.app_id,
        //   app_code:props.app_code,
        //   useHTTPS:true,
        //   zoom: props.zoom,
        //   theme:props.theme,
        //   style: props.style,
        // }
        this.state = {
            configArray:[{time:30,color:'rgba(255,0,0,1)'},{time:15,color:'rgba(255,255,0,1)'},{time:5,color:'rgba(0,255,0,1)'}],
            nextUrl:'', 
            app_id: props.app_id,
            app_code: props.app_code,
            center: {
                lat: props.lat,
                lng: props.lng,
            },
            routingParams:{
              mode: 'fastest;car;traffic:enabled',
              // start: 'geo!28.7,77.1',
              rangetype: 'time'
            },
            mode:'',
            // citySelect:{
            //   searchText:'New Delhi'
            // },
            placeMarker:null,
            markerX:props.lat,
            markerY:props.lng,
            zoom: props.zoom,
            theme:props.theme,
            style: props.style,
            isolinePolygonArray:[],
            transparency:50,
            query:''
        }
        //this.addMarkersToMap=this.addMarkersToMap.bind(this)
    }

    componentDidMount() {
        this.platform = new window.H.service.Platform(this.state);

        var layer = this.platform.createDefaultLayers();
        var container = document.getElementById('here-map');
        this.map = new window.H.Map(container, layer.terrain.traffic, {
            center: this.state.center,
            zoom: this.state.zoom,
          })
        
        
        var events = new window.H.mapevents.MapEvents(this.map);
        // eslint-disable-next-line
        this.behavior = new window.H.mapevents.Behavior(events);
        // eslint-disable-next-line
        this.ui = new window.H.ui.UI.createDefault(this.map, layer)
        this.addMarkersToMap(this.map,this.behavior);
        // this.req();  
      // var bbox=''+bboxCont.getTopLeft().lat+','+bboxCont.getTopLeft().lng+','+bboxCont.getBottomRight().lat+','+bboxCont.getBottomRight().lng+''
        // var placeMarker=new window.H.map.Marker(...bboxCont.getBottomRight)
        // placeMarker.draggable=true;
        // this.map.addObject(placeMarker);
    }

    componentWillReceiveProps(nextProps){
      if(this.props.lat!==nextProps.lat){
        var centerCopy={lat:nextProps.lat,lng:nextProps.lng}
        this.map.setCenter( centerCopy,true)
        this.map.setZoom(this.state.zoom,true)
        //this.map.removeObject(this.state.placeMarker)  
        this.setState({center:centerCopy,markerX:centerCopy.lat,markerY:centerCopy.lng},()=>{
          this.addMarkersToMap(this.map,this.behavior)
        })
        
      }
      if(this.props.timeBins!==nextProps.timeBins){
          var configArrayCopy=[];
          if(nextProps.timeBins.search(",")!==-1&&nextProps.timeBins.length>=3&&nextProps.timeBins[nextProps.timeBins.length-1]!==","){
            var timeBinsStringArray=nextProps.timeBins.split(',');
              timeBinsStringArray.forEach((el,index)=>{
                  configArrayCopy.push({time:parseInt(el),color:this.changeHextorgba(this.colorsArray[index])});    
                })
            configArrayCopy.reverse();
            
            this.setState({configArray:configArrayCopy})
        }
      }
      if(this.props.pois!==nextProps.pois){
        this.map.removeObjects(this.map.getObjects())
        // var url='https://places.sit.ls.hereapi.com/places/v1/discover/explore?app_id='+this.props.app_id+'&app_code='+this.props.app_code+'&in='+this.state.center.lat+','+this.state.center.lng+';r=150000&cat='
        //var url='https://places.sit.ls.hereapi.com/places/v1/discover/explore?app_id='+this.props.app_id+'&app_code='+this.props.app_code+'&cat='
        var url="https://browse.search.hereapi.com/v1/browse?apikey="+process.env.REACT_APP_PLACES_API_KEY+"&at="+this.state.markerX+","+this.state.markerY+"&categories="
        // var url="https://places.ls.hereapi.com/places/v1/discover/explore?at="+this.state.center.lat+","+this.state.center.lng+"&apiKey="+process.env.REACT_APP_PLACES_API_KEY+"&cat="
        this.getPois(nextProps.pois,url)
      }
      if(this.props.secPois!==nextProps.secPois){
        this.map.removeObjects(this.map.getObjects())
        var url="https://browse.search.hereapi.com/v1/browse?apikey="+process.env.REACT_APP_PLACES_API_KEY+"&at="+this.state.markerX+","+this.state.markerY+"&categories="
        this.getPois(nextProps.secPois,url)
      }
      if(this.props.updatedFetchCount!==nextProps.updatedFetchCount){
        this.getPois('',this.state.nextUrl)
      }
      // if(this.props.mode!==nextProps.mode){
      //   this.setState({mode:nextProps.mode})
      // }
    }
    changeCoordinate=(event,map)=>{
        // var x= event.nativeEvent.offsetX;
        // var y= event.nativeEvent.offsetY
       // var coord=map.screenToGeo(x,y)
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
        this.setState({placeMarker:placeMarker})
        this.dragEventHandler(map,behavior);
    }

    dragEventHandler=(map,behavior)=>{
      map.addEventListener('dragstart', (ev)=> {
        var target = ev.target;
        if (target instanceof window.H.map.Marker) {
          behavior.disable();
        }
      }, false);
      map.addEventListener('dragend',(ev)=> {
        var target = ev.target;
        // this.getisoline()
        if (target instanceof window.mapsjs.map.Marker) {
          behavior.enable();
        }
      }, false);
    
       map.addEventListener('drag',(ev)=> {
        var target = ev.target,
            pointer = ev.currentPointer;
        if (target instanceof window.mapsjs.map.Marker) {
          target.setPosition(map.screenToGeo(pointer.viewportX, pointer.viewportY));
          var crd=map.screenToGeo(pointer.viewportX, pointer.viewportY)
          this.setState({markerX:crd.lat,markerY:crd.lng})  
        }
      }, false);
    }

    changeTransparency=(value)=>{
           this.state.isolinePolygonArray.forEach(el=>{
            var style={...el.getStyle()};
            var color=el.getStyle().fillColor;
            var strokeCol=el.getStyle().strokeColor
            var col=color.split(',')
            var colstr="";
            col[col.length-1]=""+this.state.transparency/100+")"
            colstr=col.join()
            style.fillColor=colstr
            style.strokeColor=colstr
            el.setStyle({...style})
        })    
    }
    handleChange = (event, newValue) => {
        // setValue(newValue);
        this.setState({transparency:newValue},()=>{
            this.changeTransparency(newValue)
        })
      };
    getPois=(pois,url)=>{
      var bboxCont=this.map.getViewBounds()
      var bbox=''+bboxCont.getTopLeft().lng+','+bboxCont.getBottomRight().lat+','+bboxCont.getBottomRight().lng+','+bboxCont.getTopLeft().lat+''
      //axios.get('https://places.sit.ls.hereapi.com/places/v1/discover/explore?app_id='+this.props.app_id+'&app_code='+this.props.app_code+'&in='+bbox+'&cat='+pois)
      
      axios.get(url+pois+"&limit="+this.props.noOfPoints,)
      .then(Response=>{
        // if(Response.data.next||Response.data.results.next){
        //   console.log("run1")
        //   if(Response.data.results){
        //     this.setState({nextUrl:Response.data.results.next})  
        //     Response.data.results.items.forEach(element => {
        //       this.getisoline(element.position,element.title)
        //     })
        //   }
        //   else if(Response.data.next||Response.data.previous){
            
        //     this.setState({nextUrl:Response.data.next})  
        //     Response.data.items.forEach(element => {
        //       this.getisoline(element.position,element.title)
        //     })
        //   }
        //   //this.setState({nextUrl:Response.data.results.next})
            
        // }
        // else{
          
        //   alert("no more results")
        //   Response.data.results.items.forEach(element => {
        //     this.getisoline(element.position,element.title)
        //   }) 
        // }
        //console.log(Response.data.items)
        Response.data.items.forEach(element => {
              let pos=[element.position.lat,element.position.lng]  
              this.getisoline(pos,element.title)
              })
        ;
      })
      .catch(e=>{
        console.log(e)
      })}
    onResult = (result)=> {
      var locations = result.Response.View[0].Result.Place.Locations[0],
          position
        position = {
          lat: locations[0].Location.DisplayPosition.Latitude,
          lng: locations[0].Location.DisplayPosition.Longitude
        };
        this.setState({lat:position.lat,lng:position.lng})
    };
     
      onResult1 = (result,color,zIndex)=> {
        var col=color.split(',')
        var colstr="";
        col[col.length-1]=""+this.state.transparency/100+")"
        colstr=col.join()
        var customStyle = {
          strokeColor: colstr,
          fillColor: colstr,
          lineWidth: 1,
          lineCap: 'square',
          lineJoin: 'bevel',
        };
          var isolineCoords = result.response.isoline[0].component[0].shape,
          linestring = new window.H.geo.LineString(),
          isolinePolygon
          //isolineCenter;
        
        // Add the returned isoline coordinates to a linestring:
        isolineCoords.forEach((coords)=> {
        linestring.pushLatLngAlt.apply(linestring, coords.split(','));
      });
        isolinePolygon = new window.H.map.Polygon(linestring,{style:customStyle});
        isolinePolygon.setZIndex(zIndex)
        var isolinePolygonArrayCopy=[...this.state.isolinePolygonArray];
        isolinePolygonArrayCopy.push(isolinePolygon);
        this.setState({isolinePolygonArray:isolinePolygonArrayCopy})
        this.map.addObject(isolinePolygon)
      };

       getisoline=(position,title)=>{
         var router=this.platform.getRoutingService()
        var placeMarker=new window.H.map.Marker({lat:position[0],lng:position[1]})
        placeMarker.setData(title)
        placeMarker.addEventListener('tap',(evt)=>{
          var bubble=new window.H.ui.InfoBubble(evt.target.getGeometry(),{
            content:evt.target.getData()
          })
          this.ui.addBubble(bubble)
        })
        this.map.addObject(placeMarker);
        var modeParams=''+this.props.modePreference+';'+this.props.mode+';traffic:'+this.props.modeState
        var rp=this.state.routingParams
        var start='geo!'+position[0]+','+position[1]
         this.state.configArray.forEach((el,index)=>{
          router.calculateIsoline({mode:modeParams,start:start,range:(el.time*60),rangetype:rp.rangetype},(result)=> {
            this.onResult1(result,el.color,index)},function(e){console.log(e)})
         })
        }
      selectedOption=(value)=>{
        var query=value.split("- ")
        //console.log(query)
        this.setState({query:query[1]})
        
      }

      fetchOnSameMap=()=>{
        Axios.get('https://places.cit.api.here.com/places/v1/autosuggest?at='+this.state.markerX+","+this.state.markerY+'&q='+this.state.query+'&app_id='+process.env.REACT_APP_PLACES_API_ID+'&app_code='+process.env.REACT_APP_PLACES_APP_CODE+"&size=100")
        .then(Response=>{
          if(Response.data.results.length>0){
            var posArray=Response.data.results.filter(el=>{
              return el.position&&el.category==="public-transport"
            })
            console.log(posArray)
            posArray.forEach(element => {
              this.getisoline(element.position,element.title)
            }) 
          }
        })
      }
      fetchOnDiffMap=()=>{
        this.map.removeObjects(this.map.getObjects())
        Axios.get('https://places.cit.api.here.com/places/v1/autosuggest?at='+this.state.markerX+","+this.state.markerY+'&q='+this.state.query+'&app_id='+process.env.REACT_APP_PLACES_API_ID+'&app_code='+process.env.REACT_APP_PLACES_APP_CODE)
        .then(Response=>{    
          if(Response.data.results.length>0){
            var posArray=Response.data.results.filter(el=>{
              return el.position
            })
            console.log(posArray)
            posArray.forEach(element => {
              this.getisoline(element.position,element.title)
            }) 
          }
        })
      }
      refreshMap=()=>{
        this.map.removeObjects(this.map.getObjects())
        // this.addMarkersToMap(this.map,this.behaviour)
      }
      changeHextorgba=(color)=>{
          var rgb=[]
          var hex = color.substr(1).split('');
          var i=0;
          var x=0;
          var hexStr;
          while (i < 3) {
            hexStr = hex[x] + hex[x + 1];
            rgb[i] = parseInt(hexStr, 16);
            i += 1;
            x = i * 2;
        }
      rgb.push(1);
      var rgbaStr='rgba('+rgb.join()+')'
      return rgbaStr
    }    
    render() {
        const legend=this.state.configArray.map(el=>{
            return(
                <div className={classes.LegendItemContainer}>
                    <div style={{width:'20px',height:'20px',background:el.color}}></div>
                    <p>{el.time} mins</p>
                </div>
            )
        })
        return (
            <div className={classes.MapContainer}>
            <div id="here-map" onClick={(event)=>this.changeCoordinate(event,this.map)} style={{width: '100%', height: '100%', background: 'black'}} />
                <div  className={classes.LegendContainer}>
                    
                    <h3  style={{textAlign:'center'}}>Legend</h3>
                    {legend}
                    <div className={classes.RefreshButtonContainer}>
                    <Button onClick={this.refreshMap} style={{fontSize:'12px',backgroundColor:'#449DD1'}}variant="contained" color="primary" component="span">Refresh Map</Button>
                    </div>
                    
                    
                </div>
                <div className={classes.MapLeftControls}>
                <div className={classes.MapLeftControlsIn}>
                {/* <h3  style={{textAlign:'center'}}>Search for reqd position</h3>
                    <AutoComplete lat={this.state.center.lat} lng={this.state.center.lng} selectedOption={this.selectedOption}/>
                    <div className={classes.ButtonsContainer }>
                        <Button onClick={this.fetchOnSameMap} style={{fontSize:'12px',backgroundColor:'#449DD1'}}variant="contained" color="primary" component="span">Fetch on Current Map</Button>
                        <Button onClick={this.fetchOnDiffMap}style={{fontSize:'12px',backgroundColor:'#449DD1'}}variant="contained" color="primary" component="span">Fetch on Diff Map</Button>
                      </div>     */}
                        <Typography id="disabled-slider" gutterBottom>
                            Transparency
                        </Typography>
                        {/* <Slider  value={this.state.transparency}  onChange={this.handleChange}  aria-labelledby="continuous-slider" /> */}
                        <Slider defaultValue={50}  onChange={this.handleChange} aria-labelledby="discrete-slider" valueLabelDisplay="auto" step={10} marks min={0} max={100} />
                    </div>
                  </div> 
            {/* <input type="text" value={this.props.value} onChange={()=>{
                let text=this.props.inputChange;
                ()=>this.req();                
                }}></input> */}
            </div>
        );
    }
}
export default HereMaps;