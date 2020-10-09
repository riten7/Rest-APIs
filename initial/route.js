import express from 'express';
import course from '../routes/course.js';
import user from '../routes/users.js';
import auth from '../routes/auth.js';
import error from '../middleware/error.js';

export default function(app) {
  app.use(express.json());
  app.use('/course', course);
  app.use('/users', user);
  app.use('/auth', auth)
  app.use(error);
}
