import React, { Component } from 'react';
import GoogleMap from './GoogleMap';
import Modal from 'react-modal';
import Places from './Places';
import shortID from 'short-id-gen';
import '../App.css';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

class App extends Component {
    constructor(props){
        super(props);

        //binding methods
        this.handleClick = this.handleClick.bind(this);
        this.onModalInputChange = this.onModalInputChange.bind(this);
        this.confirmAddPlace = this.confirmAddPlace.bind(this);
        this.cancelAddPlace = this.cancelAddPlace.bind(this);
        this.goToLocation = this.goToLocation.bind(this);

        this.state = {
            markers: [],
            modalIsOpen: false,
            modalInputValue: '',
            currentMarkerID: null,
            mapCenter: {
                lat: 40.17956771440295,
                lng: 44.51704104658768
            }
        }
    }

    //handler for map click. Getting latitude and longitude from the event object,
    //generating current markerID and keeping it in state for future reference when will be adding label to it
    handleClick(e) {
        const lat = e.latLng.lat(),
            lng = e.latLng.lng(),
            markerID = shortID.generate();

        this.setState( {
            currentMarkerID: markerID,
            modalIsOpen: true,
            markers: [
                ...this.state.markers,
                {
                    id: markerID,
                    label: '',
                    position: { lat, lng },
                    labelAnchor: new window.google.maps.Point(0, 60)
                }
            ]
        });
    }

    //handler for confirming the place add. Here I'm getting the marker by it's id, making changes to it
    //after setting state with new updated marker and rest of other markers
    confirmAddPlace() {
        const currentMarker = this.state.markers.filter(marker => marker.id === this.state.currentMarkerID)[0];
        const otherMarkers = this.state.markers.filter(marker => marker.id !== this.state.currentMarkerID);
        const updatedMarker = Object.assign({}, currentMarker, {label: this.state.modalInputValue});
        this.setState({
            currentMarkerID: null,
            modalInputValue: '',
            modalIsOpen: false,
            markers: [
                ...otherMarkers,
                updatedMarker
            ]
        });
    }

    //by canceling add place I'm just filtring current marker from the state object
    //then closing modal and resetting the input value and markerID
    cancelAddPlace() {
        const filteredMarkers = this.state.markers.filter(marker => marker.id !== this.state.currentMarkerID);
        this.setState({
            modalIsOpen: false,
            currentMarkerID: null,
            modalInputValue: '',
            markers: [
                ...filteredMarkers
            ]
        })
    }

    //controlling modal input and keeping it in state for setting it as a label in current marker
    onModalInputChange(e) {
        const inputValue = e.target.value;
        this.setState({
            modalInputValue: inputValue
        })
    }

    //handler for going to selected location
    goToLocation(e, position) {
        this.setState({
            mapCenter: {
                lat: position.lat,
                lng: position.lng
            }
        })
    }

    //Setting App element to modal for avoiding warnings. That should have been default
    //however there is some kind of bug in the lib right now, github issue was opened
    componentWillMount() {
        Modal.setAppElement('body');
    }

    render() {
        return (
            <div className="app">
                <div className="app-content">
                    <GoogleMap
                        googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places'
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ width: `70%`,height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        handleClick={this.handleClick}
                        markers={this.state.markers}
                        mapCenter={this.state.mapCenter}
                    />
                    <Places
                        markers={this.state.markers}
                        goToLocation={this.goToLocation}
                    />
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    style={customStyles}
                    contentLabel="Places Modal"
                >
                    <h4>Name Your selected place</h4>
                    <input type="text" onChange={this.onModalInputChange} value={this.state.modalInputValue}/>
                    <button onClick={this.confirmAddPlace}>Confirm</button>
                    <button onClick={this.cancelAddPlace}>Cancel</button>
                </Modal>
            </div>
        )
    }
}

export default App;
