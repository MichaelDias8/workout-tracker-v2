//Css imports
import '../../../css/program-editor-styles.scss';
//React imports 
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, connect } from 'react-redux';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { MdOutlineLibraryBooks } from "react-icons/md";
import { ReactSortable } from 'react-sortablejs';
//Custom component imports
import TrainingSession from '../TrainingSession/TrainingSession';
import ProgramButton from './ProgramButton';
import SessionButton from './SessionButton';
//Redux imports
import {
  createProgramState, deleteProgramState, updateProgramName, reorderPrograms,
  createTrainingSessionState, deleteTrainingSessionState, updateTrainingSessionName, reorderTrainingSessions,
} from '../../Store/programsSlice';
//Helper imports
import { 
  validateProgramList, updateProgramNameInDB, updateTrainingSessionNameInDB,
  updateProgramOrderInDB, updateTrainingSessionOrderInDB, deleteProgramFromDB, deleteTrainingSessionFromDB,
  addProgramToDB, addTrainingSessionToDB
} from '../../Helpers/programEditorBackendHelpers';
//Amplify imports
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from '../../../amplifyconfiguration.json'
import '@aws-amplify/ui-react/styles.css';


// ProgramAndSessionEditor component
const ProgramAndSessionEditor = ({ programNamesAndIds, trainingSessionNamesAndIds, signOut }) => {
  // Set state and ref variables
  const programContainerRef = useRef(null);
  const sessionContainerRef = useRef(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  // Redux and amplify initialization
  const dispatch = useDispatch();
  Amplify.configure(config);
  const client = generateClient();

  // Validate the ProgramList item in the database on startup
  useEffect(() => {
    validateProgramList(dispatch, client);
    setIsDataLoaded(true);
  }, []);  

  // Effects to trigger scrolling the program and session areas after a selection 
  useEffect(() => {
    if (selectedProgramId) {
      scrollToNewElement(programContainerRef, selectedProgramId);
    }
  }, [selectedProgramId, ]);
  useEffect(() => {
    if (selectedSessionId) {
      scrollToNewElement(sessionContainerRef, selectedSessionId);
    }
  }, [selectedSessionId, ]);

  // Adjusts the scroll position of program and training session areas so the selected items are always fully visable 
  const scrollToNewElement = (containerRef, selectedId) => {
    const contentContainer = containerRef.current;
    if (!contentContainer) return;
  
    const selectedElement = contentContainer.querySelector(`#element-${selectedId}`);
    if (selectedElement) {
      // Get the positions of the selected element and container
      const selectedRect = selectedElement.getBoundingClientRect();
      const containerRect = contentContainer.getBoundingClientRect();
  
      // Check if the selected element is not fully visible
      if (selectedRect.left < containerRect.left || selectedRect.right > containerRect.right) {
        // Scroll to the selected element
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    }
  };
// Handlers for program and session selection change
  const handleProgramSelect = (programId) => {
    
    if(programId != selectedProgramId){
      setSelectedProgramId(programId);
      setSelectedSessionId(null); // Reset session selection
    }
  };
  const handleSessionSelect = (sessionId) => {
    setSelectedSessionId(sessionId);
  };
  // Function to handle updates to program or session names
  const handleUpdate = (type, newName) => {
    if (type === 'program') {
      // Update program name in the redux store
      dispatch(updateProgramName({ programId: selectedProgramId, newName }));
      // Update program name in the database
      updateProgramNameInDB(selectedProgramId, newName, client);
    } else if (type === 'session') {
      dispatch(updateTrainingSessionName({ programId: selectedProgramId, sessionId: selectedSessionId, newName }));
      // Update session name in the database
      updateTrainingSessionNameInDB(selectedSessionId, selectedProgramId, newName, client);
    }
  };
  // Toggles isDeleteMode state
  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };
  // Brings up confirmation modal before deleting a program or session
  const handleDeleteConfirm = (type, name, id) => {
    if (window.confirm(`Are you sure you want to delete the ${type} "${name}"?`)) {
      // Dispatch delete action based on type
      switch (type) {
        case 'program':
          // Delete program from database
          deleteProgramFromDB(id, client);
          // Delete program from redux store
          dispatch(deleteProgramState({ programId: id }));
          break;
        case 'session':
          // Delete session from database
          deleteTrainingSessionFromDB(id, selectedProgramId, client);
          // Delete session from redux store
          dispatch(deleteTrainingSessionState({ programId: selectedProgramId, sessionId: id }));
          break;
      }
      // Exit delete mode
      setIsDeleteMode(false);
    }
  };
  
  // Adds a program to the database and updates the redux store
  const addProgram = () => {
    // Create new program object with a unique id;
    const maxId = programNamesAndIds.reduce((max, program) => Math.max(max, program.id), 0);
    const newProgram = {
      id: `${maxId + 1}`,
      name: 'New program',
      order: [],
      trainingSessions: [],
    };

    // Add new program to database and redux store
    addProgramToDB(newProgram, client);
    dispatch(createProgramState({ newProgram }));
    // Select the new program
    setSelectedProgramId(newProgram.id); 
  };

  const addTrainingSession = () => {
    // Create new session with unique id
    const maxId = trainingSessionNamesAndIds[selectedProgramId].reduce((max, session) => Math.max(max, session.id), 0);
    const newSession = {
      id: `${maxId + 1}`,
      name: 'New Session',
      order: [],
      exercises: [],
    };

    // Add new session to database and redux store
    addTrainingSessionToDB(newSession, selectedProgramId, client);
    dispatch(createTrainingSessionState({ programId: selectedProgramId, newSession }));
    // Select the new session
    setSelectedSessionId(newSession.id);
  };

  const handleSetList = (type, newList) => {
    
    console.log('ProgramAndSessionEditor handleSetList:', type, newList);
    console.log('ProgramAndSessionEditor handleSetList programNamesAndIds:', programNamesAndIds);
    console.log('ProgramAndSessionEditor handleSetList selectedProgramId:', selectedProgramId);
    // Check if data is loaded
    if (isDataLoaded) {
      switch (type) {
        case 'program':
          // Update redux store and database with new program oupdateProgramOrderInDBrder
          dispatch(reorderPrograms({ newProgramIds: newList.map(item => item.id) }));
          updateProgramOrderInDB(newList.map(item => item.id), client);
          break;
        case 'session':
          // Update redux store and database with new session order
          dispatch(reorderTrainingSessions({ programId: selectedProgramId, newSessionIds: newList.map(item => item.id) }));
          updateTrainingSessionOrderInDB(newList.map(item => `${item.id}`), selectedProgramId, client);
          break;
      }
    }
  }

  // Render the component
  return (
    <div className={`program-and-session-editor`}>
      {/* Delete Button */}
      <button
        className={`delete-button${isDeleteMode ? ' delete-mode' : ''}`}
        onClick={toggleDeleteMode}
      >
        <span className="icon-wrapper">
          <FaTrashAlt />
        </span>
      </button>
      <div>
        {/* Program area with sortable buttons */}
        <div className="program-area">
          <div className="content-container" ref={programContainerRef}>
            <ReactSortable 
              className="button-container"
              list={programNamesAndIds}
              setList={(newList) => handleSetList('program', newList)}
              animation={150}
              delayOnTouchOnly={true}
              delay={200}
            >
              {programNamesAndIds.map((program) => (
                <ProgramButton
                  key={program.id}
                  id={`element-${program.id}`}
                  program={program}
                  handleSelect={isDeleteMode ? () => handleDeleteConfirm('program', program.name, program.id) : () => handleProgramSelect(program.id)}
                  isSelected={selectedProgramId === program.id}
                  isDeleteMode={isDeleteMode}
                  handleUpdate={(id, newName) => handleUpdate('program', id, newName)}
                />
              ))}
            </ReactSortable>
            <button onClick={addProgram} className="add-button">
              <span className="icon-wrapper">
                <FaPlus />
              </span>
            </button>
          </div>
        </div>
        {/* Session selection area */}
        {selectedProgramId && (
          <div className="session-area">
            <div className="content-container" ref={sessionContainerRef}>
              <ReactSortable
                className="button-container"
                list={trainingSessionNamesAndIds[selectedProgramId] || []}
                setList={(newList) => handleSetList('session', newList)}
                animation={150}
                delayOnTouchOnly={true}
                delay={200}
              >
                {(trainingSessionNamesAndIds[selectedProgramId] || []).map((session) => (
                  <SessionButton
                    key={session.id}
                    id={`element-${session.id}`}
                    session={session}
                    handleSelect={isDeleteMode ? () => handleDeleteConfirm('session', session.name, session.id) : () => handleSessionSelect(session.id)}
                    isSelected={selectedSessionId === session.id}
                    isDeleteMode={isDeleteMode}
                    handleUpdate={(id, newName) => handleUpdate('session', id, newName)}
                  />
                ))}
              </ReactSortable>
              <button onClick={addTrainingSession} className="add-button">
                <span className="icon-wrapper">
                  <FaPlus />
                </span>
              </button>
            </div>
          </div>
        )}
        {/* TrainingSession component */}
        {selectedSessionId && (
          <TrainingSession
            key={selectedSessionId}
            programId={selectedProgramId}
            sessionId={selectedSessionId}
            client={client}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  // Initialize an empty object for training sessions
  const trainingSessionNamesAndIds = {};

  // Safely iterate over programs, defaulting to an empty array if undefined
  (state.programs.programs ?? []).forEach(program => {
    const sessionOrder = program.order ?? [];
    const sortedTrainingSessions = sessionOrder.map(sessionId => 
      program.trainingSessions?.find(session => session.id === sessionId)
    ).filter(session => session) // Filter out undefined sessions
    .map(session => ({
      id: session.id,
      name: session.name
    }));

    trainingSessionNamesAndIds[program.id] = sortedTrainingSessions;
  });

  const order = state.programs.order ?? [];

  // Create an array of programs with their names and ids
  const programNamesAndIds = (state.programs.programs ?? []).map(program => ({
    id: program.id,
    name: program.name
  }));

  const sortedProgramNamesAndIds = order.map(id => 
    programNamesAndIds.find(program => program.id === id)
  ).filter(program => program);

  return {
    programNamesAndIds: sortedProgramNamesAndIds,
    trainingSessionNamesAndIds, 
  };
};

// Custom comparison function for memoization
const areEqual = (prevProps, nextProps) => {
  // Check if the program IDs are equal
  if (prevProps.selectedProgramId !== nextProps.selectedProgramId) {
    return false;
  }

  // Check if the session IDs are equal
  if (prevProps.selectedSessionId !== nextProps.selectedSessionId) {
    return false;
  }

  // Perform a shallow comparison of programNamesAndIds arrays
  if (prevProps.programNamesAndIds.length !== nextProps.programNamesAndIds.length ||
      !prevProps.programNamesAndIds.every((val, idx) => val.id === nextProps.programNamesAndIds[idx].id && val.name === nextProps.programNamesAndIds[idx].name)) {
    return false;
  }

  // Perform a shallow comparison of trainingSessionNamesAndIds objects
  for (const key in prevProps.trainingSessionNamesAndIds) {
    if (!nextProps.trainingSessionNamesAndIds.hasOwnProperty(key) ||
        prevProps.trainingSessionNamesAndIds[key].length !== nextProps.trainingSessionNamesAndIds[key].length ||
        !prevProps.trainingSessionNamesAndIds[key].every((val, idx) => val.id === nextProps.trainingSessionNamesAndIds[key][idx].id && val.name === nextProps.trainingSessionNamesAndIds[key][idx].name)) {
      return false;
    }
  }

  return true;
};

// Connect ProgramAndSessionEditor with mapStateToProps and memoize it
export default connect(mapStateToProps)(React.memo(ProgramAndSessionEditor, areEqual));