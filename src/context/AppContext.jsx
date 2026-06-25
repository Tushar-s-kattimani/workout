import React, { createContext, useState, useEffect } from 'react';
import { collection, doc, onSnapshot, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { workoutPlan } from '../data/workoutData';

export const AppContext = createContext();

const USER_EMAIL = 'tusharshivakumarkattimani@gmail.com';
const USER_PATH = `users/${USER_EMAIL}`;

export const AppProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    name: 'User',
    age: 25,
    height: 174,
    weight: 71,
    targetWeight: 65,
    goal: 'Lean muscular fit body',
    bmi: 23.5,
  });

  const [dailyStats, setDailyStats] = useState({
    caloriesConsumed: 1850,
    proteinConsumed: 95,
    waterConsumed: 2.5,
    steps: 6500,
  });

  const [workouts, setWorkouts] = useState(workoutPlan);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('isDarkMode');
    return savedMode !== null ? savedMode === 'true' : true;
  });
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize DB and Seed Data
  useEffect(() => {
    const initDB = async () => {
      try {
        const profileRef = doc(db, `${USER_PATH}/data/profile`);
        const snap = await getDoc(profileRef);
        
        if (!snap.exists()) {
          // Seeding profile
          await setDoc(profileRef, userProfile);
          // Seeding stats
          await setDoc(doc(db, `${USER_PATH}/data/dailyStats`), dailyStats);
          // Seeding workouts
          for (const day of workoutPlan) {
            await setDoc(doc(db, `${USER_PATH}/workouts`, day.id), day);
          }
        }
      } catch (err) {
        console.error("Firebase init error:", err);
      } finally {
        setIsInitializing(false);
      }
    };
    initDB();
  }, []);

  // Listen to Real-time Updates
  useEffect(() => {
    if (isInitializing) return;

    const unsubProfile = onSnapshot(doc(db, `${USER_PATH}/data/profile`), (docSnap) => {
      if (docSnap.exists()) setUserProfile(docSnap.data());
    });

    const unsubStats = onSnapshot(doc(db, `${USER_PATH}/data/dailyStats`), (docSnap) => {
      if (docSnap.exists()) setDailyStats(docSnap.data());
    });

    const unsubWorkouts = onSnapshot(collection(db, `${USER_PATH}/workouts`), (snapshot) => {
      if (!snapshot.empty) {
        const docsData = {};
        snapshot.forEach(docSnap => {
          docsData[docSnap.id] = docSnap.data();
        });
        
        // Maintain the original static order and merge static fields
        const orderedWorkouts = workoutPlan.map(day => {
          const dbDay = docsData[day.id];
          if (!dbDay) return day;
          return {
            ...dbDay,
            exercises: dbDay.exercises.map(dbEx => {
              const staticEx = day.exercises.find(e => e.id === dbEx.id);
              const mergedEx = { ...dbEx };
              if (staticEx && staticEx.videoId) {
                mergedEx.videoId = staticEx.videoId;
              } else {
                delete mergedEx.videoId;
              }
              return mergedEx;
            })
          };
        });
        setWorkouts(orderedWorkouts);
      }
    });

    const unsubHistory = onSnapshot(collection(db, `${USER_PATH}/history`), (snapshot) => {
      if (!snapshot.empty) {
        const historyData = [];
        snapshot.forEach(docSnap => {
          historyData.push({ id: docSnap.id, ...docSnap.data() });
        });
        setWorkoutHistory(historyData);
      } else {
        setWorkoutHistory([]);
      }
    });

    return () => {
      unsubProfile();
      unsubStats();
      unsubWorkouts();
      unsubHistory();
    };
  }, [isInitializing]);

  // Theme Toggler
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => {
    const newMode = !prev;
    localStorage.setItem('isDarkMode', newMode);
    return newMode;
  });

  // Profile Mutation
  const calculateBMI = (weight, heightCm) => {
    const heightM = heightCm / 100;
    return (weight / (heightM * heightM)).toFixed(1);
  };

  const updateProfile = async (newData) => {
    const newBmi = calculateBMI(newData.weight, newData.height);
    const updated = { ...newData, bmi: newBmi };
    setUserProfile(updated); // Optimistic UI
    await updateDoc(doc(db, `${USER_PATH}/data/profile`), updated);
  };

  const updateDailyStats = async (newStats) => {
    setDailyStats(newStats); // Optimistic UI
    await updateDoc(doc(db, `${USER_PATH}/data/dailyStats`), newStats);
  };

  const recordWorkoutCompletion = async (dayTitle) => {
    const today = new Date();
    const isoDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    const month = isoDate.substring(0, 7);
    
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dayNum = d.getDay() || 7;
    d.setDate(d.getDate() + 4 - dayNum);
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    const week = `${d.getFullYear()}-W${weekNo.toString().padStart(2, '0')}`;

    const newRecord = {
      date: isoDate,
      month: month,
      week: week,
      title: dayTitle,
      timestamp: Date.now()
    };

    const docId = `${isoDate}_${dayTitle.replace(/\s+/g, '_')}`;
    await setDoc(doc(db, `${USER_PATH}/history`, docId), newRecord);
  };

  // Workout Mutations
  const toggleSetCompletion = async (dayId, exerciseId, setIndex) => {
    let updatedDay = null;
    
    setWorkouts(prevWorkouts => {
      return prevWorkouts.map(day => {
        if (day.id === dayId) {
          const newDay = {
            ...day,
            exercises: day.exercises.map(ex => {
              if (ex.id === exerciseId) {
                const completedSets = ex.completedSets || [];
                const isSetCompleted = completedSets.includes(setIndex);
                
                const newCompletedSets = isSetCompleted 
                  ? completedSets.filter(s => s !== setIndex) 
                  : [...completedSets, setIndex];
                
                const isCompleted = newCompletedSets.length >= parseInt(ex.sets);
                return { ...ex, completedSets: newCompletedSets, isCompleted };
              }
              return ex;
            })
          };
          updatedDay = newDay;
          return newDay;
        }
        return day;
      });
    });

    if (updatedDay) {
      await setDoc(doc(db, `${USER_PATH}/workouts`, dayId), updatedDay);
      const allCompleted = updatedDay.exercises.length > 0 && updatedDay.exercises.every(ex => ex.isCompleted);
      if (allCompleted) {
        await recordWorkoutCompletion(updatedDay.title);
      }
    }
  };

  const toggleExerciseCompletion = async (dayId, exerciseId) => {
    let updatedDay = null;

    setWorkouts(prevWorkouts => {
      return prevWorkouts.map(day => {
        if (day.id === dayId) {
          const newDay = {
            ...day,
            exercises: day.exercises.map(ex => {
              if (ex.id === exerciseId) {
                const isCompleted = !ex.isCompleted;
                const totalSets = parseInt(ex.sets);
                const completedSets = isCompleted ? Array.from({ length: totalSets }, (_, i) => i) : [];
                return { ...ex, isCompleted, completedSets };
              }
              return ex;
            })
          };
          updatedDay = newDay;
          return newDay;
        }
        return day;
      });
    });

    if (updatedDay) {
      await setDoc(doc(db, `${USER_PATH}/workouts`, dayId), updatedDay);
      const allCompleted = updatedDay.exercises.length > 0 && updatedDay.exercises.every(ex => ex.isCompleted);
      if (allCompleted) {
        await recordWorkoutCompletion(updatedDay.title);
      }
    }
  };

  const updateExerciseWeight = async (dayId, exerciseId, newWeight) => {
    let updatedDay = null;

    setWorkouts(prevWorkouts => {
      return prevWorkouts.map(day => {
        if (day.id === dayId) {
          const newDay = {
            ...day,
            exercises: day.exercises.map(ex => {
              if (ex.id === exerciseId) {
                return { ...ex, currentWeight: newWeight };
              }
              return ex;
            })
          };
          updatedDay = newDay;
          return newDay;
        }
        return day;
      });
    });

    if (updatedDay) {
      await setDoc(doc(db, `${USER_PATH}/workouts`, dayId), updatedDay);
    }
  };

  const updateUserVideoId = async (dayId, exerciseId, userVideoId) => {
    let updatedDay = null;

    setWorkouts(prevWorkouts => {
      return prevWorkouts.map(day => {
        if (day.id === dayId) {
          const newDay = {
            ...day,
            exercises: day.exercises.map(ex => {
              if (ex.id === exerciseId) {
                return { ...ex, userVideoId };
              }
              return ex;
            })
          };
          updatedDay = newDay;
          return newDay;
        }
        return day;
      });
    });

    if (updatedDay) {
      await setDoc(doc(db, `${USER_PATH}/workouts`, dayId), updatedDay);
    }
  };

  const addExercise = async (dayId, exerciseData) => {
    let updatedDay = null;

    setWorkouts(prevWorkouts => {
      return prevWorkouts.map(day => {
        if (day.id === dayId) {
          const newExercise = {
            ...exerciseData,
            id: `custom_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            isCompleted: false,
            completedSets: [],
            currentWeight: parseInt(exerciseData.currentWeight) || 0
          };
          const newDay = {
            ...day,
            exercises: [...day.exercises, newExercise]
          };
          updatedDay = newDay;
          return newDay;
        }
        return day;
      });
    });

    if (updatedDay) {
      await setDoc(doc(db, `${USER_PATH}/workouts`, dayId), updatedDay);
    }
  };

  const deleteExercise = async (dayId, exerciseId) => {
    let updatedDay = null;

    setWorkouts(prevWorkouts => {
      return prevWorkouts.map(day => {
        if (day.id === dayId) {
          const newDay = {
            ...day,
            exercises: day.exercises.filter(ex => ex.id !== exerciseId)
          };
          updatedDay = newDay;
          return newDay;
        }
        return day;
      });
    });

    if (updatedDay) {
      await setDoc(doc(db, `${USER_PATH}/workouts`, dayId), updatedDay);
    }
  };

  const reorderExercises = async (dayId, newExercisesArray) => {
    let updatedDay = null;

    setWorkouts(prevWorkouts => {
      return prevWorkouts.map(day => {
        if (day.id === dayId) {
          const newDay = {
            ...day,
            exercises: newExercisesArray
          };
          updatedDay = newDay;
          return newDay;
        }
        return day;
      });
    });

    if (updatedDay) {
      await setDoc(doc(db, `${USER_PATH}/workouts`, dayId), updatedDay);
    }
  };

  return (
    <AppContext.Provider value={{
      userProfile,
      updateProfile,
      dailyStats,
      updateDailyStats,
      workouts,
      workoutHistory,
      addExercise,
      reorderExercises,
      toggleExerciseCompletion,
      toggleSetCompletion,
      updateExerciseWeight,
      updateUserVideoId,
      deleteExercise,
      recordWorkoutCompletion,
      isDarkMode,
      toggleTheme,
      isInitializing
    }}>
      {children}
    </AppContext.Provider>
  );
};
