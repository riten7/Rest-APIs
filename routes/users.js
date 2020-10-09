import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import { User, validateRequest } from '../models/user.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(cors());
router.use(express.json());

router.get("/me", auth, async (request, response, next) => {
  try {
    const user = await User.findById(request.user._id).select('-password -_id');
    response.send(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  const { error } = validateRequest(request.body);
  if (error) next(error);

  try {
    let user = await User.findOne({ email: request.body.email });
    if (user) return response.status(400).json({ message: 'User already exists' });

    const { name, email, password } = request.body;
    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    response
      .header('x-auth-token', token)
      .send(_.pick(user, ['_id', 'name', 'email']));
  } catch (error) {
    next(error);
  };
});

export default router;

