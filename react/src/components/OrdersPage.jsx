import { useState, useEffect } from "react";

function OrdersPage(props) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groceryItems, setGroceryItems] = useState([]);

  // Fetch orders if not passed as props
  useEffect(() => {
    if (props.data && props.data.length > 0) {
      setOrders(props.data);  // Directly use the passed data if available
      setLoading(false);
    } else {
      // If data is not passed, fetch from API
      fetch("http://localhost:3000/orders/1") // Adjust the user ID if needed
        .then((response) => response.json())
        .then((data) => {
          setOrders(data);  // Set the fetched data
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);  // Handle any fetch errors
          setLoading(false);
        });
    }
  }, [props.data]); // Trigger effect when `props.data` changes


  // Fetch grocery item details once orders are loaded
  useEffect(() => {
    fetch("http://localhost:3000/groceries/all")
      .then((response) => response.json())
      .then((data) => setGroceryItems(data))
      .catch((err) => {
        setError(err.message); // Handle any fetch errors for grocery items
      });
  }, []); // Only run once when component is mounted

  // If loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, show an error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the orders in a table
  return (
    <div>
      <h1>Orders Page</h1>

      {orders.length === 0 ? (
        <p>No orders found for this user.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Customer Name</th>
              {/* <th scope="col">Customer Email</th> */}
              {/* <th scope="col">Order Name</th> */}
              {/* <th scope="col">Shipping Address</th> */}
              <th scope="col">Order Cost</th>
              <th scope="col">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              // Log the order to check its structure
              console.log("order",order);
            //   console.log("name",order.name);
            //   console.log("cost",order.order_cost);

            //   console.log('this is order.items', order.items)

                const formattedDate = new Date(order.date_ordered).toLocaleDateString("en-US", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                });
              // Check if order.items is an array before calling .map()
              const itemsList = Array.isArray(order.items)
                ? order.items.map((item) => {
                    console.log('this is item.grocery_id', item.grocery_id)
                    return (
                      <tr key={item.grocery_id}>
                        <td>{item.item_name}</td>
                        <td>{item.item_quantity}</td>
                        <td>${item.item_price}</td>
                        <td>${item.total_item_cost}</td>
                        <td>{formattedDate}</td>
                      </tr>
                    );
                  })
                : <tr><td colSpan="4">No items available for this order.</td></tr>;

              return (
                <tr key={order.id}>
                  <td>{order.name}</td>
                  {/* <td>{order.user_email}</td> */}
                  {/* <td>{order.order_name}</td> */}
                  {/* <td>{order.shipping_address}</td> */}
                  <td>${order.order_cost}</td>
                  <td>{formattedDate}</td>
                 
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrdersPage;
