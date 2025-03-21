import { useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import Header from "./Header";
import SubHeader from "./SubHeader";

function GroceryItemPage(props) {

    let { id } = useParams();
    const [data, setData] = useState([]);
    const [imageExists, setImageExists] = useState(false); 
    let inCart = false;

    useEffect (() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/groceries/index/${id}/`);
            if(!response.ok) {
              throw new Error('Grocery Data could not be fetched!');
            }
            const json_response = await response.json();
            setData(json_response); // assign JSON response to the data variable 

             // Check if the image exists
            const imageURL = `/Images/${json_response.grocery_id}.jpg`;
            const imgCheck = await fetch(imageURL, { method: "HEAD" });

            if (imgCheck.ok) {
              setImageExists(true);
            } else {
              setImageExists(false);
            }
          } catch (error) {
            console.error('Error fetching groceries:', error);
          }
        };
        fetchData();
      }, []);

      const addToCart = async () => {
        if (!inCart) 
        {try {
    
          const cartItem = {
            user_id: 1,
            name: data.name,
            grocery_id: data.grocery_id,
            quantity: 1,
            price: data.price
          };
    
          const response = await fetch(`http://localhost:3000/cartpage/add/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItem)
          });
          if (!response.ok) {
            throw new Error(`Could not add new item to shoppung cart`);
          }

          inCart = true;
        } catch (error) {
          console.error('Error Adding To Cart:', error);
        }} else {
          inCart = true
        }
      } 
    
    return (
        <>
        <SubHeader />
        <Header setGroceryData={props.setGroceryData} />
        <div className="card" style={{ flex: '1', minWidth: '300px', alignItems:"center"}}>
            <img src={imageExists ? `/Images/${data.grocery_id}.jpg` : "/Images/default.jpg"} 
            className="card-img-top" 
            alt={data.name}
            onError={(e) => { e.target.src = "/Images/logo_edited.png"; }} 
            style={{
              maxHeight:"800px",
              maxWidth:"400px",
              display:"flex"
            }}/>
            <div className="card-body">
                <h5 className = "card-title"> {data.name} </h5>
                <div className="card-text">Aisle: {data.category} | Department: {data.sub_category}</div> 
                <p className="card-text">Cost: {data.price}</p>
                <p className="card-text">{data.description}</p>           
                <button className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
        </>
    )
}

export default GroceryItemPage;