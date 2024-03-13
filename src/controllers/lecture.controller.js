import Lecture from "../models/lecture.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createLecture = asyncHandler(async (data) => {
  const { course, title, startTime, endTime, link } = data;

  if (!course || !title || !startTime || !endTime || !link) {
    throw new Error("All fields are required");
  }
  const lecture = await Lecture.create(data);
  if (!lecture) {
    throw new Error("Something went wrong while creating the lecture");
  }
  return lecture;
});

const updateLecture = asyncHandler(async (data) => {
  const { _id, course, title, startTime, endTime, link } = data;
  if (!course || !title || !startTime || !endTime || !link) {
    throw new Error("All fields are required");
  }
});

const deleteLecture = asyncHandler(async (data) => {
  const { _id } = data;
  if (!_id) {
    throw new Error("Lecture id is required");
  }
  const lecture = await Lecture.findByIdAndDelete(_id);
  if (!lecture) {
    throw new Error("Something went wrong while deleting the lecture");
  }
  return lecture;
});

export { createLecture, updateLecture, deleteLecture };
