import React from 'react';
import { MdOutlineDragIndicator } from 'react-icons/md';


const DragHandle = ({ provided }) => {
  return (
    <div
        {...provided.dragHandleProps}
        className="drag-handle"
    >
      <MdOutlineDragIndicator /> 
    </div>
  );
};

export default DragHandle;
