const getDatabase = require('../database.js')
const db = getDatabase()
 
const express = require('express')
const router = express.Router()

// GET losers
router.get('/', async (req, res) => {

    try {
 
    const hamsterRef = db.collection('hamsters');
	const snapshot = await hamsterRef.orderBy('defeats', 'desc').limit(5).get();
    
 
    const lowFive = [];
    snapshot.forEach(doc => {
    lowFive.push(doc.data());
    });
     
    res.send(lowFive);
    }
    
    catch(err) {
    console.log(err.message);
    }})



module.exports = router