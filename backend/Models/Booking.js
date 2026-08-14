import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "owner",
      required: true
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cars",
      required: true
    },
    carDetails: {
      brand: {
        type: String,
        required: true
      },
      model: {
        type: String,
        required: true
      },
      pricePerDay: {
        type: Number,
        required: true
      },
      gearType: {
        type: String
      },
      engineType: {
        type: String
      },
      seats: {
        type: Number
      },
      state: {
        type: String
      },
      district: {
        type: String
      },
      images: {
        type: [String],
        default: []
      }
    },
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    number: {
      type: String,
      required: true
    },

    licenceNumber: {
      type: String,
      required: true
    },

    licencePhoto: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    days: {
      type: Number,
      required: true
    },

    totalAmount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "cancelled",
        "completed"
      ],
      default: "pending"
    },

    cancellationReason: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const bookingModel = mongoose.model("booking", BookingSchema);

export default bookingModel;