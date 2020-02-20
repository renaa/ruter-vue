import { gql } from "apollo-boost";

//🚧🚧🚧🚧🚧
export const getTopographicPlace = gql`
  query topographicPlace($query: String!) {
    topographicPlace(query: $query) {
      id
      name {
        value
      }
    }
  }
`;

export const getStopPlace = gql`
  query stopPlace($query: String!) {
    stopPlace(query: $query) {
      id
      
      name {
        value
      }
    }
  }
`;

export const getTrip = gql`
  query {
    trip(
      from: { place: "NSR:StopPlace:15951" }
      to: { place: "NSR:StopPlace:9582" }
      numTripPatterns: 5
      minimumTransferTime: 180
      walkSpeed: 1.3
    ) {
      tripPatterns {
        startTime
        duration
        walkDistance
        legs {
          mode
          distance
          line {
            id
            publicCode
          }
        }
      }
    }
  }
`;
