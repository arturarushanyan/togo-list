import React, { Component } from 'react';
import GoogleMap from './GoogleMap';
import '../App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            markers: []
        }
    }
    handleClick(e) {
        let lat = e.latLng.lat(),
            lng = e.latLng.lng()
        console.log(lat,lng);
        this.setState({
            markers: [
                ...this.state.markers,
                { lat, lng }
            ]
        })
    }
    render() {
    return (
        <div>
            <GoogleMap
                       googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places'
                       loadingElement={<div style={{ height: `100%` }} />}
                       containerElement={<div style={{ height: `400px` }} />}
                       mapElement={<div style={{ height: `100%` }} />}
                       handleClick={this.handleClick}
                       markers={this.state.markers}
            />
        </div>
    )
    }
}

export default App;
