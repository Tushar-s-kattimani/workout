import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import { Flame, Droplets, Target, Activity, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { userProfile, dailyStats, workouts } = useContext(AppContext);

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
