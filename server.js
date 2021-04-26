const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const hamsters = require('./routes/hamsters.js')

// Heroku uses process.env.PORT
const PORT = process.env.PORT || 1337
const staticFolder = path.join(__dirname, 'static')
const staticImgFolder = path.join(__dirname, 'img')

//Middleware
//logger som skriver ut info om varje request i terminalen
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.params);
	next()
})

app.use( express.json() )
app.use( cors() )
app.use( express.static(staticFolder) )
app.use( '/img', express.static(staticImgFolder) )


//Routes
app.get('/', (req, res) => {
	res.send('Fullstack Project')
})

// REST API för hamsters
app.use('/hamsters', hamsters)

//startar servern
app.listen(PORT, () => {
	console.log('Server is listening on port' + PORT);
})