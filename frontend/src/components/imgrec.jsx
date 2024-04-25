import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

const ImageRecognitionComponent = ({ imgur }) => {
  const [prediction, setPrediction] = useState('');

  useEffect(() => {
    const image = new Image();
    image.src = imgur;
    image.crossOrigin = "anonymous"; // Add this line to handle CORS issues

    let model;
    async function loadModelAndPredict() {
      model = await mobilenet.load();
      const predictions = await model.classify(image);
      setPrediction(predictions[0].className);
    }

    if (imgur) {
      loadModelAndPredict();
    }

    return () => {
      model = null;
    };
  }, [imgur]);

  return (
    <div>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
};

export default ImageRecognitionComponent;