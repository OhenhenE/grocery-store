import { useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import Header from "./Header";


function GroceryItemPage(props) {

    let { id } = useParams();
    const [data, setData] = useState([]);

    useEffect (() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/groceries/index/${id}/`);
            if(!response.ok) {
              throw new Error('Grocery Data could not be fetched!');
            }
            const json_response = await response.json();
            setData(json_response); // assign JSON response to the data variable 
          } catch (error) {
            console.error('Error fetching groceries:', error);
          }
        };
        fetchData();
      }, []);
    
    return (
        <>
        <Header setGroceryData={props.setGroceryData} />
        <div className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%'}}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className = "card-title"> {data.name} </h5>
                <div className="card-text">Isle: {data.category} | Department: {data.sub_category}</div> 
                <p className="card-text">Cost: {data.price}</p>
                <p className="card-text">{data.description}</p>           
                <button className="btn btn-primary">Add to Cart</button>
            </div>
        </div>
        </>
    )
}

export default GroceryItemPage;