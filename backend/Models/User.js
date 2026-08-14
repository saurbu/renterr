import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    number:{
        type: String,
        // required: true,
        unique:true,
        trim: true
    },
    name:{
        type: String,
        // required: true,
    },
    licenceNumber:{
        type: String,
        // required: true,
    },
    licencePhoto:{
        type: String,
        // required: true,
    },
    isProfileCompleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps: true
})

const userModel = mongoose.model('users', UserSchema)

export default userModel