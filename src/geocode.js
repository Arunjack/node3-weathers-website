
const request = require('request')

const geocodeFinder = (address, callback) => {

    const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXJ1bmphY2syIiwiYSI6ImNqdnJ5d3V1eTA2MDM0YnBteHI5d2NpMGkifQ.wsiRKoA52-4GH3qwQyOB_Q'

    console.log(mapUrl)
    request({url: mapUrl, json: true}, (error, response) => {
    
        if (error) {
            console.log('Unable to connect to location service', undefined)
        } else if(response.body.features.length === 0) {
            console.log('Something went wrong', undefined)
        } else {
            const lat = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
        
            /*callback(undefined, {
                latitude: lat,
                longitude: longitude
            })*/

            callback(undefined, response.body)
        }

    
    })
}

module.exports =  {
    geocodeFinder: geocodeFinder
}