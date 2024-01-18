import { getCurrentUser } from "aws-amplify/auth";
import { 
  createProgramList, createProgram, createTrainingSession, createExercise,
  updateProgramList, updateProgram, updateTrainingSession, updateExercise,
  deleteProgram, deleteTrainingSession, deleteExercise 
} from "../../graphql/mutations";
import { getProgramList } from "../../graphql/queries";
import { updateAllState, updateExerciseProperty } from "../Store/programsSlice";


// Module-level variable
let userId = null;
// Helper function to get userId
async function getUserId() {
  if(userId){
    return userId;
  } else {
    try {
      userId = await getCurrentUser().then(user => user.userId);
      return userId;
    } catch (error) {
      console.error('Error getting userId:', error);
    }
  }
}

// Helper function to extract the substring before the first '#'
const extractId = (idString) => {
  let hashIndex = idString.indexOf('#');
  
  // Check if '#' is found in the string
  if (hashIndex !== -1) {
      // Return the substring before the first '#'
      return idString.substring(0, hashIndex);
  }

  // If '#' is not found, return null
  return null;
};

// Helper function to format the data from GraphQL to the Redux state format
const mapDataToReduxStateFormat = (data) => {
  console.log('mapDataToReduxStateFormat data:', data);
  const programsById = data.programs?.items?.reduce((obj, program) => {
    obj[program.id] = program;
    return obj;
  }, {});

  console.log('mapDataToReduxStateFormat programsById:', programsById);
  console.log(`mapDataToReduxStateFormat programsById[${data.programOrder[0]}]:`, programsById[data.programOrder[0]]);

  return {
    id: data.id,
    programs: data.programOrder?.map(programId => {
      const program = programsById[programId];
      return {
        id: extractId(program.id),
        name: program.name,
        order: program.trainingSessionOrder?.map(extractId) ?? [],
        trainingSessions: program.trainingSessions?.items?.map(session => ({
          id: extractId(session.id), 
          name: session.name,
          order: session.exerciseOrder?.map(extractId) ?? [],
          exercises: session.exercises.items?.map(exercise => ({
            id: extractId(exercise.id), 
            name: exercise.name,
            numSets: exercise.numSets,
            minReps: exercise.minReps,
            maxReps: exercise.maxReps
          })) ?? []
        })) ?? []
      };
    }) ?? [],
    order: data.programOrder.map(extractId) ?? []
  };
};

// Checks for the users saved programs. If not found it creates an empty item for that users programs 
export const validateProgramList = async (dispatch, client) => {
  try {
    // Get the user ID 
    const userId = await getUserId();
    //log the userId
    console.log('ProgramAndSessionEditor validateProgramList userId:', userId);
    // Query the ProgramList item
    const response = await client.graphql({
      query: getProgramList,
      variables: { id: userId } 
    });

    //log response
    console.log('ProgramAndSessionEditor validateProgramList response:', response);
    
    if (response.data.getProgramList) {
      //log the response
      console.log('ProgramAndSessionEditor validateProgramList response:', response.data.getProgramList);
      // The ProgramList item exists in the database
      // Format graphQL query response and update redux store with the DB data
      const formattedData = mapDataToReduxStateFormat(response.data.getProgramList);
      dispatch(updateAllState(formattedData));
      console.log('ProgramAndSessionEditor validateProgramList formattedData:', formattedData);
      console.log('State updated with the DB data');
    } else {
      // The ProgramList item does not exist
      // Try creating one with a graphQL mutation
      const response = await client.graphql({
        query: createProgramList,
        variables: {
          input: {
            id: userId,
            programOrder: [],
          }
        }
      });

      // Handle response
      response.errors ?
        //The mutation failed
        console.error('Error creating ProgramList', response.errors)
      :
        // The mutation was successful
        console.log(`ProgramList with id ${userId} created`);
        dispatch(updateAllState({id: userId, programs: [], order: []}));
    }
  } catch (error) {
    console.error('Error in validateProgramList:', error);
  }
};

export const addProgramToDB = async (newProgram, client) => {
  // Create the input object for the createProgram mutation
  const programInput = {  
    input: {
      id: (`${newProgram.id}#${await getUserId()}`),
      programListID: await getUserId(),
      name: newProgram.name, 
      trainingSessionOrder: newProgram.order, 
    }
  };
  //log the programInput
  console.log('addProgramToDB programInput:', programInput);
  // Create the new program in the database
  try {
    const response = await client.graphql({
      query: createProgram,
      variables: programInput
    });
  } catch (error) {
    console.error('Error adding program:', error);
  }
}; 

export const addTrainingSessionToDB = async (newSession, programId, client) => {
  // Create the input object for the createTrainingSession mutation
  const sessionInput = {
    input: {  
      id: `${newSession.id}#${programId}#${await getUserId()}`,
      programID: `${programId}#${await getUserId()}`,   
      name: newSession.name,
      exerciseOrder: newSession.order,
    }
  };
  // Create the new session in the database
  try {
    const response = await client.graphql({
      query: createTrainingSession,
      variables: sessionInput
    });
  } catch (error) {
    console.error('Error adding training session:', error);
  }
};

export const addExerciseToDB = async (newExercise, programId, sessionId, client) => {
  // Create the input object for the createExercise mutation
  //log
  console.log('addExerciseToDB newExercise:', newExercise);
  const exerciseInput = {
    input: {
      id: `${newExercise.id}#${sessionId}#${programId}#${await getUserId()}`,
      trainingSessionID: `${sessionId}#${programId}#${await getUserId()}`,
      name: newExercise.name,
      numSets: newExercise.numSets,
      minReps: newExercise.minReps,
      maxReps: newExercise.maxReps
    }
  };

  //Log the input object
  console.log('addExerciseToDB exerciseInput:', exerciseInput);

  // Create the new exercise in the database
  try {
    const response = await client.graphql({
      query: createExercise,
      variables: exerciseInput
    });
    console.log('addExerciseToDB response:', response);
  } catch (error) {
    console.error('Error adding exercise:', error);
  }
};

export const deleteProgramFromDB = async (id, client) => {
  // Create the input object for the deleteProgram mutation
  const programInput = {
    input: {
      id: `${id}#${await getUserId()}`,
    }
  };
  // Delete the program from the database
  try {
    const response = await client.graphql({
      query: deleteProgram,
      variables: programInput
    });
  } catch (error) {
    console.error('Error deleting program:', error);
  }
};

export const deleteTrainingSessionFromDB = async (sessionId, programId, client) => {
  // Create the input object for the deleteTrainingSession mutation
  const sessionInput = {
    input: {
      id: `${sessionId}#${programId}#${await getUserId()}`, 
    }
  };
  // Delete the session from the database
  try {
    const response = await client.graphql({
      query: deleteTrainingSession,
      variables: sessionInput
    });
  } catch (error) {
    console.error('Error deleting training session:', error);
  }
};

export const deleteExerciseFromDB = async (programId, sessionId, exerciseId, client) => {
  // Create the input object for the deleteExercise mutation
  const exerciseInput = {
    input: {
      id: `${exerciseId}#${sessionId}#${programId}#${await getUserId()}`,
    }
  };
  // Delete the exercise from the database
  try {
    const response = await client.graphql({
      query: deleteExercise,
      variables: exerciseInput
    });
  } catch (error) {
    console.error('Error deleting exercise:', error);
  }
};

export const updateTrainingSessionNameInDB = async (sessionId, programId, newName, client) => {
  // Create the input object for the updateTrainingSession mutation
  const trainingSessionInput = {
    input: {
      id: `${sessionId}#${programId}#${await getUserId()}`, 
      name: newName,
    }
  };
  // Update the training session in the database
  try {
    const response = await client.graphql({
      query: updateTrainingSession,
      variables: trainingSessionInput
    });
  } catch (error) {
    console.error('Error updating training session:', error);
  }
};

export const updateProgramNameInDB = async (id, newName, client) => {
  // Create the input object for the updateProgram mutation
  const programInput = {
    input: {
      id: `${id}#${await getUserId()}`,
      name: newName,
    }
  };
  // Update the program in the database
  try {
    const response = await client.graphql({
      query: updateProgram,
      variables: programInput
    });
  } catch (error) {
    console.error('Error updating program name:', error);
  }
};

export const updateProgramOrderInDB = async (newProgramIds, client) => {
  // Create the input object for the updateProgramList mutation
  userId = await getUserId();

  const programListInput = {
    input: {
      id: userId,
      programOrder: newProgramIds.map((programId => `${programId}#${userId}`)) || [],
      //TODO: map the newProgramIds to the correct format
    }
  };
  
  // Update the program order in the database
  try {
    const response = await client.graphql({
      query: updateProgramList,
      variables: programListInput
    });

  } catch (error) {
    console.error('Error updating program order:', error);
  }
};

export const updateTrainingSessionOrderInDB = async (newSessionIds, programId, client) => {
  // Create the input object for the updateProgram mutation
  const userId = await getUserId();
  const programInput = {
    input: {
      id: `${programId}#${userId}`,
      trainingSessionOrder: newSessionIds.map((sessionId => `${sessionId}#${programId}#${userId}`)) || [],
    }
  };
  //log the program input 
  console.log('updateTrainingSessionOrderInDB programInput:', programInput);
  // Update the program in the database
  try {
    const response = await client.graphql({
      query: updateProgram,
      variables: programInput
    });
  } catch (error) {
    console.error('Error updating training session order:', error);
  }
};

export const updateExerciseOrderInDB = async (newExerciseIds, programId, sessionId, client) => {
  const userId = await getUserId();
  // Create the input object for the updateTrainingSession mutation
  const trainingSessionInput = {
    input: {
      id: `${sessionId}#${programId}#${userId}`,
      exerciseOrder: newExerciseIds.map((exerciseId => `${exerciseId}#${sessionId}#${programId}#${userId}`)) || [],
    }
  };
  // Update the training session in the database
  try {
    const response = await client.graphql({
      query: updateTrainingSession,
      variables: trainingSessionInput
    });
  }catch (error) {
    console.error('Error updating exercise order:', error);
  }
};

export const updateExercisePropertyInDB = async (programId, sessionId, exerciseId, property, value, client) => {
  // Create the input object for the updateExercise mutation
  const exerciseInput = {
    input: {
      id: `${exerciseId}#${sessionId}#${programId}#${await getUserId()}`,
      [property]: value
    }
  };
  // Update the exercise in the database
  try {
    const response = await client.graphql({
      query: updateExercise,
      variables: exerciseInput
    });
  } catch (error) {
    console.error('Error updating exercise:', error);
  }
}
