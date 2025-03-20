import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Featured(props) {
    const [recommendations, setRecommendations] = useState([]); // Store recommendations

    useEffect(() => {
        async function getRecommendations() {
            try {
                const response = await fetch("http://your-backend-url/recommend", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch recommendations");
                }

                const data = await response.json(); // Parse response
                setRecommendations(data); // Store in state
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        }

        getRecommendations(); // Call function when component mounts
    }, []); // Empty dependency array ensures it runs once

    return (
        <>
            <div className="card" style={{ flex: "1", minWidth: "300px", maxWidth: "45%" }}>
                <img
                    src={`/Images/${props.data.grocery_id}.jpg`}
                    className="card-img-top"
                    alt={props.data.name}
                />
                <div className="card-body">
                    <h5 className="card-title">{props.data.name}</h5>
                    <div className="card-text">Aisle: {props.data.category} | Price: {props.data.price}</div>
                    <Link to={`/groceries/${props.data.grocery_id}`} className="btn btn-primary">
                        Go to Details
                    </Link>
                </div>
            </div>

            {/* Display recommendations */}
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
