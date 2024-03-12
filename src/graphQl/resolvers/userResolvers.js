import User from "../../models/user.model.js";

export const UserResolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
  },
  Mutation: {
    createUser: async (_, { name, email, password, role }) =>
      await User.create({ name, email, password, role }),
    updateUser: async (_, { id, name, email, password, role }) =>
      await User.findByIdAndUpdate(
        id,
        { name, email, password, role },
        { new: true }
      ),
    deleteUser: async (_, { id }) => await User.findByIdAndDelete(id),
  },
};
