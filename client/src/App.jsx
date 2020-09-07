import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// conection with sockets backend
const socket = io.connect("http://localhost:3009");

export default function App() {
  const [messages, setMessages] = useState(false);

  useEffect(() => {
    try {
      socket.open();
      socket.emit("load_initial_data");
      socket.on("load_messages", (messages) => {
        setMessages(messages);
      });
    } catch (error) {
      console.log(error);
    }
    // Return a callback to be run before unmount-ing.
    return () => {
      socket.close();
    };
  }, []);

  if (messages) {
    if (!messages.length)
      return (
        <button onClick={() => socket.emit("set_message", "my first message")}>
          first message
        </button>
      );
    return (
      <ul>
        <button onClick={() => socket.emit("set_message", "my new message")}>
          one more
        </button>
        {messages.map((message, index) => (
          <li key={index}>{message.bodyOfMessage} </li>
        ))}
      </ul>
    );
  }
  return "... loading";
}
