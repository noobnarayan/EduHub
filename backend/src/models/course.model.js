import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  prerequisites: {
    type: [String],
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
