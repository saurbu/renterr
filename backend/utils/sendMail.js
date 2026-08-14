import "dotenv/config";
import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})


const sendOTP = async (email, otp) =>{
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Renterr Login OTP",
        html: `
            <div style="font-family: Arial;">
                <h1>Renter Login</h1>
                <h2>Your OTP is:</h2>
                <p>${otp}</p>
                <h2>Do not share your OTP with any one.</h1>
                <h2>This OTP is only valid for 3 minute.</h1>
                <h1>Thank You for Login</h1>

        
        `
    })
}



export default sendOTP