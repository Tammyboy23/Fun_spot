const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../database')

exports.signup = async(req, res) => {
    const {username, email, password} = req.body;
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?",[email]);

    if(users.email === email)
        return res.status(404).json({message: "Account Exists"})

    const hashed = await bcrypt.hash(password, 10);

    await pool.query("INSERT INTO users(username, email, password) VALUES(?, ?, ?)",[username, email, hashed]);
    res.status(201).json({message: "Account Created Successfully"})
};

exports.login = async(req, res) => {
    const {email, password} = req.body;

    const [row] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if(row.length === 0)
        return res.status(401).json({message: "Account doest exist"});

    const user = row[0]
    const match = await bcrypt.compare(password, user.password);

    if(!match)
        return res.status(404).json({message: "Incorrect Password"});

    
    const token = jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    );
    res.status(200).json({ token, message: "Log In Successful",  users:{
        username: user.username,
        id: user.id,
        created_at: user.created_at
    }}
    );
};