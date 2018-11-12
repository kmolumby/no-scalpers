
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
    constructor() {
        super();
        this.state = {
        showingInfoWindow: false,  
        activeMarker: {},         
        selectedPlace: {}          
      };
    }
    
   


  render() {

    const allSearchResults = this.props.searchResults.map((searchResult, i) =>{
      console.log(searchResult);
      return (<Marker key={i} 
        position={{lat: searchResult.location.lat,
            lng: searchResult.location.lng
        }}
       />)
    });

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        
     >
        {allSearchResults}
      
      </Map>
    );
  }

}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyB3cnf0QZnOYfHCu1eElopL5grod6fyePU'
})(MapContainer);