import mongoose from "mongoose"

const AdminSchema = new mongoose.Schema({
    mobile:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },

    profileImage:{
        data: String,
        contentType: String
    },

    name:{
        type: String,
        required: true,
    },
    idType:{
        type: String,
        required: true,
    },
    idNumber:{
        type: String,
        required: true,
    },

    idProofImage:{
        data: String,
        contentType: String
    },

},{
    timestamps: true
})

const adminModel = mongoose.model('admins', AdminSchema)

export default adminModel