const express = require('express')
const router = express.Router()
const {gemini} = require('../controller/aiController')

router.post('/get', gemini);

module.exports = router;