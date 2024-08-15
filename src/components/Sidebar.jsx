import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
import './Sidebar.css';

const Sidebar = () => {
  const [expand, setExpanded] = useState(true);

  const sidebarVariants = {
    true: { left: '0' },
    false: { left: '-60%' },
  };

  return (
    <>
      <div
        className="bars"
        style={{ left: '5%' }}
        onClick={() => setExpanded(!expand)}
      >
        <i className="fa fa-solid fa-bars"></i>
      </div>
      <motion.div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar no-border-card"
        variants={sidebarVariants}
        animate={window.innerWidth <= 450 ? expand : ''}
      >
        <Link
          to="/admin"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <span className="ms-4">
            <span className="dashboard">Admin Dashboard</span>
          </span>
        </Link>
        <hr />
        <Accordion defaultActiveKey="0">
          <AccordionItem eventKey="0">
            <AccordionHeader>
              <i className="fa fa-user text-black" aria-hidden="true"></i>
              <span className="ms-2 text-black">Users</span>
              <i className="fa fa-chevron-down ms-4"></i>
            </AccordionHeader>
            <AccordionBody>
              <Link
                to="/admin/dashboard/allusers"
                className="dropdown-item"
                onClick={() => setExpanded(!expand)}
              >
                All Users
              </Link>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem eventKey="1">
            <AccordionHeader>
              <i className="fa fa-file text-black" aria-hidden="true"></i>
              <span className="ms-2 text-black">Profile</span>
              <i className="fa fa-chevron-down ms-3"></i> {/* Adjust icon size with CSS */}
            </AccordionHeader>
            <AccordionBody>
              <Link
                to="/admin/dashboard/profile"
                className="dropdown-item"
                onClick={() => setExpanded(!expand)}
              >
                Profile
              </Link>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem eventKey="2">
            <AccordionHeader>
              <i className="fa fa-bookmark text-black"></i>
              <span className="ms-2 text-black">Orders</span>
              <i className="fa fa-chevron-down ms-3 text-black"></i> {/* Adjust icon size with CSS */}
            </AccordionHeader>
            <AccordionBody>
              <Link
                to="/admin/dashboard/orders"
                className="dropdown-item"
                onClick={() => setExpanded(!expand)}
              >
                Orders
              </Link>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem eventKey="3">
            <AccordionHeader>
              <i className="fa fa-briefcase text-black" aria-hidden="true"></i>
              <span className="ms-2 text-black">Services</span>
              <i className="fa fa-chevron-down ms-1"></i> {/* Adjust icon size with CSS */}
            </AccordionHeader>
            <AccordionBody>
              <Link
                to="/admin/dashboard/services"
                className="dropdown-item"
                onClick={() => setExpanded(!expand)}
              >
                Add Service
              </Link>
              <Link
                to="/admin/dashboard/subservices"
                className="dropdown-item"
                onClick={() => setExpanded(!expand)}
              >
                Sub Service
              </Link>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem eventKey="4">
            <AccordionHeader>
              <i className="me-1 fas fa-project-diagram text-black"></i>
              <span className="ms-1 text-black">Projects</span>
              <i className="fa fa-chevron-down ms-0"></i> {/* Adjust icon size with CSS */}
            </AccordionHeader>
            <AccordionBody>
              <Link
                to="/admin/dashboard/past-projects"
                className="dropdown-item"
                onClick={() => setExpanded(!expand)}
              >
                Past Projects
              </Link>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </>
  );
};

export default Sidebar;
