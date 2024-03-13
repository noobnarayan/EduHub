import {
  createLecture,
  deleteLecture,
  getAllLectures,
  getSingleLecture,
  updateLecture,
} from "../../controllers/lecture.controller.js";
import { authRole } from "../../middlewares/authRole.middleware.js";

export const LectureResolver = {
  Query: {
    lectures: async () => await getAllLectures(),
    lecture: async (_, { id }) => await getSingleLecture(id),
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
