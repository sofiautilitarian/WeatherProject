const express = require('express'); //we are calling express
var str = '', str1 = '', str2 = '';
const { STATUS_CODES } = require('http');
// const clipboardy = require('clipboardy');
const https = require('https');//we are calling https
const app = express();//call an object of express
app.get('/', function(req, res){
    
    const val = 'true';
    const apiKey = 'oRj2nTI5qxxzcRUBntX1ZgIXqAnizGPR';  // Replace with your actual API key
    const ipAddress = '202.83.126.150'; // Replace with a valid IP address
    const url = "https://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey="+ apiKey + "&q=" + ipAddress + "&details=" + val;
    
    https.get(url, function(response){
        
        console.log(response.statusCode, response.statusMessage);
        //parsing JSON
        response.on('data', function(data){
            const weatherData = JSON.parse(data)
            console.log(weatherData)
            // const currentAirQuality = weatherData.TimeZone.Code;
            // console.log(currentAirQuality);
            
            str = weatherData.Details.CanonicalLocationKey
            str1 = weatherData.Details.Satellite
            str2 = weatherData.Details.LocationStem
            //console.log(str, str1, str2);
            
        })
    })
    res.send("<h1>Server is up and running<br>"+'The canonical location key of the IP is: '+str+'<br>'+'The satellite of the IPV4 address is :'+str1+'<br>'+'The Location Stem of the IP is:'+ str2+"</h1>");
    //res.send()
    //res.send()
    
})
app.listen(2999, function(){//trying on port 2999
    console.log('The server is running on port 2999');
})