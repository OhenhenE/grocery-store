import React from "react";
import { Link } from "react-router-dom";

const GroceryCard = (props) => {

    return (
        <>
        <div className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%'}}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className = "card-title"> {props.data.name} </h5>
                <div className="card-text">Department: {props.data.category} | Price: {props.data.price}</div>              
                <Link to={`/groceries/${props.data.grocery_id}`} className="btn btn-primary">Go to Details</Link>
            </div>
        </div>
        </>
    )
}

export default GroceryCard;