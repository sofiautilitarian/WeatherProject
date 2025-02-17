const express = require('express'); //we are calling express
const { STATUS_CODES } = require('http');
// const clipboardy = require('clipboardy');
const https = require('https');//we are calling https
const app = express();//call an object of express
app.get('/', function(req, res){
    const val = 'true';
    const apiKey = 'HcofP3kraOSAn8hCMQmvVUPv7FcOuxuG';  // Replace with your actual API key
    const ipAddress = '202.83.126.150'; // Replace with a valid IP address
    const url = `https://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=${apiKey}&q=${ipAddress}&details=${val}`;
    https.get(url, function(response){
        
        console.log(response.statusCode, response.statusMessage);
        //parsing JSON
        response.on('data', function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const currentAirQuality = weatherData.TimeZone.Code;
            console.log(currentAirQuality);

            
        })
    })
    res.send('Server is up and running');
})
app.listen(2999, function(){//trying on port 2999
    console.log('The server is running on port 2999');
})