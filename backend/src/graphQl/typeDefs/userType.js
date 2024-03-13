import { gql } from "apollo-server-express";

export const UserType = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: String!
    courses: [Course]
  }

  type AuthPayload {
    accessToken: String
    refreshToken: String
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
    currentUser: User
  }

  extend type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      role: String!
      courses: [ID]
    ): User

    login(email: String!, password: String!): AuthPayload

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
