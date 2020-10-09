import mongoose from 'mongoose';
import Joi from 'joi';
import { fileSchema } from './file.js';

export const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  type: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 250,
  },
  author: {
    type: new mongoose.Schema({
      name:{
        type: String,
        required: true,
        maxlength: 100,
      }
    }),
    required: true,
  },
  files: [fileSchema],
});

const schema = {
  name: Joi.string().required(),
  type: Joi.string().required(),
  level: Joi.number().required(),
  date: Joi.date().min(6).required(),
  description: Joi.string().required(),
  files: Joi.array(),
};

export const validateRequest = (course) => {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  };
  return Joi.object(schema).validate(course, options);
}

export const Course = mongoose.model('Course', courseSchema);

