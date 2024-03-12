import { gql } from "apollo-server-express";

export const UserType = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: String!
    courses: [ID]
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      role: String!
    ): User
    updateUser(
      id: ID!
      name: String
      email: String
      password: String
      role: String
    ): User
    deleteUser(id: ID!): User
  }
`;
