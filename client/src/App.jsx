import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./app.css";

// coneccion al backend
const socket = io.connect("http://localhost:3009");

export default function App() {
  const [orders, setOrders] = useState(false);

  useEffect(() => {
    try {
      socket.open();
      socket.emit("load_initial_data");
      socket.on("load_messages", (messages) => {
        setOrders(messages);
        console.log(messages);
      });
    } catch (error) {
      console.log(error);
    }
    // Return a callback to be run before unmount-ing.
    return () => {
      socket.close();
    };
  }, []);

  // const onMessageSubmit = (e) => {
  //   e.preventDefault();
  //   socket.emit("set_message", "hola mundo!");
  // };

  console.log(orders);

  if (orders) {
    if (!orders.length) return "No hay datos";
    return (
      <ul>
        <button onClick={() => socket.emit("set_message", "lalo")}>
          uno mas
        </button>
        {orders.map((order, index) => (
          <li key={index}>{order.message} </li>
        ))}
      </ul>
    );
  }
  return "... loading";
}
