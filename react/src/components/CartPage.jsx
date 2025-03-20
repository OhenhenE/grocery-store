import CartCard from "./CartCard";
import Header from "./Header";
import SubHeader from "./SubHeader";
import ShippingForm from "./PaymentForm"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useAuth } from '../hooks/AuthContext';

function CartPage(props) {

  //     const { user } = useAuth();

  const [cartData, setCartData] = useState([]);
  const [emptyCart, setEmptyCart] = useState(true);
  const [resetForm, setResetForm] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cartpage/${props.user_id}/`);
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
    fetchData();
  }, []);

  useEffect(() => {
    const updateCartTotal = async () => {
      if (cartData && cartData.length > 0) {
        let runningTotal = 0;
        cartData.forEach(item =>
          runningTotal = runningTotal + (item.price * item.quantity)
        )
        setOrderTotal(runningTotal)
        updateCartTotal();
      } else {
        setOrderTotal(0)
      }
    };
    updateCartTotal();
  }, [cartData]);

  const handleClearForm = () => {
    setResetForm(true);
  };

  const placeOrder = async () => {
    try {

      let orderString = "";

      cartData.forEach(obj => {
        orderString += obj.quantity + " " + obj.name + ", ";
      });

      const order = {
        user_id: props.user_id,
        name: props.name,
        order_summary: orderString,
        order_cost: orderTotal,
      };

      const response = await fetch(`http://localhost:3000/cartpage/update/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });
      if (!response.ok) {
        throw new Error(`Could not add new order to database`);
      }
    } catch (error) {
      console.error('Error Adding Order:', error);
    }
  };

  const handleButtonClick = async () => {
    handleClearForm();
    await placeOrder();
  };


  const handleDelete = async (cart_id) => {
    try {
      const response = await fetch(`http://localhost:3000/cartpage/delete/${cart_id}/`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Item with id ${cart_id} could not be deleted from cart!`);
      }
      const updatedData = cartData.filter(item => item.id !== cart_id); // Removes deleted item from array
      setCartData(updatedData); // Updates state with updated data
    } catch (error) {
      console.error('Error Deleting Cart Item:', error);
    }
  };

  const handleUpdate = async (cart_id, newQuantity) => {
    try {
      const dataUpdate = {
        user_id: props.user_id,
        quantity: newQuantity
      };

      const response = await fetch(`http://localhost:3000/cartpage/update/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataUpdate)
      });
      if (!response.ok) {
        throw new Error(`Item with id ${cart_id} could not be updated in cart!`);
      }
      setCartData(prevData => prevData.map(item =>
        item.id === cart_id ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error('Error Updating Cart Item:', error);
    }
  };

  return (
    <>
      <SubHeader />
      <Header setGroceryData={props.setGroceryData} />

      {emptyCart && (
        <>
        <Link to='/featured'> Nothing in your shopping cart! Shop Now!</Link>
        </>
      )}

      {!emptyCart &&
        (
          <>
            <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {
                cartData.map((item) => (
                  <CartCard key={item.id} data={item} handleUpdate={handleUpdate} handleDelete={handleDelete} />
                ))
              }
            </div>
            <PaymentForm resetForm={resetForm} setResetForm={setResetForm} />
            < hr />
            <p> Order Total: {orderTotal}</p>
            <button onClick={handleButtonClick} className="btn btn-secondary"> Order Now </button>
          </>
        )
      }
    </>
  );
}

export default CartPage;
