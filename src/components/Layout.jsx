import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css'

const Layout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="right flex-grow-1 p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
