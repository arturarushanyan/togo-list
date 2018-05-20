import React from 'react';
import shortID from 'short-id-gen';

export default (props) => {
    const placesToVisit = props.markers.map((marker) => {
        return (
            <div
                key={shortID.generate()}
                className={marker.isVisited ? "place-item visited" : "place-item"}
                onClick={(e) => props.goToLocation(e, marker.position)}
            >
                <div>{marker.label}</div>
                <button className="btn btn-remove" onClick={(e) => props.removePlace(e, marker.id)}>Remove Place</button>
                <button className="btn btn-visited" onClick={(e) => props.markAsVisited(e, marker.id)}>Mark as Visited</button>
            </div>
        )
    });

    return (
        <div className="places-list">
            <h3>Places that you want to visit</h3>
            <input type="text" placeholder="Search Place"/>
        {
            props.markers.length ?
                placesToVisit :
                <p>You haven't marked places yet </p>
        }
        </div>
    )
}