const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geo = require('./geocode.js')

const app = express()

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const pubDir = path.join(__dirname, '../public')
const partialsDir = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set ('views', viewsPath) // ('Foldername', view_path)
app.set('etag', false); // turn off

// Setup partials location to hbs
hbs.registerPartials(partialsDir)

// Setup static directory to serve
app.use(express.static(pubDir)) // To use the public dir to use in express


app.get('', (req, res) => {
   res.setHeader('Cache-Control', 'max-age=60');
    res.render('index', {
        title: 'Weather App',
        name: 'Arun Jack'
    })
})
app.get('/nodeobj', (req, res) => {
    res.send({
      name: 'Arunjack',
      age: 30
    })
})


app.get('/help', (req, res) => {
    res.send('Displaying Help Page')
})

app.get('/about', (req, res) => {
    res.send('Displaying Help Page')
})

app.get('/image', (req, res) => {

    res.send('<h2>HTML Image</h2><img src="/Users/arunjack/Desktop/node-course/web-server/src/guitar.png" alt="Trulli" width="500" height="333"></body></html>')
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error : 'You provide the search test'
        })
    }
    console.log(req.query)

    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error : 'You should provide the address'
        })
    }
    geo.geocodeFinder(req.query.address, (err, response) => {

        if (err) {
            return res.send(err)
        }
        res.send({ 
            response
        })
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errMsg: 'Help Page is not found'
   }) })
app.get('*', (req, res) => {
   res.render('404', {
        title: '404',
        errMsg: 'Page is not found'
   })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})


