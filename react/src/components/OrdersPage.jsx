import React, { useState, useEffect } from "react";
import Header from "./Header";
import SubHeader from "./SubHeader";
import OrderRow from "./OrderRow"; // Import the OrderRow component

function OrdersPage(props) {
  const [orders, setOrders] = useState([]);

  // Fetch orders from API using async/await
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/orders/1"); // Adjust the user ID if needed
        if (!response.ok) {
          throw new Error("Order data could not be fetched!");
        }
        const jsonResponse = await response.json();
        setOrders(jsonResponse); // Set the fetched data
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array to fetch orders on component mount

  // Render the orders in a table
  return (
    <>
    <SubHeader />
    <Header setGroceryData={props.setGroceryData} />
    <div>
      <br></br>
      <h1>Order History</h1>

      {orders.length === 0 ? (
        <p>No orders found for this user.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Order Date</th>
              <th scope="col">PickUp Time</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Order Cost</th>
              <th scope="col">Order Summary</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
}

export default OrdersPage;
