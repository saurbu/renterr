import Joi from 'joi'

export const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    repassword: Joi.string().valid(Joi.ref("password")).required(),
    name: Joi.string().required(),
    idType: Joi.string().required(),
    idNumber: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });

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
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((e) => e.message),
    });
  }

  next();
};

