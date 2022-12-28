import Joi from "@hapi/joi";

// Register validation
export const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(256).required(),
    username: Joi.string().min(6).max(20).required(),
    email: Joi.string().min(5).max(128).required(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};

// Experience Data validation
export const experienceValidation = (data) => {
  const schema = Joi.object({
    companyName: Joi.string().min(5).max(128).required(),
    positionName: Joi.string().min(4).max(128).required(),
    start: Joi.date().required(),
    end: Joi.date(),
  });
  return schema.validate(data);
};
