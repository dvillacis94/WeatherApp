// Import Express Module
const express = require('express');
// Import Body Parser
const parser = require('body-parser');
// Import Path Module
const path = require('path');
// Import Weather API
const WeatherAPI = require('./api/weather');
// Import JWT Utility
const JWT = require('./api/authentication/jwt');
// Test User
const user = require('./test/user');
// Init Express Server
const app = express();
// Init Weather API
const weather = new WeatherAPI();
// Init JWT Utility
const jwt = new JWT();
// Declare HTTP Port
let port = 3000;
app.set('view engine', 'ejs');
// Allows to access all of the static files within the ‘public’ folder.
app.use(express.static(path.join(__dirname, 'public')));
// Allows to make use of the key-value pairs stored on the req-body objec
app.use(parser.urlencoded({ extended : true }));
// Get Root
app.get('/', ( req, res ) => {
  // Render Index View
  res.render('index', {
    weather  : null,
    humidity : null,
    minTemp  : null,
    maxTemp  : null,
    error    : null
  });
});
// AJAX Call for JWT
app.get('/encode', ( req, res ) => {
  // Render Index View
  res.render('lpEndpoint');
});
// Set Post Route
app.post('/getWeatherByCity', ( req, res ) => {
  // Log City
  console.log(req.body.city);
  // Get Weather by City
  weather.getByCity(req.body.city, ( error, body ) => {
    // Check if any Errors
    if (error) {
      // Log Error
      console.log(`Get City Weather Error :: ${error}`);
    } else {
      // Parse Body
      let response = JSON.parse(body);
      // Check if Weather was Fetched
      if (response.main === undefined) {
        // Render No Weather
        res.render('index', {
          weather : null,
          error   : 'Error, please try again'
        });
      } else {
        // Build Weather String
        let weatherText = `It's ${response.main.temp} degrees in ${response.name}!`;
        // Build Weather String
        let humidity = `Humidity index is ${response.main.humidity}!`;
        // Build Min Weather String
        let minTemp = `Min Temperature will be ${response.main.temp_min}`;
        // Build Min Weather String
        let maxTemp = `Max Temperature will be ${response.main.temp_max}`;
        // Render with Weather
        res.render('index', {
          weather  : weatherText,
          humidity : humidity,
          minTemp  : minTemp,
          maxTemp  : maxTemp,
          error    : null
        });
      }
    }
  });
});
// Set Get JWT Route
app.post('/encode', (req, res) => {
  //
  console.log(`REQ :: ${JSON.stringify(req.body)}`);
  //
  console.log(`RES :: ${res.body}`);
  //
  jwt.encode(user, (error, response ) => {
    //
    if(error){
      //
      console.log(`Error :: ${error.message}`)
    } else {
      // Sent JWT
      res.send(response.message);
    }
  });
});
// Set Port to Listen to
app.listen(port, () => {
  // Log
  console.log(`Example app listening on port ${port}!`);
});