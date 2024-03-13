import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import { ApolloServer } from "apollo-server-express";
import { app } from "./app.js";
import { UserType } from "./graphQl/typeDefs/userType.js";
import { CourseType } from "./graphQl/typeDefs/courseType.js";
import { UserResolvers } from "./graphQl/resolvers/userResolvers.js";
import { CourseResolvers } from "./graphQl/resolvers/courseResolvers.js";
import { baseTypeDefs } from "./graphQl/base.js";
import { verifyJWT } from "./middlewares/auth.middleware.js";
import { LectureType } from "./graphQl/typeDefs/lectureType.js";
import { LectureResolver } from "./graphQl/resolvers/lectureResolver.js";
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;

const typeDefs = [baseTypeDefs, UserType, CourseType, LectureType];
const resolvers = [UserResolvers, CourseResolvers, LectureResolver];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const user = await verifyJWT(req, res).catch((err) => console.log(err));

    return { req, res, user };
  },
});

connectDB()
  .then(async () => {
    await server.start();
    server.applyMiddleware({ app });
    app.listen(PORT, () => {
      console.log(
        `🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  })
  .catch((error) => {
    console.log(`DB Connection failed: ${error}`);
  });
