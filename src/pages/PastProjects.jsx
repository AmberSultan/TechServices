import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './PastProject.css';

function PastProjects() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [pastProjects, setPastProjects] = useState([]);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectYear, setProjectYear] = useState('');
  const [edit, setEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Retrieve services from local storage
  useEffect(() => {
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
  }, []);

  // Update past projects when selected service changes
  useEffect(() => {
    if (selectedService) {
      const selectedServiceData = services.find(service => service.name === selectedService);
      setPastProjects(selectedServiceData ? selectedServiceData.pastProjects : []);
    }
  }, [selectedService, services]);

  // Function to handle past project submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const pastProjectsList = Array.isArray(pastProjects) ? pastProjects : [];
    const newId = edit !== null 
      ? edit 
      : (pastProjectsList.length > 0 
        ? Math.max(...pastProjectsList.map(project => project.id)) + 1 
        : 1
      );

    const updatedProject = {
      id: newId,
      title: projectTitle,
      description: projectDescription,
      year: projectYear,
    };

    const updatedPastProjects = edit !== null 
      ? pastProjectsList.map(project => project.id === edit ? updatedProject : project) 
      : [...pastProjectsList, updatedProject];

    updateServicePastProjects(updatedPastProjects);

    setProjectTitle('');
    setProjectDescription('');
    setProjectYear('');
    setEdit(null);
    setShowForm(false);
  };


  const updateServicePastProjects = (updatedPastProjects) => {
    const updatedServices = services.map(service => 
      service.name === selectedService 
        ? { ...service, pastProjects: updatedPastProjects } 
        : service
    );
    setServices(updatedServices);
    setPastProjects(updatedPastProjects);
    localStorage.setItem('services', JSON.stringify(updatedServices));
  };


  const handlePastProjectTitleChange = (e) => {
    setProjectTitle(e.target.value);
  };

  const handlePastProjectDescriptionChange = (e) => {
    setProjectDescription(e.target.value);
  };

  const handlePastProjectYearChange = (e) => {
    setProjectYear(e.target.value);
  };

  const isProjectSaveDisabled = !projectTitle || !projectDescription || !projectYear;

  const pastProjectColumns = [
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true
    },
    {
      name: 'Description',
      selector: row => row.description,
      sortable: true
    },
    {
      name: 'Year',
      selector: row => row.year,
      sortable: true
    },
    {
      name: 'Actions',
      selector: row => (
        <>
          <button className="btn" onClick={() => handleEdit(row)}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button className="btn ms-2" onClick={() => handleDelete(row.id)}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  const handleEdit = (row) => {
    setProjectTitle(row.title);
    setProjectDescription(row.description);
    setProjectYear(row.year);
    setEdit(row.id);
    setShowForm(true); 
  };

  const handleDelete = (id) => {
    const updatedPastProjects = pastProjects.filter(project => project.id !== id);
    updateServicePastProjects(updatedPastProjects);
  };

  return (
    <div>
      <h2 className='ms-3'>Past Projects</h2>
      <div className="container">
    

        <div className="mt-4">
  <div className="d-flex justify-content-end">
    <button
      className="btn btn-dark text-end me-5 mb-3"
      type="button"
      onClick={() => setShowForm(!showForm)}
    >
      {showForm ? 'Add Past Project' : 'Add Past Project'}
    </button>
  </div>

  {showForm && (
    <div className="collapse show" id="collapseExample">
      <form className="form" onSubmit={handleSubmit}>

      <div className="mb-3">
          <label htmlFor="selectedService" className="form-label">Select Service</label>
          <input
            type="text"
            className="form-control"
            id="selectedService"
            value={selectedService}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            readOnly
          />
          {dropdownOpen && (
            <ul className="dropdown-menu show w-100" aria-labelledby="dropdownMenuButton">
              {services.length > 0 ? (
                services.map((service, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setSelectedService(service.name);
                        setDropdownOpen(false);
                      }}
                    >
                      {service.name}
                    </button>
                  </li>
                ))
              ) : (
                <li>
                  <span className="dropdown-item">No services available</span>
                </li>
              )}
            </ul>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="projectTitle" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="projectTitle"
            value={projectTitle}
            onChange={handlePastProjectTitleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="projectDescription" className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            id="projectDescription"
            value={projectDescription}
            onChange={handlePastProjectDescriptionChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="projectYear" className="form-label">Year</label>
          <input
            type="text"
            className="form-control"
            id="projectYear"
            value={projectYear}
            onChange={handlePastProjectYearChange}
          />
        </div>

        

        <button type="submit" className="btn btn-dark" disabled={isProjectSaveDisabled}>
          {edit !== null ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  )}
</div>




      </div>

      <div className="container mt-4">
        <DataTable
          columns={pastProjectColumns}
          data={pastProjects}
          pagination
        />
      </div>
    </div>
  );
}

export default PastProjects;
