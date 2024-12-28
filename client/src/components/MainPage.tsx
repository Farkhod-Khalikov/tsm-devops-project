// MainPage.tsx
import React from 'react';

const MainPage: React.FC = () => {
  const message = { message: 'Welcome to the Main Page!' };

  return (
    <div className="main-page">
      <h1>Main Page</h1>
      <pre>{JSON.stringify(message, null, 2)}</pre>
    </div>
  );
};

export default MainPage;
