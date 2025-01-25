import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import AddSubjectForm from './AddSubjectForm';
import SubjectItem from './SubjectItem';

const daysOfWeek = [
  'Poniedziałek', 'Wtorek', 'Środa', 
  'Czwartek', 'Piątek', 'Sobota', 'Niedziela'
];


const StudyScheduleContainer = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [schedules, setSchedules] = useState({
    'Poniedziałek': [],
    'Wtorek': [],
    'Środa': [],
    'Czwartek': [],
    'Piątek': [],
    'Sobota': [],
    'Niedziela': []
  });

  const currentDay = daysOfWeek[currentDayIndex];

  useEffect(() => {
    const fetchScheduleForDay = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/schedules/${currentDay}`);
        
        const normalizedData = response.data.map(item => ({
          id: item.id,
          name: item.subject_name,
          startTime: item.start_time,
          duration: item.duration
        }));
  
        setSchedules(prev => ({
          ...prev,
          [currentDay]: normalizedData
        }));
      } catch (error) {
        console.error('Błąd pobierania harmonogramu:', error);
      }
    };
  
    fetchScheduleForDay();
  }, [currentDay]);

  const addSubject = async (newSubject) => {
    try {
      await axios.post('http://localhost:3001/api/schedules', {
        ...newSubject,
        day: currentDay
      });

      const response = await axios.get(`http://localhost:3001/api/schedules/${currentDay}`);
      setSchedules(prev => ({
        ...prev,
        [currentDay]: response.data
      }));
    } catch (error) {
      console.error('Błąd dodawania przedmiotu:', error);
    }
  };


  const removeSubject = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/schedules/${id}`);

      const response = await axios.get(`http://localhost:3001/api/schedules/${currentDay}`);
      setSchedules(prev => ({
        ...prev,
        [currentDay]: response.data
      }));
    } catch (error) {
      console.error('Błąd usuwania przedmiotu:', error);
    }
  };

  const goToPreviousDay = () => {
    setCurrentDayIndex(prev => (prev > 0 ? prev - 1 : 6));
  };

  const goToNextDay = () => {
    setCurrentDayIndex(prev => (prev < 6 ? prev + 1 : 0));
  };

  const saveToJSON = () => {
    const jsonContent = JSON.stringify(schedules, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'plan_zajec.json';
    link.click();
  };

  return (
    <div className="schedule-container">
      <div className="day-navigation">
        <button onClick={goToPreviousDay} className="nav-button">◀</button>
        <h1 className="schedule-title">{currentDay}</h1>
        <button onClick={goToNextDay} className="nav-button">▶</button>
      </div>

      <AddSubjectForm onAddSubject={addSubject} />

      <div className="subjects-list">
        {schedules[currentDay].map((subject) => (
          <SubjectItem
            key={subject.id}
            subject={subject}
            onRemove={() => removeSubject(subject.id)}
          />
        ))}
      </div>

      {schedules[currentDay].length > 0 && (
        <div className="save-button-container">
          <button onClick={saveToJSON} className="save-button">
            Zapisz plan do JSON
          </button>
        </div>
      )}
    </div>
  );
};

export default StudyScheduleContainer;