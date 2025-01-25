import React, { useState } from 'react';

const AddSubjectForm = ({ onAddSubject }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [startTime, setStartTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && duration && startTime) {
      onAddSubject({
        name,
        duration: parseInt(duration),
        startTime
      });
      setName('');
      setDuration('');
      setStartTime('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-subject-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Nazwa przedmiotu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="time"
          placeholder="Godzina rozpoczęcia"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          placeholder="Czas trwania (minuty)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="form-input"
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Dodaj przedmiot
      </button>
    </form>
  );
};

export default AddSubjectForm;