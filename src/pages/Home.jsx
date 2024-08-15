import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactUs from './ContactUs';

import './Home.css';

function Home() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem('records')) || [];
    setServices(storedRecords);

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUserName(loggedInUser.firstName);
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); 
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
  };

  const handleSelectService = (serviceId) => {
    setSelectedServices(prevSelected => 
      prevSelected.includes(serviceId) 
      ? prevSelected.filter(id => id !== serviceId) 
      : [...prevSelected, serviceId]
    );
  };

  // const handleCheckout = () => {
  //   if (selectedServices.length > 0) {
  //     navigate(`/buynow/${selectedServices.join(',')}`);
  //   }
  // };

  const handleCheckout = () => {
    if (selectedServices.length > 0) {
      navigate(`/buynow/${selectedServices.join(',')}`);
    } else {
      // alert('No services selected.');
      toast('No services selected.');
    }
  };

  return (
    <>

<div className="alert alert-warning alert-dismissible topAlert fade show shadow-sm" role="alert">
  <div className="alert-content announcement">
    <p><strong>For a limited time, enjoy 20% discount on your first order!</strong></p>
  </div>
</div>



      <div className='container'>

        <nav className="navbar navbar-expand-lg navbar-light mb-2 sticky-top bg-white">
          <div className="container-fluid">
            <a className="navbar-brand" href='/'>
              <i className="fa fa-bandcamp" aria-hidden="true"></i>
              <span className='ms-3 hello'>Hello <span className='userName'>{userName}</span>!</span>
            </a>
            <button className="navbar-toggler removeB" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
            
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                      {/* <Link  className="btn me-2" onClick={handleCheckout} style={{ backgroundColor: '#B6FF00', border: '1px solid #B8FF62', fontWeight: '500'}} ><i class="fa fa-shopping-cart" aria-hidden="true"></i></Link> */}
                      <button className='btn cartBtn proceed me-4 position-relative' onClick={handleCheckout}><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                      {selectedServices.length > 0 && (
                      <span className="badge position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger">{selectedServices.length}</span>
                    )}
                    <ToastContainer />
                      </button>
                     
                    </li>
                    
              
                {isLoggedIn ? (
                  <li className="nav-item">
                    <button 
                      className="btn topBtn buy me-2" 
                      onClick={handleLogout}
                      style={{ backgroundColor: '#B6FF00', border: '1px solid #B6FF00', fontWeight: '500' }}
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to='/login' className="btn me-2" style={{ backgroundColor: '#B6FF00', border: '1px solid #B8FF62', fontWeight: '500'}} >Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/signup' className="btn " style={{ backgroundColor: '#B6FF00', border: '1px solid #B8FF62', fontWeight: '500', display:'none' }}>Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>


        <div className="container mt-1">
          <div className="row">
            <div className="col-md-7 topNew" style={{marginTop:'70px'}} >
              <h4 className='heading'>ELEVATE YOUR EXPERIENCE</h4>
              <p className='paragraph'>Your success is our priority</p>
              <p className='mt-3 detailNew'>We offer a wide range of Services designed to help your <br /> business thrive. Our team of experts is committed to <br /> delivering high-quality results tailored to your specific needs</p>
              {/* <button className="btn button"><span>Contact Us</span></button> */}
            </div>
            <div className="col-md-5 mt-4 shadow">
              {/* <img className='rightImg' src={`${process.env.PUBLIC_URL}/images/image.png`} alt="Description" /> */}
              <ContactUs/>
            </div>
          </div>
        </div>




          <marquee behavior="" direction="" scrollamount="5">
              <img width='100px' height='100px' src="/images/1.png" alt="" />
             <img  width='100px' src="/images/2.png" alt="" />
             <img  width='100px' src="/images/3.png" alt="" />
             <img  width='100px' src="/images/4.png" alt="" />
             <img  width='100px' src="/images/5.png" alt="" />

             <img width='100px' height='100px' src="/images/1.png" alt="" />
             <img  width='100px' src="/images/2.png" alt="" />
             <img  width='100px' src="/images/3.png" alt="" />
             <img  width='100px' src="/images/4.png" alt="" />
             <img  width='100px' src="/images/5.png" alt="" />
            </marquee>

        <div className='container'>
          <h3 className='text-center fw-bolder mt-4 mb-3'>Our Services</h3>

         
          {/* <button className='btn proceed mt-3' onClick={handleCheckout}>Proceed to Buy Now</button> */}

          <div className="row row-cols-1 mt-3 row-cols-md-3 g-4">
            {services.map(service => (
              <div className="col" key={service.id}>
                <div className="card serviceDetail shadow-sm">
                  <div className="card-body p-0">
                    {/* <div className="img serviceImg">
                      {service.file && <img src={service.file} className="card-img-top" alt={service.name} />}
                    </div> */}
                    <div className="img serviceImg">
               {service.file && (
             <Link to={`/portfolio/${service.id}`}> 
                <img src={service.file} className="card-img-top" alt={service.name} />
            </Link>
                )}
                </div>
                    <div className="detail">
                      <h6><b>{service.name}</b></h6>
                      <p>{service.description}</p>
                      <div className="col d-flex justify-content-between">
                        <p className='price mt-2'><b>${service.price}</b></p>
                        <button 
                          className={`btn ${selectedServices.includes(service.id) ? 'btnClr' : 'btn-dark'} buy text-end mb-1`}
                          onClick={() => handleSelectService(service.id)}
                        >
                          {selectedServices.includes(service.id) ? 'Remove' : 'Add'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
          {/* <button className='btn proceed mt-5' onClick={handleCheckout}>Proceed to Buy Now</button> */}
        </div>

        <div className="container happen mt-5">
          <div className="row">
            <div className="col-md-9">
              <h5 className='happedH'>Let's make things happen !!</h5>
              <p className='happenP'>Whether you’re starting a new project, looking to enhance existing processes, or seeking a fresh perspective, we’re here to guide you every step of the way. Together, we can overcome challenges, seize opportunities, and make impactful changes.</p>
            </div>
            <div className="col-md-3">
              <img className='happenImg' src={`${process.env.PUBLIC_URL}/images/image2.png`} alt="Description" />
            </div>
          </div>
        </div>
             
      </div>

      <footer className="bg-black text-white text-center text-lg-start mt-5">
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text mb-4">Company</h5>
              <p className='footerP'>Consulting Services can provide <br />valuable insights, strategic guidance</p>
              <ul className="list-unstyled">
                <li><a href="/" className="footerText"><i className="fa fa-phone footerFa" aria-hidden="true"></i><span className='ms-3'>+123 456 7890</span></a></li>
                <li><a href="/" className="footerText"><i className="fa fa-envelope-open footerFa" aria-hidden="true"></i><span className='ms-3'>info@example.com</span></a></li>
                <li><a href="/" className="footerText ms-1"><i className="fa fa-map-marker footerFa" aria-hidden="true"></i><span className='ms-3'>123 Main Street</span></a></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text mb-4">Services</h5>
              <ul className="list">
                <li><a href="/" className="footerText">Website Development</a></li>
                <li><a href="/" className="footerText">App Development</a></li>
                <li><a href="/" className="footerText">Figma to Web Flow</a></li>
                <li><a href="/" className="footerText">Search Engine Optimization</a></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text mb-4">Follow Us</h5>
              <ul className="list-unstyled">
                <li><a href="/" className="footerText"><i className="fa fa-facebook footerFa" aria-hidden="true"></i><span className='ms-3'>Facebook</span></a></li>
                <li><a href="/" className="footerText"><i className="fa fa-twitter footerFa" aria-hidden="true"></i><span className='ms-3'>Twitter</span></a></li>
                <li><a href="/" className="footerText"><i className="fa fa-linkedin footerFa" aria-hidden="true"></i><span className='ms-3'>LinkedIn</span></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      
      {/* <button className='btn btn-success fixed-bottom' onClick={handleCheckout}>Proceed to Checkout</button> */}
    </>
  );
}

export default Home;
