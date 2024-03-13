import mongoose, { Schema } from "mongoose";

const lectureSchema = new Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  link: {
    type: String,
  },
});

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;
