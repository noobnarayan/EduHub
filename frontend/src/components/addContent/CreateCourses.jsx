import React, { useState } from "react";
import { Button, Input, notification } from "antd";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const COURSE_MUTATION = gql`
  mutation createCourse(
    $name: String!
    $description: String
    $prerequisites: [String]
  ) {
    createCourse(
      name: $name
      description: $description
      prerequisites: $prerequisites
    ) {
      id
    }
  }
`;

function CreateCourses() {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const navigate = useNavigate();
  const [createCourse, { loading }] = useMutation(COURSE_MUTATION, {
    onCompleted: async ({ createCourse }) => {
      notification.success({
        message: "Success",
        description: "Course created successfully!",
        placement: "bottomRight",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError: (error) => {
      notification.error({
        message: "Error",
        description: `Course creation failed: ${error.message}`,
        placement: "bottomRight",
      });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const prerequisitesArray = prerequisites
      .split(",")
      .map((item) => item.trim());

    createCourse({
      variables: {
        name: courseName,
        description: description,
        prerequisites: prerequisitesArray,
      },
    });
  };

  return (
    <div className="bg-white h-full rounded-lg p-2 md:p-10 my-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <h1 className="text-2xl font-medium">Create a new course</h1>
      </div>
      <div className="my-5 w-full md:w-1/2">
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Course Name</label>
          <Input
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Course Name"
            className="mb-4 border rounded p-2"
          />
          <label className="block mb-2">Description</label>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Description"
            className="mb-4 border rounded p-2"
          />
          <label className="block mb-2">Prerequisites</label>
          <TextArea
            value={prerequisites}
            onChange={(e) => setPrerequisites(e.target.value)}
            rows={4}
            placeholder="Enter prerequisites separated by commas, e.g., Basic Mathematics, Intro to Programming"
            className="mb-4 border rounded p-2"
          />

          <Button
            type="primary"
            htmlType="submit"
            className="bg-black "
            disabled={loading}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateCourses;
