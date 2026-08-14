import User from "../Models/User.js"
import jwt from "jsonwebtoken"

const protect = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization

        console.log("AUTH HEADER:", authHeader)

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            })
        }

        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        const user = await User.findById(decoded.userId || decoded._id)

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        req.user = user

        next()

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
            error: err.message
        })
    }
}

export default protect;