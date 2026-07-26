const express = require('express')
const pool = require('../database')
const router = express.Router()
const {list} = require('../controller/listController')

router.post('/list', list );

module.exports = router;