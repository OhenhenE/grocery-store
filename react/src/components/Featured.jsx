import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import SubHeader from "./SubHeader";
import GroceryCard from "./GroceryCard";

function Featured(props) {
    const [recommendations, setRecommendations] = useState([]); // Store recommendations

    const user_id = 1;

    const [cartData, setCartData] = useState([]);
    const [emptyCart, setEmptyCart] = useState(true);
    const [useData, setData] = useState([]);

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
            setData(groupData(data, 3)); // Store in state
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    }

    const getRandomData = async () => {
        try {
            const response = await fetch('http://localhost:3000/groceries/all/random');
            if (!response.ok) {
                throw new Error('Random Grocery Data could not be fetched!');
            }
            const json_response = await response.json();
            setData(groupData(json_response, 3)); // assign JSON response to the data variable 
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
            if (emptyCart) {
                getRandomData();
            } else {
                getRecommendationData();
            }
        }
        getRecommendations(); // Call function when component mounts
    }, []); // Empty dependency array ensures it runs once

    // Helper function to group data into chunks of specified size
    const groupData = (data, chunkSize) => {
        const result = [];
        for (let i = 0; i < data.length; i += chunkSize) {
            result.push(data.slice(i, i + chunkSize));
        }
        console.log("Grouped Data:", result); // Debugging line
        return result;
    };

    return (
        <>
            <SubHeader />
            <Header setGroceryData={props.setGroceryData} />
            <br></br>
            <h3 style={{ textAlign: 'center' }}>Recommended for You</h3>
            <div className="container mt-5">
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        {useData.map((itemGroup, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                <div className="cards-wrapper">
                                    {itemGroup.map((item, idx) => (
                                        <GroceryCard key={idx} data={item} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

            </div>
        </>
    );
}

export default Featured;
