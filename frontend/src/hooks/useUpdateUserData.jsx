import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const GET_CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
      id
      email
      name
      role
      courses {
        id
        name
        description
        prerequisites
      }
    }
  }
`;

const useUpdateUserData = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (data?.currentUser) {
      auth.login(data);
    }
  }, [data]);

  return { data, loading, error };
};

export default useUpdateUserData;
