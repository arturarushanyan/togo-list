import React from 'react';

export default (props) => {
    return (
        <div className="places-list">
            <h3>Places that you want to visit</h3>
        {
            props.markers.map((marker) => {
                return (
                    <div className="place-item" onClick={(e) => props.goToLocation(e, marker.position)}>
                        <div>{marker.label}</div>
                    </div>
                )
            })
        }
        </div>
    )
}