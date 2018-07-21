const router = require('express').Router()
const csv = require('csvtojson')
const path = require('path')

router.get('/', (req, res) => {
	csv({
		output:"json",
		delimiter: ',',
	})
	.fromFile(path.join(__dirname , '../public/testFE.csv'))
	.then(jsonObj => {
		res.send(jsonObj)
	})
})

module.exports = router