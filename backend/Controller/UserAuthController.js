import User from '../Models/User.js'
import OTP from '../Models/otp.js'
import sendOTP from '../utils/sendMail.js'
import generateToken from '../utils/generateToken.js'
export const sendOtp = async (req, res) =>{
    try{
        const { email } = req.body
        if(!email){
            return res.status(400).json({
                message: "Email is required"
            })
        }

        const normalizedMail = email.trim().toLowerCase()

        const otp = Math.floor( 100000 + Math.random() * 999999).toString()

        await OTP.deleteMany({
            email: normalizedMail
        })


        await OTP.create({
            email: normalizedMail,
            otp: otp,
            expiresAt: new Date(Date.now() +10 * 60 *1000)
        })

        await sendOTP (
            normalizedMail,otp
        )

        res.status(200).json({
            success: true,
            message: "OTP send successfully"
        })
    }catch(err){
        res.status(500).json({
            message: "Failed to send otp: ",
            error: err.message 
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
 