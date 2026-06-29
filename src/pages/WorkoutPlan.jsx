import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle } from 'lucide-react';

const WorkoutPlan = () => {
  const { workouts, manuallyResetWeek } = useContext(AppContext);

  return (
    <div className="p-4 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="mb-0">Weekly Schedule</h2>
        <button 
          onClick={manuallyResetWeek} 
          className="bg-primary text-secondary px-3 py-1 rounded-md text-sm font-bold" 
          style={{ border: '1px solid var(--border-color)', cursor: 'pointer' }}
        >
          Reset Week
        </button>
      </div>
      
      {workouts.map((day) => {
        const total = day.exercises.length;
        const completed = day.exercises.filter(ex => ex.isCompleted).length;
        const isFullyCompleted = total > 0 && total === completed;

        return (
          <Link to={`/workout/${day.id}`} key={day.id} style={{ textDecoration: 'none' }}>
            <div className="card flex items-center justify-between">
              <div className="flex-1">
                <h3 className="mb-1">{day.day}</h3>
                <p className="text-accent mb-0 font-bold">{day.title}</p>
                <p className="text-sm text-secondary mt-1">
                  {completed} / {total} Exercises
                </p>
              </div>
              <div className="flex items-center gap-2">
                {isFullyCompleted && <CheckCircle className="text-accent" size={20} />}
                <ChevronRight className="text-secondary" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default WorkoutPlan;
