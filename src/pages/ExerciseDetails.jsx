import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Timer, TrendingUp, Edit2, Check, X, Trash2 } from 'lucide-react';

const ExerciseDetails = () => {
  const { dayId } = useParams();
  const navigate = useNavigate();
  const { workouts, toggleExerciseCompletion, toggleSetCompletion, updateExerciseWeight, updateUserVideoId, deleteExercise } = useContext(AppContext);
  
  const dayWorkout = workouts.find(w => w.id === dayId);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [editingVideoFor, setEditingVideoFor] = useState(null);
  const [tempVideoUrl, setTempVideoUrl] = useState('');
  
  const [deletingExerciseId, setDeletingExerciseId] = useState(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const startRestTimer = (restString) => {
    const seconds = parseInt(restString.replace('s', ''));
    if (!isNaN(seconds)) {
      setTimer(seconds);
      setIsTimerRunning(true);
    }
  };

  const formatTime = (timeInSeconds) => {
    const m = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const s = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSaveVideo = (exerciseId) => {
    let input = tempVideoUrl.trim();
    let finalVideoId = null;
    
    if (input) {
      // Try to extract 11-character video ID from various YouTube URL formats (watch, youtu.be, shorts, embed)
      const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (match && match[1]) {
        finalVideoId = match[1];
      } else if (input.length === 11 && !input.includes('/') && !input.includes('?')) {
        // Assume they just pasted the raw ID
        finalVideoId = input;
      }
    }
    
    // If we couldn't parse a valid ID, finalVideoId is null, which clears the user video and falls back gracefully
    updateUserVideoId(dayId, exerciseId, finalVideoId);
    setEditingVideoFor(null);
  };

  const handleDeleteConfirm = (exerciseId) => {
    if (deletePassword === '151571') {
      deleteExercise(dayId, exerciseId);
      setDeletingExerciseId(null);
      setDeletePassword('');
      setDeleteError('');
    } else {
      setDeleteError('Incorrect password');
    }
  };

  if (!dayWorkout) return <div className="p-4">Workout not found.</div>;

  return (
    <div className="animate-fade-in pb-10">
      <div className="top-bar">
        <button className="btn-icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="mb-0 text-center flex-1">{dayWorkout.title}</h2>
        <div style={{ width: 40 }}></div>
      </div>

      {isTimerRunning && (
        <div className="card sticky top-0 m-4 text-center z-50 border-accent" style={{ borderColor: 'var(--accent-color)' }}>
          <h3 className="text-accent mb-1 flex items-center justify-center gap-2">
            <Timer size={20} />
            Rest Timer
          </h3>
          <p className="text-3xl font-bold">{formatTime(timer)}</p>
        </div>
      )}

      <div className="p-4">
        <p className="mb-4 text-secondary text-center">Complete all exercises to finish today's workout.</p>
        
        {dayWorkout.exercises.map(exercise => {
          const effectiveVideoId = exercise.userVideoId || exercise.videoId;
          
          return (
          <div key={exercise.id} className={`card ${exercise.isCompleted ? 'border-accent' : ''}`} style={exercise.isCompleted ? { borderColor: 'var(--accent-color)', opacity: 0.8 } : {}}>
            
            {/* Delete Confirmation Block */}
            {deletingExerciseId === exercise.id && (
              <div className="mb-4 bg-primary p-4" style={{ borderRadius: '8px', border: '1px solid #FF0000' }}>
                <label className="text-sm mb-2 block font-bold" style={{ color: '#FF0000' }}>Delete Exercise?</label>
                <p className="text-xs mb-3 text-secondary">Enter password to confirm deletion:</p>
                <div className="flex gap-2">
                  <input 
                    type="password" 
                    className="input-control flex-1 p-2"
                    placeholder="Password"
                    value={deletePassword}
                    onChange={e => setDeletePassword(e.target.value)}
                  />
                  <button className="btn" style={{ padding: '0 12px', backgroundColor: '#FF0000', color: '#FFF' }} onClick={() => handleDeleteConfirm(exercise.id)}>
                    <Check size={18} />
                  </button>
                  <button className="btn btn-secondary" style={{ padding: '0 12px' }} onClick={() => { setDeletingExerciseId(null); setDeleteError(''); }}>
                    <X size={18} />
                  </button>
                </div>
                {deleteError && <p className="text-xs mt-2" style={{ color: '#FF0000' }}>{deleteError}</p>}
              </div>
            )}

            {/* Video Section */}
            {editingVideoFor === exercise.id ? (
              <div className="mb-4 bg-primary p-4" style={{ borderRadius: '8px' }}>
                <label className="text-sm mb-2 block">Paste YouTube URL:</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    className="input-control flex-1 p-2"
                    placeholder="e.g. https://youtu.be/..."
                    value={tempVideoUrl}
                    onChange={e => setTempVideoUrl(e.target.value)}
                  />
                  <button className="btn btn-primary" style={{ padding: '0 12px' }} onClick={() => handleSaveVideo(exercise.id)}>
                    <Check size={18} />
                  </button>
                  <button className="btn btn-secondary" style={{ padding: '0 12px' }} onClick={() => setEditingVideoFor(null)}>
                    <X size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-4 relative">
                {effectiveVideoId ? (
                  <div className="bg-primary" style={{ borderRadius: '8px', overflow: 'hidden', aspectRatio: '16/9' }}>
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${effectiveVideoId}`}
                      title={`${exercise.name} Tutorial`}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      style={{ display: 'block' }}
                    ></iframe>
                  </div>
                ) : (
                  <a 
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + ' exercise tutorial')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center" 
                    style={{ backgroundColor: 'var(--bg-primary)', borderRadius: '8px', overflow: 'hidden', aspectRatio: '16/9', textDecoration: 'none', flexDirection: 'column' }}
                  >
                    <div style={{ padding: '16px', backgroundColor: '#FF0000', borderRadius: '50%', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <span className="text-accent font-bold">Watch {exercise.name} on YouTube</span>
                    <span className="text-secondary text-xs mt-2">Opens in new tab (Embeds Disabled by Creator)</span>
                  </a>
                )}
                
                {/* Action Buttons (Edit Video / Delete Exercise) */}
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <button 
                    className="btn-icon bg-secondary"
                    style={{ width: '32px', height: '32px', opacity: 0.9 }}
                    onClick={() => {
                      setEditingVideoFor(exercise.id);
                      setTempVideoUrl('');
                    }}
                    title="Change Video"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    className="btn-icon"
                    style={{ width: '32px', height: '32px', opacity: 0.9, backgroundColor: 'rgba(255, 0, 0, 0.8)', color: '#FFF' }}
                    onClick={() => {
                      setDeletingExerciseId(exercise.id);
                      setDeletePassword('');
                      setDeleteError('');
                    }}
                    title="Delete Exercise"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 pr-2">
                <h3 className="mb-1">{exercise.name}</h3>
                <p className="text-sm text-accent mb-2">{exercise.muscle}</p>
                <div className="flex gap-4 text-sm text-secondary">
                  <span>Sets: <strong className="text-primary">{exercise.sets}</strong></span>
                  <span>Reps: <strong className="text-primary">{exercise.reps}</strong></span>
                </div>
              </div>
              <input 
                type="checkbox" 
                className="custom-checkbox"
                checked={exercise.isCompleted}
                onChange={() => toggleExerciseCompletion(dayId, exercise.id)}
              />
            </div>

            {/* Individual Set Bubbles */}
            <div className="flex gap-2 mt-3 mb-4 flex-wrap">
              {Array.from({ length: parseInt(exercise.sets) }).map((_, idx) => {
                const isSetCompleted = (exercise.completedSets || []).includes(idx);
                return (
                  <button 
                    key={idx}
                    className={`btn-icon ${isSetCompleted ? 'bg-accent' : 'bg-secondary'}`}
                    style={{ 
                      width: '36px', height: '36px', 
                      borderRadius: '50%', 
                      border: isSetCompleted ? 'none' : '1px solid var(--border-color)', 
                      backgroundColor: isSetCompleted ? 'var(--accent-color)' : 'var(--bg-card)', 
                      color: isSetCompleted ? '#000' : 'var(--text-primary)', 
                      fontWeight: 'bold',
                      transition: 'all 0.2s'
                    }}
                    onClick={() => {
                      toggleSetCompletion(dayId, exercise.id, idx);
                      if (!isSetCompleted) {
                        startRestTimer(exercise.rest);
                      }
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            
            <div className="flex gap-2 items-center mb-4 mt-4">
              <div className="flex-1 input-group mb-0">
                <label className="mb-1 text-xs">Weight (kg)</label>
                <input 
                  type="number" 
                  className="input-control p-2"
                  value={exercise.currentWeight}
                  onChange={(e) => updateExerciseWeight(dayId, exercise.id, e.target.value)}
                />
              </div>
              <div className="flex-1 pt-5">
                <button 
                  className="btn btn-secondary w-full"
                  onClick={() => startRestTimer(exercise.rest)}
                  style={{ padding: '0.5rem' }}
                >
                  <Timer size={16} /> Rest {exercise.rest}
                </button>
              </div>
            </div>

            <div className="bg-primary p-3 rounded-lg flex items-center gap-2 text-sm text-secondary" style={{ backgroundColor: 'var(--bg-primary)', borderRadius: '8px' }}>
              <TrendingUp size={16} className="text-accent" />
              <span>Personal Record: <strong>{Math.max(exercise.currentWeight + 5, 20)} kg</strong></span>
            </div>
            <div className="mt-2 text-xs text-accent text-center">
              "Increase weight next week"
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExerciseDetails;

