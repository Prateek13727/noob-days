const yargs = require('yargs');
const axios = require('axios');

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

let encodedAddress = encodeURIComponent(argv.a)
let geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`
axios.get(geoUrl)
      .then((response) => {
          if (response.status === "ZERO_RESULTS") {
            throw new Error("Unable to connect to servers");
          }
          let latitude = response.data.results[0].geometry.location.lat;
          let longitude = response.data.results[0].geometry.location.lng;
          let weatherURL = `https://api.darksky.net/forecast/ce977514c675b9c3976b2bff6f641e16/${latitude},${longitude}`
          return axios.get(weatherURL)
      })
      .then((response) => {
          console.log(response)
      })
      .catch((e) => {
        if (e.code === 'ENOTFOUND') {
          console.log("Unable to connect to servers")
        } else {
          console.log(e.message)
        }
      })
