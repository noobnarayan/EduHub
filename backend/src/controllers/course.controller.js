import Course from "../models/course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { redis } from "../utils/redis/redisClient.js";

const getAllCourse = asyncHandler(async (searchTerm) => {
  let courses = await redis.get(`courses:${searchTerm}`);
  if (courses) {
    courses = JSON.parse(JSON.stringify(courses));
  } else {
    const filter = { name: { $regex: searchTerm, $options: "i" } };
    courses = await Course.find(filter);
    await redis.set(`courses:${searchTerm}`, JSON.stringify(courses));
    await redis.expire(`courses:${searchTerm}`, 60);
  }
  return courses;
});

const getSingleCourse = asyncHandler(async (id) => {
  let course = await redis.get(`course:${id}`);
  if (course) {
    course = JSON.parse(JSON.stringify(course));
  } else {
    course = await Course.findById(id);
    await redis.set(`course:${id}`, JSON.stringify(course));
    await redis.expire(`course:${id}`, 60);
  }
  return course;
});

const createCourse = asyncHandler(async (course) => {
  const { name, description, prerequisites } = course;
  if (!name) {
    throw new Error("Course name is required");
  }
  if (!description) {
    throw new Error("Course description is required");
  }

  const newCourse = await Course.create({ name, description, prerequisites });
  return newCourse;
});

const updateCourse = asyncHandler(async (update) => {
  const { id, name, description, prerequisites } = update;
  if (!name) {
    throw new Error("Course name is required");
  }
  if (!description) {
    throw new Error("Course description is required");
  }

  const existingCourse = await Course.findById(id);
  if (!existingCourse) {
    throw new Error("Course does not exist");
  }
  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    { name, description, prerequisites },
    { new: true }
  );
  return updatedCourse;
});

const deleteCourse = asyncHandler(async (id) => {
  const existingCourse = await Course.findById(id);
  if (!existingCourse) {
    throw new Error("Course does not exist");
  }
  const deletedCourse = await Course.findByIdAndDelete(id);
  return deletedCourse;
});

export {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourse,
  getSingleCourse,
};
