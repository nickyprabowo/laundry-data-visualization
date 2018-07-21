const router = require('express').Router()
const csv = require('csvtojson')
const path = require('path')

router.get('/:type', (req, res) => {
	const price_type = 'base_price_'+req.params.type
	csv({
		output:"json",
		delimiter: ',',
	})
	.fromFile(path.join(__dirname , '../public/testFE.csv'))
	.then(jsonObj => {
		const basePrice = jsonObj.map(item => item[price_type])
		res.send(basePrice)
	})
})

module.exports = router