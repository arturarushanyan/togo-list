import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';


export default withScriptjs(withGoogleMap((props) => (
        <GoogleMap
            defaultZoom={16}
            defaultCenter={{ lat: 40.17956771440295, lng: 44.51704104658768 }}
            onClick={(e) => props.handleClick(e)}
        >
            {
                props.markers.map((marker, index) => {
                    return (
                        <MarkerWithLabel
                            key={index}
                            position={marker.position}
                            labelAnchor={marker.labelAnchor}
                            labelStyle={{backgroundColor: "yellow", fontSize: "13px", padding: "5px"}}
                        >
                            <div>{marker.label}</div>
                        </MarkerWithLabel>
                    )
                })
            }
        </GoogleMap>
    )
))