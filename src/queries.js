import { gql } from "apollo-boost";

//🚧🚧🚧🚧🚧
export const getTopographicPlace = gql`
  query topographicPlace($query: String!)
  {
    topographicPlace(query: $query) {
      id
      name {
        value
      }
    }
  }
`;

export const getStopPlace = gql`
  query stopPlace($query: String!) 
  {
    stopPlace(query: $query) {
      id,
      name {
        value
      }
    }
  }
`;

export const getTrips = gql`
  query stopPlace($query: String!) 
  {
    stopPlace(query: $query) {
      id,
      name {
        value
      }
    }
  }
`;

