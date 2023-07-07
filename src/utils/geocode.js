const request = require("request");

const geoCode = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=pk.eyJ1IjoiY3VydGlzcGVuZSIsImEiOiJja3ptMmRkbno1NW4xMnBvMGp4Z2huNjNtIn0.gpfTLp8IoGGa-LZSGcfBmQ`;

  request({ url, json: true }, (error, response) => {
    if (response.body.features.length === 0) {
      // console.log(chalk.green("Could not connect to mapbox"));
      callback("No results found", undefined);
      return;
    }
    const { center } = response.body.features[0];
    // console.log(
    //   chalk.green(`Suva Location: Lon: ${center[0]} Lat: ${center[1]}`)
    // );
    callback(undefined, { lon: center[0], lat: center[1] });
  });
};

module.exports = geoCode;
