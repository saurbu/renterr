import Joi from 'joi'


export const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),
    repassword: Joi.string().valid(Joi.ref("password")).required(),

    name: Joi.string().min(3).max(100).required(),

    idType: Joi.string()
      .valid("Aadhaar", "PAN", "Driving Licence", "Passport")
      .required(),

    idNumber: Joi.alternatives().conditional("idType", {
      switch: [
        {
          is: "Aadhaar",
          then: Joi.string().pattern(/^[0-9]{12}$/).required(),
        },
        {
          is: "PAN",
          then: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).required(),
        },
        {
          is: "Driving Licence",
          then: Joi.string().min(10).max(20).required(),
        },
        {
          is: "Passport",
          then: Joi.string().pattern(/^[A-Z][0-9]{7}$/).required(),
        },
      ],
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((e) => e.message),
    });
  }

  next();
};


export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((e) => e.message),
    });
  }

  next();
};

