import { useState, useRef, useEffect } from 'react';

const SessionButton = ({ id, session, handleSelect, isSelected, isDeleteMode, handleUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(session.name);
  const inputRef = useRef(null);
  const [lastTap, setLastTap] = useState(0);  // New state for tap tracking

  // Simplified tap handling for mobile
  const handleTap = () => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
      setIsEditing(true);  // Enable editing
      // You can call additional logic here if needed
    }
    setLastTap(currentTime);
  };

  // Update name on change
  const handleChange = (e) => {
    setName(e.target.value);
  };

  // Save changes and exit editing mode
  const handleBlur = () => {
    if (name !== session.name) {
      handleUpdate(name);
    }
    setIsEditing(false);
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <button
      id={id}
      onClick={!isEditing ? () => handleSelect(session.id) : undefined}
      className={`session-button ${isSelected ? 'selected' : ''} ${isDeleteMode ? 'delete-mode' : ''}`}
      onDoubleClick={!isDeleteMode ? () => setIsEditing(true) : undefined}
      onTouchEnd={!isDeleteMode ? handleTap : undefined}
    >
      {!isEditing ? (
        session.name
      ) : (
        <input
          className="button-name-input"
          ref={inputRef}
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      )}
    </button>
  );
};

export default SessionButton;