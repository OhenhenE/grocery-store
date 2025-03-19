import { useState } from "react";
import "./App.css";
import RequireAuth from "./components/RequireAuth";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import CartPage from "./components/CartPage";
import Register from "./components/Register";
import Search from "./components/Search";
function App() {
  const [grocery_data, setGroceryData] = useState([]);

  useEffect (() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/groceries/all/');
        if(!response.ok) {
          throw new Error('Grocery Data could not be fetched!');
        }
        const json_response = await response.json();
        setGroceryData(json_response); // assign JSON response to the data variable 
      } catch (error) {
        console.error('Error fetching groceries:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <header>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                Byte & Basket
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Shop Aisles
                    </a>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/groceries/dairy">Dairy</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/groceries/produce">Produce</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/groceries/seafood">Seafood</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/groceries/bakery">Bakery</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/groceries/meat">Meat</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/groceries/frozen">Frozen</Link></li>
                    </ul>
                  </li>
                </ul>
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <Link to="/Login" className="btn btn-primary ms-3">Sign In / Register</Link>
                <Link to="/" className="btn btn-primary ms-3">Past Orders</Link>
                <Link to="/CartPage" className="btn btn-outline-dark ms-2">
                  Cart
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-cart ms-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div className="container-fluid">
            <div className="row">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<LoginForm />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/CartPage" element={<CartPage />} /> 
                <Route
                  path="/add"
                  element={<RequireAuth>{/* <AddSock /> */}</RequireAuth>}
                />
              </Routes>
            </div>
          </div>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
