const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}`))

app.get('/simple', (req, res) => {
  res.send({
    integer: 14,
    string: 'i am a string',
    boolean: true
  })
})