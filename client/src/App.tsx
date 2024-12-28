// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import './styles/Login.css';
import Login from './components/Login'; // Import your Login component
import SignUpForm from './components/SignUpForm'; // Import your SignUpForm
import SignInForm from './components/SignInForm'; // Import your SignInForm
import MainPage from './components/MainPage'; // Import the MainPage component

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to switch to the login page after successful registration
  const handleSwitchToLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the SignInForm */}
          <Route
            path="/signin"
            element={<SignInForm />}
          />

          {/* Route for the SignUpForm with the onSwitchToLogin prop */}
          <Route
            path="/signup"
            element={<SignUpForm onSwitchToLogin={handleSwitchToLogin} />}
          />

          {/* Route for the Main Page after successful registration */}
          <Route path="/main" element={<MainPage />} />

          {/* Default Route (Login page as the default page) */}
          <Route
            path="/"
            element={<Login />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
