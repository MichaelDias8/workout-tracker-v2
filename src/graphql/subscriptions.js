/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProgramList = /* GraphQL */ `
  subscription OnCreateProgramList(
    $filter: ModelSubscriptionProgramListFilterInput
  ) {
    onCreateProgramList(filter: $filter) {
      id
      programOrder
      programs {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateProgramList = /* GraphQL */ `
  subscription OnUpdateProgramList(
    $filter: ModelSubscriptionProgramListFilterInput
  ) {
    onUpdateProgramList(filter: $filter) {
      id
      programOrder
      programs {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteProgramList = /* GraphQL */ `
  subscription OnDeleteProgramList(
    $filter: ModelSubscriptionProgramListFilterInput
  ) {
    onDeleteProgramList(filter: $filter) {
      id
      programOrder
      programs {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateProgram = /* GraphQL */ `
  subscription OnCreateProgram($filter: ModelSubscriptionProgramFilterInput) {
    onCreateProgram(filter: $filter) {
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
export const onUpdateProgram = /* GraphQL */ `
  subscription OnUpdateProgram($filter: ModelSubscriptionProgramFilterInput) {
    onUpdateProgram(filter: $filter) {
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
export const onDeleteProgram = /* GraphQL */ `
  subscription OnDeleteProgram($filter: ModelSubscriptionProgramFilterInput) {
    onDeleteProgram(filter: $filter) {
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
export const onCreateTrainingSession = /* GraphQL */ `
  subscription OnCreateTrainingSession(
    $filter: ModelSubscriptionTrainingSessionFilterInput
  ) {
    onCreateTrainingSession(filter: $filter) {
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
export const onUpdateTrainingSession = /* GraphQL */ `
  subscription OnUpdateTrainingSession(
    $filter: ModelSubscriptionTrainingSessionFilterInput
  ) {
    onUpdateTrainingSession(filter: $filter) {
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
export const onDeleteTrainingSession = /* GraphQL */ `
  subscription OnDeleteTrainingSession(
    $filter: ModelSubscriptionTrainingSessionFilterInput
  ) {
    onDeleteTrainingSession(filter: $filter) {
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
export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onCreateExercise(filter: $filter) {
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
export const onUpdateExercise = /* GraphQL */ `
  subscription OnUpdateExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onUpdateExercise(filter: $filter) {
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
export const onDeleteExercise = /* GraphQL */ `
  subscription OnDeleteExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onDeleteExercise(filter: $filter) {
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
