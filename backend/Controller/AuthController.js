import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import adminModel from "../Models/Admin.js"


export const signup = async (req, res) => {
  try {
    const {
      mobile,
      email,
      password,
      repassword,
      name,
      idType,
      idNumber,
    } = req.body;

    const profileImage = req.files?.profileImage?.[0];
    const idProofImage = req.files?.idProofImage?.[0];

    const existingUser = await adminModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    if (password !== repassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const user = new adminModel({
      mobile,
      email,
      password,
      name,
      idType,
      idNumber,

      profileImage: profileImage
        ? {
            data: profileImage.buffer.toString("base64"),
            contentType: profileImage.mimetype,
          }
        : null,

      idProofImage: idProofImage
        ? {
            data: idProofImage.buffer.toString("base64"),
            contentType: idProofImage.mimetype,
          }
        : null,
    });

    user.password = await bcrypt.hash(password, 10);

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Signup successful",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const user = await adminModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET not set in .env",
      });
    }

    const jwtToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      jwtToken,
      user: {
        _id: user._id,
        name: user.name,
        profileImage: user.profileImage,
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
