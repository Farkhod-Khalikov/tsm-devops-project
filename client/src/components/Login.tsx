import { useState } from "react";
import SignUpForm from "./SignUpForm";
import "../styles/Login.css";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="login-container">
      {isRegistering ? (
        <SignUpForm onSwitchToLogin={toggleForm} />
      ) : (
        <div className="login-form">
          <h2>Sign In</h2>
          <form>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="form-button">
              Sign In
            </button>
          </form>
          <button className="toggle-form" onClick={toggleForm}>
            Don't have an account? Register
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
