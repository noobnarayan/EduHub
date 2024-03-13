import { createUser, loginUser } from "../../controllers/user.controller.js";
import { authRole } from "../../middlewares/authRole.middleware.js";
import User from "../../models/user.model.js";

export const UserResolvers = {
  Query: {
    users: async (_, __, context) => {
      await authRole("Admin")(context);
      return await User.find();
    },
    user: async (_, { id }) => await User.findById(id),
    currentUser: async (_, __, { user }) => user,
  },
  Mutation: {
    createUser: async (_, userData) => await createUser(userData),
    login: async (_, userData, context) => await loginUser(context, userData),
  },
};
