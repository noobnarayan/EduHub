import {
  createCourse,
  deleteCourse,
  updateCourse,
} from "../../controllers/course.controller.js";
import { authRole } from "../../middlewares/authRole.middleware.js";
import Course from "../../models/course.model.js";

export const CourseResolvers = {
  Query: {
    courses: async () => await Course.find(),
    course: async (_, { id }) => await Course.findById(id),
  },
  Mutation: {
    createCourse: async (_, { name, description, prerequisites }, context) => {
      await authRole("Admin")(context);
      return await createCourse({ name, description, prerequisites }, context);
    },

    updateCourse: async (
      _,
      { id, name, description, prerequisites },
      context
    ) => {
      await authRole("Admin")(context);
      return await updateCourse({ id, name, description, prerequisites });
    },
    deleteCourse: async (_, { id }, context) => {
      await authRole("Admin")(context);
      return await deleteCourse(id);
    },
  },
};
