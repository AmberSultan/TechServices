import React, { useEffect, useState } from 'react';
import './BuyNow.css';
import { useParams, Link } from 'react-router-dom';

function BuyNow() {
  const { ids } = useParams();
  const [services, setServices] = useState([]);
  const [serviceCounts, setServiceCounts] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedRecords = JSON.parse(localStorage.getItem('records')) || [];
        const selectedIds = ids.split(',').map(id => id.trim());
        const selectedServices = storedRecords.filter(service => selectedIds.includes(service.id.toString()));

        if (selectedServices.length > 0) {
          setServices(selectedServices);
          const initialCounts = selectedServices.reduce((acc, service) => {
            acc[service.id] = 1; // Set default quantity for each service
            return acc;
          }, {});
          setServiceCounts(initialCounts);
        } else {
          setError('No services found');
        }
      } catch (error) {
        setError('Failed to load services');
      }
    };

    fetchData();
  }, [ids]);

  const handleIncrement = (id) => {
    setServiceCounts(prevCounts => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 1) + 1
    }));
  };

  const handleDecrement = (id) => {
    setServiceCounts(prevCounts => ({
      ...prevCounts,
      [id]: Math.max((prevCounts[id] || 1) - 1, 1)
    }));
  };

  const handleCheckout = () => {
    if (services.length > 0) {
      const userData = JSON.parse(localStorage.getItem('userData')) || {};
      const checkoutData = services.map(service => ({
        serviceId: service.id,
        name: service.name,
        description: service.description,
        totalPrice: (service.price * serviceCounts[service.id]).toFixed(2),
        grandTotal: ((service.price * serviceCounts[service.id]) * 1.02).toFixed(2), // Including tax
        count: serviceCounts[service.id],
        imageUrl: service.file,
        user: {
          firstName: userData.firstName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || ''
        }
      }));

      try {
        localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
        console.log('Checkout and Orders:', checkoutData);
      } catch (error) {
        console.error('Error saving checkout data:', error);
      }
    }
  };

  // Calculate individual service prices and taxes
  const totalPrices = services.map(service => service.price * serviceCounts[service.id]);
  const taxes = totalPrices.map(price => (price * 0.02).toFixed(2));
  
  // Calculate total tax and grand total
  const totalTax = taxes.reduce((acc, tax) => acc + parseFloat(tax), 0).toFixed(2);
  const grandTotal = (totalPrices.reduce((acc, price) => acc + price, 0) + parseFloat(totalTax)).toFixed(2);

  return (
    <div className='container'>
      <h3 className='text-center fw-bolder mt-5 mb-5'>Your Cart</h3>
      {error && <p>{error}</p>}
      <div className="container">
        {services.length > 0 ? (
          <div className="row">
            {services.map(service => {
              const serviceTotalPrice = (service.price * serviceCounts[service.id]).toFixed(2);
              const serviceTax = (serviceTotalPrice * 0.02).toFixed(2);

              return (
                <div className="col-sm-12 me-1 shadow-sm mb-4 clear" key={service.id}>
                  <div className="card ">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-4 buyImg">
                          {service.file && <img src={service.file} className="card-img-top" alt={service.name} />}
                        </div>
                        <div className="col-sm-4 mt-4">
                          <h6><b>{service.name}</b></h6>
                          <p>{service.description}</p>
                        </div>
                        <div className="col-sm-4">
                          <div className="count mt-4">
                            <button className='incdec' onClick={() => handleDecrement(service.id)}>-</button>
                            <p className='number'>{serviceCounts[service.id]}</p>
                            <button className='incdec' onClick={() => handleIncrement(service.id)}>+</button>
                          </div>
                          <p className='text-center newTax mt-2'><b>Tax: ${serviceTax}</b></p>
                          <p className='text-center newTax'><b>Price: ${serviceTotalPrice}</b></p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* <div className="col-sm-12 shadow-sm clear">
              <p><b>Total Tax: ${totalTax}</b></p>
              <p><b>Total Price: ${totalPrices.reduce((acc, price) => acc + price, 0).toFixed(2)}</b></p>
              <p><b>Grand Total: ${grandTotal}</b></p>
            </div> */}
          </div>
        ) : (
          <p>No services selected</p>
        )}
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            {/* Additional content if needed */}
          </div>
          <div className="col-md-12 mb-4 summary">
            <div className="card mt-3">
              <div className="card-body  shadow">
                <p className='text-center mb-3 fw-bold'>Thank you for your order!</p>
                <span className='lastE'>
                <p><b >Total Tax: ${totalTax}</b></p>
                <p><b>Total Price: ${totalPrices.reduce((acc, price) => acc + price, 0).toFixed(2)}</b></p>
                </span>
              

              <hr className='line' />
              <div className="row">
              <div className="col-6">
              <p className='mt-2'><b>Grand Total: ${grandTotal}</b></p>
              </div>
              <div className="col-6 d-flex justify-content-end">
              <Link to={`/checkout`} className={`btn buy checkCart ${services.length === 0 ? 'disabled' : ''}`} onClick={handleCheckout} disabled={services.length === 0}>
                  Check Out
                </Link>
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

export default BuyNow;
