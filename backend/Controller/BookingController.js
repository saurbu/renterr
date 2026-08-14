import Booking from '../Models/Booking.js'
import Car from '../Models/CarModal.js'

export const booking = async (req, res) =>{
    try{
        const { 
            carId,
            date,
            days,
            totalAmount,
        } = req.body


         if (!days || !carId || !date || !totalAmount) {
            return res.status(400).json({
                message: "all feilds are required",
                success: false
            });
        }

        const user = req.user

        if (!user) {
            return res.status(400).json({
                message: "user not found",
                success: false
            });
        }
        const car = await Car.findById(carId)
        if (!car) {
            return res.status(400).json({
                message: "car not found",
                success: false
            });
        }

        const newBooking = await Booking.create({
            user: user._id,
            car: car._id,
            owner: car.owner,

            carDetails: {
                brand: car.brand,
                model: car.model,
                pricePerDay: car.pricePerDay,
                gearType: car.gearType,
                engineType: car.engineType,
                seats: car.seats,
                state: car.state,
                district: car.district,
                images: car.images
            },
 
            name: user.name,
            email: user.email,
            date: date,
            days: days,
            number: user.number,
            totalAmount: totalAmount,
            licenceNumber: user.licenceNumber,
            licencePhoto: user.licencePhoto,
            status: "pending"
        })
        
        res.status(200).json({
            message: "Booking confirmed",
            success: true,
            newBooking
        })
    }catch(err){
        res.status(500).json({
            message: "Booking failed" ,
            success: false,
            error: err.message
        })
    }
}

export const cancel = async (req, res) =>{
    try{
        const {
            cancelationReason
        } = req.body
        const {
            bookingId
        } = req.params

        
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }
        if (!booking) {
            return res.status(400).json({
                message: "not found",
                success: false
            })
        }
        if(booking.user.toString() !== user._id.toString()){
            return res.status(400).json({
                message: "cancel not allowed  ",
                success: false
            })
        }

        if (booking.status === "rejected") {
            return res.status(400).json({
                message: "booking is alredy rejected",
                success: false
            })
        }

        booking.status = "cancelled"
        booking.reason = cancelationReason || "Not provided"
        await booking.save()

        res.status(200).json({
            message: "cancelled",
            success: true
        })
    }catch(err){
        res.status(500).json({
            message: "cancellation failed",
            success: false,
            error: err.message
        })
    }

}

export const allBookings = async (req, res) =>{
    try{
        const bookings = await Booking.find({
            owner: req.user._id
        })
        .populate("car", "brand model images pricePerDay")
        .sort({date: -1})

        res.status(200).json({
            message: "all bookings",
            success:true,
            bookings
        })
    }catch(err){
        res.status(500).json({
            message: "booking not found",
            success: false,
            error: err.message
        })
    }
}