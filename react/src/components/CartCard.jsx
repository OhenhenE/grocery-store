import { useState } from "react";
import IncrimentComponent from "./IncrimentComponent";


function CartCard(props) {

    const [quantityIndicator, changeQuantityIndicator] = useState([props.data.quantity]);

    let item_cost = props.data.item_cost * props.data.quantity

    return (
        <>
          <div className="container my-5">
            <div className="card row flex-row">
              <img className="col-lg-4 card-img-start img-fluid p-0" src={`/Images/${props.data.grocery_id}.jpg`} alt="Product" />
              <div className="col-lg-8 card-body">
                <h4 className="card-title">{props.data.name}</h4>
                <p className="card-text">${item_cost.toFixed(2)}</p>
                <div className="container">
                  <div className="card row flex-row">
                    <IncrimentComponent quantityIndicator={quantityIndicator} changeQuantityIndicator={changeQuantityIndicator} />
                  </div>
                  <div className="card row flex-row">
                    <a className="col-s-2" href="#" onClick={() => props.handleUpdate(props.data.id, quantityIndicator)}>Update</a>
                    <a className="col-s-2" href="#" onClick={() => props.handleDelete(props.data.id)}>Remove</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    );   
}

export default CartCard;