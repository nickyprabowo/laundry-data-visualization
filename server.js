const express =  require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const path = require('path');

const app = express()
app.use(bodyParser.json())

app.use('/', routes)

const port = process.env.PORT || 5000

app.listen(port, () => console.log('Server started on port '+port) )
