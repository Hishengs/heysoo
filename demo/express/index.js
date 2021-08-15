const express = require('express')
const config = require('../config');

const app = express()
const port = config.express.port

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})