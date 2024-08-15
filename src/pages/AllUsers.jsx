import React, { useEffect, useState } from 'react';

function AllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('usersData')) || [];
    console.log('Stored Users:', storedUsers); // Check retrieved data

    const uniqueUsers = storedUsers.filter((user, index, self) =>
      index === self.findIndex((u) => (
        u.email === user.email
      ))
    );
    console.log('Unique Users:', uniqueUsers); // Check unique users

    setUsers(uniqueUsers);
  }, []);

  return (
    <div>
      <h3 className='text-center mt-5 mb-5'>All Users</h3>
      <div className="container">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.firstName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>{user.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AllUsers;
