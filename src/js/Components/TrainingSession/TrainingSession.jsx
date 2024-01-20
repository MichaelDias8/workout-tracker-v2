import React, {useState} from 'react';
import { connect, useDispatch } from 'react-redux';
import Exercise from '../Exercise/Exercise.jsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { createExerciseState, reorderExercises } from '../../Store/programsSlice.js';
import { addExerciseToDB, updateExerciseOrderInDB } from '../../Helpers/programEditorBackendHelpers.js';

const TrainingSession = ({ programId, sessionId, exerciseIds, client}) => {
  const dispatch = useDispatch();
  const [expandedExercise, setExpandedExercise] = useState(null);

  // Callback to update the expanded exercise
  const handleExpandExercise = (exerciseId) => {
    setExpandedExercise(exerciseId === expandedExercise ? null : exerciseId);
  };

  const generateExercise = () => {
    const maxId = exerciseIds.length === 0 ? 0 : Math.max(...exerciseIds);
    return {
      id: `${maxId + 1}`,
      name: 'New Exercise',
      numSets: 3,
      minReps: 8,
      maxReps: 12,
    };
  };

  const addExercise = () => {
    const newExercise = generateExercise();
    // Add the exercise to the redux store
    dispatch(createExerciseState({ programId, sessionId, newExercise }));
    // Add the exercise to the database
    addExerciseToDB(newExercise, programId, sessionId, client);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const newExerciseIds = Array.from(exerciseIds);
    newExerciseIds.splice(source.index, 1);
    newExerciseIds.splice(destination.index, 0, draggableId);

    // log the newExerciseIds
    console.log("newExerciseIds: ", newExerciseIds);
    dispatch(reorderExercises({ programId, sessionId, newExerciseIds }));
    updateExerciseOrderInDB(newExerciseIds, programId, sessionId, client);
  };

  return (
    <div className='training-session'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='exercises'>
          {(provided) => (
            <ul className="exercise-list list-unstyled" {...provided.droppableProps} ref={provided.innerRef}>
              {exerciseIds.map((exerciseId, index) => (
                <Draggable key={exerciseId} draggableId={String(exerciseId)} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className="custom-border"
                    > 
                      <Exercise
                        key={exerciseId}
                        programId={programId}
                        sessionId={sessionId}
                        exerciseId={exerciseId}
                        isExpanded={expandedExercise === exerciseId}
                        onExpandToggle={() => handleExpandExercise(exerciseId)}
                        provided={provided}
                        client={client}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className="button-row d-flex justify-content-center align-items-center">
        <button onClick={addExercise} className="btn btn-primary">
          Add Exercise
        </button>
      </div>
    </div>
  );
};

// Define mapStateToProps
const mapStateToProps = (state, ownProps) => {
  // Assuming the structure of the state, programId, and sessionId are available
  const program = state.programs.programs.find(program => program.id === ownProps.programId);
  const session = program ? program.trainingSessions.find(session => session.id === ownProps.sessionId) : null;
  //log the session
  console.log("session: ", session);
  return {
    sessionName: session ? session.name : '',
    exerciseIds: session ? session.order : []
  };
};

const areEqual = (prevProps, nextProps) => {
  // Compare the exerciseIds prop
  return prevProps.exerciseIds.join(',') === nextProps.exerciseIds.join(',');
};

// Connect TrainingSession with mapStateToProps
export default connect(mapStateToProps)(React.memo(TrainingSession, areEqual));
