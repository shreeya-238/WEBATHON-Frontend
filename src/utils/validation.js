import Joi from "joi";

export const consumerValidation = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  pincode: Joi.string().pattern(/^[0-9]{6}$/).required(),
  aadhaarNumber: Joi.string().pattern(/^[0-9]{12}$/).required()
});

export const companyValidation = Joi.object({
  companyName: Joi.string().min(2).required(),
  ownerName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .required(),
  companyAddress: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  pincode: Joi.string().pattern(/^[0-9]{6}$/).required(),
  panNumber: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).required(),
  gstinNumber: Joi.string().pattern(/^[0-9A-Z]{15}$/).required(),
  businessType: Joi.string().required(),
  businessDescription: Joi.string().max(500).required()
});

// Validation helper functions
export const validateForm = (schema, data) => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
    return { isValid: false, errors };
  }
  return { isValid: true, errors: {} };
};

// Field validation helpers
export const validateField = (schema, fieldName, value) => {
  const fieldSchema = Joi.object({ [fieldName]: schema.extract(fieldName) });
  const { error } = fieldSchema.validate({ [fieldName]: value });
  return error ? error.details[0].message : null;
};
