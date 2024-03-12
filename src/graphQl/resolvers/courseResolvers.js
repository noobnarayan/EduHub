import Course from "../../models/course.model.js";

export const CourseResolvers = {
  Query: {
    courses: async () => await Course.find(),
    course: async (_, { id }) => await Course.findById(id),
  },
  Mutation: {
    createCourse: async (_, { name, description, prerequisites }) =>
      await Course.create({ name, description, prerequisites }),
    updateCourse: async (_, { id, name, description, prerequisites }) =>
      await Course.findByIdAndUpdate(
        id,
        { name, description, prerequisites },
        { new: true }
      ),
    deleteUser: async (_, { id }) => await Course.findByIdAndDelete(id),
  },
};
