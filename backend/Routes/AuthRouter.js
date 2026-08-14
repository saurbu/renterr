import express from "express";

import upload from "../middlewares/upload.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";
import { signupValidation, loginValidation,} from "../Middlewares/validation.js";
import { signup, login, } from "../Controller/AuthController.js";
import { sendOtp, verifyOTP } from "../Controller/UserAuthController.js";

const router = express.Router();

router.post(
  "/signup",
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
    {
      name: "idProofImage",
      maxCount: 1,
    },
  ]),
  signupValidation,
  signup
);


router.post(
  "/login",
  loginValidation,
  login
);

router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  }
);


router.post('/sendotp',sendOtp)
router.post('/verifyotp', verifyOTP)
export default router;
