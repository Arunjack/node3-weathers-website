
const request = require('request')


const forcastLocation = (lat, long, callback) => {

    const url = 'https://api.darksky.net/forecast/cc234da9351d3025eb04cb0a0fea580c/' + lat + ','+ long

request({url: url, json: true}, (error, response) => {

    if (error) {
   console.log('unable to connect to weather service')
    } else if (response.body.error) {
        console.log('unable to find the location')
    } else {
        let currentForcase = response.body.currently
        // console.log(currentForcase)
        // console.log(currentForcase.temperature)
        // console.log(response.body.daily.data[0].summary)

        callback(undefined, {
            zone: response.body.timezone,
            temp: currentForcase.temperature,
            summary: response.body.currently.summary
        })
    }

}) 

}

module.exports = {
    forcastLocation: forcastLocation
}