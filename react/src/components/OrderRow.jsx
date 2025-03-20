import React from "react";

function OrderRow({ order }) {
  const formattedDate = new Date(order.date_ordered).toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <tr key={order.id}>
      <td>{formattedDate}</td>
      <td>{order.pickup_time}</td>
      <td>{order.name}</td>
      <td>${order.order_cost}</td>
      <td>${order.order_summary}</td>
    </tr>
  );
}

export default OrderRow;
