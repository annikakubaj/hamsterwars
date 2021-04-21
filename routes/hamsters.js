const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()


// REST API 

// GET /hamsters
router.get('/', async (req, res) => {
//	console.log('/hamster REST API');
//	res.send('/hamsters REST API') 

const hamstersRef = db.collection('hamsters')
const snapshot = await hamstersRef.get()

if ( snapshot.empty) {
	res.send([])
	return
}

let items = []
snapshot.forEach(doc => {
	const data = doc.data()
	data.id = doc.id // id behövs för POST + PUT + DELETE
	items.push( data )

})
res.send(items)


})

// GET /hamsters/:id

router.get('/:id', async (req,res) =>{
	const id = req.params.id
	const docRef = await db.collection('hamsters').doc(id).get()

	if( !docRef.exists ) {
		res.status(404).send('Hamster does not exist')

	}

	const data = docRef.data()
	res.send(data)
})
// POST /hamsters
router.post('/', async (req, res) => {

	//express.json måste vara installerat
	const object = req.body

	if( !object || !object.name || !object.age ) {
		res.sendStatus(400)
		return
	}

	const docRef = await db.collection('hamsters').add(object)
	res.send(docRef.id)
})

// PUT /hamsters/:id
// DELETE /hamsters/:id



module.exports = router