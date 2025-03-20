import CartCard from "../CartCard";
import Header from "../Header";
import SubHeader from "../SubHeader";
import { useState, useEffect } from "react";


function CartPage(props) {

  const [cartData, setCartData] = useState([]);
  const [emptyCart, setEmptyCart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cartpage/${props.user_id}/`);
        if (!response.ok) {
          throw new Error('Shopping Cart Data could not be fetched!');
        }
        if (Object.entries(response.json()).length === 0) {
          setEmptyCart(true);
        }
        const json_response = await response.json();
        setCartData(json_response); // assign JSON response to the data variable 
      } catch (error) {
        console.error('Error fetching Shoping Cart:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (cart_id) => {
    try {
      // Make an API response to delete sock with given sockID
      const response = await fetch(`http://localhost:3000/cartpage/delete/${id}/`, { method: 'DELETE', });
      if (!response.ok) {
        throw new Error('Item could not be deleted from cart!');
      }
      // Update the dtate or fetch updated data from server
      const updatedData = data.filter(item => item.id !== cart_id); // Removes deleted sock from array
      setCartData(updatedData); // Updates state with updated data
    } catch (error) {
      console.error('Error Deleting Sock:', error);
    }
  };

  const handleUpdate = async (cart_id, newQuantity) => {
    try {
      // Make an API response to delete sock with given sockID

      dataUpdate = {
        "id": cart_id,
        "quantity": newQuantity
      }

      const response = await fetch(`http://localhost:3000/cartpage/update/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataUpdate)
      });
      if (!response.ok) {
        throw new Error('Item could not be updated in cart from database! Cart id:', cart_id);
      }
      setCartData(prevData => prevData.map(item =>
        item.id === cart_id ?
          {
            ...item,
            quantity: newQuantity
          }
        );
      );
    } catch (error) {
      console.error('Error Updating Cart Item:', error);
    }
  };

return (
  <>
    <SubHeader />
    <Header setGroceryData={props.setGroceryData} />
    <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {
        props.data.map((item) => (
          <CartCard key={item.grocery_id} data={item} handleUpdate={handleUpdate} handleDelete={handleDelete} />
        ))
      }
    </div>
  </>
);
}

export default CartPage;