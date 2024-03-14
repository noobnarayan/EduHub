import Lecture from "../models/lecture.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { redis } from "../utils/redis/redisClient.js";

const getAllLectures = asyncHandler(async (searchTerm = "") => {
  let lectures = await redis.get(`lectures:${searchTerm}`);

  if (!lectures) {
    const filter = { title: { $regex: searchTerm, $options: "i" } };
    lectures = await Lecture.find(filter).populate("course");
    const pipeline = redis.pipeline();
    pipeline.set(`lectures:${searchTerm}`, JSON.stringify(lectures));
    pipeline.expire(`lectures:${searchTerm}`, 30);
    await pipeline.exec();
  } else {
    lectures = JSON.parse(JSON.stringify(lectures));
  }

  return lectures || [];
});

const getSingleLecture = asyncHandler(async (id) => {
  let lecture = await redis.get(`lecture:${id}`);
  if (lecture) {
    lecture = JSON.parse(JSON.stringify(lecture));
  } else {
    lecture = await Lecture.findById(id).populate("course");
    const pipeline = redis.pipeline();
    pipeline.set(`lecture:${id}`, JSON.stringify(lecture));
    pipeline.expire(`lecture:${id}`, 30);
    await pipeline.exec();
  }
  return lecture;
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
