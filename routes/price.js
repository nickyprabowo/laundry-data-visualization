const router = require('express').Router()
const csv = require('csvtojson')
const path = require('path')

router.post('/', (req, res) => {
	const price = req.body.surgeFactor * req.body.price
	res.json({price})
})

module.exports = router