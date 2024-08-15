import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './Checkout.css';
import Select from "react-select";

function Checkout() {
  const [services, setServices] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [emailError, setEmailError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Fetch services data
    const checkoutData = JSON.parse(localStorage.getItem('checkoutData')) || [];
    setServices(checkoutData);
  }, []);

  useEffect(() => {
    // Fetch country data
    fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
      });
  }, []);

  useEffect(() => {
    // Load user data from loggedInUser
    const userData = JSON.parse(localStorage.getItem('loggedInUser')) || {};
    if (userData) {
      setName(userData.firstName || '');
      setEmail(userData.email || '');
      setPhone(userData.phone || '');
      setAddress(userData.address || '');
      const country = countries.find(c => c.code === userData.countryCode); // Assuming you store country code
      setSelectedCountry(country || null);
    }
  }, [countries]); // Ensure countries are loaded before using

  const initializeLocalStorage = () => {
    if (!localStorage.getItem('usersData')) {
      localStorage.setItem('usersData', JSON.stringify([]));
    }
  };

  const generateRandomPassword = () => {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const calculateGrandTotal = () => {
    return services.reduce((total, service) => {
      const serviceTotal = Number(service.grandTotal) || 0;
      return total + serviceTotal;
    }, 0).toFixed(2);
  };

  const handleConfirm = () => {
    initializeLocalStorage();

    const city = selectedCountry ? selectedCountry.label : '';

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');

    // Load existing user data
    const existingUsers = JSON.parse(localStorage.getItem('usersData')) || [];
    const userIndex = existingUsers.findIndex(user => user.email === email);
    let passwordToUse = '';

    if (userIndex > -1) {
      // Update existing user data
      const existingUser = existingUsers[userIndex];
      passwordToUse = existingUser.password; // Retain existing password
      existingUsers[userIndex] = {
        ...existingUser,
        firstName: name,
        phone,
        address,
        countryCode: selectedCountry ? selectedCountry.code : ''
      };
    } else {
      // Add new user
      passwordToUse = generateRandomPassword();
      existingUsers.push({
        firstName: name,
        email,
        phone,
        address,
        countryCode: selectedCountry ? selectedCountry.code : '',
        password: passwordToUse // Generate a new password for the new user
      });
    }

    localStorage.setItem('usersData', JSON.stringify(existingUsers));

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    services.forEach(service => {
      const orderData = {
        serviceName: service.name,
        serviceDescription: service.description,
        serviceCount: service.count,
        serviceGrandTotal: service.grandTotal,
        serviceImageUrl: service.imageUrl,
        paymentMethod,
        additionalInfo,
        customerName: name,
        customerEmail: email,
        customerPassword: passwordToUse,
        customerPhone: phone,
        customerAddress: address,
        customerCity: city,
      };
      orders.unshift(orderData);
    });
    localStorage.setItem('orders', JSON.stringify(orders));

    const emailPromises = services.map(service => {
      const templateParams = {
        from_name: name,
        to_name: 'Services',
        to_email: email,
        serviceName: service.name,
        description: service.description,
        grandTotal: service.grandTotal,
        count: service.count,
        paymentOption: paymentMethod,
        additionalInfo,
        password: passwordToUse
      };

      return emailjs.send('service_1btra68', 'template_ae2dx9s', templateParams, 'xK81ouvVmz6d5x6vp');
    });

    Promise.all(emailPromises)
      .then(responses => {
        console.log('Emails sent successfully!', responses);
        setModalVisible(true);
      })
      .catch(error => {
        console.error('Error sending emails:', error);
        alert('Failed to send confirmation email. Please try again later.');
      });
  };

  return (
    <div>
      <h3 className='text-center mt-5 mb-5'>CheckOut</h3>
      <div className="container">
        <div className="row">
          <div className="col-sm-7 me-1 shadow-sm">
            <form className='checkoutForm'>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder='Full name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className="text-danger">{emailError}</p>}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder='Phone Number'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <div className="input-group mb-3">
                  <Select
                    options={countries}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    placeholder="Select Country"
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder='Full Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-sm-4 sideImg shadow-sm ">
            <div className="card mb-3" style={{ maxWidth: 540 }}>
              {services.map(service => (
                <div className="row g-0" key={service.serviceId}>
                  <div className="col-md-8 ">
                    <div className="card-body detailDes">
                      <h6><b>{service.name}</b></h6>
                      <p className='servicep'>{service.description}</p>
                      <p className='smallS s1'>Services: {service.count}</p>
                      <p className='smallS s2'>Price: $ {service.grandTotal}</p>
                      <h6 className='mt-4 grand'>Grand Total: ${calculateGrandTotal()}</h6>
                    </div>
                  </div>
                  <div className="col-md-4 checkImg">
                    <img src={service.imageUrl} className="card-img-top detailImg" alt={service.name} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row newH mb-3">
          <div className="col-7 me-1">
            <div className='mt-5'>
              {/* {['Cash on Delivery', 'Bank Payment'].map(method => (
                <div className="form-check" key={method}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id={method}
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor={method}>
                    {method}
                  </label>
                </div>
              ))} */}

              {['Cash on Delivery', 'Bank Payment'].map(method => (
        <div className="form-check" key={method}>
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            id={method}
            value={method}
            checked={paymentMethod === method}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label" htmlFor={method}>
            {method}
          </label>
        </div>
      ))}

      {paymentMethod === 'Bank Payment' && (
        <div className="bank-options ms-5">
          <div className="form-group mb-3 mt-3">
            {/* <label htmlFor="branchCode">Branch Code</label> */}
            <input
              type="text"
              className="form-control"
              id="branchCode"
              placeholder="Enter Branch Code"
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="accountNumber">Account Number</label> */}
            <input
              type="text"
              className="form-control"
              id="accountNumber"
              placeholder="Enter Account Number"
            />
          </div>
          {/* Add more bank-related fields as needed */}
        </div>
      )}


              <div className="form-floating mt-3">
                <textarea
                  className="form-control"
                  placeholder="Additional Information"
                  id="floatingTextarea2"
                  style={{ height: '100px' }}
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
                <label className='floatingTextarea2' htmlFor="floatingTextarea2">Additional Information</label>
              </div>
            </div>
            {/* <button type="button" className="btn btn-primary" onClick={handleConfirm}>Confirm</button> */}
           
          </div>
          <div className="col-4 done">
          <button className='btn cnfrm ok' onClick={handleConfirm}>Confirm Order</button>
          </div>
        </div>
      </div>
      {modalVisible && (
        <>
          <div className="overlay"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Order Confirmation</h5>
                  <button type="button" className="btn-close" onClick={() => setModalVisible(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Your order has been placed successfully!</p>
                  <p>A confirmation email has been sent to {email}.</p>
                </div>
                <div className="modal-footer">
                <Link to="/" className="btn cnfrm">Close</Link>
             </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
