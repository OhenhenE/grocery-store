import { useState, useEffect } from "react";
import "./App.css";
import RequireAuth from "./components/RequireAuth";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import CartPage from "./components/CartPage";
import Register from "./components/Register";
import Search from "./components/Search";
import Header from "./components/Header";

function App() {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const response = await fetch("http://localhost:3000/groceries/all");
        if (!response.ok) {
          throw new Error("Failed to fetch groceries");
        }
        const data = await response.json();
        setGroceries(data);

      } catch (error) {
        console.error('Error fetching groceries', error);
      }

    }
    fetchGroceries();
  }, []);

  return (
    <>
      <Header>
        <h1>Header here</h1>
      </Header>
    </>
    // <Router>
    //   <AuthProvider>
        

    //     <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
    //       <div className="container-fluid">
    //         <div className="row">
    //           <Routes>
    //             <Route path="/" element={<Home />} />
    //             <Route path="/Login" element={<LoginForm />} />
    //             <Route path="/Register" element={<Register />} />
    //             <Route path="/CartPage" element={<CartPage />} />
    //             <Route
    //               path="/add"
    //               element={<RequireAuth>{/* <AddSock /> */}</RequireAuth>}
    //             />
    //           </Routes>
    //         </div>
    //       </div>
    //     </main>
    //   </AuthProvider>
    // </Router>
  );
}

export default App;
