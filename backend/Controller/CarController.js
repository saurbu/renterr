import Car from '../Models/CarModal.js'
import User from '../Models/Admin.js'
import imagekit from "../config/imagekit.js"

export const addCar = async (req,res) =>{
    try{
        const {
            brand,
            model,
            pricePerDay,
            gearType,
            engineType,
            seats,
            state,
            district,
        } = req.body

        if(!brand || !model || !pricePerDay || !gearType || !engineType || !seats || !state || !district){
            return res.status(400).json({
                message: "all feild are requied" 
            })
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: "At least 1 Car image is required",
                success: false,
            })
        }

        if(req.files.length > 5){
            return res.status(400).json({
                message: "max 5 image",
                success: false,
            })
        }

        const seller = await User.findById(req.user._id)

        if(!seller){
            return res.status(400).json({
                message: "seller not found"
            })
        }

        const uploadResponse = await Promise.all(
            req.files.map((file, index) => 
                imagekit.upload({
                    file: file.buffer,
                    fileName: `cars-${seller._id}-${Date.now()}-${index}.jpg`,
                    folder: "/renterr/cars",
                })
            )
        )

        const imageUrl = uploadResponse.map((response) => response.url)

        const newCar = await Car.create({
            owner:seller._id,
            brand,
            model,
            pricePerDay,
            gearType,
            engineType,
            seats,
            state,
            district,
            images: imageUrl,
        })

        res.status(201).json({
            success: true,
            message: "car added successfully",
            car: newCar
        })
    }catch (error){
        res.status(500).json({
            message:"failed to add car", 
            error: error.message
        })
    }
}

export const mycar = async (req, res) =>{
    try{
        const cars = await Car.find({
            owner: req.user._id
        }).sort({createdAt: -1})

        res.status(200).json({
            message: "your all cars",
            success: true,
            cars

        })
    }catch(err){
        res.status(500).json({
            message: "car not found",
            success: false,
            error: err.message
        })

    }
}

export const allcars = async (req, res) =>{
    try{
        const cars = await Car.find().sort({createdAt: -1})

        res.status(200).json({
            message: "your all cars",
            success: true,
            cars

        })
    }catch(err){
        res.status(500).json({
            message: "car not found",
            success: false,
            error: err.message
        })

    }
}

export const removeCar = async (req, res) => {
    try{
        const { id } =req.params
        const removecar = await Car.findByIdAndDelete(id)

        if(!removecar){
            return res.status(404).json({
                message: "car not found "
            })
        }

        res.status(200).json({
            message: "car removed successfully",
            success: true
        })
    }catch(err){
        res.status(500).json({
            message: "cant remove car",
            success: false
        })
    }
}


