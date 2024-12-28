import { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

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
          <SignInForm />
          <button className="link-button" onClick={toggleForm}>
            Don't have an account? Register
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
