import React, { useState } from 'react';
import Map from '../components/map';
import WebcamCapture from '../components/cam';

function Home() {
  const [isCapturing, setIsCapturing] = useState(false);

  const startCapture = () => {
    setIsCapturing(true);
  };

  return (
    <>
      {!isCapturing && (
        <>
          <Map />
          <div>Home</div>
          <button onClick={startCapture} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Start Capture
          </button>
        </>
      )}
      {isCapturing && <WebcamCapture />}
    </>
  );
}

export default Home;
