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
import { Award, Camera, Ruler, Activity, CheckCircle } from 'lucide-react';

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
  const { userProfile, workoutHistory } = useContext(AppContext);

  const today = new Date();
  
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const dayNum = d.getDay() || 7;
  d.setDate(d.getDate() + 4 - dayNum);
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  const currentWeekStr = `${d.getFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
  
  const currentMonthStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;

  // Fallback to empty array if workoutHistory is not available
  const history = workoutHistory || [];

  const thisWeekHistory = history.filter(h => h.week === currentWeekStr);
  const thisMonthHistory = history.filter(h => h.month === currentMonthStr);

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
          <Activity className="text-accent" />
          Consistency Report
        </h3>
        
        <div className="mb-6">
          <h4 className="text-sm text-secondary mb-3">This Week ({thisWeekHistory.length} completed)</h4>
          {thisWeekHistory.length > 0 ? (
            <div className="overflow-x-auto rounded-md" style={{ border: '1px solid var(--border-color)' }}>
              <table className="w-full text-left min-w-[500px]" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--secondary-color)', backgroundColor: 'var(--bg-card)' }}>
                    <th className="p-4 text-xs font-bold w-16" style={{ borderRight: '1px solid var(--border-color)' }}>Day</th>
                    <th className="p-4 text-xs font-bold" style={{ borderRight: '1px solid var(--border-color)' }}>Date</th>
                    <th className="p-4 text-xs font-bold" style={{ borderRight: '1px solid var(--border-color)' }}>Workout</th>
                    <th className="p-4 text-xs font-bold text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {thisWeekHistory.map((h, i) => {
                    const parts = h.date.split('-');
                    const dObj = new Date(parts[0], parts[1] - 1, parts[2]);
                    const dName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dObj.getDay()];
                    return (
                      <tr key={i} style={{ borderBottom: i === thisWeekHistory.length - 1 ? 'none' : '1px solid var(--border-color)', backgroundColor: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-card)' }}>
                        <td className="p-4 text-sm font-bold" style={{ borderRight: '1px solid var(--border-color)' }}>{dName}</td>
                        <td className="p-4 text-xs text-secondary" style={{ borderRight: '1px solid var(--border-color)' }}>{`${parts[2]}/${parts[1]}/${parts[0]}`}</td>
                        <td className="p-4 text-sm font-bold text-accent" style={{ borderRight: '1px solid var(--border-color)' }}>{h.title}</td>
                        <td className="p-4 text-center">
                          <span className="text-accent text-xs inline-flex items-center gap-1 font-bold">
                            <CheckCircle size={14} /> Done
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <span className="text-xs text-secondary">No workouts finished this week.</span>
          )}
        </div>

        <div>
          <h4 className="text-sm text-secondary mb-3">This Month ({thisMonthHistory.length} completed)</h4>
          {thisMonthHistory.length > 0 ? (
            <div className="overflow-x-auto rounded-md" style={{ border: '1px solid var(--border-color)' }}>
              <table className="w-full text-left min-w-[500px]" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--secondary-color)', backgroundColor: 'var(--bg-card)' }}>
                    <th className="p-4 text-xs font-bold w-16" style={{ borderRight: '1px solid var(--border-color)' }}>Day</th>
                    <th className="p-4 text-xs font-bold" style={{ borderRight: '1px solid var(--border-color)' }}>Date</th>
                    <th className="p-4 text-xs font-bold" style={{ borderRight: '1px solid var(--border-color)' }}>Workout</th>
                    <th className="p-4 text-xs font-bold text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {thisMonthHistory.map((h, i) => {
                    const parts = h.date.split('-');
                    const dObj = new Date(parts[0], parts[1] - 1, parts[2]);
                    const dName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dObj.getDay()];
                    return (
                      <tr key={i} style={{ borderBottom: i === thisMonthHistory.length - 1 ? 'none' : '1px solid var(--border-color)', backgroundColor: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-card)' }}>
                        <td className="p-4 text-sm font-bold" style={{ borderRight: '1px solid var(--border-color)' }}>{dName}</td>
                        <td className="p-4 text-xs text-secondary" style={{ borderRight: '1px solid var(--border-color)' }}>{`${parts[2]}/${parts[1]}/${parts[0]}`}</td>
                        <td className="p-4 text-sm font-bold text-secondary" style={{ borderRight: '1px solid var(--border-color)' }}>{h.title}</td>
                        <td className="p-4 text-center">
                          <span className="text-secondary text-xs inline-flex items-center gap-1 font-bold">
                            <CheckCircle size={14} /> Done
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <span className="text-xs text-secondary">No workouts finished this month.</span>
          )}
        </div>
      </div>

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
