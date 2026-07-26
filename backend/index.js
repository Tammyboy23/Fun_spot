require('dotenv').config();
const express = require("express")
const app = express()
const cors = require('cors')
const pool = require('./database')
const authRouter = require('./routes/auth')
const aiRouter = require('./routes/gemini')
const listRouter = require('./routes/list')
const {Resend} = require('resend')

app.use(express.json())
app.use(cors())
app.use('/', authRouter, aiRouter, listRouter)

app.listen(3000, () => {
    console.log("Server Running")
})
