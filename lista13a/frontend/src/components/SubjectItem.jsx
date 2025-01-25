import React from 'react';

const SubjectItem = ({ subject, onRemove }) => {
  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  };

  const endTime = calculateEndTime(subject.startTime, subject.duration);

  return (
    <div className="subject-item">
      <div className="subject-details">
        <h3 className="subject-name">{subject.name}</h3>
        <p className="subject-time">
          {subject.startTime} - {endTime} 
          <span className="subject-duration"> ({subject.duration} minut)</span>
        </p>
      </div>
      <button onClick={onRemove} className="remove-button">
        Usuń
      </button>
    </div>
  );
};

export default SubjectItem;