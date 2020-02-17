import { gql } from "apollo-boost";

export const GET_FROGNS = gql`
  query {
    topographicPlace(query: "frogn") {
      id
      name {
        value
      }
    }
  }
`;

