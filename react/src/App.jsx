import React, {useState, useEffect} from "react";
import "./App.css";
import RequireAuth from "./components/RequireAuth";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext";
import Home from "./components/Home";
import GroceryItemPage from "./components/GroceryItemPage"
import LoginForm from "./components/LoginForm";
import CartPage from "./components/CartPage";
import Register from "./components/Register";
import DepartmentPage from "./components/DepartmentPage";

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

        <Routes>
          <Route exact path="/" element={<Home grocery_data={grocery_data} setGroceryData={setGroceryData} />} />
          <Route exact path="/groceries/:id" element={<GroceryItemPage setGroceryData={setGroceryData}/> } />
          <Route exact path="/groceries/departments/:category" element={<DepartmentPage setGroceryData={setGroceryData}/> } />
          <Route path="/user/login" element={<LoginForm />} />
          <Route path="/user/cart" element={<CartPage />} />
          <Route path="/user/orders" element={<LoginForm />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
