const express = require('express')
const pool = require('../database')
const {Resend} = require('resend')

exports.list = async(req, res) => {
    const {email} = req.body;

    const [row] = await pool.query("SELECT * FROM list WHERE email = ?",[email]);

    const user = row[0];

    const resend = new Resend(process.env.RESEND_API);

    if(user)
        return res.status(409).json({message: "Account exists"});


    const send = await pool.query("INSERT INTO list(email) VALUES(?)", [email]);

    if(!send)
        return res.status(401).json({message: "Could'nt register"});

    const send_email = await resend.emails.send({
        from: "Fun Spot <onboarding@resend.dev>",
        to: email,
        subject: "You're on the waitlist!",
        html: `
            <h2>Thanks for joining!</h2>
            <p>You've successfully joined our waitlist.</p>
            <p>We'll let you know when we launch.</p>
            `
});

if(!send_email){
    return res.status(401).json({message: "Email Not Sent"});
}


    await pool.query("UPDATE list SET sent = ? WHERE email = ?", [true, email])

    res.status(200).json("Email Sent");

}