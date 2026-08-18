import User from "../Models/User.js";
import imagekit from "../config/imagekit.js";

export const profileComplete = async (req, res) => {
    try {
        const {
            name,
            number,
            licenceNumber
        } = req.body;

        if (!name || !number || !licenceNumber) {
            return res.status(400).json({
                message: "Name, Number, licence Number is required",
                success: false
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Licence photo is required",
                success: false
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const uploadResponse = await imagekit.upload({
            file: req.file.buffer,
            fileName: `licence-${user._id}-${Date.now()}.jpg`,
            folder: "/renterr/licences",
        })

        user.name = name;
        user.number = number;
        user.licenceNumber = licenceNumber;
        user.licencePhoto = uploadResponse.url;
        user.isProfileCompleted = true;

        await user.save();


        return res.status(200).json({
            message: "Profile created successfully",
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                number: user.number,
                licenceNumber: user.licenceNumber,
                licencePhoto: user.licencePhoto,
                isProfileCompleted: user.isProfileCompleted
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: "Profile creation failed",
            success: false,
            error: err.message
        });
    }
}

export const getMe = async (req, res) => {
    return res.status(200).json({
        message: "successful",
        success: true,
        user: req.user
    });
};