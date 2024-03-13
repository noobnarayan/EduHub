import { gql } from "apollo-server-express";

export const CourseType = gql`
  type Course {
    id: ID!
    name: String!
    description: String
    prerequisites: [String]
  }

  extend type Query {
    courses: [Course]
    course(id: ID!): Course
  }

  extend type Mutation {
    createCourse(
      name: String!
      description: String
      prerequisites: [String]
    ): Course
    updateCourse(
      id: ID!
      name: String
      description: String
      prerequisites: [String]
    ): Course
    deleteCourse(id: ID!): Course
  }
`;
