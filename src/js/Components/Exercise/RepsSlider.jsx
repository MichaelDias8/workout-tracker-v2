import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Slider from '@mui/material/Slider';
import { updateExerciseProperty } from '../../Store/programsSlice.js';
import { updateExercisePropertyInDB } from '../../Helpers/programEditorBackendHelpers.js';

const RepsSlider = ({ programId, sessionId, exerciseId, initialMinReps, initialMaxReps, highReps, client }) => {
  const sliderRef = useRef(null);

  const [minReps, setMinReps] = useState(initialMinReps);
  const [maxReps, setMaxReps] = useState(initialMaxReps);
  const dispatch = useDispatch();

  const handleSliderChange = (event, newValue) => {
    // Check the newValues and update the min and max reps if they are different
    if (newValue[0] !== minReps) {
      setMinReps(newValue[0]);
      dispatch(updateExerciseProperty({ 
        programId, 
        sessionId, 
        exerciseId, 
        propertyName: 'minReps', 
        value: newValue[0] 
      }));
      updateExercisePropertyInDB(programId, sessionId, exerciseId, 'minReps', newValue[0], client);
    }
    if (newValue[1] !== maxReps) {
      setMaxReps(newValue[1]);
      dispatch(updateExerciseProperty({
        programId,
        sessionId,
        exerciseId,
        propertyName: 'maxReps',
        value: newValue[1]
      }));
      updateExercisePropertyInDB(programId, sessionId, exerciseId, 'maxReps', newValue[1], client);
    }
  };


  useEffect(() => {
    const sliderNode = sliderRef.current;
    if (sliderNode) {
      Array.from(sliderNode.querySelectorAll('.MuiSlider-mark')).forEach((mark, index) => {
        const dataIndex = mark.getAttribute('data-index');
        if (dataIndex % 2 === 0) {
          mark.style.height = '16px';
        }
      });
    }
  }, []);

  // Set default values after toggling
  useEffect(() => {
    if (highReps && minReps < 15) {
      setMinReps(25);
      setMaxReps(35);
      dispatch(updateExerciseProperty({ 
        programId, 
        sessionId, 
        exerciseId, 
        propertyName: 'minReps', 
        value: 20
      }));
      dispatch(updateExerciseProperty({ 
        programId, 
        sessionId, 
        exerciseId, 
        propertyName: 'maxReps', 
        value: 35
      }));
    } else if (!highReps && maxReps > 15) {
      setMinReps(8);
      setMaxReps(12);
      dispatch(updateExerciseProperty({ 
        programId, 
        sessionId, 
        exerciseId, 
        propertyName: 'minReps', 
        value: 8
      }));
      dispatch(updateExerciseProperty({ 
        programId, 
        sessionId, 
        exerciseId, 
        propertyName: 'maxReps', 
        value: 12
      }));
    }
  }, [highReps]);

  const range = highReps ? { min: 15, max: 50 } : { min: 0, max: 15 };
  const markInterval = highReps ? 5 : 1; // Choose an appropriate interval for marks based on range

  const customMarks = Array.from({ length: (range.max - range.min) / markInterval + 1 }, (_, i) => ({
    value: range.min + i * markInterval,
    label: (range.min + i * markInterval) % 5 === 0 ? (range.min + i * markInterval).toString() : undefined
  }));

  return (
    <div className="reps-slider">
      <Slider
        ref={sliderRef}
        value={[minReps, maxReps]}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => (value === minReps ? `${value} Reps` : `${value} Reps`)}
        min={range.min}
        max={range.max}
        marks={customMarks}
      />
    </div>
  );
};

export default React.memo(RepsSlider);

