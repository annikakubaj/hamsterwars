const getDatabase = require('../database.js')
const db = getDatabase()
 
const express = require('express')
const router = express.Router()


// GET /winners
router.get('/', async (req, res) => {
	let result; 

	try {
		result = await db.collection('hamsters').orderBy('wins', 'desc').limit(5).get();
		
		const topFive = [];

		result.forEach(doc => {
			topFive.push(doc.data());
		});

		res.send(topFive);
		// res.status(200).send(result)
	}

	catch(err) {
		
		res.status(500).send(err.message);
	}

});

module.exports = router;