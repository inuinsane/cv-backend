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

// Education Data validation
export const educationValidation = (data) => {
  const schema = Joi.object({
    schoolName: Joi.string().min(5).max(128).required(),
    startYear: Joi.number().required(),
    endYear: Joi.number().allow(null).default(null),
    major: Joi.string().max(128).allow("").default(""),
    information: Joi.string().max(1024).allow("").default(""),
  });
  return schema.validate(data);
};

// Skill Data validation
export const trainingValidation = (data) => {
  const schema = Joi.object({
    trainingName: Joi.string().min(5).max(128).required().allow(""),
    trainingVendor: Joi.string().max(64).required().allow(""),
    trainingLocation: Joi.string().max(128).required().allow(""),
    certificateNumber: Joi.string().max(128).required().allow(""),
    certificateLink: Joi.string().max(128).allow(""),
    start: Joi.date().required(),
    end: Joi.date(),
  });

  return schema.validate(data);
};
