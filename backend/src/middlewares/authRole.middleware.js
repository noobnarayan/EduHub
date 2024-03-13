export const authRole =
  (role) =>
  async ({ user }) => {
    if (!user) {
      throw new Error("Authentication failed: User is not authenticated.");
    }
    if (user.role !== role) {
      throw new Error(`Unauthorized: User role must be ${role}`);
    }
  };
