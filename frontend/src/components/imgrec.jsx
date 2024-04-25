import React, { useState, useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';
import axios from 'axios';

const ImageRecognitionComponent = ({ imgur, description }) => {
    const [model, setModel] = useState(null);
    const [maxPredictions, setMaxPredictions] = useState(0);
    const [predictionResult, setPredictionResult] = useState([]);

    useEffect(() => {
        const URL = "https://teachablemachine.withgoogle.com/models/pOUP0AL27/";
        const init = async () => {
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";

            const loadedModel = await tmImage.load(modelURL, metadataURL);
            setModel(loadedModel);
            setMaxPredictions(loadedModel.getTotalClasses());
        };

        init();
    }, []);

    useEffect(() => {
        const predictImage = async () => {
            if (model && imgur) {
                const imageElement = document.createElement('img');
                imageElement.src = imgur;
                const prediction = await model.predict(imageElement);
                setPredictionResult(prediction);
            }
        };

        predictImage();
    }, [model, imgur]);

    useEffect(() => {
        // Find the prediction with the highest probability
        const maxProbabilityPrediction = predictionResult.reduce((maxPrediction, prediction) => {
            return prediction.probability > maxPrediction.probability ? prediction : maxPrediction;
        }, predictionResult[0]); // Initialize with the first prediction
    
        const combinedData = {
            predictionResult: maxProbabilityPrediction,
            imgur: imgur,
            description: description
        };
    
        // Convert combinedData to JSON format
        const combinedDataJSON = JSON.stringify(combinedData);
        console.log(combinedDataJSON)
        // Send the combinedDataJSON to localhost:3000 using Axios
        axios.post('http://localhost:3000/imgrec', combinedData)
            .then(response => {
                console.log('Data sent successfully:', response.data);
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    }, [predictionResult, imgur, description]);
    
    return (
        <div>
            <h2>Prediction Results:</h2>
            <ul>
                {predictionResult.map((prediction, index) => (
                    <li key={index}>
                        {prediction.className}: {prediction.probability.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ImageRecognitionComponent;
