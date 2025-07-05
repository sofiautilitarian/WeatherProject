const express = require('express');
const https = require('https');

const request = require('request');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res){
    // https.get(url, function(response){
    //      console.log('Server is running');
    // })
    res.sendFile(__dirname+'/signup.html');
})
app.post("/", function(req, res){
    var fullName = req.body.FullName;
    var email = req.body.Mail;
    console.log(fullName, email);
})
app.listen(226, function(){
    console.log('Server is running on port 226');
})