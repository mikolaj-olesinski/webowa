import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddSubjectForm from './AddSubjectForm';
import SubjectItem from './SubjectItem';
import SearchFilter from './SearchFilter';

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
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('');
  
  const currentDay = daysOfWeek[currentDayIndex];

  const fetchScheduleForDay = async (day) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:3001/api/schedules/${day}`);
      const normalizedData = response.data.map(item => ({
        id: item.id,
        name: item.subject_name,
        startTime: item.start_time,
        duration: item.duration
      }));
      setSchedules(prev => ({
        ...prev,
        [day]: normalizedData
      }));
    } catch (error) {
      console.error('Błąd pobierania harmonogramu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduleForDay(currentDay);
  }, [currentDay]);

  const addSubject = async (newSubject) => {
    try {
      setIsLoading(true);
      await axios.post('http://localhost:3001/api/schedules', {
        ...newSubject,
        day: currentDay
      });
      await fetchScheduleForDay(currentDay);
    } catch (error) {
      console.error('Błąd dodawania przedmiotu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeSubject = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:3001/api/schedules/${id}`);
      await fetchScheduleForDay(currentDay);
    } catch (error) {
      console.error('Błąd usuwania przedmiotu:', error);
    } finally {
      setIsLoading(false);
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

  const filterSubjects = (subjects) => {
    return subjects.filter(subject => {
      const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!timeFilter) return matchesSearch;

      const hour = parseInt(subject.startTime.split(':')[0]);
      
      switch (timeFilter) {
        case 'morning':
          return matchesSearch && hour >= 6 && hour < 12;
        case 'afternoon':
          return matchesSearch && hour >= 12 && hour < 17;
        case 'evening':
          return matchesSearch && hour >= 17 && hour < 22;
        default:
          return matchesSearch;
      }
    });
  };

  const filteredSubjects = filterSubjects(schedules[currentDay]);

  return (
    <div className="schedule-container">
      <div className="day-navigation">
        <button onClick={goToPreviousDay} className="nav-button">◀</button>
        <h1 className="schedule-title">{currentDay}</h1>
        <button onClick={goToNextDay} className="nav-button">▶</button>
      </div>
      <SearchFilter 
        onSearch={setSearchTerm}
        onFilter={setTimeFilter}
      />
      <AddSubjectForm onAddSubject={addSubject} />
      <div className="subjects-list">
        {isLoading ? (
          <div className="loading">Ładowanie...</div>
        ) : filteredSubjects.length > 0 ? (
          filteredSubjects.map((subject) => (
            <SubjectItem
              key={subject.id}
              subject={subject}
              onRemove={() => removeSubject(subject.id)}
              currentDay={currentDay}
            />
          ))
        ) : (
          <div className="no-results">Brak przedmiotów</div>
        )}
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