import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const storedAdminData = JSON.parse(localStorage.getItem('adminData')) || [];
    const admin = storedAdminData.find(admin => admin.email === email && admin.password === password);

    if (admin) {
      localStorage.setItem('loggedInAdmin', JSON.stringify(admin));
      navigate('/admin/dashboard'); // Redirect to admin dashboard or desired route
    } else {
      setError('Invalid email or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = () => {
    return email.trim() !== '' && password.trim() !== '';
  };

  return (
    <div className='container loginContainer'>
      <div className="login-form loginForm">
        <h2 className="text-center">Admin Log In</h2>
        <form onSubmit={handleSubmit}>
          <p className='text-center welcome mt-4 mb-4'>Welcome back, Admin!</p>
          <div className="form-group loginGroup mb-3">
            <input 
              type="email" 
              className="form-control loginControl" 
              placeholder="Email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="form-group loginGroup mb-3 position-relative">
            <input 
              type={showPassword ? "text" : "password"} 
              className="form-control loginControl" 
              placeholder="Password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button 
              type="button" 
              className="btn btn-link hide position-absolute end-0 me-2" 
              onClick={togglePasswordVisibility}
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {error && <p className="text-danger text-center">{error}</p>}
          <div className="form-group loginGroup">
            <button 
              type="submit" 
              className="btn loginBtn" 
              disabled={!isFormValid()}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
