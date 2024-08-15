import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';

function Profile() {
  const [selectedImage, setSelectedImage] = useState('https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [adminPh, setAdminPh] = useState('');
  const [adminAddress, setAdminAddress] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  const containerRef = useRef(null);

  const handleClick = () => {
    if (containerRef.current) {
      containerRef.current.click();
    }
  };

  const handleImage = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        localStorage.setItem('profileImage', reader.result);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('adminData'));

    if (savedData && savedData.length > 0) {
      const admin = savedData[0]; // Assuming there's only one admin object in the array

      setSelectedImage(localStorage.getItem('profileImage') || 'https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg');
      setAdminName(admin.adminName || '');
      setAdminEmail(admin.email || '');
      setAdminPh(admin.phone || '');
      setAdminAddress(admin.address || '');
      setSkills(admin.skills || []); // Load skills if available
    }

    setAboutText(localStorage.getItem('aboutText') || '');
  }, []);

  const handleAboutChange = (event) => {
    const newAboutText = event.target.value;
    setAboutText(newAboutText);
    localStorage.setItem('aboutText', newAboutText);
  };

  const handleSkillChange = (event) => {
    setNewSkill(event.target.value);
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setNewSkill('');
      localStorage.setItem('adminData', JSON.stringify([{ ...JSON.parse(localStorage.getItem('adminData'))[0], skills: updatedSkills }]));
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    const updatedSkills = skills.filter(skill => skill !== skillToDelete);
    setSkills(updatedSkills);
    localStorage.setItem('adminData', JSON.stringify([{ ...JSON.parse(localStorage.getItem('adminData'))[0], skills: updatedSkills }]));
  };

  return (
    <div>
      <h3 className='text-center mt-5 mb-5'>Your Profile</h3>
      <div className="container">
        <div className="row gutters">
          <div className=" col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body shadow">
                <div className="account-settings">
                  <div className="user-profile mt-5">
                    <div className="user-avatar">
                      {/* <img src={selectedImage} alt="Profile" /> */}
                    </div>
                    <h5 className="user-name">{adminName}</h5>
                    <h6 className="user-email">{adminEmail}</h6>

                    <div className="col mt-3">
                      <label className="custom-file-upload">
                        <input className='fileType d-none' type="file" ref={containerRef} onChange={handleImage} />
                        <button type="button" className="btn uploadBtn cnfrm" onClick={handleClick}>
                          <i className="fa fa-file-o" aria-hidden="true"></i>
                          <span className='ms-2 upload'>Upload File</span>
                        </button>
                      </label>
                    </div>
                  </div>

                  {/* <div className="about">
                    <h5 className='aboutH'>About</h5>
                    <textarea
                      className="form-control about mt-1"
                      rows="4"
                      value={aboutText}
                      onChange={handleAboutChange}
                      placeholder="Tell us about yourself"
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body shadow">
                <div className="row gutters">
                <div className="about">
                    <h5 className='aboutH'>About</h5>
                    <textarea
                      className="form-control about mt-1"
                      rows="4"
                      value={aboutText}
                      onChange={handleAboutChange}
                      placeholder="Tell us about yourself"
                    />
                  </div>
                  <div className="col-xl-12 mt-4 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2">Personal Details</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      {/* <label htmlFor="phone">Phone</label> */}
                      <input type="text" className="form-control" id="phone" placeholder='Enter phone number' value={adminPh} readOnly />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      {/* <label htmlFor="address">Address</label> */}
                      <input type="text" className="form-control" id="address" value={adminAddress} readOnly />
                    </div>
                  </div>

                  <div className="col-xl-12 mt-4 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2"> <span className='me-2'>Services</span> 
                    <i className="fa fa-pencil" aria-hidden="true" onClick={handleAddSkill}></i></h6>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add a service"
                        value={newSkill}
                        onChange={handleSkillChange}
                      />
                    </div>
                    <div className="skills-container mt-3 d-flex">
                    
                      {skills.map((skill, index) => (
                        <div key={index} className="skill-item me-3 "  style={{border:'1px solid #B6FF00', borderRadius:"20px", fontSize:'15px'}}>
                          <span className='ms-3'>{skill}</span>
                          <button 
                            type="button" 
                            className="btn" 
                            onClick={() => handleDeleteSkill(skill)}
                          >
                            <i className="fa fa-close close" aria-hidden="true" style={{color:'#B6FF00'}}></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

