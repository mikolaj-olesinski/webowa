import React, { useState, useEffect } from 'react';

const SubjectItem = ({ subject, onRemove, currentDay }) => {
  const [isCurrentlyActive, setIsCurrentlyActive] = useState(false);

  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  };

  const getCurrentDayName = () => {
    const days = [
      'Niedziela', 'Poniedziałek', 'Wtorek', 'Środa',
      'Czwartek', 'Piątek', 'Sobota'
    ];
    const today = new Date();
    return days[today.getDay()];
  };

  const checkIfCurrentlyActive = () => {
    if (getCurrentDayName() !== currentDay) {
      return false;
    }

    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;

    const [startHours, startMinutes] = subject.startTime.split(':').map(Number);
    const startTimeInMinutes = startHours * 60 + startMinutes;

    const endTime = calculateEndTime(subject.startTime, subject.duration);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const endTimeInMinutes = endHours * 60 + endMinutes;

    return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes;
  };

  useEffect(() => {
    setIsCurrentlyActive(checkIfCurrentlyActive());

    const interval = setInterval(() => {
      setIsCurrentlyActive(checkIfCurrentlyActive());
    }, 60000);

    return () => clearInterval(interval);
  }, [subject.startTime, subject.duration, currentDay]);

  const endTime = calculateEndTime(subject.startTime, subject.duration);

  const getTimeStatus = () => {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;

    const [startHours, startMinutes] = subject.startTime.split(':').map(Number);
    const startTimeInMinutes = startHours * 60 + startMinutes;

    const endTime = calculateEndTime(subject.startTime, subject.duration);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const endTimeInMinutes = endHours * 60 + endMinutes;

    if (getCurrentDayName() !== currentDay) {
      return null;
    }

    if (currentTimeInMinutes < startTimeInMinutes) {
      const minutesUntilStart = startTimeInMinutes - currentTimeInMinutes;
      const hours = Math.floor(minutesUntilStart / 60);
      const minutes = minutesUntilStart % 60;
      return `Rozpocznie się za ${hours > 0 ? `${hours}h ` : ''}${minutes}min`;
    } else if (isCurrentlyActive) {
      const minutesUntilEnd = endTimeInMinutes - currentTimeInMinutes;
      const hours = Math.floor(minutesUntilEnd / 60);
      const minutes = minutesUntilEnd % 60;
      return `Kończy się za ${hours > 0 ? `${hours}h ` : ''}${minutes}min`;
    } else {
      return 'Zakończone';
    }
  };

  const timeStatus = getTimeStatus();

  return (
    <div className={`subject-item ${isCurrentlyActive ? 'currently-active' : ''}`}>
      <div className="subject-details">
        <div className="subject-header">
          <h3 className="subject-name">{subject.name}</h3>
          {isCurrentlyActive && (
            <span className="active-indicator">Trwa teraz</span>
          )}
          {timeStatus && !isCurrentlyActive && (
            <span className="time-status">{timeStatus}</span>
          )}
        </div>
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