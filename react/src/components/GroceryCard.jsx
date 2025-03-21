import React from "react";
import { Link } from "react-router-dom";

import{useState, useEffect} from "react";

const GroceryCard = (props) => {
    const [imageExists, setImageExists] = useState(false);

    useEffect(() => {
        const checkImage = async () => {
          const imageURL = `/Images/${props.data.grocery_id}.jpg`;
    
          try {
            const response = await fetch(imageURL, { method: "HEAD" });
            setImageExists(response.ok); // If the request is OK, the image exists
          } catch (error) {
            console.error("Error checking image:", error);
            setImageExists(false);
          }
        };
    
        checkImage();
      }, [props.data.grocery_id]);
    
    return (
        <>
        <div className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%'}}>
            <img 
                src={imageExists ? `/Images/${props.data.grocery_id}.jpg` : "/Images/default.jpg"}  
                className="card-img-top" 
                alt={props.data.name} 
                style={{border:"solid 1px grey", borderRadius:"10px", maxHeight:"400px"}}
            />
            <div className="card-body">
                <h5 className = "card-title" style={{ fontSize:"20px", paddingBottom:"8px", fontWeight:"bold", color:"#333333"}}> {props.data.name} </h5>
                <div className="card-text" style={{ fontSize:"17px", paddingBottom:"8px"}}>Aisle: {props.data.category} | Price: {props.data.price}</div>              
                <Link to={`/groceries/${props.data.grocery_id}`} className="btn btn-primary"style={{fontFamily:"Lato", fontSize:"15px", marginTop:"10px", backgroundColor:"#4CAF50", borderColor:"#4CAF50"}}>Details</Link>
            </div>
        </div>
        </>
    )
}

export default GroceryCard;