import {
  createUser,
  getAllUsers,
  getSingleUser,
  loginUser,
} from "../../controllers/user.controller.js";
import { authRole } from "../../middlewares/authRole.middleware.js";

export const UserResolvers = {
  User: {
    id: (user) => user._id.toString(),
  },
  Query: {
    users: async (_, { searchTerm = "" }, context) => {
      await authRole("Admin")(context);
      return await getAllUsers(searchTerm);
    },
    user: async (_, { id }) => await getSingleUser(id),
    currentUser: async (_, __, { user }) => user,
  },
  Mutation: {
    createUser: async (_, userData) => await createUser(userData),
    login: async (_, userData, context) => await loginUser(context, userData),
  },
};
