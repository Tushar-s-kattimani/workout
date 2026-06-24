import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, Apple, LineChart, User } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
        <Home size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/workout" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Dumbbell size={24} />
        <span>Workout</span>
      </NavLink>
      <NavLink to="/diet" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Apple size={24} />
        <span>Diet</span>
      </NavLink>
      <NavLink to="/progress" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <LineChart size={24} />
        <span>Progress</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <User size={24} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
