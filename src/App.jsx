import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, AppContext } from './context/AppContext';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';

// Pages
import Home from './pages/Home';
import WorkoutPlan from './pages/WorkoutPlan';
import ExerciseDetails from './pages/ExerciseDetails';
import Diet from './pages/Diet';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Login from './pages/Login';

const AppContent = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const { isInitializing } = useContext(AppContext);
  const isExerciseDetails = location.pathname.includes('/workout/');

  if (isInitializing) {
    return (
      <div className="app-container flex items-center justify-center" style={{ height: '100vh' }}>
        <div className="text-accent" style={{ fontSize: '1.5rem', fontWeight: 'bold', animation: 'pulse 1.5s infinite' }}>
          Loading your data...
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {!isExerciseDetails && <TopBar setIsAuthenticated={setIsAuthenticated} />}
      <div style={{ paddingBottom: isExerciseDetails ? '0' : '60px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout" element={<WorkoutPlan />} />
          <Route path="/workout/:dayId" element={<ExerciseDetails />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {!isExerciseDetails && <BottomNav />}
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const handleAuthChange = (status) => {
    setIsAuthenticated(status);
    if (status) {
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('isAuthenticated');
    }
  };

  return (
    <AppProvider>
      <Router>
        {!isAuthenticated ? (
          <Login onLogin={() => handleAuthChange(true)} />
        ) : (
          <AppContent setIsAuthenticated={handleAuthChange} />
        )}
      </Router>
    </AppProvider>
  );
}

export default App;
