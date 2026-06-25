import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import { Flame, Droplets, Target, Activity, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { userProfile, dailyStats, workouts, workoutHistory } = useContext(AppContext);

  // Get today's workout based on actual day or mock it as Monday
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = dayNames[new Date().getDay()];
  
  // For demo, let's just find the workout for today, or fallback to Monday
  let todaysWorkout = workouts.find(w => w.day === todayName) || workouts[0];

  const totalExercises = todaysWorkout.exercises.length;
  const completedExercises = todaysWorkout.exercises.filter(ex => ex.isCompleted).length;
  
  let totalSets = 0;
  let completedSetsCount = 0;
  let totalVolume = 0;

  todaysWorkout.exercises.forEach(ex => {
    const sets = parseInt(ex.sets) || 0;
    totalSets += sets;
    
    const completed = ex.completedSets ? ex.completedSets.length : 0;
    completedSetsCount += completed;

    totalVolume += (ex.currentWeight || 0) * completed; // Rough volume based on weight * sets
  });

  const workoutProgress = totalSets > 0 ? (completedSetsCount / totalSets) * 100 : 0;

  return (
    <div className="p-4 animate-fade-in">
      <div className="card mb-6" style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--bg-secondary))' }}>
        <h3 className="text-xl mb-2">"Consistency builds your dream body"</h3>
        <p className="text-sm text-accent">Keep pushing, {userProfile.name}!</p>
      </div>

      <h2 className="mb-4 flex items-center gap-2">
        <Activity className="text-accent" />
        Today's Workout
      </h2>
      
      <Link to={`/workout/${todaysWorkout.id}`} style={{ textDecoration: 'none' }}>
        <div className="card">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="mb-1">{todaysWorkout.day} - {todaysWorkout.title}</h3>
              <p className="text-sm text-secondary">{completedExercises} / {totalExercises} Exercises</p>
            </div>
            {workoutProgress === 100 && <CheckCircle color="var(--accent-color)" size={28} />}
          </div>
          <ProgressBar 
            current={completedSetsCount} 
            target={totalSets} 
            label="Sets Completed" 
          />
        </div>
      </Link>

      <div className="flex gap-4 mb-6 mt-4">
        <div className="card flex-1 text-center mb-0" style={{ padding: '1rem 0.5rem' }}>
          <Activity className="text-accent mx-auto mb-2" />
          <p className="text-sm text-secondary mb-1">Total Sets</p>
          <p className="font-bold text-xl">{completedSetsCount} / {totalSets}</p>
        </div>
        <div className="card flex-1 text-center mb-0" style={{ padding: '1rem 0.5rem' }}>
          <Target className="text-accent mx-auto mb-2" />
          <p className="text-sm text-secondary mb-1">Volume Lifted</p>
          <p className="font-bold text-xl">{totalVolume} kg</p>
        </div>
      </div>


      <h2 className="mb-4 mt-6 flex items-center gap-2">
        <Target className="text-accent" />
        Weekly Report
      </h2>

      <div className="card mb-6" style={{ padding: 0, overflow: 'hidden', border: 'none', background: 'transparent' }}>
        <div className="overflow-x-auto rounded-md" style={{ border: '1px solid var(--border-color)' }}>
          <table className="w-full text-left min-w-[500px]" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--secondary-color)', backgroundColor: 'var(--bg-card)' }}>
                <th className="p-4 text-xs font-bold w-24" style={{ borderRight: '1px solid var(--border-color)' }}>Day</th>
                <th className="p-4 text-xs font-bold" style={{ borderRight: '1px solid var(--border-color)' }}>Workout</th>
                <th className="p-4 text-xs font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
          // Pre-calculate history and remaining titles
          const history = workoutHistory || [];
          const todayDate = new Date();
          const d = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
          const dayNum = d.getDay() || 7;
          d.setDate(d.getDate() + 4 - dayNum);
          const yearStart = new Date(d.getFullYear(), 0, 1);
          const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
          const currentWeekStr = `${d.getFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
          
          const thisWeekHistory = history.filter(h => h.week === currentWeekStr);
          const historyByDay = {};
          thisWeekHistory.forEach(h => {
            const parts = h.date.split('-');
            const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
            const dayNamesArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = dayNamesArr[dateObj.getDay()];
            historyByDay[dayName] = h.title;
          });

          const completedTitles = Object.values(historyByDay);
          const allPlannedTitles = workouts.map(w => w.title);
          const remainingTitles = allPlannedTitles.filter(t => !completedTitles.includes(t));
          let remainingIndex = 0;

          return workouts.map((w, index) => {
            let displayTitle = '';
            let isCompleted = false;
            let progressText = '';

            if (historyByDay[w.day]) {
              displayTitle = historyByDay[w.day];
              isCompleted = true;
            } else {
              displayTitle = remainingTitles[remainingIndex] || w.title;
              remainingIndex++;

              const targetWorkout = workouts.find(wo => wo.title === displayTitle) || w;
              const totalEx = targetWorkout.exercises.length;
              const completedEx = targetWorkout.exercises.filter(ex => ex.isCompleted).length;
              if (totalEx > 0 && totalEx === completedEx) {
                isCompleted = true; // Wait, if it's completed but not in history, we still mark it completed
              } else {
                progressText = `${completedEx}/${totalEx} done`;
              }
            }
            
            return (
              <tr key={w.id} style={{ borderBottom: index === workouts.length - 1 ? 'none' : '1px solid var(--border-color)', backgroundColor: index % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-card)' }}>
                <td className={`p-4 text-sm font-bold ${isCompleted ? 'text-accent' : ''}`} style={{ borderRight: '1px solid var(--border-color)' }}>{w.day}</td>
                <td className={`p-4 text-sm font-bold ${isCompleted ? 'text-accent' : 'text-secondary'}`} style={{ borderRight: '1px solid var(--border-color)' }}>{displayTitle}</td>
                <td className="p-4 text-center">
                  {isCompleted ? (
                    <span className="text-accent text-xs inline-flex items-center gap-1 font-bold">
                      <CheckCircle size={14} /> Done
                    </span>
                  ) : (
                    <span className="bg-primary text-secondary px-2 py-1 rounded-md text-xs" style={{ border: '1px solid var(--border-color)' }}>
                      {progressText}
                    </span>
                  )}
                </td>
              </tr>
            );
          });
        })()}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="mb-4 mt-6 flex items-center gap-2">
        <Flame className="text-warning" />
        Daily Goals
      </h2>

      <div className="card">
        <div className="flex items-center gap-2 mb-2">
          <Flame size={20} className="text-warning" />
          <h3 className="mb-0">Calories</h3>
        </div>
        <ProgressBar 
          current={dailyStats.caloriesConsumed} 
          target={2200} 
          color="var(--warning)" 
          label="Kcal" 
        />
      </div>

      <div className="flex gap-4">
        <div className="card" style={{ flex: 1 }}>
          <div className="flex items-center gap-2 mb-2">
            <Activity size={20} className="text-accent" />
            <h3 className="mb-0 text-sm">Protein</h3>
          </div>
          <ProgressBar 
            current={dailyStats.proteinConsumed} 
            target={140} 
            label="g" 
          />
        </div>
        <div className="card" style={{ flex: 1 }}>
          <div className="flex items-center gap-2 mb-2">
            <Droplets size={20} style={{ color: '#00BFFF' }} />
            <h3 className="mb-0 text-sm">Water</h3>
          </div>
          <ProgressBar 
            current={dailyStats.waterConsumed} 
            target={4} 
            color="#00BFFF" 
            label="L" 
          />
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-2">
          <Activity size={20} className="text-accent" />
          <h3 className="mb-0">Steps</h3>
        </div>
        <ProgressBar 
          current={dailyStats.steps} 
          target={10000} 
          label="Steps" 
        />
      </div>
    </div>
  );
};

export default Home;
