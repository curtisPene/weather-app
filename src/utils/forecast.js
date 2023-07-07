const request = require("request");
const chalk = require("chalk");

const forecast = (longtitude, lattitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=d964203065a11b3aec70e16fd3574bf5&query=${lattitude},${longtitude}`;

  request({ url, json: true }, (error, response) => {
    if (response.body.error) {
      callback("Could not connect to weather services", undefined);
      return;
    }
    // const { current } = response.body;
    const { precip, temperature, weather_descriptions } = response.body.current;
    const { country } = response.body.location;
    // console.log(response.body);
    callback(
      undefined,
      // `Location: ${}, ${response.body.location.country}. Weather Description: ${current.weather_descriptions}. It is currently ${current.temperature} degrees celcius. Chance of precipitaion is ${current.precip}`
      { country, precip, temperature, weather_descriptions }
    );
  });
};

module.exports = forecast;
