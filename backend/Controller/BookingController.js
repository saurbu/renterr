import Booking from "../Models/Booking.js"
import Car from "../Models/CarModal.js"

export const booking = async (req, res) => {
    try {
        const {
            carId,
            date,
            days,
            totalAmount
        } = req.body

        if (!carId || !date || !days || !totalAmount) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }

        const user = req.user

        if (!user) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            })
        }

        const car = await Car.findById(carId)

        if (!car) {
            return res.status(404).json({
                message: "Car not found",
                success: false
            })
        }
        if (car.isBooked === true) {
            return res.status(400).json({
                message: "Car is already booked",
                success: false
            })
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
            number: user.number,

            date,
            days,
            totalAmount,

            licenceNumber: user.licenceNumber,
            licencePhoto: user.licencePhoto,

            status: "pending"
        })

        res.status(201).json({
            message: "Booking created successfully",
            success: true,
            newBooking
        })

    } catch (err) {
        console.log("BOOKING ERROR:", err)

        res.status(500).json({
            message: "Booking failed",
            success: false,
            error: err.message
        })
    }
}

export const status = async (req, res) => {
    try {
        const { bookingId } = req.params
        const { status } = req.body

        if (!bookingId || !status) {
            return res.status(400).json({
                message: "Booking ID and status are required",
                success: false
            })
        }

        const validStatuses = [
            "pending",
            "accepted",
            "rejected",
            "cancelled",
            "completed"
        ]

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status",
                success: false
            })
        }

        const booking = await Booking.findById(bookingId)

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
                success: false
            })
        }
        if (
            ["completed", "cancelled", "rejected"].includes(
                booking.status
            )
        ) {
            return res.status(400).json({
                message: `Booking is already ${booking.status}`,
                success: false
            })
        }

        const car = await Car.findById(booking.car)

        if (!car) {
            return res.status(404).json({
                message: "Car associated with booking not found",
                success: false
            })
        }
        if (status === "accepted") {
            if (car.isBooked === true) {
                return res.status(400).json({
                    message: "Car is already booked",
                    success: false
                })
            }

            booking.status = "accepted"
            car.isBooked = true
        }

        else if (status === "rejected") {
            booking.status = "rejected"
            car.isBooked = false
        }
        else if (status === "cancelled") {
            booking.status = "cancelled"
            car.isBooked = false
        }
        else if (status === "completed") {
            booking.status = "completed"
            car.isBooked = false
        }
        else if (status === "pending") {
            booking.status = "pending"
            car.isBooked = false
        }
        await booking.save()
        await car.save()
        res.status(200).json({
            message: "Status changed successfully",
            success: true,
            booking,
            carBooked: car.isBooked
        })

    } catch (err) {

        res.status(500).json({
            message: "Status change failed",
            success: false,
            error: err.message
        })
    }
}

export const endBooking = async () => {
  try {
    const bookings = await Booking.find({
      status: "accepted"
    })

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (const booking of bookings) {
      const end = new Date(booking.date)

      end.setDate(end.getDate() + booking.days)
      end.setHours(0, 0, 0, 0)

      if (today >= end) {
        booking.status = "completed"
        await booking.save()

        const car = await Car.findById(booking.car)

        if (car) {
          car.isBooked = false
          await car.save()
        }
      }
    }

    console.log("Expired bookings checked")

  } catch (error) {
    console.log("END BOOKING ERROR:", error)
  }
}

export const cancel = async (req, res) => {
    try {

        const { cancelationReason } = req.body
        const { bookingId } = req.params

        const user = req.user

        if (!user) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            })
        }
        const booking = await Booking.findById(bookingId)

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
                success: false
            })
        }
        if (
            booking.user.toString() !==
            user._id.toString()
        ) {
            return res.status(403).json({
                message: "Cancellation not allowed",
                success: false
            })
        }

        if (
            ["completed", "cancelled", "rejected"]
                .includes(booking.status)
        ) {
            return res.status(400).json({
                message: `Booking is already ${booking.status}`,
                success: false
            })
        }
        booking.status = "cancelled"
        booking.reason =
            cancelationReason || "Not provided"

        await booking.save()
        const car = await Car.findById(booking.car)
        if (car) {
            car.isBooked = false
            await car.save()
        }

        res.status(200).json({
            message: "Booking cancelled successfully",
            success: true
        })

    } catch (err) {

        console.log(
            "CANCELLATION ERROR:",
            err
        )

        res.status(500).json({
            message: "Cancellation failed",
            success: false,
            error: err.message
        })
    }
}

export const allBookings = async (req, res) => {
    try {

        const bookings = await Booking.find({
            owner: req.user._id
        })
        .populate(
            "car",
            "brand model images pricePerDay"
        )
        .sort({
            date: -1
        })

        res.status(200).json({
            message: "All bookings",
            success: true,
            bookings
        })

    } catch (err) {

        console.log(
            "ALL BOOKINGS ERROR:",
            err
        )

        res.status(500).json({
            message: "Bookings not found",
            success: false,
            error: err.message
        })
    }
}