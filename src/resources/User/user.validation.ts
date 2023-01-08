import Joi from 'joi';

const createUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  age: Joi.number().required(),
});

export default { createUser };
