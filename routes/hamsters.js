const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()


// REST API 
router.get('/', (req, res) => {
	console.log('/hamster REST API');
	res.send('/hamsters REST API')
})



module.exports = router