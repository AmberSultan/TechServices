import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Portfolio.css';
import Testimonials from './Testimonials';

function Portfolio() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [activeTab, setActiveTab] = useState('Sub Services');
  const [subServices, setSubServices] = useState([]);
  const [pastProjects, setPastProjects] = useState([]);

  // Function to handle tab changes
  const handleTabClick = (tab, e) => {
    e.preventDefault(); // Prevent default anchor behavior
    setActiveTab(tab);
  };

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('services')) || [];
    const selectedService = localData.find(item => item.id === parseInt(id));

    if (selectedService) {
      setService(selectedService);
      setSubServices(selectedService.subServices || []);
      setPastProjects(selectedService.pastProjects || []);
    }
  }, [id]);

  return (
    <div>
      <div className="one">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-7 topNew" style={{ marginTop: '70px' }}>
              <h4 className='heading'>{service ? service.name : 'Service Name'}</h4>
              <p className='paragraph'>Your success is our priority</p>
              <p className='mt-3 detailNew'>{service ? service.description : 'Service details'}</p>
              
              <button className='bookPort'>Book Now</button>
            </div>
            <div className="col-md-5 mt-5 appImg">
              {service && service.file && <img className='rightImg' src={service.file} alt={service.name} />}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="two mt-5">
          <h3 className='find mb-5 text-center'>FIND OUT MORE</h3>
          <ul className="nav nav-pills portUl nav-fill">
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'Sub Services' ? 'custom-active' : ''}`}
                href="/"
                onClick={(e) => handleTabClick('Sub Services', e)}
                style={{ color: "black" }}
              >
                Sub Services
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'Past Projects' ? 'custom-active' : ''}`}
                href="/"
                onClick={(e) => handleTabClick('Past Projects', e)}
                style={{ color: "black" }}
              >
                Past Projects
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'Client Testimonials' ? 'custom-active' : ''}`}
                href="/"
                onClick={(e) => handleTabClick('Client Testimonials', e)}
                style={{ color: "black" }}
              >
                Client Testimonials
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'Any Query' ? 'custom-active' : ''}`}
                href="/"
                onClick={(e) => handleTabClick('Any Query', e)}
                style={{ color: "black" }}
              >
                Any Query
              </a>
            </li>
          </ul>
        </div>

        <div className="tab-content mt-5">
          {activeTab === 'Sub Services' && (
            <div className="tab-pane active">
              <h4 className='text-start mt-4'>Checkout our Sub Services</h4>
              <div className="row mt-5">
                {subServices.length > 0 ? (
                  subServices.map(subService => (
                    <div className="col-md-4 mb-3" key={subService.id}>
                      <div className="card" style={{ width: '18rem' }}>
                        {subService.file && <img className="card-img-top" src={subService.file} alt={subService.name} />}
                        <div className="card-body rounded border">
                          <h5 className="card-title portH">{subService.name}</h5>
                          <h6 className="card-subtitle mb-3 mt-3 descPort text-body-secondary">{subService.description}</h6>
                          <p className="card-text pricePort">{subService.price}</p>
                          <a href="/" className="card-link linkPort">More Details</a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No subservices available.</p>
                )}
              </div>
            </div>
          )}
          {activeTab === 'Past Projects' && (
            <div className="tab-pane active">
              <h4 className='text-start mt-4'>Explore Our Past Projects</h4>
              <div className="row mt-5">
                {pastProjects.length > 0 ? (
                  pastProjects.map(project => (
                    <div className="col-md-4 mb-3" key={project.id}>
                      <div className="card" style={{ width: '18rem' }}>
                        {project.file && <img className="card-img-top" src={project.file} alt={project.name} />}
                        <div className="card-body rounded border">
                          <h5 className="card-title portH">{project.title}</h5>
                          <h6 className="card-subtitle mb-3 mt-3 descPort text-body-secondary">{project.description}</h6>
                          <p className="card-text pricePort mb-4">{project.date}</p> {/* Adjust as needed */}
                          <a href="/" className="card-link linkPort">More Details</a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No past projects available.</p>
                )}
              </div>
            </div>
          )}
          {activeTab === 'Client Testimonials' && (
            <div className="tab-pane active">
              <h4>Client Testimonials Content</h4>
              <Testimonials/>
            </div>
          )}
          {activeTab === 'Any Query' && (
            <div className="tab-pane active">
              <h4 className='mb-5'>If Any Query! Content here</h4>
              <div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Enter email</label>
                  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter your Query</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                </div>
                <button className='bookPort'>Send</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
