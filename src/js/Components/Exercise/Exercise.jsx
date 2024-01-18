import React, { useState, useEffect, useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import _ from 'lodash';
import SetsInput from './SetsInput.jsx';
import RepsSlider from './RepsSlider.jsx';
import DragHandle from './DragHandle.jsx';
import { Switch } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { updateExerciseProperty, deleteExerciseState } from '../../Store/programsSlice.js';
import { deleteExerciseFromDB, updateExercisePropertyInDB } from '../../Helpers/programEditorBackendHelpers.js';

const Exercise = ({ programId, sessionId, exerciseId, exerciseData, provided, isExpanded, onExpandToggle, client }) => {
  const dispatch = useDispatch();
  // State for highReps
  //log the exerciseData
  console.log(exerciseData);
  const [highReps, setHighReps] = useState(exerciseData && exerciseData.maxReps > 15);
  // State for exercise name
  const [name, setName] = useState(exerciseData.name);

  // Callback function for debounced updating of exercise name
  const debouncedUpdate = useCallback(_.debounce((newName) => {
    dispatch(updateExerciseProperty({
      programId,
      sessionId,
      exerciseId,
      propertyName: 'name',
      value: newName,
    }));
    // Update the exercise name in the database
    updateExercisePropertyInDB(programId, sessionId, exerciseId, 'name', newName, client);
  }, 300), [programId, sessionId, exerciseId, dispatch]);
  // Effect to debounce updates to exercise name
  useEffect(() => {
    if (name !== exerciseData.name) {
      debouncedUpdate(name);
    }
  }, [name, exerciseData.name, debouncedUpdate]);

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleDeleteConfirm = () => {
    if (window.confirm(`Are you sure you want to delete the exercise`)) {
      dispatch(deleteExerciseState({programId, sessionId, exerciseId}))
      deleteExerciseFromDB(programId, sessionId, exerciseId, client);
    }
  };
  const handleHighRepsChange = (event) => {
    setHighReps(event.target.checked);
  };

  // Render the exercise component with its inputs and delete button
  if(isExpanded) {
    return (
      <div className="exercise" style={{ position: 'relative' }}>
        <div className="row name-row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="form-group">
              <div className="mx-2">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  className="form-control exercise-name-input"
                  placeholder="Exercise Name"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row sets-row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <SetsInput
              programId={programId} 
              sessionId={sessionId} 
              exerciseId={exerciseId} 
              initialSets={exerciseData.numSets} 
              client={client}
            />
          </div>
        </div>
        <div className="row reps-row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="form-group d-flex justify-content-between align-items-center">
              <p>Rep-Range</p>
              <div className="switch-container">
                <label className="mb-0">
                  High Reps
                </label>
                <Switch checked={highReps} onChange={handleHighRepsChange} />
              </div>
            </div>
            <RepsSlider
              programId={programId} 
              sessionId={sessionId} 
              exerciseId={exerciseId} 
              initialMinReps={exerciseData.minReps} 
              initialMaxReps={exerciseData.maxReps}
              highReps={highReps}
              client={client}
            />
          </div>
        </div>
        <div className="row justify-content-between align-items-center">
        <div className="col-auto">
            <DragHandle provided={provided} />
          </div>
          <div className="col-auto" style={{ marginLeft: "40px"}}>
            <button
              onClick={() => handleDeleteConfirm()}
              className="btn btn-danger delete-exercise-button">
              Delete Exercise
            </button>
          </div>
          <div className="col-auto">
            <button onClick={onExpandToggle} className="btn btn-link">
              <ExpandLessIcon />
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="exercise" style={{ position: 'relative' }}>
        <div className="show-details-row d-flex justify-content-between align-items-center">
          <div style={{ width: "40px"}}>
            <DragHandle provided={provided} />
          </div>
          <div className="details-preview">{name}</div>
          <div className="details-preview">{`${exerciseData.numSets} x ${exerciseData.minReps}-${exerciseData.maxReps}`}</div>
          <button onClick={onExpandToggle} className="btn btn-link">
            <ExpandMoreIcon />
          </button>
        </div>
      </div>
    );
  }
};

// Define mapStateToProps
const mapStateToProps = (state, ownProps) => {
  const exerciseData = state.programs.programs
    .find(program => program.id === ownProps.programId)
    ?.trainingSessions.find(session => session.id === ownProps.sessionId)
    ?.exercises.find(exercise => exercise.id === ownProps.exerciseId);
  //log the exerciseData
  console.log("exerciseData: ", exerciseData);
  return { exerciseData };
};

// Connect Exercise with mapStateToProps
export default connect(mapStateToProps)(Exercise);