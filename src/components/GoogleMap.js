import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

export default withScriptjs(withGoogleMap((props) => (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
            onClick={(e) => props.handleClick(e)}
        >
            {
                props.markers.map((marker, index) => {
                    return (
                        <Marker key={index} position={marker} />
                    )
                })
            }
        </GoogleMap>
    )
))