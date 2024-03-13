const asyncHandler = (resolverFunction) => {
  return async (parent, args, context, info) => {
    try {
      return await resolverFunction(parent, args, context, info);
    } catch (error) {
      throw error;
    }
  };
};

export { asyncHandler };
