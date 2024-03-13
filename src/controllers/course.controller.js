import Course from "../models/course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

export { createCourse, updateCourse, deleteCourse };
