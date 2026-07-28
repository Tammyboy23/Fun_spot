const express = require('express')
const pool = require('../database')
const {Resend} = require('resend')

exports.list = async(req, res) => {
    const {email} = req.body;

    const [row] = await pool.query("SELECT * FROM list WHERE email = ?",[email]);

    const user = row[0];

    const resend = new Resend(process.env.RESEND_API);

    if(user)
        return res.status(409).json({message: "Account already on waitlist"});


    const send = await pool.query("INSERT INTO list(email) VALUES(?)", [email]);

    if(!send)
        return res.status(401).json({message: "Could'nt register"});

    const send_email = await resend.emails.send({
        from: "Fun Spot <onboarding@resend.dev>",
        to: email,
        subject: "You're on the waitlist!",
        html: `
            <div style="margin:0;padding:40px 20px;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px;margin:0 auto;background:#111827;border:1px solid #1f2937;border-radius:20px;overflow:hidden;">

    <!-- Header -->
    <tr>
      <td style="padding:50px 40px 20px;text-align:center;">
        <div style="display:inline-block;background:linear-gradient(135deg,#3b82f6,#8b5cf6);padding:14px 18px;border-radius:14px;">
          <span style="font-size:28px;">🚀</span>
        </div>

        <h1 style="margin:24px 0 10px;font-size:34px;color:#ffffff;font-weight:700;">
          You're officially on the waitlist.
        </h1>

        <p style="margin:0;color:#9ca3af;font-size:17px;line-height:28px;">
          Thanks for believing in us early.
          You're now one of the first people who'll know when we launch.
        </p>
      </td>
    </tr>

    <!-- Card -->
    <tr>
      <td style="padding:20px 40px;">
        <div style="background:#1f2937;border-radius:16px;padding:30px;">

          <h2 style="margin-top:0;color:#ffffff;font-size:22px;">
            What happens next?
          </h2>

          <p style="color:#d1d5db;line-height:28px;font-size:16px;">
            While we're putting the finishing touches on the product,
            we'll occasionally send updates about our progress,
            new features, and your early access invitation.
          </p>

          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:35px auto 10px;">
            <tr>
              <td align="center" bgcolor="#3b82f6" style="border-radius:10px;">
                <a href="https://fun-spot.netlify.app"
                   style="display:inline-block;padding:15px 34px;color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;">
                  Visit Website
                </a>
              </td>
            </tr>
          </table>

        </div>
      </td>
    </tr>

    <!-- Feature Row -->
    <tr>
      <td style="padding:10px 40px 30px;">
        <table width="100%">
          <tr>

            <td width="33%" style="padding:12px;">
              <div style="background:#111827;border:1px solid #374151;border-radius:14px;padding:20px;text-align:center;">
                <div style="font-size:28px;">⚡</div>
                <h3 style="color:#ffffff;font-size:16px;">Fast</h3>
                <p style="color:#9ca3af;font-size:14px;">
                  Built with performance in mind.
                </p>
              </div>
            </td>

            <td width="33%" style="padding:12px;">
              <div style="background:#111827;border:1px solid #374151;border-radius:14px;padding:20px;text-align:center;">
                <div style="font-size:28px;">🔒</div>
                <h3 style="color:#ffffff;font-size:16px;">Secure</h3>
                <p style="color:#9ca3af;font-size:14px;">
                  Your information stays protected.
                </p>
              </div>
            </td>

            <td width="33%" style="padding:12px;">
              <div style="background:#111827;border:1px solid #374151;border-radius:14px;padding:20px;text-align:center;">
                <div style="font-size:28px;">✨</div>
                <h3 style="color:#ffffff;font-size:16px;">Early Access</h3>
                <p style="color:#9ca3af;font-size:14px;">
                  You'll be among the first to try it.
                </p>
              </div>
            </td>

          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding:35px 40px;border-top:1px solid #1f2937;text-align:center;">
        <p style="margin:0;color:#6b7280;font-size:14px;">
          © 2026 Fun Spot
        </p>

        <p style="margin-top:10px;color:#6b7280;font-size:13px;">
          You're receiving this because you joined our waitlist.
        </p>
      </td>
    </tr>

  </table>
</div>
            `
});

if(!send_email){
    return res.status(401).json({message: "Email Not Sent"});
}


    await pool.query("UPDATE list SET sent = ? WHERE email = ?", [true, email])

    res.status(200).json({message: "Email Sent"});

}