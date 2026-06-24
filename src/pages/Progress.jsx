import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Award, Camera, Ruler } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Progress = () => {
  const { userProfile } = useContext(AppContext);

  const weightData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [75, 74, 73, 72, userProfile.weight],
        borderColor: '#00E676',
        backgroundColor: 'rgba(0, 230, 118, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: '#333333',
        },
        ticks: {
          color: '#A0A0A0',
        }
      },
      x: {
        grid: {
          color: '#333333',
        },
        ticks: {
          color: '#A0A0A0',
        }
      }
    }
  };

  return (
    <div className="p-4 animate-fade-in pb-10">
      <h2 className="mb-4">Your Progress</h2>

      <div className="card mb-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Award className="text-accent" />
          Weight Tracking
        </h3>
        <div style={{ height: '250px' }}>
          <Line data={weightData} options={chartOptions} />
        </div>
        <div className="flex justify-between mt-4 text-center">
          <div>
            <p className="text-sm text-secondary mb-1">Start</p>
            <p className="font-bold">75 kg</p>
          </div>
          <div>
            <p className="text-sm text-secondary mb-1">Current</p>
            <p className="font-bold text-accent">{userProfile.weight} kg</p>
          </div>
          <div>
            <p className="text-sm text-secondary mb-1">Target</p>
            <p className="font-bold">{userProfile.targetWeight} kg</p>
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Ruler className="text-accent" />
          Body Measurements
        </h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[45%] bg-primary p-3 rounded-lg border border-color" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            <p className="text-sm text-secondary mb-1">Chest</p>
            <p className="font-bold">102 cm</p>
          </div>
          <div className="flex-1 min-w-[45%] bg-primary p-3 rounded-lg border border-color" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            <p className="text-sm text-secondary mb-1">Waist</p>
            <p className="font-bold">82 cm</p>
          </div>
          <div className="flex-1 min-w-[45%] bg-primary p-3 rounded-lg border border-color" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            <p className="text-sm text-secondary mb-1">Arms</p>
            <p className="font-bold">38 cm</p>
          </div>
          <div className="flex-1 min-w-[45%] bg-primary p-3 rounded-lg border border-color" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            <p className="text-sm text-secondary mb-1">Legs</p>
            <p className="font-bold">60 cm</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="mb-4 flex items-center gap-2">
          <Camera className="text-accent" />
          Before & After
        </h3>
        <div className="flex gap-4">
          <div className="flex-1 aspect-[3/4] bg-primary rounded-lg flex items-center justify-center border border-dashed border-secondary" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--text-secondary)' }}>
            <p className="text-secondary text-sm">Before Photo</p>
          </div>
          <div className="flex-1 aspect-[3/4] bg-primary rounded-lg flex items-center justify-center border border-dashed border-accent" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--accent-color)' }}>
            <p className="text-accent text-sm">+ Add Update</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
