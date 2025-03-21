import React from "react";

function OrderRow({ order }) {
  const formattedDate = new Date(order.date_ordered).toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedDateTime = new Date(order.pickup_time).toLocaleString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });
  

  return (
    <tr key={order.id}>
      <td>{formattedDate}</td>
      <td>{formattedDateTime}</td>
      <td>{order.name}</td>
      <td>${order.order_cost}</td>
      <td>{order.order_summary}</td>
    </tr>
  );
}

export default OrderRow;
