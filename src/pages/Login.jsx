import React, { useState } from 'react';
import { Lock, Mail, Dumbbell } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'tusharshivakumarkattimani@gmail.com' && password === 'tushar@151571') {
      onLogin();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url("/gym-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}
      className="animate-fade-in"
    >
      <div 
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
          animation: 'fadeInDown 0.8s ease-out'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ 
            background: 'var(--accent-color)', 
            padding: '1rem', 
            borderRadius: '50%',
            boxShadow: '0 0 30px rgba(0, 230, 118, 0.4)'
          }}>
            <Dumbbell size={40} color="#000" />
          </div>
        </div>
        <h1 
          className="text-accent" 
          style={{ 
            fontSize: '3rem', 
            fontWeight: '900', 
            letterSpacing: '-1px',
            textShadow: '0 0 20px rgba(0, 230, 118, 0.3)'
          }}
        >
          FitTrack Pro
        </h1>
        <p style={{ color: '#rgba(255,255,255,0.7)', fontSize: '1.1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Forge Your Legacy
        </p>
      </div>

      <div 
        className="card"
        style={{ 
          width: '100%',
          maxWidth: '400px',
          background: 'rgba(30, 30, 30, 0.6)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          animation: 'fadeInUp 0.8s ease-out 0.2s both'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Account Login
        </h2>
        
        {error && (
          <div 
            className="animate-fade-in"
            style={{ 
              background: 'rgba(255, 59, 48, 0.1)', 
              color: 'var(--danger)', 
              padding: '0.75rem', 
              borderRadius: '12px', 
              marginBottom: '1.5rem',
              textAlign: 'center',
              border: '1px solid rgba(255, 59, 48, 0.3)',
              fontSize: '0.9rem'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '600' }}>
              <Mail size={16} className="text-accent" />
              EMAIL ADDRESS
            </label>
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '600' }}>
              <Lock size={16} className="text-accent" />
              PASSWORD
            </label>
            <input 
              type="password" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          <button 
            type="submit" 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ 
              width: '100%', 
              padding: '1rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              background: 'var(--accent-color)',
              color: '#000',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
              boxShadow: isHovered ? '0 10px 25px rgba(0, 230, 118, 0.4)' : '0 4px 15px rgba(0, 230, 118, 0.2)'
            }}
          >
            ENTER THE GYM
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Login;
