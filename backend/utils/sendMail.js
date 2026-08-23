import "dotenv/config"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const sendOTP = async (email, otp) => {
  try {
    console.log("Preparing OTP email...")
    console.log("To:", email)

    const { data, error } = await resend.emails.send({
      from: "Renterr <onboarding@resend.dev>",
      to: [email],
      subject: "Your Renterr Login OTP",

      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Renterr Login OTP</title>
        </head>

        <body style="
          margin:0;
          padding:30px;
          background:#f3f4f6;
          font-family:Arial, Helvetica, sans-serif;
        ">

          <div style="
            max-width:550px;
            margin:0 auto;
            background:#ffffff;
            border-radius:18px;
            overflow:hidden;
            box-shadow:0 8px 30px rgba(0,0,0,0.10);
          ">

            <!-- Header -->

            <div style="
              background:linear-gradient(135deg,#312e81,#2563eb);
              padding:30px;
              text-align:center;
            ">

              <h1 style="
                margin:0;
                color:#ffffff;
                font-size:30px;
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
                margin:0 0 12px;
                color:#172554;
                font-size:24px;
              ">
                Login Verification
              </h2>

              <p style="
                margin:0 auto 25px;
                color:#6b7280;
                font-size:15px;
                line-height:1.6;
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
                  letter-spacing:8px;
                ">
                  ${otp}
                </span>

              </div>


              <p style="
                color:#6b7280;
                font-size:14px;
                line-height:1.6;
              ">
                This OTP is valid for
                <strong style="color:#2563eb;">
                  10 minutes
                </strong>.
              </p>


              <!-- Security -->

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
                This is an automated email.
                Please do not reply.
              </p>

              <p style="
                margin:8px 0 0;
                color:#94a3b8;
                font-size:12px;
              ">
                © ${new Date().getFullYear()} Renterr.
                All rights reserved.
              </p>

            </div>

          </div>

        </body>
        </html>
      `,
    })

    if (error) {
      console.error("❌ RESEND ERROR:")
      console.error(error)

      throw new Error(error.message)
    }

    console.log("✅ OTP EMAIL SENT")
    console.log("Message ID:", data.id)

    return true

  } catch (error) {
    console.error("❌ OTP EMAIL ERROR:")
    console.error(error)

    throw error
  }
}

export default sendOTP