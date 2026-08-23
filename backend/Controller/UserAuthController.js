import User from '../Models/User.js'
import OTP from '../Models/otp.js'
import sendOTP from '../utils/sendMail.js'
import generateToken from '../utils/generateToken.js'
// export const sendOtp = async (req, res) =>{
//     try{
//         const { email } = req.body
//         if(!email){
//             return res.status(400).json({
//                 message: "Email is required"
//             })
//         }

//         const normalizedMail = email.trim().toLowerCase()

//         const otp = Math.floor( 100000 + Math.random() * 900000).toString()

//         await OTP.deleteMany({
//             email: normalizedMail
//         })


//         await OTP.create({
//             email: normalizedMail,
//             otp: otp,
//             expiresAt: new Date(Date.now() +10 * 60 *1000)
//         })

//         await sendOTP (
//             normalizedMail,otp
//         )

//         res.status(200).json({
//             success: true,
//             message: "OTP send successfully"
//         })
//     }catch(err){
//         res.status(500).json({
//             message: "Failed to send otp: ",
//             error: err.message 
//         })
//     }
// }
export const sendOtp = async (req, res) => {
  try {
    console.log("========== SEND OTP START ==========")

    const { email } = req.body

    console.log("Email received:", email)

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      })
    }

    const normalizedMail = email.trim().toLowerCase()

    console.log("Normalized email:", normalizedMail)

    // Generate exactly 6 digits
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString()

    console.log("OTP generated:", otp)

    // Delete old OTP
    console.log("Deleting old OTP...")

    await OTP.deleteMany({
      email: normalizedMail,
    })

    console.log("Old OTP deleted")

    // Save new OTP
    console.log("Creating new OTP...")

    await OTP.create({
      email: normalizedMail,
      otp: otp,
      expiresAt: new Date(
        Date.now() + 10 * 60 * 1000
      ),
    })

    console.log("New OTP created")

    // Send email
    console.log("Sending email...")

    await sendOTP(
      normalizedMail,
      otp
    )

    console.log("Email sent successfully")

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    })

  } catch (err) {
    console.error("========== SEND OTP ERROR ==========")
    console.error(err)

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: err.message,
    })
  }
}

export const verifyOTP = async (req, res) =>{
    try{
        const { email, otp }= req.body 

        if(!email || !otp){
            return res.status(400).json({
                message: "Email and otp are requird "
            })
        }

        const normalizedMail = email.trim().toLowerCase()

        const otpCheck = await OTP.findOne({
            email: normalizedMail,
            otp: otp
        })

        if(!otpCheck){
            return res.status(400).json({
                message: "Enter valid otp"
            })
        }

        if(otpCheck.expiresAt <new Date()){
            await OTP.deleteOne({
                _id: otpCheck._id
            })
            return res.status(400).json({
                message: "otp Expired"
            })
        }

        await OTP.deleteOne({
            _id: otpCheck._id
        })

        let user = await User.findOne({
            email : normalizedMail
        })


        if(!user){
            user = await User.create({
                email: normalizedMail,
                isProfileComplete: false
            })

            const token = generateToken(user._id)
            return res.status(200).json({
                success: true,
                newUser: true,
                token,
                user
            })
            
        }

        const token = generateToken(user._id)

        res.status(200).json({
            success: true,
            newUser: false,
            isProfileCompleted: user.isProfileCompleted,
            token,
            user
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: "varification failed" ,
            error: err.message
        })
    }
}
 