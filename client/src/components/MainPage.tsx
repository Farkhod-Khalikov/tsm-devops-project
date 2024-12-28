import React, { useEffect, useState } from 'react';

const MainPage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetch('http://localhost:5000/api/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {userData.username}</h1>
      <p>Your user ID: {userData.id}</p>
    </div>
  );
};

export default MainPage;
