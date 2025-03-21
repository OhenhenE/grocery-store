import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Featured(props) {
    const [recommendations, setRecommendations] = useState([]); // Store recommendations

    const user_id = 1;

    const [cartData, setCartData] = useState([]);
    const [emptyCart, setEmptyCart] = useState(true);
    const [Data, setData] = useState([]);
  
    const getRecommendationData = async () => {
        try {
            const response = await fetch("http://localhost:3000/recommend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch recommendations");
            }

            const data = await response.json(); // Parse response
            setData(data); // Store in state
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    }

    const getRandomData = async () => {
        try {
          const response = await fetch('http://localhost:3000/groceries/all/random');
          if(!response.ok) {
            throw new Error('Random Grocery Data could not be fetched!');
          }
          const json_response = await response.json();
          setData(json_response); // assign JSON response to the data variable 
        } catch (error) {
          console.error('Error fetching groceries:', error);
        }
      };
  
    useEffect(() => {
      const fetchCartData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/cartpage/${user_id}/`);
          if (!response.ok) {
            throw new Error('Shopping Cart Data could not be fetched!');
          }
          const jsonResponse = await response.json();
          if (Object.entries(jsonResponse).length !== 0) {
            setEmptyCart(false);
          }
          setCartData(jsonResponse); // assign JSON response to the cartData state
        } catch (error) {
          console.error('Error fetching Shopping Cart:', error);
        }
      };
      fetchCartData();
    }, []);

    useEffect(() => {
        const getRecommendations = async () => {
            if (emptyCart){
                getRandomData();
            } else {
                getRecommendationData();
            }
        }
        getRecommendations(); // Call function when component mounts
    }, []); // Empty dependency array ensures it runs once

    return (
        <>
            <SubHeader />
            <Header setGroceryData={props.setGroceryData} />
            <br></br>
            <h3 style={{ textAlign: 'center' }}>Recommended for You</h3>
            <div className="container mt-5">
                <div id="cardCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {recommendations.map((grocery, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                <GroceryCard key={grocery.grocery_id} data={grocery} />
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#cardCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#cardCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div>
                <h3>Recommended for You</h3>
                <ul>
                    {recommendations.map((item) => (
                        <li key={item.grocery_id}>{item.name} - ${item.price}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Featured;
