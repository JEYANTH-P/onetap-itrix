// server.js

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
console.log(__dirname);
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Object to store user status with user ID as keys
const userStatus = {};

// Default status is 'waiting'
const defaultStatus = 'waiting';

function romanToInteger(roman) {
    const romanNumerals = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    let total = 0;
    let prevValue = 0;

    for (let i = 0; i < roman.length; i++) {
        let currentValue = romanNumerals[roman[i]];
        total += currentValue;

        if (currentValue > prevValue) {
            total -= 2 * prevValue;
        }

        prevValue = currentValue;
    }

    return total;
}

app.get("/sendData", (req, res) => {
    // Get the JSON data from the request body
    const json_data = req.body;

    // Get the user ID from the JSON data
    const userId = json_data.user_id;

    // Get the zone number from the JSON data
    const zoneNumber = json_data.Zone_no;

    // Store the JSON data in the zoneData object with the zone number as the key
    zoneData[zoneNumber] = json_data;

    // Set the status for the user ID to 'waiting'
    userStatus[userId] = defaultStatus;

    // Respond to the client
    res.send("Data received and stored successfully.");
});

// Route to retrieve data for a specific zone
app.get("/getData/:zoneNumber", (req, res) => {
    // Get the zone number from the request parameters
    const zoneNumber = req.params.zoneNumber;

    // Check if data exists for the specified zone number
    if (zoneData.hasOwnProperty(zoneNumber)) {
        // Send the data for the specified zone number
        res.json(zoneData[zoneNumber]);
    } else {
        // If no data found for the specified zone number, send an error response
        res.status(404).send("Data not found for the specified zone number.");
    }
});

// Route to retrieve user status
app.get("/getUserStatus/:userId", (req, res) => {
    const userId = req.params.userId;

    // Check if status exists for the specified user ID
    if (userStatus.hasOwnProperty(userId)) {
        // Send the status for the specified user ID
        res.json({ userId: userId, status: userStatus[userId] });
    } else {
        // If no status found for the specified user ID, send an error response
        res.status(404).send("Status not found for the specified user ID.");
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});