import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Save, User, Activity, Target } from 'lucide-react';

const Profile = () => {
  const { userProfile, updateProfile } = useContext(AppContext);
  const [formData, setFormData] = useState({ ...userProfile });
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'height' || name === 'weight' || name === 'targetWeight' 
        ? Number(value) 
        : value
    }));
    setIsSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-4 animate-fade-in pb-10">
      <h2 className="mb-4">Your Profile</h2>

      <div className="card mb-6 text-center">
        <div className="avatar mx-auto mb-2" style={{ width: 80, height: 80, fontSize: '2rem', margin: '0 auto' }}>
          {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <h3 className="mb-1">{userProfile.name}</h3>
        <p className="text-secondary">{userProfile.goal}</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="card flex-1 text-center" style={{ padding: '1rem 0.5rem' }}>
          <Activity className="text-accent mx-auto mb-2" />
          <p className="text-sm text-secondary mb-1">BMI</p>
          <p className="font-bold text-xl">{userProfile.bmi}</p>
        </div>
        <div className="card flex-1 text-center" style={{ padding: '1rem 0.5rem' }}>
          <User className="text-accent mx-auto mb-2" />
          <p className="text-sm text-secondary mb-1">Weight</p>
          <p className="font-bold text-xl">{userProfile.weight} kg</p>
        </div>
        <div className="card flex-1 text-center" style={{ padding: '1rem 0.5rem' }}>
          <Target className="text-accent mx-auto mb-2" />
          <p className="text-sm text-secondary mb-1">Target</p>
          <p className="font-bold text-xl">{userProfile.targetWeight} kg</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card">
        <h3 className="mb-4 border-b border-color pb-2" style={{ borderBottomColor: 'var(--border-color)' }}>Personal Details</h3>
        
        <div className="input-group">
          <label htmlFor="name">Full Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            className="input-control" 
            value={formData.name} 
            onChange={handleChange} 
          />
        </div>

        <div className="flex gap-4">
          <div className="input-group flex-1">
            <label htmlFor="age">Age</label>
            <input 
              type="number" 
              id="age" 
              name="age" 
              className="input-control" 
              value={formData.age} 
              onChange={handleChange} 
            />
          </div>
          <div className="input-group flex-1">
            <label htmlFor="height">Height (cm)</label>
            <input 
              type="number" 
              id="height" 
              name="height" 
              className="input-control" 
              value={formData.height} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="input-group flex-1">
            <label htmlFor="weight">Weight (kg)</label>
            <input 
              type="number" 
              id="weight" 
              name="weight" 
              className="input-control" 
              value={formData.weight} 
              onChange={handleChange} 
              step="0.1"
            />
          </div>
          <div className="input-group flex-1">
            <label htmlFor="targetWeight">Target (kg)</label>
            <input 
              type="number" 
              id="targetWeight" 
              name="targetWeight" 
              className="input-control" 
              value={formData.targetWeight} 
              onChange={handleChange} 
              step="0.1"
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="goal">Fitness Goal</label>
          <input 
            type="text" 
            id="goal" 
            name="goal" 
            className="input-control" 
            value={formData.goal} 
            onChange={handleChange} 
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4 flex items-center justify-center gap-2" style={{ width: '100%' }}>
          <Save size={20} />
          {isSaved ? 'Saved Successfully!' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
