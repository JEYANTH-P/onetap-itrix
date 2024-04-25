// server.js

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename)

/*
{
  user_ward_data: { ward_no: 174, zone_no: 'XIII', zone_name: 'ADYAR' },
  img_description: {
    predictionResult: { className: 'Street Light', probability: '0.85' },
    imgur: 'https://example.com/image123.jpg',
    description: 'This is a street light located on Main Street.'
  }
}
*/
const PORT = process.env.PORT || 3000;
const app = express();
// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Object to store user status with user ID as keys
const userStatus = {};
const data={};
const adminZone = {};


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




app.post("/map_data",(req,res)=>{
    const dummy1 = req.body;
    //user oda data 
    data.user_ward_data = dummy1;

    res.json({"status":"true"});
    console.log(data);
    
})
app.post("/imgrec",(req,res)=>{
    const dummy2 = req.body;
    //this is img des
    console.log(dummy2);
    data.img_description = dummy2;
    userStatus.status = defaultStatus;
    adminZone[data.user_ward_data.zone_no] = data;
    res.json(userStatus);
    
})
// Assuming other parts of your code remain unchanged

app.get("/getData/:zoneNumber", (req, res) => {
    // Get the zone number from the request parameters
    const zoneNumber = req.params.zoneNumber;

    // Check if data exists for the specified zone number
    if (adminZone.hasOwnProperty(zoneNumber)) {
        // Send the data for the specified zone number to the frontend
        const dataToSend = adminZone[zoneNumber];
        res.json(dataToSend);

        // Assuming the frontend will send a POST request to "/updateStatus" with the response
        // Handle the response from the frontend
        app.post("/updateStatus", (req, res) => {
            const response = req.body.response; // Assuming the response contains 'yes' or 'no'
            const userId = data.user_ward_data.user_id;

            // Update the user status based on the response
            if (response === 'yes') {
                userStatus[userId] = 'succeed';
            } else if (response === 'no') {
                userStatus[userId] = 'declined';
            } else {
                // Handle invalid response
                userStatus[userId] = 'unknown';
            }

            // Send the updated user status to the frontend
            res.json({ status: userStatus[userId] });
        });
    } else {
        // If no data found for the specified zone number, send an error response
        res.status(404).send("Data not found for the specified zone number.");
    }
});

/*
{
    predictionResult: {
        className:'',
        probability:''
    },
    imgur:'',
    description:'',
}
*/

const dummy1 = {
    ward_no: 174,
    zone_no: 'XIII',
    zone_name: 'ADYAR'
};

const dummy2 = {
    predictionResult: {
        className: "Street Light",
        probability: "0.85"
    },
    imgur: "https://example.com/image123.jpg",
    description: "This is a street light located on Main Street."
};

const data1 = {
    user_ward_data: dummy1,
    img_description: dummy2
};

console.log(data1);

// Start the server
app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}");
});