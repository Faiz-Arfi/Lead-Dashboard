import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      
      <div className="card w-full max-w-md animate-in fade-in zoom-in duration-300">
        
        <div className="card-header text-center">
          <h3 className="text-primary">LeadCRM Login</h3>
          <p className="text-muted-foreground text-sm">Enter your credentials to access the dashboard</p>
        </div>

        <div className="card-content">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Username
              </label>
              <input
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Password
              </label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password123"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full h-11 mt-2" 
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;