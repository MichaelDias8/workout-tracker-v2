import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
};

const programsSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
    updateAllState: (state, action) => {
      const { id, order, programs } = action.payload;
      return {
        ...state,
        id,
        order,
        programs
      };
    },
    createProgramState: (state, action) => {
      const { newProgram } = action.payload;
      return {
        ...state,
        programs: [...(state.programs || []), newProgram],
        order: [...state.order, newProgram.id]
      };
    },
    deleteProgramState: (state, action) => {
      const { programId } = action.payload;
      const updatedPrograms = state.programs.filter(program => program.id !== programId);
      const updatedOrder = state.order.filter(id => id !== programId);
    
      return {
        ...state,
        programs: updatedPrograms,
        order: updatedOrder,
      };
    },
    updateProgramName: (state, action) => {
      const { programId, newName } = action.payload;
      console.log(programId, newName)
      return {
        ...state,
        programs: state.programs.map((program) =>
          program.id === programId ? { ...program, name: newName } : program
        ),
      };
    },
    reorderPrograms: (state, action) => {

      const { newProgramIds } = action.payload;
      return {
        ...state,
        order: newProgramIds,
      };
    },   
    createTrainingSessionState: (state, action) => {
      const { programId, newSession } = action.payload;
      return {
        ...state,
        programs: state.programs.map((program) =>
          program.id === programId 
            ? { ...program, 
                trainingSessions: [...program.trainingSessions, newSession],
                order: [...program.order, newSession.id]
              }
            : program
        ),
      };
    },
    deleteTrainingSessionState: (state, action) => {
      const { programId, sessionId } = action.payload;
      return {
        ...state,
        programs: state.programs.map(program => 
          program.id === programId
            ? {
                ...program,
                trainingSessions: program.trainingSessions.filter(session => session.id !== sessionId),
                order: program.order.filter(id => id !== sessionId)
              }
            : program
        ),
      };
    },
    updateTrainingSessionName: (state, action) => {
      const { programId, sessionId, newName } = action.payload;
      return {
        ...state,
        programs: state.programs.map(program => 
          program.id === programId 
            ? { ...program, 
                trainingSessions: program.trainingSessions.map(session => 
                  session.id === sessionId ? { ...session, name: newName } : session
                )
              }
            : program
        ),
      };
    },
    reorderTrainingSessions: (state, action) => {
      const { programId, newSessionIds } = action.payload;
      return {
        ...state,
        programs: state.programs.map(program => 
          program.id === programId 
            ? { ...program, order: newSessionIds }
            : program
        ),
      };
    },
    createExerciseState: (state, action) => {
      const { programId, sessionId, newExercise } = action.payload;
      return {
        ...state,
        programs: state.programs.map(program => 
          program.id === programId 
            ? { ...program,
                trainingSessions: program.trainingSessions.map(session => 
                  session.id === sessionId 
                    ? { ...session, 
                        exercises: [...session.exercises, newExercise],
                        order: [...session.order, newExercise.id]
                      }
                    : session
                )
              }
            : program
        ),
      };
    },
    deleteExerciseState: (state, action) => {
      const { programId, sessionId, exerciseId } = action.payload;
      return {
        ...state,
        programs: state.programs.map(program => 
          program.id === programId 
            ? { ...program,
                trainingSessions: program.trainingSessions.map(session => 
                  session.id === sessionId 
                    ? { ...session, 
                        exercises: session.exercises.filter(exercise => exercise.id !== exerciseId),
                        order: session.order.filter(id => id !== exerciseId)
                      }
                    : session
                )
              }
            : program
        ),
      };
    },
    updateExerciseProperty: (state, action) => {
      const { programId, sessionId, exerciseId, propertyName, value } = action.payload;
      return {
        ...state,
        programs: state.programs.map(program => 
          program.id === programId 
            ? { ...program,
                trainingSessions: program.trainingSessions.map(session => 
                  session.id === sessionId 
                    ? { ...session,
                        exercises: session.exercises.map(exercise => 
                          exercise.id === exerciseId 
                            ? { ...exercise, [propertyName]: value }
                            : exercise
                        )
                      }
                    : session
                )
              }
            : program
        ),
      };
    },
    reorderExercises: (state, action) => {
      const { programId, sessionId, newExerciseIds } = action.payload;
      return {
        ...state,
        programs: state.programs.map(program => 
          program.id === programId 
            ? { ...program,
                trainingSessions: program.trainingSessions.map(session => 
                  session.id === sessionId 
                    ? { ...session, order: newExerciseIds }
                    : session
                )
              }
            : program
        ),
      };
    },
  },
});

// Selectors 
const selectPrograms = state => state.programs.programs;

export const selectExerciseById = createSelector(
  [selectPrograms, (state, programId, sessionId, exerciseId) => ({ programId, sessionId, exerciseId })],
  (programs, { programId, sessionId, exerciseId }) => {
    const program = programs.find(p => p.id === programId);
    const session = program ? program.trainingSessions.find(s => s.id === sessionId) : null;
    const exercise = session ? session.exercises.find(e => e.id === exerciseId) : null;
    return exercise || {};
  }
);

export const {
  updateAllState,
  createProgramState,
  deleteProgramState,
  updateProgramName,
  reorderPrograms,
  createTrainingSessionState,
  deleteTrainingSessionState,
  updateTrainingSessionName,
  reorderTrainingSessions,
  createExerciseState, 
  deleteExerciseState, 
  updateExerciseProperty,
  reorderExercises,
} = programsSlice.actions;
export default programsSlice.reducer;