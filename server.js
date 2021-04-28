const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const hamsters = require('./routes/hamsters.js')
const matches = require('./routes/matches.js')
const matchwinners = require('./routes/matchwinners.js')
const winners = require('./routes/winners.js')
const losers = require('./routes/losers.js')
 
//Heroku - Om PORT är ett värde/number så kommer vi använda den annars 1337
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
app.use( '/img', express.static(staticImgFolder))
 
//Routes. Hanterar resursen "web root" - request och response. 
app.get('/', (req, res) => {
    res.send('Hamsterwars - Fullstack Project')
})
 
// REST API för hamsters & matches
app.use('/hamsters', hamsters)
app.use('/matches', matches)
app.use('/matchwinners', matchwinners)
app.use('/winners', winners)
app.use('/losers', losers)

 
//startar servern
app.listen(PORT, () => {
    console.log('Server is listening on port' + PORT);
})