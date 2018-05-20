import React, { Component } from 'react';
import GoogleMap from './GoogleMap';
import Modal from 'react-modal';
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
        this.handleClick = this.handleClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onModalInputChange = this.onModalInputChange.bind(this);
        this.confirmAddPlace = this.confirmAddPlace.bind(this);
        this.cancelAddPlace = this.cancelAddPlace.bind(this);
        this.state = {
            markers: [],
            modalIsOpen: false,
            modalInputValue: '',
            currentMarkerID: null
        }
    }
    handleClick(e) {
        const lat = e.latLng.lat(),
            lng = e.latLng.lng(),
            markerID = shortID.generate();

        this.setState({
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

    confirmAddPlace() {
        const currentMarker = this.state.markers.filter(marker => marker.id === this.state.currentMarkerID)[0];
        const otherMarkers = this.state.markers.filter(marker => marker.id !== this.state.currentMarkerID);
        const updatedMarker = Object.assign({}, currentMarker, {label: this.state.modalInputValue});
        this.setState({
            modalIsOpen: false,
            markers: [
                ...otherMarkers,
                updatedMarker
            ]
        });
    }

    cancelAddPlace() {
        const filteredMarkers = this.state.markers.filter(marker => marker.id !== this.state.currentMarkerID);
        this.setState({
            modalIsOpen: false,
            markers: [
                ...filteredMarkers
            ]
        })
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    onModalInputChange(e){
        const inputValue = e.target.value;
        console.log(inputValue);
        this.setState({
            modalInputValue: inputValue
        })
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    componentWillMount() {
        Modal.setAppElement('body');
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
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
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
