import React from 'react';
import Axios from 'axios';
// Import the Autocomplete Component
import Autocomplete from 'react-autocomplete';

export default class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        // Set initial State
        this.state = {
            // Current value of the select field
            value: "",
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
        let _this = this;

        Axios.get('https://places.cit.api.here.com/places/v1/autosuggest?at='+this.props.centerLat+','+this.props.centerLng+'&q='+this.state.value +'&app_id='+process.env.REACT_APP_PLACES_API_ID+'&app_code='+'b_is4SmSRfh8e0-Mr2-low')
        .then(Response=>{
          let ResponseArrayResponse=Response.data.results;
          let elementsArray=[];
          
          ResponseArrayResponse.forEach((element,index) => {
            let dataObj={label:""+element.title+" "+element.vicinity,value:index+1}  
            //elementsArray.push(""+element.title+" "+element.vicinity);
            elementsArray.push(dataObj)
          });

          //this.props.dropdownArrayHandler(elementsArray)
         // this.setState({ResponseArrayText:elementsArray},()=>{
            
          //})
          this.setState({
            autocompleteData: elementsArray,
            responseArray:ResponseArrayResponse
        });

          
          console.log(Response);
          console.log(elementsArray)
        })
        
        // // Url of your website that process the data and returns a
        // let url = `mywebsite/searchApi?query=${searchText}`;
        
        // // Configure a basic AJAX request to your server side API
        // // that returns the data according to the sent text
        // let xhr = new XMLHttpRequest();
        // xhr.open('GET', url, true);
        // xhr.responseType = 'json';
        // xhr.onload = () => {
        //     let status = xhr.status;

        //     if (status == 200) {
        //         // In this example we expects from the server data with the structure of:
        //         // [
        //         //    {
        //         //        label: "Some Text",
        //         //        value: 1,
        //         //    },
        //         //    {
        //         //        label: "Some Other Text",
        //         //        value: 1,
        //         //    },
        //         // ]
        //         // But you can obviously change the render data :)

        //         // Update the state with the remote data and that's it !
        //         _this.setState({
        //             autocompleteData: xhr.response
        //         });

        //         // Show response of your server in the console
        //         console.log(xhr.response);
        //     } else {
        //         console.error("Cannot load data from remote source");
        //     }
        // };

        // xhr.send();
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

        console.log("The Input Text has changed to ", e.target.value);
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
        let arr=this.state.responseArray[val[0]-1].position
        this.setState({
            value: val
        },()=>this.props.selectedOption(this.state.value,arr[0],arr[1]));
        
        console.log("Option from 'database' selected : ", val);
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
            <div key="vad">
                <Autocomplete
                    getItemValue={this.getItemValue}
                    items={this.state.autocompleteData}
                    renderItem={this.renderItem}
                    value={this.state.value}
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                />
            </div>
        );
    }
}
