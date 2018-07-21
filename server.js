const express =  require('express')
const bodyParser = require('body-parser')
const route = require('./route')
const path = require('path')
const report = require ('./routes/report')
const price = require ('./routes/price')

const app = express()
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(express.static('client/build'))
/*
app.use('/', function(req,res){
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})*/
app.use('/api/report', report)
app.use('/api/price', price)

const port = process.env.PORT || 5000

app.listen(port, () => console.log('Server started on port '+port) )
