import mongoose from "mongoose";


const OTPSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        lowercase: true
    },

    otp: {
        type: String,
        required: true
    },

    expiresAt: {
        type: Date,
        required: true
    }

}, {
    timestamps: true
});


const OTP = mongoose.model("OTP", OTPSchema);

export default OTP;