import mongoose from "mongoose"

const CarSchema = new mongoose.Schema({
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    model:{
        type: String,
        required: true,
    },
    pricePerDay:{
        type: Number,
        required: true,
    },
    gearType:{
        type: String,
        required: true,
    },

    engineType:{
        type: String,
        required: true,
    },

    seats:{
        type: Number,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    district:{
        type: String,
        required: true,
    },
    images:
    [
        {
            type: String,
            required: true,
        }
    ],
    isBooked:{
        type: Boolean,
        default: false
    },

},{
    timestamps: true
})

const carModel = mongoose.model('cars', CarSchema)

export default carModel