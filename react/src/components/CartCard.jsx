import { useState, useEffect } from "react";
import IncrimentComponent from "./IncrimentComponent";

function CartCard(props) {
  const [quantityIndicator, changeQuantityIndicator] = useState([
    props.data.quantity,
  ]);

  let item_cost = props.data.price * props.data.quantity;

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
      <div className="container my-5">
        <div className="card row flex-row">
          <img
            className="col-lg-4 card-img-start img-fluid p-0"
            src={imageExists ? `/Images/${props.data.grocery_id}.jpg` : "/Images/default.jpg"}
            alt="Product"
            style={{ borderRadius: "50px", maxHeight: "300px", maxWidth: "300px" }}
          />
          <div className="col-lg-8 card-body">
            <h4 className="card-title">{props.data.name}</h4>
            <p
              className="card-text"
              style={{ fontFamily: "Lato", marginBottom: "20px" }}
            >
              ${item_cost.toFixed(2)}
            </p>
            <div className="container">
              <div className="card row flex-row">
                <IncrimentComponent
                  quantityIndicator={quantityIndicator}
                  changeQuantityIndicator={changeQuantityIndicator}
                />
              </div>
              <div className="card row flex-row" >
                <a
                  className="col-s-2"
                  href="#"
                  onClick={() =>
                    props.handleUpdate(props.data.id, quantityIndicator)
                  }
                >
                  Update
                </a>
                <a
                  className="col-s-2"
                  href="#"
                  onClick={() => props.handleDelete(props.data.id)}

                >
                  Remove
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartCard;
