import React, { useState } from 'react';
import { Package, AlertCircle } from 'lucide-react';

export const Register = ({ onRegister, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await onRegister(name, email, password);
      
      if (!result.success) {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <Package size={50} strokeWidth={2.5} />
          </div>
          <h1 className="auth-title">TSEIS</h1>
          <p className="auth-subtitle">Thapar Sports Equipment Issuance System</p>
        </div>

        {error && (
          <div className="error-alert">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              data-testid="register-name-input"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              placeholder="yourname@thapar.edu"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-testid="register-email-input"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              data-testid="register-password-input"
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            data-testid="register-submit-btn"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <button
            type="button"
            onClick={onSwitchToLogin}
            className="btn-secondary"
            data-testid="switch-to-login-btn"
          >
            Already have an account? Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
