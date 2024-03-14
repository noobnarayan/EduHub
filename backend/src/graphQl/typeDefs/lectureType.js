import { gql } from "apollo-server-express";

export const LectureType = gql`
  type Lecture {
    id: ID!
    course: Course!
    title: String!
    startTime: String!
    endTime: String!
    description: String
    link: String!
  }

  extend type Query {
    lectures(searchTerm: String): [Lecture]
    lecture(id: ID!): Lecture
  }
  extend type Mutation {
    createLecture(
      course: ID
      title: String!
      startTime: String!
      endTime: String!
      description: String
      link: String!
    ): Lecture
    updateLecture(
      id: ID!
      course: ID
      title: String
      startTime: String
      endTime: String
      description: String
      link: String
    ): Lecture
    deleteLecture(id: ID!): Lecture
  }
`;
