import React, { useState, useEffect } from 'react';
import Config from '../Config';
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';
import axios from 'axios'; // Ensure axios is imported

const Login = () => {
  const { setToken, getToken } = AuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // Error state for displaying login errors
  const navigate = useNavigate();

  useEffect(() => {    
    if (getToken()) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // Clear any previous error message

    await axios.get('/sanctum/csrf-cookie')
      .then(() => {
        Config.getLogin({ email, password })
          .then(({ data }) => {
            if (data.status === 'success') {
              setToken(
                data.user,
                data.token,
                data.user.roles[0].name
              );
            } else {
              // Update error message if login fails
              setErrorMsg(data.message || "Invalid credentials. Please try again.");
            }
          })
          .catch(error => {
            console.error("Login error:", error);
            setErrorMsg("An error occurred during login. Please try again.");
          });
      });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
      }}
      className="d-flex flex-column justify-content-center"
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-sm-8 col-md-6 col-lg-4">
            <div className="card shadow-lg rounded-3">
              <div className="card-body p-4">
                <h1 className="text-center fw-bolder mb-4">Sign In</h1>
                {/* Display error message if present */}
                {errorMsg && (
                  <div className="alert alert-danger" role="alert">
                    {errorMsg}
                  </div>
                )}
                <form onSubmit={submitLogin}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-grid gap-2 mt-4">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Sign In
                    </button>
                    <a href="/register" className="btn btn-outline-secondary btn-lg">
                      Register
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
