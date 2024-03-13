import {
  createLecture,
  deleteLecture,
  updateLecture,
} from "../../controllers/lecture.controller.js";
import { authRole } from "../../middlewares/authRole.middleware.js";
import Lecture from "../../models/lecture.model.js";

export const LectureResolver = {
  Query: {
    lectures: async () => await Lecture.find(),
    lecture: async (_, { id }) => await Lecture.findById(id),
  },
  Mutation: {
    createLecture: async (_, data, context) => {
      await authRole("Admin")(context);
      return await createLecture({
        data,
      });
    },
    updateLecture: async (_, data) => {
      await authRole("Admin")(context);
      return await updateLecture(data);
    },
    deleteLecture: async (_, data, context) => {
      await authRole("Admin")(context);
      return await deleteLecture(data);
    },
  },
};
