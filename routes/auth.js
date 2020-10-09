import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import { User } from '../models/user.js';

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(cors());
router.use(express.json());

router.post('/', async (request, response, next) => {
  const { error } = validateRequest(request.body);
  if (error) return next(error);

  try {
    let user = await User.findOne({ email: request.body.email });
    if (!user) return next('Invalid email or password');

    const validPassword = await bcrypt.compare(request.body.password, user.password);
    if (!validPassword) return next('Invalid email or password');

    const token = user.generateAuthToken();
    response.send(token);
  } catch (error) {
    next(error);
  }
});

export default router;

export const validateRequest = (user) => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  }

  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  };
  return Joi.object(schema).validate(user, options);

}

