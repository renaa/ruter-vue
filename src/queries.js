import { gql } from "apollo-boost";

export const GET_FROGNS = gql`
  query topographicPlace($query: String!){
    topographicPlace(query: $query) {
      id
      name {
        value
      }
    }
  }
`;

