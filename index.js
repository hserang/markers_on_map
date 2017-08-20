'use strict'

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

const PORT = 3000
const markup = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Server Map</title>
  <link rel="stylesheet" href="fiber.min.css" />
  </head>
  <body class="m0">
  <div id="app"></div>
  <script src="build/app.js"></script>
  </body>
  </html>`

app.use((req, res) => {
  res.send(markup)
})

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`)
})
