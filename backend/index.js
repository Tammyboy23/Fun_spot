require('dotenv').config();
const express = require("express")
const app = express()
const cors = require('cors')
const pool = require('./database')
const authRouter = require('./routes/auth')
const aiRouter = require('./routes/gemini')

app.use(express.json())
app.use(cors())
app.use('/', authRouter, aiRouter)

app.listen(3000, () => {
    console.log("Server Running")
})
