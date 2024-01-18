import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateExerciseProperty } from '../../Store/programsSlice.js';
import { updateExercisePropertyInDB } from '../../Helpers/programEditorBackendHelpers.js';

const SetsInput = ({ programId, sessionId, exerciseId, initialSets, client }) => {
  const [sets, setSets] = useState(initialSets);
  const dispatch = useDispatch();

  const handleSetsChange = (newSets) => {
    setSets(newSets);
    dispatch(updateExerciseProperty({ programId, sessionId, exerciseId, propertyName: 'numSets', value: newSets }));
    updateExercisePropertyInDB(programId, sessionId, exerciseId, 'numSets', newSets, client);
  };

  return (
    <div className="sets-input">
      <p>Sets</p>
        <div className="d-flex justify-content-center">
          <div className="btn-group-toggle w-100 d-flex" data-toggle="buttons">
            {[1, 2, 3, 4, 5, 6].map((num, index, array) => (
              <label 
                key={num} 
                className={`sets-button btn btn-outline-primary flex-fill ${sets === num ? 'active' : ''} ${index === array.length - 1 ? 'reduced-right-margin' : ''}`}
                onClick={() => handleSetsChange(num)}
              >
              <input 
                type="radio" 
                name="sets" 
                value={num} 
                checked={sets === num}
                className="d-none" 
                readOnly 
              />
              {num}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SetsInput);
