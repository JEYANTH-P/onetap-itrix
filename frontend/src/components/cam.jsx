import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { FaCamera, FaSync } from 'react-icons/fa';

const WebcamCapture = () => {
  const [dimensions, setDimensions] = useState({ width: 1280, height: 720 });
  const webcamRef = useRef(null);
  const [isFrontCamera, setIsFrontCamera] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = window.innerWidth;
      const maxHeight = window.innerHeight;
      const aspectRatio = 1280 / 720;

      let newWidth = maxWidth;
      let newHeight = maxHeight;

      if (maxWidth / maxHeight > aspectRatio) {
        newWidth = maxHeight * aspectRatio;
      } else {
        newHeight = maxWidth / aspectRatio;
      }

      setDimensions({ width: newWidth, height: newHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  };

  const switchCamera = () => {
    setIsFrontCamera(!isFrontCamera);
  };

  return (
    <div className="relative w-full h-full">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={dimensions.width}
        height={dimensions.height}
        videoConstraints={{
          width: dimensions.width,
          height: dimensions.height,
          facingMode: isFrontCamera ? 'user' : { exact: 'environment' },
        }}
        className="w-full h-full"
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center">
        <button onClick={capture} className="bg-white p-3 rounded-full mr-4">
          <FaCamera size={24} />
        </button>
        <button onClick={switchCamera} className="bg-white p-3 rounded-full">
          <FaSync size={24} />
        </button>
      </div>
    </div>
  );
};

export default WebcamCapture;
