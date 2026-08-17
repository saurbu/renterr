import express from 'express'
import { getMe, profileComplete } from '../Controller/UserController.js'
import upload from '../Middlewares/upload.js'
import protect from '../Middlewares/Middleware.js'
import { booking, cancel } from '../Controller/BookingController.js'


const router = express.Router()

router.put(
    "/profilecomplete",
    protect,
    upload.single("licencePhoto"),
    profileComplete
);
router.get('/me', getMe)
router.post('/bookcar',protect, booking)  
router.patch('/bookcar/:bookingId/cancel',protect, cancel) 

export default router 