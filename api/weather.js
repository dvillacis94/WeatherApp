// Import Request Module
const request = require('request');

/**
 * Class Weather
 * Will fetch Weather Data from OpenWeatherMap API
 */
class WeatherAPI {

  constructor(){
    // Set Api Key
    this.apiKey = "7fee8748c196b0f1102f65bfd01edd09";
    // Set API URL
    this.url = "http://api.openweathermap.org/data/2.5/weather?"
  }

  /**
   * Will fetch Weather Data by City
   * @param city - City Name
   * @param callback - Function
   */
  getByCity( city, callback ) {
    // Build URL for Request
    let requestURL = `${this.url}q=${city}&units=imperial&appid=${this.apiKey}`;
    // Make Request
    request(requestURL, ( error, response, body ) => {
      // Check if any Errors
      if (error) {
        // Log Error
        console.log(`Req Error : ${error}`);
        // Trigger Callback with Error
        callback(error, null);
      } else {
        // Log Body
        console.log(`Req Body : ${body}`);
        // Trigger Callback with Body
        callback(null, body);
      }
    });
  }
}
// Expose Class
module.exports = WeatherAPI;