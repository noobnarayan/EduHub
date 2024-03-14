import Lecture from "../models/lecture.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { redis } from "../utils/redis/redisClient.js";

const getAllLectures = asyncHandler(async () => {
  let lectures = redis.get("lectures");

  if (lectures) {
    lectures = JSON.parse(JSON.stringify(lectures));
  } else {
    lectures = await Lecture.find().populate("course");
    redis.set("lectures", JSON.stringify(lectures), { EX: 60 });
  }
  return lectures;
});

const getSingleLecture = asyncHandler(async (id) => {
  let lecture = await redis.get("lecture");
  if (!lecture) {
    lecture = JSON.parse(JSON.stringify(lecture));
  } else {
    lecture = await Lecture.findById(id).populate("course");
    redis.set("lecture", JSON.stringify(lecture), { EX: 60 });
  }
});

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
  const lecture = await Lecture.findByIdAndUpdate(_id, data);
  if (!lecture) {
    throw new Error("Something went wrong while updating the lecture");
  }
  return lecture;
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

export {
  createLecture,
  updateLecture,
  deleteLecture,
  getAllLectures,
  getSingleLecture,
};
