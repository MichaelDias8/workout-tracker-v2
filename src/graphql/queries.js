/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProgramList = /* GraphQL */ `
  query GetProgramList($id: ID!) {
    getProgramList(id: $id) {
      id
      programOrder
      programs {
        items {
          id
          name
          trainingSessionOrder
          trainingSessions {
            items {
              id
              name
              exerciseOrder
              exercises {
                items {
                  id
                  name
                  numSets
                  minReps
                  maxReps
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const listProgramLists = /* GraphQL */ `
  query ListProgramLists(
    $filter: ModelProgramListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProgramLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        programOrder
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProgram = /* GraphQL */ `
  query GetProgram($id: ID!) {
    getProgram(id: $id) {
      id
      programListID
      name
      trainingSessionOrder
      trainingSessions {
        nextToken
        __typename
      }
      programList {
        id
        programOrder
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPrograms = /* GraphQL */ `
  query ListPrograms(
    $filter: ModelProgramFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrograms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        programListID
        name
        trainingSessionOrder
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTrainingSession = /* GraphQL */ `
  query GetTrainingSession($id: ID!) {
    getTrainingSession(id: $id) {
      id
      programID
      name
      exerciseOrder
      exercises {
        nextToken
        __typename
      }
      program {
        id
        programListID
        name
        trainingSessionOrder
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTrainingSessions = /* GraphQL */ `
  query ListTrainingSessions(
    $filter: ModelTrainingSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrainingSessions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        programID
        name
        exerciseOrder
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getExercise = /* GraphQL */ `
  query GetExercise($id: ID!) {
    getExercise(id: $id) {
      id
      trainingSessionID
      name
      numSets
      minReps
      maxReps
      trainingSession {
        id
        programID
        name
        exerciseOrder
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listExercises = /* GraphQL */ `
  query ListExercises(
    $filter: ModelExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExercises(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        trainingSessionID
        name
        numSets
        minReps
        maxReps
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const programsByProgramListIDAndId = /* GraphQL */ `
  query ProgramsByProgramListIDAndId(
    $programListID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProgramFilterInput
    $limit: Int
    $nextToken: String
  ) {
    programsByProgramListIDAndId(
      programListID: $programListID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        programListID
        name
        trainingSessionOrder
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const trainingSessionsByProgramIDAndId = /* GraphQL */ `
  query TrainingSessionsByProgramIDAndId(
    $programID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTrainingSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    trainingSessionsByProgramIDAndId(
      programID: $programID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        programID
        name
        exerciseOrder
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const exercisesByTrainingSessionIDAndId = /* GraphQL */ `
  query ExercisesByTrainingSessionIDAndId(
    $trainingSessionID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    exercisesByTrainingSessionIDAndId(
      trainingSessionID: $trainingSessionID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trainingSessionID
        name
        numSets
        minReps
        maxReps
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
