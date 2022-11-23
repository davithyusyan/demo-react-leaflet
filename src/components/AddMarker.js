import {  Marker,useMapEvents } from 'react-leaflet';
import React, { useState } from 'react'

const AddMarker = ({handleMarker}) => {
    const [position, setPosition] = useState(null);

    useMapEvents({
        click: (e) => {
            setPosition(e.latlng);
            handleMarker(e.latlng)
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
};

export default AddMarker;