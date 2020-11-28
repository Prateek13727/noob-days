
const request = require("request")

let geoAddress = (address) => {
  const encodedAddress = encodeURIComponent(address)
    return new Promise((resolve, reject) => {
      request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
      }, (error, response, body) => {
        if (error) {
          reject("Unable to connect to google servers");
        } else if (body.status === "ZERO_RESULTS") {
          reject("Unable to find address");
        } else if (body.status === "OK") {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          });
        }
      }
    )
  })
}

geoAddress('19146').then((location) => {
  console.log(JSON.stringify(location, undefined, 2))
}, (errorMessage) => {
  console.log(errorMessage)
})
