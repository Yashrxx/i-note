const connectToMongo = require("./db");
connectToMongo();

const express = require('express')
const app = express()

// IMPORTANT: Dynamic port for cloud hosting
const port = process.env.PORT || 5000;

var cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`inote backend listening on port ${port}`);
})
