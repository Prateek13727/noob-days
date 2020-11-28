const request = require('request');

let getWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/ce977514c675b9c3976b2bff6f641e16/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTempearture: body.currently.apparentTemperature
      });
    } else {
      callback("Unable to fetch weather data");
    }
  })
}

module.exports = {
  getWeather
}
