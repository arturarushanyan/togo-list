export default {
    stylesConfig: {
        modalCustomStyles: {
            content : {
                top: '35%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        },
        loadingElement: { height: `100%` },
        containerElement: { width: `100%`,height: `400px` },
        mapElement: { height: `100%` }
    },

    mapConfig: {
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places'
    }
}