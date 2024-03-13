import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
} from "../../controllers/course.controller.js";
import { authRole } from "../../middlewares/authRole.middleware.js";

export const CourseResolvers = {
  Query: {
    courses: async () => await getAllCourse(),
    course: async (_, { id }) => await getSingleCourse(id),
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
