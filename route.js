const router = require('express').Router()
const csv = require('csvtojson')

router.get('/', (req, res) => {	 
	csv({
		output:"json",
		delimiter: ',',
	})
	.fromFile(__dirname + '/public/testFE.csv')
	.then(jsonObj => {
		res.send(jsonObj)
	})
})

module.exports = router