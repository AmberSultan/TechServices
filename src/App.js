import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import Services from './pages/Services';
import AllUsers from './pages/AllUsers';
import AddUser from './pages/AddUser';
import Home from './pages/Home';
import BuyNow from './pages/BuyNow';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AdminSignup from './pages/admin/AdminSignup';
import AdminLogin from './pages/admin/AdminLogin';
import Portfolio from './pages/Portfolio';
import SubServices from './pages/SubServices';
import Testimonials from './pages/Testimonials';
import PastProjects from './pages/PastProjects';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path='/portfolio' element={<Portfolio/>}/> */}
        <Route path="/portfolio/:id" element={<Portfolio />} />
        <Route path="/buynow/:ids" element={<BuyNow />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Layout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="services" element={<Services />} />
          <Route path="subservices" element={<SubServices />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="past-projects" element={<PastProjects/>} />
          <Route path="orders" element={<Orders />} />
          <Route path="allusers" element={<AllUsers />} />
          <Route path="add-user" element={<AddUser />} />
        </Route>
  
      </Routes>
    </Router>
  );
};

export default App;
