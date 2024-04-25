import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
  const [dimensions, setDimensions] = useState({ width: 1280, height: 720 }); // Default dimensions
  const webcamRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = window.innerWidth; // Use window's inner width
      const maxHeight = window.innerHeight; // Use window's inner height
      const aspectRatio = 1280 / 720; // Aspect ratio of the webcam feed (width / height)

      let newWidth = maxWidth;
      let newHeight = maxHeight;

      // Calculate new dimensions while maintaining aspect ratio
      if (maxWidth / maxHeight > aspectRatio) {
        // If viewport width is wider
        newWidth = maxHeight * aspectRatio;
      } else {
        // If viewport height is taller
        newHeight = maxWidth / aspectRatio;
      }

      setDimensions({ width: newWidth, height: newHeight });
    };

    // Call handleResize initially and add event listener for resize events
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={dimensions.width}
        height={dimensions.height}
        videoConstraints={{
          width: dimensions.width,
          height: dimensions.height,
          facingMode: 'user',
        }}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  );
};

export default WebcamCapture;
