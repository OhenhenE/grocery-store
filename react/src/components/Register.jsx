import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";



function Register() {
  const [username, setUsername] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
//   const { login } = useAuth();
const { register } = useAuth();

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    // await login(username, password);
    await register(username, email, password);
    console.log(username, email, password);
    navigate("/Home");
  };
  return (
    <>
      <div>
        <h2>Register</h2>
        <div className="container">
          <form onSubmit={handleRegister} className="mt-5">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emai">Email</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
