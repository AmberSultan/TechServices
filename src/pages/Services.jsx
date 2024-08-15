import React, { useState, useEffect, useRef } from 'react';
import './Services.css';
import DataTable from 'react-data-table-component';

function Services() {
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Description',
      selector: row => row.description,
      sortable: true
    },
    {
      name: 'Price',
      selector: row => row.price,
      sortable: true
    },
    {
      name: 'File',
      selector: row => (
        row.file ? (
          <a href={row.file} target="_blank" rel="noopener noreferrer">
            <img src={row.file} alt='' width={60} />
          </a>
        ) : (
          <span>No file</span>
        )
      ),
      sortable: true
    },
    {
      name: 'Actions',
      selector : row => (
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

  const [records, setRecords] = useState(JSON.parse(localStorage.getItem('records')) || []);
  const [filteredRecords, setFilteredRecords] = useState(records);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState('');
  const [edit, setEdit] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setFilteredRecords(records);
  }, [records]);

  const handleClick = () => {
    containerRef.current.click();
  };

  const handleImage = (e) => {

    // setFile(URL.createObjectURL(e.target.files[0]));

    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newId = edit !== null ? edit : (records.length > 0 ? Math.max(...records.map(record => record.id)) + 1 : 1);

    const updatedRecord = {
      id: newId,
      name,
      description,
      price,
      file 
    };

    const newRecords = edit !== null ? records.map(record => record.id === edit ? updatedRecord : record): [...records, updatedRecord];

    localStorage.setItem('records', JSON.stringify(newRecords));
    setRecords(newRecords);
    setFilteredRecords(newRecords);

    setName('');
    setDescription('');
    setPrice('');
    setFile('');
    setEdit(null);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = records.filter(row => row.name.toLowerCase().includes(searchTerm) || row.description.toLowerCase().includes(searchTerm) || row.price.includes(searchTerm));
    setFilteredRecords(filteredData);
  };

const handleDelete = (id) => {
    const updatedRecords = records.filter(record => record.id !== id);
    setRecords(updatedRecords);
    setFilteredRecords(updatedRecords);
    localStorage.setItem('records', JSON.stringify(updatedRecords));
  };
const handleEdit = (row) => {
    setName(row.name);
    setDescription(row.description);
    setPrice(row.price);
    setFile(row.file || '');
    setEdit(row.id);
  };

  const isSaveDisabled = !name || !description || !price;

  return (
    <div>
      <h2>Service</h2>
      <div className="text-end">
        <button className="btn btn-dark addService text-end" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Add New Service
        </button>
      </div>
      <div className="collapse" id="collapseExample">
        <form className='form' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={name} onChange={handleName} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" value={description} onChange={handleDescription} />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="text" className="form-control" id="price" value={price} onChange={handlePrice} />
          </div>

          <div className="row align-items-center">
            <div className="col-2">
              <label className="custom-file-upload">
                <input className='fileType d-none' type="file" ref={containerRef} onChange={handleImage} />
                <button type="button" className="btn btn-dark fileBtn" onClick={handleClick}>
                  <i className="fa fa-file-o" aria-hidden="true"></i>
                  <span className='ms-2'>Upload File</span>
                </button>
              </label>
            </div>

            <div className="col-2">
              <span className='chooseFile'>
                {file ? (
                  <div className="imgNew">
                    <img src={file} alt='Uploaded' width={60} />
                  </div>
                ) : 'Choose File'}
              </span>
            </div>

            <div className="col-8 text-end">
              <button type="submit" className="btn btn-dark save" disabled={isSaveDisabled}>Save</button>
            </div>
          </div>
        </form>
      </div>

      <div className='container mt-5'>
        <div className="text-end">
          <input type="text" placeholder='Search' onChange={handleFilter} />
        </div>
        <DataTable
          columns={columns}
          data={filteredRecords}
          fixedHeader
          pagination
          highlightOnHover
        />
      </div>
    </div>
  );
}

export default Services;