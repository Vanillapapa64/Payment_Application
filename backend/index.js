const express = require("express");
const cors=require('cors')
const rootrouter=require('./routes/index')
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1",rootrouter)
app.listen(3000)


