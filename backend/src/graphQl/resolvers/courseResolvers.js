import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
} from "../../controllers/course.controller.js";
import { authRole } from "../../middlewares/authRole.middleware.js";

export const CourseResolvers = {
  Course: {
    id: (course) => course._id.toString(),
  },
  Query: {
    courses: async (_, { searchTerm = "" }) => await getAllCourse(searchTerm),
    course: async (_, { id }) => await getSingleCourse(id),
  },
  Mutation: {
    createCourse: async (_, { name, description, prerequisites }, context) => {
      await authRole("Admin")(context);
      return await createCourse({ name, description, prerequisites });
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
