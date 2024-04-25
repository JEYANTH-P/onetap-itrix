import React, { useState } from 'react';
import Cmap from './cmap';

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
        console.log(location);
        setUserLocation(location);
    }

    return (
        <div>
            <button onClick={getLocation}>Get My Location</button>
            {userLocation && <Cmap points={userLocation} />}
        </div>
    );
}

export default UserLocation;