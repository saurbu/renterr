import "dotenv/config"
import nodemailer from "nodemailer"

console.log("EMAIL USER EXISTS:", !!process.env.EMAIL_USER)
console.log("EMAIL PASS EXISTS:", !!process.env.EMAIL_PASS)

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

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP ERROR:")
    console.error(error)
  } else {
    console.log("✅ SMTP SERVER READY")
  }
})

const sendOTP = async (email, otp) => {
  try {
    console.log("Preparing OTP email...")
    console.log("From:", process.env.EMAIL_USER)
    console.log("To:", email)

    const info = await transporter.sendMail({
      from: `"Renterr" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Renterr Login OTP",

      html: `
        <!DOCTYPE html>
        <html>
        <body style="
          margin:0;
          padding:30px;
          background:#f3f4f6;
          font-family:Arial,sans-serif;
        ">

          <div style="
            max-width:550px;
            margin:auto;
            background:white;
            border-radius:18px;
            overflow:hidden;
            box-shadow:0 8px 30px rgba(0,0,0,.1);
          ">

            <div style="
              background:linear-gradient(135deg,#312e81,#2563eb);
              padding:30px;
              text-align:center;
            ">
              <h1 style="
                margin:0;
                color:white;
                font-size:30px;
              ">
                Renterr
              </h1>

              <p style="
                color:#dbeafe;
                margin:8px 0 0;
              ">
                Drive Beyond Limits
              </p>
            </div>

            <div style="
              padding:35px 30px;
              text-align:center;
            ">

              <h2 style="color:#172554;">
                Login Verification
              </h2>

              <p style="
                color:#6b7280;
                line-height:1.6;
              ">
                Use the verification code below to
                continue logging in to your Renterr account.
              </p>

              <div style="
                display:inline-block;
                background:#eef2ff;
                border:2px solid #c7d2fe;
                border-radius:14px;
                padding:18px 30px;
                margin:20px 0;
              ">

                <span style="
                  color:#1e3a8a;
                  font-size:36px;
                  font-weight:bold;
                  letter-spacing:8px;
                ">
                  ${otp}
                </span>

              </div>

              <p style="
                color:#6b7280;
                font-size:14px;
              ">
                This OTP is valid for
                <strong style="color:#2563eb;">
                  10 minutes
                </strong>.
              </p>

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
                ">
                  🔒 Never share this OTP with anyone.
                  Renterr will never ask for your OTP.
                </p>

              </div>

            </div>

            <div style="
              background:#f8fafc;
              padding:20px;
              text-align:center;
              border-top:1px solid #e5e7eb;
            ">

              <p style="
                margin:0;
                color:#64748b;
                font-size:12px;
              ">
                This is an automated email.
                Please do not reply.
              </p>

              <p style="
                color:#94a3b8;
                font-size:12px;
              ">
                © ${new Date().getFullYear()} Renterr
              </p>

            </div>

          </div>

        </body>
        </html>
      `,
    })

    console.log("✅ OTP EMAIL SENT:", info.messageId)

    return true

  } catch (error) {
    console.error("❌ OTP EMAIL ERROR:")
    console.error(error)

    throw error
  }
}

export default sendOTP