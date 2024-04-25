// server.js

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
console.log(__dirname);
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to serve static files


// ...

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    console.log(filePath);
    res.sendFile(filePath);
});
// POST endpoint to receive user location
app.post('/api/user/location', (req, res) => {
    // Extract location data from request body
    const { latitude, longitude } = req.body;

    // Example logic: Determine the zone based on the coordinates
    const userZone = determineUserZone(latitude, longitude);

    // Example response
    res.status(200).json({ zone: userZone });
});

// Example function to determine user's zone based on coordinates
function determineUserZone(latitude, longitude) {
    // Your logic to determine the user's zone based on the coordinates
    // This could involve querying a database or using spatial calculations
    // For simplicity, let's assume there are predefined zones
    if (latitude > 30 && latitude < 40 && longitude > -80 && longitude < -70) {
        return 'Zone A';
    } else {
        return 'you are belong to this xone';
    }
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});