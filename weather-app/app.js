const yargs = require('yargs');

const geocode = require("./geocode")
const weatherData = require("./weather");

const argv  = yargs
              .options({
                a: {
                  alias: 'address',
                  demand: true,
                  string: true,
                  decribe: "your address"
                }
              })
              .help()
              .alias('help', 'h')
              .argv

geocode.geoAddress(argv.a, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage)
   } else if (results) {
    console.log(results.address);
    weatherData.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage)
      } else if (weatherResults) {
        console.log(JSON.stringify(weatherResults, undefined, 2));
      }
    });
  }
});
