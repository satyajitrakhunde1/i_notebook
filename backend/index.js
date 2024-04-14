const connectoMongo =require('./db')
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000


app.use(cors())
app.use(express.json())
connectoMongo()

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`i notebook's backend is running  on port ${port}`)
})