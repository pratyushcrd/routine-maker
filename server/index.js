const path = require('path')
const express = require('express')
const routine = require('./api-v1/routes/routine')
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT ? process.env.PORT : 8181
const dist = path.join(__dirname, '../dist')

app.use(express.static(dist))
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))

app.use('/api/v1/routine', routine)

app.get('*', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'))
})

app.listen(port, (error) => {
  if (error) {
    console.log(error) // eslint-disable-line no-console
  }
  console.info('Express is listening on port %s.', port) // eslint-disable-line no-console
})
