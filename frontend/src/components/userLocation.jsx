import React, { useState } from 'react';
import Map from './map';

const UserLocation = () => {
    const [userLocation, setUserLocation] = useState(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(sendLocation);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    const sendLocation = (position) => {
        const location = [position.coords.latitude, position.coords.longitude];
        setUserLocation(location);
    }

    return (
        <div>
            <button onClick={getLocation}>Get My Location</button>
            {userLocation && <Map point={userLocation} />}
        </div>
    );
}

export default UserLocation;