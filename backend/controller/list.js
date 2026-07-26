const express = require('express')
const pool = require('../database')

exports.list = async(req, res) => {
    const {email} = req.body;

    const [row] = pool.query("SELECT * FROM list WHERE email = ?",[email]);

    const user = row[0];

    if(user.email === email)
        return res.status(409).json({message: "Account exists"});

    
}