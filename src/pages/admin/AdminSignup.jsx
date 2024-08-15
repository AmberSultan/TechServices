import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

function AdminSignup() {
  const [formData, setFormData] = useState({
    adminName: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const generateRandomPassword = () => {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    const storedAdminData = JSON.parse(localStorage.getItem('adminData')) || [];
    const adminExists = storedAdminData.some(admin => admin.email === formData.email);

    if (adminExists) {
      alert('Admin already exists, please log in.');
      navigate('/admin/login');
      return;
    }

    const generatedPassword = generateRandomPassword();

    const serviceId = 'service_1btra68';
    const templateId = 'template_62vx03o';
    const publicKey = 'xK81ouvVmz6d5x6vp';

    const templateParams = {
      from_name: formData.adminName,
      to_name: 'Admin',
      to_email: formData.email,
      password: generatedPassword,
      phone: formData.phone,
      address: formData.address
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(response => {
        console.log('Email sent successfully!', response);
        alert('Admin Sign Up successful! Check your email for details.');

        const updatedAdminData = [...storedAdminData, { ...formData, password: generatedPassword }];
        localStorage.setItem('adminData', JSON.stringify(updatedAdminData));

        navigate('/admin/login');
      })
      .catch(error => {
        console.error('Error sending email:', error);
        alert('Failed to send confirmation email. Please try again later.');
      });
  };

  return (
    <div className='container signForm'>
      <div className="signup-form">
        <form className='signForm' onSubmit={handleSubmit}>
          <h2>Admin Sign Up</h2>
          <p className='mb-4'>Please fill in this form to create an admin account!</p>
          <div className="form-group">
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control newForm"
                  name="adminName"
                  placeholder="Admin Name"
                  value={formData.adminName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control newForm"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {emailError && <p className="text-danger">{emailError}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control newForm"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control newForm"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn signUpBtn">Sign Up</button>
          </div>
        </form>
        <div className="hint-text">
          Already have an admin account? <Link to="/admin/login" className='trigger-btn'>Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminSignup;
