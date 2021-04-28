const getDatabase = require('../database.js')
const db = getDatabase()
 
const express = require('express')
const router = express.Router()


// GET /winners

router.get('/', async (req, res) => {
	let snapshot; 

	try {
		snapshot = await db.collection('hamsters').orderBy('wins', 'desc').limit(5).get();
		
		const topFive = [];

		snapshot.forEach(doc => {
			topFive.push(doc.data());
		});

		res.send(topFive);
		
	}

	catch(err) {
		
		res.status(500).send(err.message);
	}

});

module.exports = router;