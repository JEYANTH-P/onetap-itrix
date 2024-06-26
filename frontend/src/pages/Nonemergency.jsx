import React, { useState } from 'react';
import Map from '../components/map';
import WebcamCapture from '../components/cam';
import ImageRecognitionComponent from '@/components/imgrec';

function Home() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [imageRecognitionComponent, setImageRecognitionComponent] = useState(null);

  const handleCapture = (imageData) => {
    setCapturedImage(imageData);
    setShowCamera(false);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setShowCamera(true);
  };

  const sendpic = () => {
    // Pass the capturedImage to the ImageRecognitionComponent
    if (capturedImage) {
      setImageRecognitionComponent(<ImageRecognitionComponent imgur={capturedImage} description={textInput} />);
    }
  };

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  return (
    <>
      <Map />
      <div>Home</div>
      {!capturedImage && !showCamera && (
        <button onClick={() => setShowCamera(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Capture Image
        </button>
      )}
      {showCamera && <WebcamCapture onCapture={handleCapture} />}
      {capturedImage && (
        <div className="mt-4">
          <img src={capturedImage} alt="Captured" className="mx-auto" />
          <button onClick={retakePhoto} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
            Retake Photo
          </button>
          <input
            type="text"
            value={textInput}
            onChange={handleTextChange}
            placeholder="Enter text here"
            className="mt-2 p-2 border border-gray-300 rounded"
          />
          <button onClick={sendpic}>Send</button>
          {imageRecognitionComponent}
        </div>
      )}
    </>
  );
}

export default Home;