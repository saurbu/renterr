import "dotenv/config"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 15000,
})

const sendOTP = async (email, otp) => {
  try {
    console.log("Preparing OTP email...")
    console.log("From:", process.env.EMAIL_USER)
    console.log("To:", email)

    await transporter.sendMail({
      from: `"Renterr" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Renterr Login OTP",

      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Renterr Login OTP</title>
</head>

<body style="
  margin:0;
  padding:0;
  background-color:#f3f4f6;
  font-family:Arial, Helvetica, sans-serif;
">

  <div style="
    width:100%;
    padding:40px 0;
  ">

    <div style="
      max-width:560px;
      margin:0 auto;
      background:#ffffff;
      border-radius:18px;
      overflow:hidden;
      box-shadow:0 8px 30px rgba(0,0,0,0.10);
    ">

      <!-- Header -->

      <div style="
        background:linear-gradient(135deg,#312e81,#2563eb);
        padding:30px 25px;
        text-align:center;
      ">

        <h1 style="
          margin:0;
          color:#ffffff;
          font-size:30px;
          letter-spacing:1px;
        ">
          Renterr
        </h1>

        <p style="
          margin:8px 0 0;
          color:#dbeafe;
          font-size:15px;
        ">
          Drive Beyond Limits
        </p>

      </div>


      <!-- Content -->

      <div style="
        padding:35px 30px;
        text-align:center;
      ">

        <h2 style="
          margin:0 0 10px;
          color:#172554;
          font-size:24px;
        ">
          Login Verification
        </h2>

        <p style="
          color:#6b7280;
          font-size:15px;
          line-height:1.6;
          margin:0 auto 25px;
        ">
          Use the verification code below to continue
          logging in to your Renterr account.
        </p>


        <!-- OTP -->

        <div style="
          display:inline-block;
          background:#eef2ff;
          border:2px solid #c7d2fe;
          border-radius:14px;
          padding:18px 30px;
          margin:5px 0 25px;
        ">

          <span style="
            color:#1e3a8a;
            font-size:36px;
            font-weight:bold;
            letter-spacing:10px;
          ">
            ${otp}
          </span>

        </div>


        <p style="
          color:#6b7280;
          font-size:14px;
          line-height:1.6;
          margin:0 0 20px;
        ">
          This OTP is valid for
          <strong style="color:#2563eb;">
            10 minutes
          </strong>.
        </p>


        <!-- Security Warning -->

        <div style="
          background:#fff7ed;
          border:1px solid #fed7aa;
          border-radius:10px;
          padding:14px;
          margin-top:20px;
        ">

          <p style="
            margin:0;
            color:#9a3412;
            font-size:13px;
            line-height:1.5;
          ">
            🔒 Never share this OTP with anyone.
            Renterr will never ask you for your OTP.
          </p>

        </div>

      </div>


      <!-- Footer -->

      <div style="
        background:#f8fafc;
        border-top:1px solid #e5e7eb;
        padding:20px;
        text-align:center;
      ">

        <p style="
          margin:0;
          color:#64748b;
          font-size:12px;
        ">
          This is an automated email. Please do not reply.
        </p>

        <p style="
          margin:8px 0 0;
          color:#94a3b8;
          font-size:12px;
        ">
          © ${new Date().getFullYear()} Renterr. All rights reserved.
        </p>

      </div>

    </div>

  </div>

</body>
</html>
      `,
    })

    console.log("OTP email sent successfully")

    return true

  } catch (error) {
    console.error("OTP EMAIL ERROR:", error)

    throw error
  }
}

export default sendOTP