import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import { ApolloServer } from "apollo-server-express";
import { app } from "./app.js";
import { UserType } from "./graphQl/typeDefs/userType.js";
import { CourseType } from "./graphQl/typeDefs/courseType.js";
import { UserResolvers } from "./graphQl/resolvers/userResolvers.js";
import { CourseResolvers } from "./graphQl/resolvers/courseResolvers.js";
import { baseTypeDefs } from "./graphQl/base.js";
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;

const typeDefs = [baseTypeDefs, UserType, CourseType];
const resolvers = [UserResolvers, CourseResolvers];

const server = new ApolloServer({ typeDefs, resolvers });

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
