import express from 'express';
import cors from 'cors';
import { Course, validateRequest } from '../models/course.js';
import { User } from '../models/user.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(cors());
router.use(express.json());

router.get("/getCourses", async (_, response, next) => {
  try {
    const courses = await Course.find().select('name type author');
    response.send(courses);
  } catch (error) {
    next(error);
  }
});

router.get("/getCoursesByUser", auth, async (request, response, next) => {
  try {
    const courses = await Course.find().where('author._id').equals(request.user._id).select('name type author');
    response.send(courses);
  } catch (error) {
    next(error);
  }
});

router.get("/getCourse/:id", auth, async (request, response, next) => {
  try {
    const course = await Course.findById(request.params.id);
    response.send(course);
  } catch (err) {
    next(error);
  }
});

router.post("/insertCourse", auth, async (request, response, next) => {
  const { error } = validateRequest(request.body);
  if (error) return next(error);
  try {
    const { name, level, date, description, type, } = request.body;

    const user = await User.findById(request.user._id);
    if(!user) return next('User is not available!');  //this case should not happen

    const author = {
      _id: request.user._id,
      name: user.name
    }

    let course = new Course({ name, level, author, date, description, type, files: [] })
    await course.save();

    const result = await Course.find();
    response.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/updateCourse/:id", auth, async (request, response, next) => {
  const { error } = validateRequest(request.body);
  if (error) return next(error);
  try {
    const course = await Course.findById(request.params.id);
    if (!course) return response.status(404).json({ message: "The course with the given ID was not found." });

    const { name, level, author, date, description, type, } = request.body;

    const result = await Course.findByIdAndUpdate(request.params.id, {
      name, level, author, date, description, type
    }, { new: true });

    response.send(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/deleteCourse/:id", auth, async (request, response, next) => {
  try {
    const course = await Course.findByIdAndRemove(request.params.id);
    if (!course) return response.status(404).json({ message: "The course with the given ID was not found." });
    response.send(movie);
  } catch (error) {
    next(error);
  }
});

router.post("/addFiles/:id", auth, async (request, response, next) => {
  try {
    const course = await Course.findById(request.params.id);
    course.files = request.body;
    course.save();
    response.send(course);
  } catch (error) {
    next(error)
  }
});

router.delete("/removeFile/:fileId/:courseId", auth, async (request, response, next) => {
  try {
    const course = await Course.findById(request.params.courseId);
    const file = course.files.id(request.params.fileId);
    file.remove();
    course.save();
    response.send(course);
  } catch (error) {
    next(error);
  }
})

export default router;