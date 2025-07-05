
const express = require('express');
var str = '', str1 = '', str2 = '';
const { STATUS_CODES } = require('http');
const https = require('https');
const app = express();
const cors = require('cors');
app.use(cors());


app.get('/', function (req, res) {
    //Declaring the variables
    const val = 'True';
    const apiKey = 'oRj2nTI5qxxzcRUBntX1ZgIXqAnizGPR';  // Replace with your actual API key
    const ipAddress = req.query.ip || '103.73.225.6'; // Replace with a valid IP address
    const url = "https://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=" + apiKey + "&q=" + ipAddress + "&details=" + val;


    if (!ipAddress) {
        return res.status(400).json({ error: 'IP address is required' });
    }

    https.get(url, function (response) {
        if (response.statusCode === 401 || response.statusCode === 403) {
            return res.status(response.statusCode).send('<h6>API Key is invalid or timed out.</h6>');
        }

        if (response.statusCode !== 200) {
            return res.status(response.statusCode).send('<h6>API Request failed with status: ' + response.statusCode + '</h6>');
        }

        let data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            try {
                const weatherData = JSON.parse(data);
                console.log(weatherData);
                return res.send(`<pre>${JSON.stringify(weatherData, null, 2)}</pre>`);
            } catch (err) {
                console.error(err);
                return res.status(500).send('<h6>Failed to parse weather data.</h6>');
            }
        });
    }).on('error', function(err){
        console.error(err);
        res.status(500).send(`<h6>Request Error: `+err.message+`</h6>`);
    });


});

app.listen(2999, function(){
    console.log('The Server is running on port 2999');
});