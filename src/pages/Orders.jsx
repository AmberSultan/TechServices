import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import './Order.css';

function Orders() {
  const [orderData, setOrderData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      name: 'Service Name',
      selector: row => row.serviceName,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.serviceDescription,
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => row.serviceGrandTotal,
      sortable: true,
    },
    {
      name: 'Full Name',
      selector: row => row.customerName,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.customerEmail,
      sortable: true,
    },
    {
      name: 'Phone Number',
      selector: row => row.customerPhone,
      sortable: true,
    },
    {
      name: 'City',
      selector: row => row.customerCity,
      sortable: true,
    },
    {
      name: 'Address',
      selector: row => row.customerAddress,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row, index) => (
        <button className="btn" onClick={() => handleDelete(index)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      ),
    }
  ];

  useEffect(() => {
    const storedOrderData = JSON.parse(localStorage.getItem('orders')) || [];
    console.log('Fetched orders:', storedOrderData);
    setOrderData(storedOrderData);
  }, []);

  const handleDelete = (index) => {
    const updatedOrderData = orderData.filter((_, i) => i !== index);
    setOrderData(updatedOrderData);
    localStorage.setItem('orders', JSON.stringify(updatedOrderData));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrderData = orderData.filter(order =>
    order.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3 className='text-center mt-5 mb-5'>Your Orders</h3>

      <div className='container mt-5'>
        <div className="text-end">
          <input
            type="text"
            placeholder='Search'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <DataTable
          columns={columns}
          data={filteredOrderData}
          fixedHeader
          pagination
          highlightOnHover
        />
      </div>
    </div>
  );
}

export default Orders;
