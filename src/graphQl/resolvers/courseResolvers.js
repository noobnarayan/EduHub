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
    createCourse: async (_, { name, description, prerequisites }) => {
      await authRole("Admin");
      return await createCourse({ name, description, prerequisites });
    },

    updateCourse: async (_, { id, name, description, prerequisites }) => {
      await authRole("Admin");
      return await updateCourse({ id, name, description, prerequisites });
    },
    deleteUser: async (_, { id }) => {
      await authRole("Admin");
      return await deleteCourse(id);
    },
  },
};
