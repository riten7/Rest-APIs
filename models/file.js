import mongoose from 'mongoose';
import Joi from 'joi';

export const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  type: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    maxlength: 255,
  },
  // course: {
  //   type: new mongoose.Schema({
      
  //   })
  // }
});

const schema = {
  name: Joi.string().required(),
  type: Joi.string().required(),
  size: Joi.number().required(),
  path: Joi.string().required(),
};

export const validateRequest = (file) => {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  };
  return Joi.object(schema).validate(file, options);
}

export const File = mongoose.model('File', fileSchema);