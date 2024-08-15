import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

function SubServices() {
  const [services, setServices] = useState([]); 
  const [selectedService, setSelectedService] = useState('');
  const [subServices, setSubServices] = useState([]);
  const [subserviceName, setSubserviceName] = useState('');
  const [subserviceDescription, setSubserviceDescription] = useState('');
  const [subservicePrice, setSubservicePrice] = useState('');
  const [editId, setEditId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
  }, []);

  useEffect(() => {
    if (selectedService) {
      const service = services.find(service => service.name === selectedService);
      setSubServices(service ? service.subServices : []);
    } else {
      setSubServices([]);
    }
  }, [selectedService, services]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSubService = {
      id: editId !== null ? editId : Date.now(), 
      name: subserviceName,
      description: subserviceDescription,
      price: subservicePrice,
    };

    const updatedSubServices = editId !== null
      ? subServices.map(subService => subService.id === editId ? newSubService : subService)
      : [...subServices, newSubService];

    const updatedServices = services.map(service => 
      service.name === selectedService 
        ? { ...service, subServices: updatedSubServices }
        : service
    );

    setServices(updatedServices);
    setSubServices(updatedSubServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));

    setSubserviceName('');
    setSubserviceDescription('');
    setSubservicePrice('');
    setEditId(null);
    setIsFormVisible(false);
  };

  const handleEdit = (subService) => {
    setSubserviceName(subService.name);
    setSubserviceDescription(subService.description);
    setSubservicePrice(subService.price);
    setEditId(subService.id);
    setIsFormVisible(true); 
  };

  const handleDelete = (id) => {
    const updatedSubServices = subServices.filter(subService => subService.id !== id);

    const updatedServices = services.map(service => 
      service.name === selectedService 
        ? { ...service, subServices: updatedSubServices }
        : service
    );

    setServices(updatedServices);
    setSubServices(updatedSubServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
  };

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => row.price,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <button className="btn btn-sm" onClick={() => handleEdit(row)}><i className="fa fa-pencil" aria-hidden="true"></i></button>
          <button className="btn btn-sm ms-2" onClick={() => handleDelete(row.id)}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </>
      ),
    },
  ];

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const isSubServiceSaveDisabled = !subserviceName || !subserviceDescription || !subservicePrice;

  return (
    <div>
      <h2 className='ms-3'>Sub Services</h2>

      <div className="container">
        <div className="col mt-4">
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-dark text-end mb-3 me-5"
              type="button"
              onClick={toggleFormVisibility}
            >
              {isFormVisible ? 'Add Sub Service' : 'Add Sub Service'}
            </button>
          </div>

          {isFormVisible && (
            <div className="collapse show">
              <form className='form' onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="selectedService" className="form-label">Select Service</label>
                  <div className="dropdown">
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
                </div>

                <div className="mb-3">
                  <label htmlFor="subserviceName" className="form-label">Subservice Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="subserviceName" 
                    value={subserviceName} 
                    onChange={(e) => setSubserviceName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subserviceDescription" className="form-label">Description</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="subserviceDescription" 
                    value={subserviceDescription} 
                    onChange={(e) => setSubserviceDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subservicePrice" className="form-label">Price</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="subservicePrice" 
                    value={subservicePrice} 
                    onChange={(e) => setSubservicePrice(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-dark" disabled={isSubServiceSaveDisabled}>
                  {editId !== null ? 'Update' : 'Add'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="container mt-4">
        <DataTable
          columns={columns}
          data={subServices}
          pagination
        />
      </div>
    </div>
  );
}

export default SubServices;
