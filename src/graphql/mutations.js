/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProgramList = /* GraphQL */ `
  mutation CreateProgramList(
    $input: CreateProgramListInput!
    $condition: ModelProgramListConditionInput
  ) {
    createProgramList(input: $input, condition: $condition) {
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
export const updateProgramList = /* GraphQL */ `
  mutation UpdateProgramList(
    $input: UpdateProgramListInput!
    $condition: ModelProgramListConditionInput
  ) {
    updateProgramList(input: $input, condition: $condition) {
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
export const deleteProgramList = /* GraphQL */ `
  mutation DeleteProgramList(
    $input: DeleteProgramListInput!
    $condition: ModelProgramListConditionInput
  ) {
    deleteProgramList(input: $input, condition: $condition) {
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
export const createProgram = /* GraphQL */ `
  mutation CreateProgram(
    $input: CreateProgramInput!
    $condition: ModelProgramConditionInput
  ) {
    createProgram(input: $input, condition: $condition) {
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
export const updateProgram = /* GraphQL */ `
  mutation UpdateProgram(
    $input: UpdateProgramInput!
    $condition: ModelProgramConditionInput
  ) {
    updateProgram(input: $input, condition: $condition) {
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
export const deleteProgram = /* GraphQL */ `
  mutation DeleteProgram(
    $input: DeleteProgramInput!
    $condition: ModelProgramConditionInput
  ) {
    deleteProgram(input: $input, condition: $condition) {
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
export const createTrainingSession = /* GraphQL */ `
  mutation CreateTrainingSession(
    $input: CreateTrainingSessionInput!
    $condition: ModelTrainingSessionConditionInput
  ) {
    createTrainingSession(input: $input, condition: $condition) {
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
export const updateTrainingSession = /* GraphQL */ `
  mutation UpdateTrainingSession(
    $input: UpdateTrainingSessionInput!
    $condition: ModelTrainingSessionConditionInput
  ) {
    updateTrainingSession(input: $input, condition: $condition) {
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
export const deleteTrainingSession = /* GraphQL */ `
  mutation DeleteTrainingSession(
    $input: DeleteTrainingSessionInput!
    $condition: ModelTrainingSessionConditionInput
  ) {
    deleteTrainingSession(input: $input, condition: $condition) {
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
export const createExercise = /* GraphQL */ `
  mutation CreateExercise(
    $input: CreateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    createExercise(input: $input, condition: $condition) {
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
export const updateExercise = /* GraphQL */ `
  mutation UpdateExercise(
    $input: UpdateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    updateExercise(input: $input, condition: $condition) {
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
export const deleteExercise = /* GraphQL */ `
  mutation DeleteExercise(
    $input: DeleteExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    deleteExercise(input: $input, condition: $condition) {
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
