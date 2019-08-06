import React from 'react';
import Axios from 'axios';
// Import the Autocomplete Component
import Autocomplete from 'react-autocomplete';
import classes from './AutoComplete1.css';
export default class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        // Set initial State
        this.state = {
            // Current value of the select field
            value: this.props.initialLandmark ? this.props.initialLandmark: "",
            // Data that will be rendered in the autocomplete
            // As it is asynchronous, it is initially empty
            autocompleteData: [],
            responseArray:[]
        };
        
        // Bind `this` context to functions of the class
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.getItemValue = this.getItemValue.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
    }


    /**
     * Updates the state of the autocomplete data with the remote data obtained via AJAX.
     * 
     * @param {String} searchText content of the input that will filter the autocomplete data.
     * @return {Nothing} The state is updated but no value is returned
     */
    retrieveDataAsynchronously(searchText){
        // let _this = this;
        //console.log(process.env)
        Axios.get('https://places.cit.api.here.com/places/v1/autosuggest?at='+this.props.centerLat+','+this.props.centerLng+'&q='+this.state.value +'&app_id='+process.env.REACT_APP_PLACES_API_ID+'&app_code='+process.env.REACT_APP_PLACES_APP_CODE)
        .then(Response=>{
          let ResponseArrayResponse=Response.data.results;
          let elementsArray=[];
          if(ResponseArrayResponse.length>0){
            ResponseArrayResponse.forEach((element,index) => {
                var vicinity=element.vicinity?element.vicinity:'';   
                let firstIndex=vicinity.indexOf("<")                
                if(firstIndex>=0){
                    vicinity=vicinity.split('<')[0]+vicinity.split('<')[1].split('>')[1]
                }
                let dataObj={label:""+element.title+" "+vicinity,value:index+1}  
                //elementsArray.push(""+element.title+" "+element.vicinity);
                elementsArray.push(dataObj)
              });
              const newArr=ResponseArrayResponse.filter(item=>{
                    return item.vicinity
              })
              this.setState({
                autocompleteData: elementsArray,
                responseArray:newArr
            });
          }
          else{
            // console.log(ResponseArrayResponse)
          }
        },error=>{
            alert("Unable to  connect to geocoding service")
        }
        )
    }
    
    /**
     * Callback triggered when the user types in the autocomplete field
     * 
     * @param {Event} e JavaScript Event
     * @return {Event} Event of JavaScript can +be used as usual.
     */
    onChange(e){
        this.setState({
            value: e.target.value
        });

        /**
         * Handle the remote request with the current text !
         */
        this.retrieveDataAsynchronously(e.target.value);

        //console.log("The Input Text has changed to ", e.target.value);
    }

    /**
     * Callback triggered when the autocomplete input changes.
     * 
     * @param {Object} val Value returned by the getItemValue function.
     * @return {Nothing} No value is returned
     */
    onSelect(val){
        // var jf=this.state.autocompleteData.findIndex((item)=>{
        //     console.log(item.label)
        //     return item.label===val
        // })

        // console.log(jf)
        
        if(this.state.responseArray.length>=0){
            const newArr=this.state.responseArray.filter(item=>{
                return item.vicinity
            })
            let arr=newArr[val[0]-1].position
        this.setState({
            value: val
            
        },()=>{
            this.props.selectedOption(this.state.value,arr[0],arr[1])
            
        });
        
        }
        
        //console.log("Option from 'database' selected : ", val);
    }

    /**
     * Define the markup of every rendered item of the autocomplete.
     * 
     * @param {Object} item Single object from the data that can be shown inside the autocomplete
     * @param {Boolean} isHighlighted declares wheter the item has been highlighted or not.
     * @return {Markup} Component
     */
    renderItem(item, isHighlighted){
        return (
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.label}
            </div>   
        ); 
    }

    /**
     * Define which property of the autocomplete source will be show to the user.
     * 
     * @param {Object} item Single object from the data that can be shown inside the autocomplete
     * @return {String} val
     */
    getItemValue(item){
        // You can obviously only return the Label or the component you need to show
        // In this case we are going to show the value and the label that shows in the input
        // something like "1 - Microsoft"
        return `${item.value} - ${item.label}`;
    }

    render() {
        return (
            <div className={classes.AutoCompleteWrapper} key="vad">
                <Autocomplete
                    getItemValue={this.getItemValue}
                    items={this.state.autocompleteData}
                    renderItem={this.renderItem}
                    value={this.state.value}
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                    inputProps={{ placeholder: 'Enter the nearest landmark here.'}}
                />
            </div>
        );
    }
}
