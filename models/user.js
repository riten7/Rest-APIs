import Joi from 'joi';
import jwt from 'jsonwebtoken';
import config from 'config';
import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

userSchema.methods.generateAuthToken = function() {
  //we can send any kind of string/object in sign()
  console.log('234fef')
  return jwt.sign({ _id: this._id }, config.get('Course.jwtPrivateKey'), { expiresIn: '7d' });
}

export const User = mongoose.model('User', userSchema);

export const validateRequest = (user) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
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

