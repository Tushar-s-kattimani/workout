import React, { useContext } from 'react';
import { dietPlan } from '../data/dietData';
import { AppContext } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import { Flame, Droplets, Activity, Coffee } from 'lucide-react';

const Diet = () => {
  const { dailyStats } = useContext(AppContext);

  return (
    <div className="p-4 animate-fade-in">
      <h2 className="mb-4">Nutrition Tracking</h2>
      
      <div className="card mb-6">
        <h3 className="mb-4 border-b border-color pb-2" style={{ borderBottomColor: 'var(--border-color)' }}>Daily Targets</h3>
        
        <div className="mb-4 flex items-center gap-2">
          <Flame className="text-warning" size={24} />
          <div className="flex-1">
            <ProgressBar 
              current={dailyStats.caloriesConsumed} 
              target={parseInt(dietPlan.dailyTargets.calories)} 
              color="var(--warning)" 
              label={`Calories (${dietPlan.dailyTargets.calories})`}
            />
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <Activity className="text-accent" size={24} />
          <div className="flex-1">
            <ProgressBar 
              current={dailyStats.proteinConsumed} 
              target={parseInt(dietPlan.dailyTargets.protein.split('-')[1])} 
              label={`Protein (${dietPlan.dailyTargets.protein})`}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Droplets size={24} style={{ color: '#00BFFF' }} />
          <div className="flex-1">
            <ProgressBar 
              current={dailyStats.waterConsumed} 
              target={4} 
              color="#00BFFF" 
              label={`Water (${dietPlan.dailyTargets.water})`}
            />
          </div>
        </div>
      </div>

      <h3 className="mb-4 flex items-center gap-2">
        <Coffee className="text-accent" />
        Meal Plan
      </h3>

      {dietPlan.meals.map(meal => (
        <div key={meal.id} className="card">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg mb-0 text-accent">{meal.name}</h4>
            <span className="text-sm text-secondary">{meal.time}</span>
          </div>
          <ul className="list-none" style={{ paddingLeft: 0, marginTop: '0.5rem' }}>
            {meal.options.map((option, idx) => (
              <li key={idx} className="flex items-center gap-2 mb-1 text-sm">
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--text-secondary)' }}></div>
                {option}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Diet;
