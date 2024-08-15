import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";
import './ContactUs.css';

function ContactUs() {

  const [startDate, setStartDate] = useState(new Date());

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [formErrors, setFormErrors] = useState({
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });

    // Validate email when changing
    if (name === 'email') {
      validateEmail(value);
    }
  };

  const handleFocus = (e) => {
    e.target.parentElement.classList.add('not-empty');
  };

  const handleBlur = (e) => {
    if (e.target.value === '') {
      e.target.parentElement.classList.remove('not-empty');
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setFormErrors({
        ...formErrors,
        email: 'Please enter a valid email address.'
      });
    } else {
      setFormErrors({
        ...formErrors,
        email: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email is valid before submitting
    if (formErrors.email || !formValues.email) {
      validateEmail(formValues.email);
      return; // Stop submission if email is invalid
    }

    const dataToSave = {
      ...formValues,
      date: startDate
    };
    localStorage.setItem('contactFormData', JSON.stringify(dataToSave));
    alert('Form data saved!');
  };

  return (
    <div>
      <div className="col-10 contactF mt-2">
        <form className="mt-4 mt-md-0" onSubmit={handleSubmit}>
          <div className="form-group mb-0">
            <label htmlFor="name" className='ms-2'>Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control contactB"
              value={formValues.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div className="form-group mb-0">
            <label htmlFor="email" className='ms-2'>E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control contactB"
              value={formValues.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {formErrors.email && <div className="error-text">{formErrors.email}</div>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="phone" className='ms-2'>Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="text"
              className="form-control contactB"
              value={formValues.phone}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div className="form-group">
            <DatePicker
              className='form-control'
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn button" style={{ marginTop: '5px' }}>
              <span>Book Now</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ContactUs;
