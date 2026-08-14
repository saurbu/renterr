import express from 'express'
import authMiddleware from '../Middlewares/AuthMiddleware.js'
import upload from '../Middlewares/upload.js'
import { addCar, allcars, mycar, removeCar } from '../Controller/CarController.js'
import { allBookings } from '../Controller/BookingController.js'

const router = express.Router()

router.post('/addCar',authMiddleware, upload.array("carImages", 5), addCar) 
router.get('/mycars',authMiddleware, mycar)
router.get('/allcars', allcars)
router.get('/bookings',authMiddleware, allBookings)
router.delete('/mycars/:id', authMiddleware, removeCar)


export default router 