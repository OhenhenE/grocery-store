import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import SubHeader from "./SubHeader";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Register from "./Register";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    await login(username, password);
    console.log(username, password);
    navigate("/add");
  };

  return (
    <>
      <SubHeader />
      <Header setGroceryData={props.setGroceryData} />
      <div>
        <div>
          <button>Sign In</button>

          <button>
            <Link className="nav-link" to="/Register">Register</Link>
          </button>
        </div>

        <div className="container">
          <form onSubmit={handleLogin} className="mt-5">
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
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div className="container-fluid">
            <div className="row">
              
              <hr />
             
                <Routes>
                  {/* <Route exact path="/" element={<Home data={data} handleDelete={handleDelete} page={page} setPage={setPage} />} /> */}
                 
                  <Route path="/Register" element={<Register />} />
                </Routes>
              
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default LoginForm;
