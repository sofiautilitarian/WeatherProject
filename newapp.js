const express = require('express');
const https = require('https');
const app = express();

const API_KEY = 'YOUR_ACCUWEATHER_API_KEY'; // Replace with your API key

//
app.get('/weather', (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const API_KEY = 'YOUR_ACCUWEATHER_API_KEY';

    // Build URL using latitude and longitude
    const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`;

    https.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const locationData = JSON.parse(data);
                res.json(locationData);
            } catch (error) {
                res.send('Error parsing location data');
            }
        });
    }).on('error', (error) => {
        res.send('Error fetching location data');
    });
});
