import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Sun, Moon, LogOut } from 'lucide-react';

const TopBar = ({ title, setIsAuthenticated }) => {
  const { userProfile, isDarkMode, toggleTheme } = useContext(AppContext);
  const initials = userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="top-bar">
      <div className="user-greeting">
        <span className="text-sm text-secondary">Hello,</span>
        <span className="font-bold text-lg">{userProfile.name}</span>
      </div>
      {title && <h2 className="mb-0" style={{ margin: 0, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>{title}</h2>}
      <div className="flex items-center gap-2">
        <button 
          className="btn-icon" 
          onClick={() => {
            if (window.confirm("Do you want to change the visual theme mode?")) {
              toggleTheme();
            }
          }}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {setIsAuthenticated && (
          <button 
            className="btn-icon" 
            onClick={() => {
              if (window.confirm("Are you sure you want to log out?")) {
                setIsAuthenticated(false);
              }
            }} 
            style={{ color: 'var(--danger)' }}
          >
            <LogOut size={20} />
          </button>
        )}
        <div className="avatar ml-2" style={{ marginLeft: '8px' }}>
          {initials}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
